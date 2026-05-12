import { useEffect, useState } from "react";
import { Slot, useSegments, Redirect } from "expo-router";
import { supabase } from "@/src/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";

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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [introSeen, setIntroSeen] = useState<boolean | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const segments = useSegments();

  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useEffect(() => {
    async function configureNavigation() {
      if (Platform.OS === "android") {
        await NavigationBar.setBackgroundColorAsync("#F6F1EE");
        await NavigationBar.setButtonStyleAsync("dark");
        await NavigationBar.setBehaviorAsync("inset-touch");
      }
    }
    configureNavigation();
  }, []);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);

        const value = await AsyncStorage.getItem("introSeen");
        setIntroSeen(value === "true");
      } catch (e) {
        console.warn("Erro ao carregar dados iniciais:", e);
      } finally {
        setLoadingAuth(false);
      }
    };

    loadAppData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && !loadingAuth) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, loadingAuth]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (loadingAuth) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F6F1EE]">
        <ActivityIndicator size="large" color="#FB923C" />
      </View>
    );
  }

  const inAuthGroup = segments?.[0] === "(auth)";
  const inIntroGroup = segments?.[0] === "(intro)";

  if (!introSeen) {
    if (!inIntroGroup) {
      return <Redirect href="/(intro)/onboarding" />;
    }
    return <Slot />;
  }

  if (!session) {
    if (!inAuthGroup) {
      return <Redirect href="/(auth)/login" />;
    }
  } else {
    if (inAuthGroup || inIntroGroup) {
      return <Redirect href="/home" />;
    }
  }

  return <Slot />;
}
