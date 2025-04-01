import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JobDetailScreen({ route }) {
  const { jobId } = route.params;

  // Mock data for now
  const job = {
    title: "Satyam Home Care Services wants nannies and ward boys",
    description: "Detailed description of the job",
    salary: "₹20000 - ₹25000",
    location: "Hyderabad",
    contact: "1234567890",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.description}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Contact: {job.contact}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
});
