import { View, ActivityIndicator, Platform } from "react-native";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import "@/src/styles/global.css";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";

import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { useProtectedRoute } from "@/src/hooks/useProtectedRoute";

SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const { session, introSeen, loadingAuth } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useProtectedRoute(session, introSeen, loadingAuth, fontsLoaded);

  useEffect(() => {
    if ((fontsLoaded || fontError) && !loadingAuth) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, loadingAuth]);

  if (loadingAuth || !fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F6F1EE]">
        <ActivityIndicator size="large" color="#FB923C" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(intro)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#F6F1EE");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}
