import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import '~/shared/global.css';
import { useSessionStore } from '~/shared/store/useSessionStore';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

export default function RootLayout() {
  const hasHydrated = useSessionStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated) SplashScreen.hideAsync();
  }, [hasHydrated]);

  if (!hasHydrated) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#FDF8F0' },
        }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="character-select" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="mission/[missionId]" />
        <Stack.Screen name="practice-complete" />
        <Stack.Screen name="family-report" options={{ headerShown: true, title: '가족 리포트' }} />
      </Stack>
    </QueryClientProvider>
  );
}
