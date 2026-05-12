import { Text, TouchableOpacity } from "react-native";

interface SaveButtonProps {
  onPress: () => void;
  loading?: boolean;
}

export default function SaveButton({ onPress, loading }: SaveButtonProps) {
  return (
    <TouchableOpacity
      className="bg-orange-500 py-3 rounded-lg items-center"
      onPress={onPress}
    >
      <Text className="text-white font-semibold">Salvar</Text>
    </TouchableOpacity>
  );
}
