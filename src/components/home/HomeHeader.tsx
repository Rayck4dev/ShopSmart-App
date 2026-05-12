import React from "react";
import { View, Text, Image } from "react-native";

type HomeHeaderProps = {
  title: string;
  subtitle: string;
  avatarUrl: string;
};

export default function HomeHeader({
  title,
  subtitle,
  avatarUrl,
}: HomeHeaderProps) {
  return (
    <View className="bg-[#F7BE2C] px-5 pt-4 pb-10 rounded-b-[30px] shadow-md">
      <View className="flex-row items-center space-x-4">
        <View className="border-2 border-white rounded-full p-0.5  mb-2">
          <Image
            source={{ uri: avatarUrl }}
            className="w-20 h-20 rounded-full bg-white"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-black ml-1" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-md text-black/70 font-medium leading-5 ml-1">
            {subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
}
