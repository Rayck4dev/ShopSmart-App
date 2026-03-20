import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";

import Input from "@/src/components/auth/Input";
import Button from "@/src/components/auth/Button";
import Logo from "@/src/components/auth/Logo";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async () => {
    if (password.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Erro ao atualizar", error.message);
    } else {
      Alert.alert("Sucesso!", "Sua senha foi alterada. Faça login novamente.", [
        {
          text: "Ir para Login",
          onPress: () => router.replace("/(auth)/login"),
        },
      ]);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-background px-6">
      <Logo />

      <Text className="text-light-text text-2xl font-bold mt-4">
        Nova Senha
      </Text>
      <Text className="text-gray-500 text-center mb-8">
        Crie uma senha forte para proteger sua conta.
      </Text>

      <View className="w-full relative mb-6">
        <Input
          placeholder="Nova Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: 10, top: 12 }}
        >
          {showPassword ? (
            <Eye size={22} color="#666" />
          ) : (
            <EyeOff size={22} color="#666" />
          )}
        </TouchableOpacity>
      </View>

      <Button
        title={loading ? "Atualizando..." : "Redefinir Senha"}
        onPress={handleUpdatePassword}
      />
    </View>
  );
}
