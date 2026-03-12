import { useEffect, useState } from "react";
import { useRouter, useSegments, Slot } from "expo-router";
import { supabase } from "@/src/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import "@/src/styles/global.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/login");
    } else if (session && inAuthGroup) {
      router.replace("/home");
    }
  }, [session, segments, isLoading]);

  if (isLoading) return null;

  return <Slot />;
}