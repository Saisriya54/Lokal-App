import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="jobs" 
        options={{ 
          title: "Jobs",
          tabBarIcon: ({ color }) => <Ionicons name="briefcase-outline" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="bookmarks" 
        options={{ 
          title: "Bookmarks",
          tabBarIcon: ({ color }) => <Ionicons name="bookmark-outline" size={24} color={color} />
        }} 
      />
    </Tabs>
  );
}
