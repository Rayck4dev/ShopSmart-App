import { View, Text, Image, TouchableOpacity } from "react-native";
import { Settings } from "lucide-react-native";
import { UserProfile } from "@/src/types/auth";

interface ProfileHeaderProps {
  profile: UserProfile;
  onSettings: () => void;
}

export default function ProfileHeader({ profile, onSettings }: ProfileHeaderProps) {
  return (
    <View className="bg-orange-500 pt-16 pb-10 rounded-b-3xl shadow-md shadow-black/10">
      <TouchableOpacity
        onPress={onSettings}
        className="absolute right-6 top-12"
      >
        <Settings color="#fff" size={24} />
      </TouchableOpacity>

      <View className="items-center">
        <Image
          source={{
            uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${profile.username || profile.email}`,
          }}
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <Text className="text-xl font-bold text-white mt-4">
          {profile.name || profile.username}
        </Text>
        <Text className="text-white/80">{profile.email}</Text>
      </View>
    </View>
  );
}
