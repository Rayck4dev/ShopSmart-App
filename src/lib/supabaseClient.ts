import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL: string | undefined = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY: string | undefined =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Variáveis de ambiente do Supabase não configuradas corretamente",
  );
}

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);
