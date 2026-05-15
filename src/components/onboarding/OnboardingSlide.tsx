import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

type OnboardingSlideProps = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

export default function OnboardingSlide({
  title,
  subtitle,
  image,
}: OnboardingSlideProps) {
  return (
    <View className="w-full items-center justify-center px-4">
      <Text className="text-[28px] font-black text-black text-center mb-2.5 leading-9">
        {title}
      </Text>

      <Text className="text-base text-gray-800 text-center mb-5 px-2.5 leading-6">
        {subtitle}
      </Text>

      <View className="w-full items-center justify-center">
        <Image 
          source={image} 
          style={{ width: '80%', height: 400 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}