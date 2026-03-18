import ThemeToggleButton from "@/src/components/ui/ThemeToggleButton";
import { supabase } from "@/src/lib/supabaseClient";
import { router } from "expo-router";
import { Bell, Headphones, Pencil, Power, Sliders } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProfileHeader from "@/src/components/ui/ProfileHeader";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, email, name")
          .eq("id", user.id)
          .single();

        if (error || !data) {
          await supabase.from("profiles").insert({
            id: user.id,
            email: user.email,
            username: "",
            name: user.user_metadata?.name || "",
          });
          setProfile({
            username: "",
            email: user.email,
            name: user.user_metadata?.name || "",
          });
        } else {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace("/(auth)/login");
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  };

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ProfileHeader
        profile={profile}
        onSettings={() => router.push("/settings")}
      />

      <View className="px-6 -mt-6">
        <View className="bg-white rounded-xl shadow-md p-4">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-orange-500 py-3 rounded-lg mb-4"
            onPress={() => router.push("/edit-profile")}
          >
            <Pencil color="#fff" />
            <Text className="ml-2 text-white font-semibold">Editar Perfil</Text>
          </TouchableOpacity>

          <ThemeToggleButton />

          <TouchableOpacity
            className="flex-row items-center bg-gray-100 p-4 rounded-lg mb-3 mt-4"
            onPress={() => router.push("/notifications")}
          >
            <Bell color="#f97316" />
            <Text className="ml-2">Notificações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-gray-100 p-4 rounded-lg mb-3"
            onPress={() => router.push("/preferences")}
          >
            <Sliders color="#f97316" />
            <Text className="ml-2">Preferências</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-gray-100 p-4 rounded-lg mb-3"
            onPress={() => router.push("/support")}
          >
            <Headphones color="#f97316" />
            <Text className="ml-2">Suporte</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center mt-8 bg-orange-500 py-3 rounded-lg"
          onPress={handleLogout}
        >
          <Power color="#fff" />
          <Text className="ml-2 text-white font-semibold">Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
