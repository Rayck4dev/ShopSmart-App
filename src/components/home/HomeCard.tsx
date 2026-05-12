import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type HomeCardProps = {
  title: string;
  iconType: "material" | "ion";
  iconName: string;
  onPress: () => void;
};

export default function HomeCard({
  title,
  iconType,
  iconName,
  onPress,
}: HomeCardProps) {
  return (
    <TouchableOpacity
      className="flex-1 bg-white rounded-3xl py-6 px-4 items-center shadow-sm border border-gray-100"
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View className="w-20 h-20 rounded-full bg-orange-50 items-center justify-center mb-4">
        {iconType === "material" ? (
          <MaterialIcons name={iconName as any} size={38} color="#f97316" />
        ) : (
          <Ionicons name={iconName as any} size={38} color="#f97316" />
        )}
      </View>
      <Text className="text-lg font-bold text-gray-800 text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
