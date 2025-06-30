const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://warishashakeel10:faiza@cluster0.wrhqy.mongodb.net/", {
   
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 5000");
});

const Project = require("./models/project");
const Tasks = require("./models/tasks");

// Endpoint to register a project
app.post("/addProject", async (req, res) => {
  try {
    const {
      projectName,
      projectId,
      startDate,
      endDate,
      description,
      clientContact,
    } = req.body;

    // Create a new Project
    const newProject = new Project({    
      projectName,
      projectId,
      startDate,
      endDate,
      description,    
      clientContact,
    });

    await newProject.save();

    res
      .status(201)
      .json({ message: "Project saved successfully", project: newProject });
  } catch (error) {
    console.log("Error creating project", error);
    res.status(500).json({ message: "Failed to add a project" });
  }
});

// Endpoint to fetch all the projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the projects" });
  }
});
app.use(express.json());

app.post("/tasks", async (req, res) => {
  try {
    const { projectId, projectName, date, status } = req.body;

    const existingTasks = await Tasks.findOne({ projectId, date });

    if ( existingTasks) {
      existingTasks.status = status;
      await  existingTasks.save();
      res.status(200).json( existingTasks);
    } else {
      const newTasks = new Tasks({
        projectId,
        projectName,
        date,
        status,
      });
      await newTasks.save();
      res.status(200).json(newTasks);
    }
  } catch (error) {
    res.status(500).json({ message: "Error submitting tasks" });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const { date } = req.query;

    // Find tasks records for the specified date
    const tasksData = await Tasks.find({ date: date });

    res.status(200).json(tasksData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks data" });
  }
});

app.get("/tasks-report-all-projects", async (req, res) => {
    try {
      const { month, year } = req.query;
  
      console.log("Query parameters:", month, year);
      // Calculate the start and end dates for the selected month and year
      const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
        .startOf("month")
        .toDate();
      const endDate = moment(startDate).endOf("month").toDate();
  
      // Aggregate tasks data for all employees and date range
      const report = await Tasks.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [
                    { $month: { $dateFromString: { dateString: "$date" } } },
                    parseInt(req.query.month),
                  ],
                },
                {
                  $eq: [
                    { $year: { $dateFromString: { dateString: "$date" } } },
                    parseInt(req.query.year),
                  ],
                },
              ],
            },
          },
        },
  
        {
          $group: {
            _id: "$projectId",
            Completed: {
              $sum: {
                $cond: { if: { $eq: ["$status", "Completed"] }, then: 1, else: 0 },
              },
            },
            Incompleted: {
              $sum: {
                $cond: { if: { $eq: ["$status", "Incompleted"] }, then: 1, else: 0 },
              },
            },
            InProgress: {
              $sum: {
                $cond: { if: { $eq: ["$status", "InProgress"] }, then: 1, else: 0 },
              },
            },
            Deleted: {
              $sum: {
                $cond: { if: { $eq: ["$status", "Deleted"] }, then: 1, else: 0 },
              },
            },
          },
        },
        {
          $lookup: {
            from: "projects", // Name of the project collection
            localField: "_id",
            foreignField: "projectId",
            as: "projectDetails",
          },
        },
        {
          $unwind: "$projectDetails", // Unwind the projectDetails array
        },
        {
          $project: {
            _id: 1,
            Completed: 1,
            Incompleted: 1,
            Deleted: 1,
            name: "$projectDetails.projectName",
            description:"$projectDetails.description",
            clientContact: "$projectDetails.clientContact",
            projectId: "$projectDetails.projectId",
          },
        },
      ]);
  
      res.status(200).json({ report });
    } catch (error) {
      console.error("Error generating tasks report:", error);
      res.status(500).json({ message: "Error generating the tasks" });
    }
  });
  