import { Redirect } from 'expo-router';

import { useSessionStore } from '~/shared/store/useSessionStore';

export default function Index() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const character = useSessionStore((state) => state.character);

  if (!isAuthenticated) return <Redirect href="/login" />;
  if (!character) return <Redirect href="/character-select" />;
  return <Redirect href="/(tabs)" />;
}
