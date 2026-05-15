import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import type { Session } from "@supabase/supabase-js";

export function useProtectedRoute(
  session: Session | null,
  introSeen: boolean | null,
  loadingAuth: boolean,
  fontsLoaded: boolean,
) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loadingAuth || !fontsLoaded || introSeen === null) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inIntroGroup = segments[0] === "(intro)";

    if (!introSeen) {
      if (!inIntroGroup) router.replace("/(intro)/onboarding");
    } else if (!session) {
      if (!inAuthGroup) router.replace("/(auth)/login");
    } else {
      if (inAuthGroup || inIntroGroup) {
        router.replace("/(tabs)/home");
      }
    }
  }, [session, introSeen, loadingAuth, fontsLoaded, segments]);
}
