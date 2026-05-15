import { useEffect, useState } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { Stack } from "expo-router";
import { supabase } from "@/src/lib/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session } from "@supabase/supabase-js";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";

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

import { useProtectedRoute } from "@/src/hooks/useProtectedRoute";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [introSeen, setIntroSeen] = useState<boolean | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

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
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#F6F1EE");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();
        setSession(currentSession);
        const value = await AsyncStorage.getItem("introSeen");
        setIntroSeen(value === "true");
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingAuth(false);
      }
    };
    loadAppData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, []);

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
