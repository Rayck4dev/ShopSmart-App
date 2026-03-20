import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  className?: string;
}

export default function Button({ title, onPress, className }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full bg-light-action dark:bg-dark-action 
        px-4 py-3 rounded-lg items-center ${className}`}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
