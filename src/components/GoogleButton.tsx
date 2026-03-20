import { Text, TouchableOpacity } from "react-native";

interface GoogleButtonProps {
  onPress?: () => void;
}

export default function GoogleButton({ onPress }: GoogleButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full bg-light-nav dark:bg-dark-nav px-4 py-3 rounded-lg items-center"
    >
      <Text className="text-white font-semibold">Continuar com Google</Text>
    </TouchableOpacity>
  );
}
