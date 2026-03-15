import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "expo-router";
import {
  Bell,
  Headphones,
  Pencil,
  Power,
  Sliders,
  User as UserIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, email")
          .eq("id", user.id)
          .single();

        if (error || !data) {
          await supabase.from("profiles").insert({
            id: user.id,
            email: user.email,
            username: "",
          });
          setProfile({ username: "", email: user.email });
        } else {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (profile && !profile.username) {
    router.replace("/chooseusername");
    return null;
  }

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-6 pt-12 bg-white">
      <View className="items-center mb-6">
        <UserIcon size={80} color="#f97316" />
        <Text className="text-xl font-bold mt-4">{profile.username}</Text>
        <Text className="text-gray-500">{profile.email}</Text>
      </View>

      <TouchableOpacity className="flex-row items-center mt-6">
        <Pencil color="#f97316" />
        <Text className="ml-2">Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center mt-4">
        <Bell color="#f97316" />
        <Text className="ml-2">Notificações</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center mt-4">
        <Sliders color="#f97316" />
        <Text className="ml-2">Preferências</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center mt-4">
        <Headphones color="#f97316" />
        <Text className="ml-2">Suporte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center mt-8 bg-orange-500 py-3 rounded-lg justify-center"
        onPress={handleLogout}
      >
        <Power color="#fff" />
        <Text className="ml-2 text-white font-semibold">Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}
