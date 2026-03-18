import { View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        Configurações
      </Text>
      <Text className="text-gray-500 text-center">
        Esta página ainda está em desenvolvimento.
      </Text>
    </View>
  );
}
