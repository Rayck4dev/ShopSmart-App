import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  nome: string;
  itens: number;
  total: number;
  onPress?: () => void;
  index?: number;
};

export default function ListCard({
  nome,
  itens,
  total,
  onPress,
  index = 0,
}: Props) {
  const progress = total > 0 ? itens / total : 0;
  const isCompleted = total > 0 && itens === total;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: translateY }],
      }}
    >
      <Pressable
        onPress={onPress}
        className={`
          bg-white rounded-[24px] mb-4 border-[1.8px] overflow-hidden shadow-sm
          ${isCompleted ? "border-[#E8F5E9] bg-[#F9FFFA]" : "border-transparent"}
        `}
        style={({ pressed }) => [
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
          { elevation: 3 },
        ]}
      >
        <View className="p-5">
          <View className="flex-row items-center mb-[18px]">
            <View
              className={`w-11 h-11 rounded-[14px] items-center justify-center mr-[14px]
                ${isCompleted ? "bg-green-500" : "bg-orange-500"}
              `}
            >
              <Ionicons
                name={isCompleted ? "checkmark-circle" : "cart-outline"}
                size={20}
                color="white"
              />
            </View>

            <View className="flex-1">
              <Text
                className="text-[17px] font-black text-[#1A1A1A]"
                numberOfLines={1}
              >
                {nome}
              </Text>
              <Text className="text-xs text-[#A0A0A0] mt-0.5">
                Toque para ver detalhes
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#D1D1D1" />
          </View>

          <View className="mt-1">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[13px] text-[#707070]">
                <Text className="font-bold text-[#1A1A1A]">{itens}</Text> de{" "}
                {total} itens
              </Text>
              <Text
                className={`text-sm font-black ${isCompleted ? "text-green-500" : "text-orange-500"}`}
              >
                {Math.round(progress * 100)}%
              </Text>
            </View>

            <View className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
              <View
                className={`h-full rounded-full ${isCompleted ? "bg-green-500" : "bg-orange-500"}`}
                style={{ width: `${progress * 100}%` }}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
