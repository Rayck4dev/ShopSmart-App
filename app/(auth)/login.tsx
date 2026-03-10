import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Button from "@/src/components/Button";
import GoogleButton from "@/src/components/GoogleButton";
import Input from "@/src/components/Input";
import { useAuth } from "@/src/hooks/useAuth";
import Logo from "@/src/components/Logo";
import { supabase } from "@/src/lib/supabaseClient";
import { validateEmail, validatePassword } from "@/src/utils/validators";
import { Eye, EyeOff } from "lucide-react-native";

export default function Login() {
  const { signIn, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Digite um e-mail válido.");
      return;
    }

    if (!validatePassword(password)) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const res = await signIn(email, password);
    if (res.error) {
      if (res.error.includes("Invalid login credentials")) {
        setError("E-mail ou senha inválidos.");
      } else {
        setError(res.error);
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();

        if (!profile?.username) {
          router.push("../chooseusername");
        } else {
          router.push("../profile");
        }
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background px-6">
      <Logo />

      <Text className="text-light-text dark:text-dark-text text-lg mb-6">
        Bem-vindo!
      </Text>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        className="mb-4"
      />

      <View className="w-full mb-6 relative">
        <Input
          placeholder="Senha"
          secureTextEntry={showPassword ? false : true}
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
      <GoogleButton onPress={handleLogin} />

      <Link href="../register" asChild>
        <TouchableOpacity>
          <Text className="text-light-nav dark:text-dark-nav mt-6">
            Ainda não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
