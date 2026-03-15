import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Button from "@/src/components/Button";
import GoogleButton from "@/src/components/GoogleButton";
import Input from "@/src/components/Input";
import Logo from "@/src/components/Logo";
import { supabase } from "@/src/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return "Senha fraca";
    if (score === 2) return "Senha média";
    return "Senha forte";
  };

  const handleRegister = async () => {
    setError(null);

    if (!email || !password || !username || !name) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (user) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        username,
        name,
      });

      router.replace("/profile");
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-background px-6">
      <Logo />

      <Text className="text-light-text text-lg mb-6">Cadastre-se</Text>

      <Input
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        className="mb-4"
      />
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        className="mb-4"
      />
      <Input
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        className="mb-4"
      />

      {/* Senha */}
      <View className="w-full mb-2 relative">
        <Input
          placeholder="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setConfirmPassword(text); 
          }}
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

      {password.length > 0 && (
        <View className="w-full mb-4">
          <Text className="text-sm mt-1 text-gray-700">
            {getPasswordStrength(password)}
          </Text>
        </View>
      )}

      <View className="w-full mb-6 relative">
        <Input
          placeholder="Confirme a senha"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{ position: "absolute", right: 10, top: 12 }}
        >
          {showConfirmPassword ? (
            <Eye size={22} color="#666" />
          ) : (
            <EyeOff size={22} color="#666" />
          )}
        </TouchableOpacity>
      </View>

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      <Button
        title={loading ? "Carregando..." : "Cadastrar"}
        onPress={handleRegister}
        className="mb-4"
      />

      <GoogleButton onPress={() => router.push("/login")} />

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text className="text-light-nav mt-6">Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}
