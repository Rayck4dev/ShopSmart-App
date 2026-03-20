import React, { useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";

import Button from "@/src/components/auth/Button";
import GoogleButton from "@/src/components/auth/GoogleButton";
import Input from "@/src/components/auth/Input";
import Logo from "@/src/components/auth/Logo";
import { signInWithGoogle } from "@/src/lib/googleAuth";
import { supabase } from "@/src/lib/supabaseClient";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (!profile?.username) {
        router.replace("/chooseusername");
      } else {
        router.replace("/(tabs)/home");
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const session = await signInWithGoogle();

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .single();

        if (!profile?.username) {
          router.replace("/chooseusername");
        } else {
          router.replace("/(tabs)/home");
        }
      }
    } catch (err: any) {
      if (err.message !== "Login cancelado.") {
        setError(err.message ?? "Erro ao fazer login com Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-background px-6">
      <Logo />

      <Text className="text-light-text text-lg mb-6">Bem-vindo!</Text>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="mb-4"
      />

      <View className="w-full relative">
        <Input
          placeholder="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: 15, top: 10 }}
        >
          {showPassword ? (
            <Eye size={22} color="#666" />
          ) : (
            <EyeOff size={22} color="#666" />
          )}
        </TouchableOpacity>
      </View>

      <View className="w-full items-end mt-2 mb-6">
        <Link href="/(auth)/forgot-password" asChild>
          <TouchableOpacity>
            <Text className="text-light-nav text-sm font-medium">
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {error && (
        <View className="bg-red-100 p-3 rounded-lg mb-4 w-full">
          <Text className="text-red-600 text-center text-sm">{error}</Text>
        </View>
      )}

      <Button
        title={loading ? "Carregando..." : "Entrar"}
        onPress={handleLogin}
        className="mb-4"
        disabled={loading}
      />

      <View className="flex-row items-center my-4 w-full">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-4 text-gray-400">ou</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <GoogleButton onPress={handleGoogleLogin} />

      <Link href="/(auth)/register" asChild>
        <TouchableOpacity className="mt-8">
          <Text className="text-gray-500">
            Ainda não tem conta?{" "}
            <Text className="text-light-nav font-bold">Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
