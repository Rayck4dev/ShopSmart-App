import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Button from "@/src/components/Button";
import GoogleButton from "@/src/components/GoogleButton";
import Input from "@/src/components/Input";
import Logo from "@/src/components/Logo";
import { supabase } from "@/src/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react-native";

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
        router.replace("/profile");
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError(null);

    const { data, error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (googleError) {
      setError(googleError.message);
      return;
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
        className="mb-4"
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

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      <Button
        title={loading ? "Carregando..." : "Entrar"}
        onPress={handleLogin}
        className="mb-4"
      />

      <GoogleButton onPress={handleGoogleLogin} />

      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text className="text-light-nav mt-6">
            Ainda não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
