import { useState } from "react";
import { Text, TouchableOpacity, Animated } from "react-native";
import { Moon, Sun } from "lucide-react-native";

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false);
  const [scale] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    setIsDark(!isDark);

    alert("Modo claro/escuro ainda não está disponível!");
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        className="flex-row items-center bg-gray-100 p-4 rounded-lg mb-3"
        onPress={handlePress}
      >
        {isDark ? <Moon color="#f97316" /> : <Sun color="#f97316" />}
        <Text className="ml-2">{isDark ? "Modo Escuro" : "Modo Claro"}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
