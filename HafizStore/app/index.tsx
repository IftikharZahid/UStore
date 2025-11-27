import { useEffect } from "react";
import { useRouter, Stack } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login screen on app start
    router.replace('/login');
  }, []);

  return <Stack.Screen options={{ headerShown: false }} />;
}
