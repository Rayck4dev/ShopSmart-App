import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Settings, Camera, Trash2 } from "lucide-react-native";

interface ProfileHeaderProps {
  profile: {
    username: string;
    email: string;
    name: string;
    avatar_url?: string | null;
  };
  avatarUrl: string | null;
  uploading: boolean;
  onSettings: () => void;
  onUploadPhoto: () => void;
  onRemovePhoto?: () => void; 
}

export default function ProfileHeader({
  profile,
  avatarUrl,
  uploading,
  onSettings,
  onUploadPhoto,
  onRemovePhoto,
}: ProfileHeaderProps) {
  const nameForAvatar = profile?.name || profile?.username || "U";
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    nameForAvatar,
  )}&background=f97316&color=fff&bold=true&size=512`;

  return (
    <View className="bg-[#F7BE2C] pt-16 pb-10 rounded-b-3xl shadow-md shadow-black/10">
      <TouchableOpacity
        onPress={onSettings}
        className="absolute right-6 top-12 z-10 p-2"
        activeOpacity={0.7}
      >
        <Settings color="#fff" size={24} />
      </TouchableOpacity>

      <View className="items-center">
        <View className="relative">
          <View className="w-28 h-28 rounded-full border-4 border-white bg-white overflow-hidden items-center justify-center shadow-lg">
            <Image
              source={{ uri: avatarUrl || fallbackUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity
            onPress={onUploadPhoto}
            disabled={uploading}
            className="absolute bottom-0 right-0 bg-white p-2.5 rounded-full shadow-md"
            style={{ elevation: 5 }}
            activeOpacity={0.8}
          >
            {uploading ? (
              <ActivityIndicator size="small" color="#f97316" />
            ) : (
              <Camera color="#f97316" size={20} />
            )}
          </TouchableOpacity>

          {avatarUrl && !uploading && onRemovePhoto && (
            <TouchableOpacity
              onPress={onRemovePhoto}
              className="absolute -top-1 -right-1 bg-red-500 p-1.5 rounded-full border-2 border-white shadow-sm"
              activeOpacity={0.8}
            >
              <Trash2 color="#fff" size={14} />
            </TouchableOpacity>
          )}
        </View>

        <Text className="text-xl font-bold text-white mt-4">
          {profile.name || profile.username || "Usuário"}
        </Text>
        <Text className="text-white/80 font-medium">{profile.email}</Text>
      </View>
    </View>
  );
}
