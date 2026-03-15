import { TouchableOpacity, Text, View } from "react-native";
import {
  LucideIcon,
  Pencil,
  Bell,
  Sliders,
  Headphones,
  Power,
  Trash,
  Check,
} from "lucide-react-native";

interface IconButtonProps {
  icon:
    | "pencil"
    | "bell"
    | "sliders"
    | "headphones"
    | "power"
    | "trash"
    | "check";
  label: string;
  onPress?: () => void;
  color?: "default" | "action" | "success";
}

export default function IconButton({
  icon,
  label,
  onPress,
  color = "default",
}: IconButtonProps) {
  const icons: Record<string, LucideIcon> = {
    pencil: Pencil,
    bell: Bell,
    sliders: Sliders,
    headphones: Headphones,
    power: Power,
    trash: Trash,
    check: Check,
  };

  const Icon = icons[icon];

  const bgClass =
    color === "action"
      ? "bg-light-action dark:bg-dark-action"
      : color === "success"
        ? "bg-light-success dark:bg-dark-success"
        : "bg-light-nav dark:bg-dark-nav";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-center px-4 py-3 rounded-lg mb-4 w-[45%] ${bgClass}`}
    >
      <View className="mr-2">
        <Icon color="white" size={20} />
      </View>
      <Text className="text-white font-semibold">{label}</Text>
    </TouchableOpacity>
  );
}
