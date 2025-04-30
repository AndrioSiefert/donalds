import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    document.title = 'iFood';
  }, []);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
