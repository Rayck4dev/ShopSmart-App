import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ title, onPress, className, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full bg-light-action dark:bg-dark-action 
        px-4 py-3 rounded-lg items-center ${className} ${disabled ? "opacity-50" : ""}`}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
