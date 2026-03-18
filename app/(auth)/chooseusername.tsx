import Button from "@/src/components/auth/Button";
import Input from "@/src/components/auth/Input";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function ChooseUsername() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setError(null);

    if (!username) {
      setError("Digite um nome de usuário.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .single();

      if (existing) {
        setError("Esse nome de usuário já está em uso.");
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      router.replace("/profile");
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-background px-6">
      <Text className="text-light-text text-xl font-bold mb-6">
        Escolha seu nome de usuário
      </Text>

      <Input
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        className="mb-4"
      />

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      <Button title={loading ? "Salvando..." : "Salvar"} onPress={handleSave} />
    </View>
  );
}
