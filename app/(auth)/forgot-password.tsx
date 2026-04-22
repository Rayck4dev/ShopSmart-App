import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import Input from "@/src/components/auth/Input";
import Button from "@/src/components/auth/Button";
import Logo from "@/src/components/auth/Logo";

interface UserProfile {
  username: string;
  email: string;
  name: string;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendLink = async () => {
    if (!email) {
      Alert.alert("Atenção", "Por favor, digite seu e-mail.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "shopsmart://new-password",
    });

    setLoading(false);

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert(
        "Sucesso",
        "Enviamos um link de recuperação para o seu e-mail!",
        [{ text: "OK", onPress: () => router.back() }],
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-background px-6">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-14 left-6 flex-row items-center"
      >
        <ArrowLeft size={24} color="#f9bf10" />
        <Text className="ml-2 text-light-nav font-medium">Voltar</Text>
      </TouchableOpacity>

      <Logo />

      <Text className="text-light-text text-2xl font-bold mt-4">
        Recuperar Senha
      </Text>
      <Text className="text-gray-500 text-center mb-8 px-4">
        Digite seu e-mail para receber o link de redefinição.
      </Text>

      <Input
        placeholder="E-mail cadastrado"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="mb-6"
      />

      <Button
        title={loading ? "Enviando..." : "Enviar link"}
        onPress={handleSendLink}
      />
    </View>
  );
}
