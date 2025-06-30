import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const addDetails = () => {
    const [projectName, setProjectName] = useState("");
    const [projectId, setProjectId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [clientContact, setClientContact] = useState("");

  const handleRegister = () => {
    const projectData = {
      projectName: projectName,
      projectId:projectId,
      startDate: startDate,
      endDate: endDate,
      description: description,
      clientContact: clientContact,
      
    };

    axios
      .post("http://192.168.228.96:5000/addProject", projectData)
      .then((response) => {
        Alert.alert(
          "Registration Successful",
          "The project has been added successfully"
        );
        setProjectName("");
        setProjectId("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setClientContact("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Failed",
          "An error occurred while adding the project"
        );
        console.log("Register failed", error);
      });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a New Project
        </Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Project Name
          </Text>
          <TextInput
            value={projectName}
            onChangeText={(text) => setProjectName(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Project Name"
            placeholderTextColor={"black"}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Project Id</Text>
          <TextInput
            value={projectId}
            onChangeText={(text) => setProjectId(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Project Id"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Start Date</Text>
          <TextInput
            value={startDate}
            onChangeText={(text) => setStartDate(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Start Date"
            placeholderTextColor={"black"}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>End Date</Text>
          <TextInput
            value={endDate}
            onChangeText={(text) => setEndDate(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter End Date"
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Description</Text>
          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Project Description"
            placeholderTextColor={"black"}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Client Contact</Text>
          <TextInput
            value={clientContact}
            onChangeText={(text) => setClientContact(text)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Client Contact"
            placeholderTextColor={"black"}
          />
        </View>

        <Pressable
          onPress={handleRegister}
          style={{
            backgroundColor: "#ABCABA",
            padding: 10,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Add Project
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default addDetails;

const styles = StyleSheet.create({});
