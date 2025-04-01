import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function JobsScreen() {
  const [jobs, setJobs] = useState([]);  // State to store the jobs
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [page, setPage] = useState(1);  // Page number for pagination
  const [hasMore, setHasMore] = useState(true);  // State to check if there are more jobs to load
  const router = useRouter();  // Router hook to navigate to job details

  // Function to fetch jobs from the API
  const fetchJobs = async () => {
    if (!hasMore) return;  // Prevent fetching if there are no more jobs

    try {
      setLoading(true);
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);  // Log the API response to check if data is coming correctly

      // If no jobs are returned, set hasMore to false
      if (!data.results || data.results.length === 0) {
        setHasMore(false);
      } else {
        // Append the new jobs to the existing list
        setJobs(prevJobs => [...prevJobs, ...data.results]);
        setPage(prevPage => prevPage + 1);  // Increment the page number for the next request
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);  // Log any error
      setError('Failed to load jobs');  // Set error message
    } finally {
      setLoading(false);  // Set loading to false after the API request completes
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  // Render each job item in the list
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
      {error && <Text style={styles.error}>{error}</Text>}  // Show error message if there's an error

      <FlatList
        data={jobs}  // Data for the FlatList (list of jobs)
        renderItem={renderItem}  // Render job item
        keyExtractor={item => item.id.toString()}  // Key extractor for each item
        onEndReached={fetchJobs}  // Fetch more jobs when the end of the list is reached
        onEndReachedThreshold={0.5}  // Trigger fetch when half of the list is visible
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}  // Show loading indicator at the bottom
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
