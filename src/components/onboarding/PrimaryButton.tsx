import React from "react";
import { Pressable, Text } from "react-native";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  className?: string; 
};

export default function PrimaryButton({
  title,
  onPress,
  className,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-orange-500 py-3 w-40 rounded-[14px] items-center justify-center active:bg-orange-600 active:scale-[0.98] transition-transform ${className}`}
    >
      <Text className="text-white text-lg font-semibold tracking-wide">
        {title}
      </Text>
    </Pressable>
  );
}
