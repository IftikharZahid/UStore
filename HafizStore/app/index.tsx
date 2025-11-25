import { View } from "react-native";
import { Stack } from "expo-router";
import Onboarding from "../components/Onboarding";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Onboarding />
    </View>
  );
}
