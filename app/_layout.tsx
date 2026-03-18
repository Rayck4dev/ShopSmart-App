import { useEffect, useState } from "react";
import { Slot, useSegments, Redirect } from "expo-router";
import { supabase } from "@/src/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, Text } from "react-native";
import "@/src/styles/global.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [introSeen, setIntroSeen] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      const value = await AsyncStorage.getItem("introSeen");
      setIntroSeen(value === "true");

      setLoading(false);
    };

    loadData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#f9bf10" />
        <Text>Carregando...</Text>
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
      return <Redirect href="/(tabs)/home" />;
    }
  }

  return <Slot />;
}
