import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { Pencil } from "lucide-react-native";
import { supabase } from "@/src/lib/supabaseClient";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import ProfileHeader from "@/src/components/profile/ProfileHeader";
import { GamificationCard } from "@/src/components/profile/GamificationCard";
import { ProfileMenu } from "@/src/components/profile/ProfileMenu";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile(data);
          if (data.avatar_url) {
            downloadImage(data.avatar_url);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const downloadImage = (path: string) => {
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    setAvatarUrl(data.publicUrl);
  };

  const handlePickImage = async () => {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (result.canceled || !result.assets[0].uri) {
        setUploading(false);
        return;
      }

      const image = result.assets[0];
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado!");

      const response = await fetch(image.uri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      const fileExt = image.uri.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const contentType = `image/${fileExt === "png" ? "png" : "jpeg"}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, arrayBuffer, {
          contentType: contentType,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: fileName })
        .eq("id", user.id);

      if (updateError) throw updateError;

      downloadImage(fileName);
      Alert.alert("Sucesso", "Foto atualizada!");
    } catch (error: any) {
      console.error("ERRO COMPLETO:", error);
      Alert.alert("Erro", error.message || "Erro no upload");
    } finally {
      setUploading(false);
    }
  };
  const handleRemoveImage = async () => {
    Alert.alert(
      "Remover foto",
      "Tem certeza que deseja remover sua foto de perfil?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim, remover",
          style: "destructive",
          onPress: async () => {
            try {
              setUploading(true);
              const {
                data: { user },
              } = await supabase.auth.getUser();

              if (user) {
                const { error } = await supabase
                  .from("profiles")
                  .update({ avatar_url: null })
                  .eq("id", user.id);

                if (error) throw error;

                setAvatarUrl(null);
                Alert.alert("Sucesso", "Foto removida com sucesso!");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível remover a imagem.");
            } finally {
              setUploading(false);
            }
          },
        },
      ],
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/(auth)/login");
  };

  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader
        profile={profile}
        avatarUrl={avatarUrl}
        uploading={uploading}
        onSettings={() => router.push("/settings")}
        onUploadPhoto={handlePickImage}
        onRemovePhoto={handleRemoveImage}
      />

      <View className="px-6 -mt-6">
        <GamificationCard xp={profile.xp || 0} level={profile.level || 1} />
        <TouchableOpacity
          className="flex-row items-center justify-center bg-orange-500 py-4 rounded-2xl mb-6 shadow-md shadow-orange-200"
          onPress={() => router.push("/edit-profile")}
          activeOpacity={0.8}
        >
          <Pencil color="#fff" size={20} />
          <Text className="ml-2 text-white font-bold text-lg">
            Editar Perfil
          </Text>
        </TouchableOpacity>
        <ProfileMenu onLogout={handleLogout} />
      </View>
    </ScrollView>
  );
}