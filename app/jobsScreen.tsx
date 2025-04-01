import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';  // Assuming you're using expo-router

export default function JobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const fetchJobs = async () => {
    if (!hasMore) return;
    try {
      setLoading(true);
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const data = await response.json();
      
      if (!data.results.length) setHasMore(false);
      
      setJobs(prevJobs => [...prevJobs, ...data.results]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/job/${item.id}`)} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.primary_details.Place}</Text>
      <Text>Salary: {item.primary_details.Salary}</Text>
      <Text>Phone: {item.primary_details.Phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  title: { fontSize: 18, fontWeight: "bold" },
  error: { color: "red", textAlign: "center" },
});
