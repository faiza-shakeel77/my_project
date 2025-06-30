const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});




const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
