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
        tabBarInactiveTintColor: '#B4A994',
        tabBarStyle: { height: 98, paddingTop: 10, paddingBottom: 18 },
        tabBarLabelStyle: { fontSize: 13, fontWeight: '700' },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name as keyof typeof ICONS]} size={size} color={color} />
        ),
      })}>
      <Tabs.Screen name="index" options={{ title: '홈' }} />
      <Tabs.Screen name="talk" options={{ title: '대화' }} />
      <Tabs.Screen name="practice" options={{ title: '연습' }} />
      <Tabs.Screen name="profile" options={{ title: '내정보' }} />
    </Tabs>
  );
}
