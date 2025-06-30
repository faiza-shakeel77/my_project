import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from 'react-native-paper';

const Summary = () => {
  const [tasksData, setTasksData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  const fetchTasksReport = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.107:5000/tasks-report-all-projects`,
        {
          params: {
            month: currentDate.month() + 1, // Adjusted to current month
            year: currentDate.year(), // Use current year
          },
        }
      );
      setTasksData(response.data.report);
    } catch (error) {
      console.log("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    fetchTasksReport();
  }, [currentDate]); // Fetch data when currentDate changes

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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
        <AntDesign onPress={goToPrevMonth} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextMonth} name="right" size={24} color="black" />
      </View>

      <View style={{ marginHorizontal: 12 }}>
        {tasksData.length > 0 ? tasksData.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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
                  {item?.name?.charAt(0) || '?'}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.name || 'Unknown'}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.description || 'No description'} ({item?.projectId || 'No ID'})
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 15, margin: 5, padding: 5, backgroundColor: "#A1FFCE", borderRadius: 5 }}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>C</DataTable.Title>
                  <DataTable.Title>I</DataTable.Title>
                  <DataTable.Title>D</DataTable.Title>
                  <DataTable.Title>IP</DataTable.Title>
                  <DataTable.Title>OH</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{item?.Completed || 'N/A'}</DataTable.Cell>
                  <DataTable.Cell>{item?.Incompleted || 'N/A'}</DataTable.Cell>
                  <DataTable.Cell>{item?.Deleted || 'N/A'}</DataTable.Cell>
                  <DataTable.Cell>{item?.InProgress || 'N/A'}</DataTable.Cell>
                  <DataTable.Cell>{item?.OverHours || 'N/A'}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        )) : (
          <Text style={{ margin: 20, textAlign: "center" }}>No data available for this month.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({});
