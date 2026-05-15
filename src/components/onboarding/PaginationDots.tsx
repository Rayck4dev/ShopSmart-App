import React from "react";
import { View } from "react-native";

type PaginationDotsProps = {
  total: number;
  activeIndex: number;
};

export default function PaginationDots({
  total,
  activeIndex,
}: PaginationDotsProps) {
  return (
    <View className="flex-row mt-5">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`h-2.5 rounded-full mx-1.5 transition-all duration-300
            ${activeIndex === index ? "w-6 bg-orange-500" : "w-2.5 bg-gray-300"}
          `}
        />
      ))}
    </View>
  );
}
