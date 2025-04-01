import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Define a Job type for the job data
type Job = {
  id: number;
  title: string;
  location: string;
  salary: string;
};

export default function BookmarksScreen() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);

  // Example: mock bookmarked jobs, replace with actual logic or AsyncStorage
  const jobs: Job[] = [
    { id: 1, title: "Satyam Home Care Services wants nannies and ward boys", location: "Hyderabad", salary: "₹20000" },
    { id: 2, title: "Gym Training ward boys  2", location: "Hyderabad", salary: "₹25000" },
  ];

  const renderItem = ({ item }: { item: Job }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.location}</Text>
      <Text>{item.salary}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedJobs.length ? bookmarkedJobs : jobs} // Mock data
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  title: { fontSize: 18, fontWeight: "bold" },
});
