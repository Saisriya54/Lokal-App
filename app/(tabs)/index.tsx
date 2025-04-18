import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="jobs" options={{ title: "Jobs" }} />
      <Tabs.Screen name="bookmarks" options={{ title: "Bookmarks" }} />
    </Tabs>
  );
}
