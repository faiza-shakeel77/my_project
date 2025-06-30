// Dashboard.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Projects</Text>
          <Text style={styles.statValue}>3</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Completed Projects</Text>
          <Text style={styles.statValue}>1</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Pending Projects</Text>
          <Text style={styles.statValue}>2</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statTitle: {
    fontSize: 18,
    color: '#333',
  },
  statValue: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Dashboard;
