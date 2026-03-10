import { useState } from "react";
import { Text, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "expo-router";

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
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Erro ao obter usuário.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user.id);

    setLoading(false);

    if (updateError) {
      setError("Erro ao salvar username: " + updateError.message);
      return;
    }

    router.push("/profile");
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background px-6">
      <Text className="text-light-text dark:text-dark-text text-lg mb-6">
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
