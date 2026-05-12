import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabaseClient";

 import PasswordField from "@/src/components/aut/PasswordField";
import SaveButton from "@/src/components/ui/SaveButton";
import InputField from "@/src/components/ui/InputField";

export default function EditProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handleSave = async () => {
    if (!profile) return;

    if (!name.trim() || !username.trim()) {
      Alert.alert("Campos Vazios", "Por favor, preencha o nome e o username.");
      return;
    }

    setIsSaving(true);

    try {
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .neq("id", profile.id)
        .maybeSingle();

      if (existingUser) {
        Alert.alert("Erro", "Este username já está em uso.");
        setIsSaving(false);
        return;
      }

      if (password || confirmPassword) {
        if (password.length < 6) {
          Alert.alert(
            "Senha Curta",
            "A nova senha deve ter pelo menos 6 caracteres.",
          );
          setIsSaving(false);
          return;
        }
        if (password !== confirmPassword) {
          Alert.alert("Erro", "As senhas não coincidem.");
          setIsSaving(false);
          return;
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({ username, name, updated_at: new Date() })
        .eq("id", profile.id);

      if (error) throw error;

      if (password) {
        const { error: passError } = await supabase.auth.updateUser({
          password,
        });
        if (passError) throw passError;
      }

      Alert.alert("Sucesso ✨", "Suas alterações foram salvas!");
      router.back(); 
    } catch (error: any) {
      Alert.alert("Erro ao salvar", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#FB923C" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#F6F1EE]"
    >
      <Stack.Screen
        options={{
          title: "Editar Perfil",
          headerStyle: { backgroundColor: "#F7BE2C" },
          headerTintColor: "#000",
          headerTitleStyle: { fontFamily: "Montserrat_700Bold" },
          headerShadowVisible: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6">
        <View className="py-8">
          <Text className="font-black text-2xl text-gray-800">Seus Dados</Text>
          <Text className="font-sans text-gray-500 mt-1">
            Mantenha suas informações atualizadas.
          </Text>
        </View>

        <View className="bg-white p-5 rounded-3xl shadow-sm mb-6">
          <Text className="font-bold text-orange-500 mb-4 uppercase tracking-widest text-[10px]">
            Informações Pessoais
          </Text>

          <InputField
            label="Nome Completo"
            value={name}
            onChangeText={setName}
          />
          <InputField
            label="Username"
            value={username}
            onChangeText={setUsername}
          />

          <View className="opacity-60">
            <InputField
              label="E-mail (Não alterável)"
              value={email}
              editable={false}
            />
          </View>
        </View>

        <View className="bg-white p-5 rounded-3xl shadow-sm mb-8">
          <Text className="font-bold text-orange-500 mb-4 uppercase tracking-widest text-[10px]">
            Segurança
          </Text>
          <Text className="font-sans text-gray-400 text-xs mb-4 italic">
            Preencha apenas se desejar alterar sua senha atual.
          </Text>

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
        </View>

        <View className="mb-12">
          <SaveButton onPress={handleSave} loading={isSaving} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
