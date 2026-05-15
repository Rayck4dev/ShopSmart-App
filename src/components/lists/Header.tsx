import { View, Text } from "react-native";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View
      className="bg-orange-500 pt-16 pb-8 rounded-b-[32px] shadow-lg shadow-black/10"
      style={{ elevation: 6 }}
    >
      <View className="px-5">
        <Text className="text-white text-3xl font-bold mt-1 mb-1 tracking-tight">
          {title}
        </Text>
        <Text className="text-white/80 text-sm tracking-widest uppercase">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
