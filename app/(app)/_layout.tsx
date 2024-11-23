import { Text } from "react-native";
import { Redirect, Slot } from "expo-router";
import { useSession } from "@/context";

export default function AppLayout() {
    const { user, isLoading } = useSession();
  
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
  
    if (!user) {
      return <Redirect href="/signIn" />;
    }
  
    return <Slot />;
  }