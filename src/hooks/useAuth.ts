import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface AuthResult {
  user?: User;
  error?: string;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    name: string,
    email: string,
    password: string,
    username: string,
  ): Promise<AuthResult> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, username } },
    });
    setLoading(false);
    if (error) return { error: error.message };
    return { user: data.user ?? undefined };
  };

  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) return { error: error.message };
    return { user: data.user ?? undefined };
  };

  const signInWithGoogle = async (): Promise<AuthResult> => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://lxurqoggpazpjmoilbrg.supabase.co/auth/v1/callback",
      },
    });
    setLoading(false);
    if (error) return { error: error.message };
    return { user };
  };

  return { signUp, signIn, signInWithGoogle, loading, user };
}
