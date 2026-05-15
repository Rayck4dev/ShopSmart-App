import Button from "@/src/components/auth/Button";
import Input from "@/src/components/auth/Input";
import Logo from "@/src/components/auth/Logo";
import { supabase } from "@/src/lib/supabaseClient";
import { Link, useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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

    if (data.user) {
      router.replace("/(tabs)/home");
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#F6F1EE] px-6">
      <Logo />

      <Text className="text-text text-lg mb-6">Bem-vindo!</Text>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        className="mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View className="w-full mb-6 relative">
        <Input
          placeholder="Senha"
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

      {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>}

      <Button
        title={loading ? "Carregando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
        className="mb-4"
      />

      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text className="text-nav mt-6">
            Ainda não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
