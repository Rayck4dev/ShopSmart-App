import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "./supabaseClient";

export async function signInWithGoogle() {
  const redirectUrl = makeRedirectUri();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;
  if (!data.url) throw new Error("Não foi possível obter a URL de login.");

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

  if (result.type !== "success") {
    throw new Error("Login cancelado.");
  }
  const url = new URL(result.url);

  const params = new URLSearchParams(
    url.hash ? url.hash.substring(1) : url.search.substring(1),
  );

  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (!accessToken || !refreshToken) {
    throw new Error("Tokens de autenticação não encontrados na resposta.");
  }
  const { data: sessionData, error: sessionError } =
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

  if (sessionError) throw sessionError;

  return sessionData.session;
}
