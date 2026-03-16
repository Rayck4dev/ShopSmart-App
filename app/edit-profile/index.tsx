import { supabase } from "@/src/lib/supabaseClient";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import InputField from "@/src/components/InputField";
import PasswordField from "@/src/components/PasswordField";
import SaveButton from "@/src/components/SaveButton";

export default function EditProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("id, username, name, email")
          .eq("id", user.id)
          .single();
        if (data) {
          setProfile(data);
          setUsername(data.username || "");
          setName(data.name || "");
          setEmail(data.email || "");
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;

    if (!name.trim() || !username.trim() || !email.trim()) {
      Alert.alert(
        "Erro",
        "Todos os campos obrigatórios devem ser preenchidos.",
      );
      return;
    }

    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .neq("id", profile.id)
      .single();

    if (existingUser) {
      Alert.alert("Erro", "Este username já está em uso.");
      return;
    }

    if (password || confirmPassword) {
      if (password.length < 6) {
        Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem.");
        return;
      }
    }

    const { error } = await supabase
      .from("profiles")
      .update({ username, name, email, updated_at: new Date() })
      .eq("id", profile.id);

    if (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
      return;
    }

    if (password) {
      const { error: passError } = await supabase.auth.updateUser({ password });
      if (passError) {
        Alert.alert("Erro", "Não foi possível atualizar a senha.");
        return;
      }
    }

    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    router.push("/(tabs)/profile");
  };

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Editar Perfil",
          headerStyle: { backgroundColor: "#f97316" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View className="flex-1 bg-white px-6 pt-6">
        <InputField label="Nome" value={name} onChangeText={setName} />
        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
        />
        <InputField label="Email" value={email} editable={false} />

        <PasswordField
          label="Nova Senha"
          value={password}
          onChangeText={setPassword}
        />
        <PasswordField
          label="Confirmar Nova Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <SaveButton onPress={handleSave} />
      </View>
    </>
  );
}
