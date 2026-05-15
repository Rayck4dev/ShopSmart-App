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
      disabled={disabled}
      className={`w-full bg-[#FB923C] 
        px-4 py-3 rounded-lg items-center ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
