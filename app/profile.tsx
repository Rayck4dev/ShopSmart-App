import { View, Text, TouchableOpacity } from "react-native";
import { User } from "lucide-react-native"; // ícone de avatar clássico
import { supabase } from "@/src/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("username, email")
          .eq("id", user.id)
          .single();

        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/(auth)/login");
  };

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background px-6 pt-12">
      {/* Avatar clássico */}
      <View className="items-center mb-6">
        <User size={80} color="#f97316" />
        <Text className="text-xl font-bold mt-4">{profile.username}</Text>
        <Text className="text-gray-500">{profile.email}</Text>
      </View>

      {/* Menu de opções */}
      <TouchableOpacity className="py-4 border-b border-gray-200">
        <Text className="text-lg">Notificações</Text>
      </TouchableOpacity>
      <TouchableOpacity className="py-4 border-b border-gray-200">
        <Text className="text-lg">Preferências</Text>
      </TouchableOpacity>
      <TouchableOpacity className="py-4 border-b border-gray-200">
        <Text className="text-lg">Suporte</Text>
      </TouchableOpacity>

      {/* Botão logout */}
      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-lg mt-10 items-center"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold">Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}
