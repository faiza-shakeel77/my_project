import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const manageTasks = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get("http://192.168.228.96:5000/projects");
        setProjects(response.data);
      } catch (error) {
        console.log("error fetching project data", error);
      }
    };
    fetchProjectData();
  }, []);
  const [tasks, setTasks] = useState([]);
  const fetchTasksData = async () => {
    try {
      const response = await axios.get(`http://192.168.228.96:5000/tasks`, {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log("error fetching tasks data", error);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, [currentDate]);
  const projectWithTasks = projects.map((project) => {
    const tasksRecord = tasks.find(
      (record) => record.projectId === project.projectId
    );

    return {
      ...project,
      status: tasksRecord ? tasksRecord.status : "", // 'Not Marked' or a default status
    };
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
          }}
        >
          <AntDesign
            onPress={goToPrevDay}
            name="left"
            size={24}
            color="black"
          />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign
            onPress={goToNextDay}
            name="right"
            size={24}
            color="black"
          />
        </View>

        <View style={{ marginHorizontal: 12 }}>
          {projectWithTasks.map((item, index) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/[client]",
                  params: {
                    name: item.projectName,
                    id: item.projectId,
                    clientContact: item?.clientContact,
                    description: item?.description,
                  },
                })
              }
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#4b6cb7",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item?.projectName?.charAt(0)}
                </Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.projectName}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.description} ({item?.projectId})
                </Text>
              </View>
              {item?.status && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#FF69B4",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    {item.status.charAt(0)}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </Pressable>
    </View>
  );
};

export default manageTasks;

const styles = StyleSheet.create({});