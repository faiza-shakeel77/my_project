import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, FontAwesome5, MaterialIcons, Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={styles.gradient}>
        <View style={styles.headerContainer}>
          <Feather name="bar-chart" size={24} color="black" />
          <Text style={styles.headerText}>Software Project Management System</Text>
          <Entypo name="lock" size={24} color="black" />
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => router.push("/(home)/projects")}
            style={styles.button}
            accessibilityLabel="Go to Project List"
          >
            <View style={styles.iconContainer}>
              <Octicons name="project" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>Software Project List</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(home)/manageTasks")}
            style={styles.button}
            accessibilityLabel="Manage Project"
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="tasks" size={24} color="black" />
            </View>
            <Text style={styles.buttonText}>Manage Software Projects</Text>
          </Pressable>
        </View>

        <View style={styles.cardContainer}>
          <Pressable
          onPress={() => router.push("/(home)/Dashboard")}
            style={styles.card}
            accessibilityLabel="Go to Dashboard"
          >
            <View style={styles.cardIconContainer}>
              <MaterialIcons name="dashboard" size={24} color="black" />
            </View>
            <Text style={styles.cardText}>Dashboard</Text>
            <View style={styles.cardArrow}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(home)/[client]")}
            style={styles.card}
            accessibilityLabel="Go to Project Reports"
          >
          <View style={styles.cardIconContainer}>
              <Octicons name="repo-pull" size={24} color="black" />
            </View>
            <Text style={styles.cardText}>Software Project Reports</Text>
            <View style={styles.cardArrow}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>


          <Pressable
          onPress={() => router.push("/(home)/summary")}
           style={styles.card}
            accessibilityLabel="Go to Project Overview"
          >
            <View style={styles.cardIconContainer}>
              <Octicons name="report" size={24} color="black" />
            </View>
            <Text style={styles.cardText}>Project Overview</Text>
            <View style={styles.cardArrow}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(home)/Stakeholders")}
            style={styles.card}
            accessibilityLabel="Go to Stakeholders"
          >
            <View style={styles.cardIconContainer}>
              <Ionicons name="people" size={24} color="black" />
            </View>
            <Text style={styles.cardText}>Stakeholders</Text>
            <View style={styles.cardArrow}>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        <View style={styles.buttonRow}>
          <View style={[styles.specialButton, styles.taskCriteriaButton]}>
            <View style={styles.specialIconContainer}>
              <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
            </View>
            <Text style={styles.specialButtonText}>Software Project Criteria</Text>
          </View>
          <View style={[styles.specialButton, styles.generateCriteriaButton]}>
            <View style={styles.specialIconContainer}>
              <MaterialCommunityIcons name="guy-fawkes-mask" size={24} color="black" />
            </View>
            <Text style={styles.specialButtonText}>Generate Criteria</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#D3CCE3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginTop: 7,
    fontWeight: "600",
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
  },
  card: {
    backgroundColor: "#BE93C5",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  cardIconContainer: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  cardArrow: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  specialButton: {
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  taskCriteriaButton: {
    backgroundColor: "#f79d00",
  },
  generateCriteriaButton: {
    backgroundColor: "#ABCABA",
  },
  specialIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  specialButtonText: {
    marginTop: 7,
  },
});

export default Index;
