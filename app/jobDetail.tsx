import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function jobDetailScreen() {
  const { id } = useLocalSearchParams(); // Get job ID from URL params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job ID: {id}</Text>
      {/* Fetch job details using the ID */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
});
