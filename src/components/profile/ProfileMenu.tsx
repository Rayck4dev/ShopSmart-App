import { View, Text, TouchableOpacity } from "react-native";
import { Bell, Headphones, Pencil, Sliders, Power } from "lucide-react-native";
import { useRouter } from "expo-router";

interface ProfileMenuProps {
  onLogout: () => void;
}

export function ProfileMenu({ onLogout }: ProfileMenuProps) {
  const router = useRouter();

  const MenuItem = ({ icon: Icon, label, onPress, last = false }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-4 ${!last ? "border-b border-gray-50" : ""}`}
    >
      <Icon color="#f97316" size={22} />
      <Text className="ml-3 text-gray-700 font-medium flex-1">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        <MenuItem
          icon={Bell}
          label="Notificações"
          onPress={() => router.push("/notifications")}
        />
        <MenuItem
          icon={Sliders}
          label="Preferências"
          onPress={() => router.push("/preferences")}
        />
        <MenuItem
          icon={Headphones}
          label="Suporte"
          onPress={() => router.push("/support")}
          last
        />
      </View>

      <TouchableOpacity
        className="flex-row items-center justify-center mt-8 bg-gray-50 py-4 rounded-2xl border border-gray-100 mb-10"
        onPress={onLogout}
      >
        <Power color="#ef4444" size={20} />
        <Text className="ml-2 text-red-500 font-bold text-base">
          Sair da conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
