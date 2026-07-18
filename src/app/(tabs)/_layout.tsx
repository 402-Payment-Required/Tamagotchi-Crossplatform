import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const ICONS = {
  index: 'home',
  talk: 'chatbubbles',
  practice: 'checkbox',
  profile: 'person',
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3DBE5C',
        tabBarInactiveTintColor: '#7C7263',
        tabBarStyle: {
          height: 92,
          paddingTop: 9,
          paddingBottom: 14,
          borderTopColor: '#E7DDCC',
          backgroundColor: '#FFFDF8',
        },
        tabBarLabelStyle: { fontSize: 15, fontWeight: '700' },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name as keyof typeof ICONS]} size={size} color={color} />
        ),
      })}>
      <Tabs.Screen name="index" options={{ title: '처음' }} />
      <Tabs.Screen name="talk" options={{ title: '이야기' }} />
      <Tabs.Screen name="practice" options={{ title: '연습' }} />
      <Tabs.Screen name="profile" options={{ title: '내 정보' }} />
    </Tabs>
  );
}
