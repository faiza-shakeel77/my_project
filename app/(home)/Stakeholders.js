// Stakeholders.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const stakeholdersData = [
  { id: '1', name: 'Alice Johnson', role: 'Project Manager', contact: 'alice.johnson@example.com' },
  { id: '2', name: 'Bob Smith', role: 'Lead Developer', contact: 'bob.smith@example.com' },
  { id: '3', name: 'Carol Davis', role: 'UX Designer', contact: 'carol.davis@example.com' },
  { id: '4', name: 'Dave Wilson', role: 'QA Engineer', contact: 'dave.wilson@example.com' },
];

const Stakeholders = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.contact}>{item.contact}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stakeholders</Text>
      <FlatList
        data={stakeholdersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    color: '#555',
  },
  contact: {
    fontSize: 14,
    color: '#888',
  },
});

export default Stakeholders;
