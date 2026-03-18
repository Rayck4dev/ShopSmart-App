import { Text, TouchableOpacity } from "react-native";
import { LucideIcon, Trash, Check } from "lucide-react-native";

interface IconButtonProps {
  icon: "trash" | "check";
  label: string;
  color: "action" | "success";
  onPress: () => void;
}

export default function IconButton({
  icon,
  label,
  color,
  onPress,
}: IconButtonProps) {
  const Icon: LucideIcon = icon === "trash" ? Trash : Check;
  const bgColor = color === "action" ? "bg-red-500" : "bg-green-500";

  return (
    <TouchableOpacity
      className={`flex-row items-center px-4 py-3 rounded-lg ${bgColor}`}
      onPress={onPress}
    >
      <Icon color="#fff" />
      <Text className="ml-2 text-white font-semibold">{label}</Text>
    </TouchableOpacity>
  );
}
