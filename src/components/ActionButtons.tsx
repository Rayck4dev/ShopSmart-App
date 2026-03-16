import { View, Text, TouchableOpacity } from "react-native";

type ActionButtonsProps = {
  onSave: () => void;
  onCancel: () => void;
};

export default function ActionButtons({
  onSave,
  onCancel,
}: ActionButtonsProps) {
  return (
    <View className="flex-row justify-between mt-6">
      <TouchableOpacity
        onPress={onCancel}
        className="flex-1 bg-gray-700 py-3 rounded-lg mr-2"
      >
        <Text className="text-center text-white font-semibold">Cancelar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSave}
        className="flex-1 bg-green-600 py-3 rounded-lg ml-2"
      >
        <Text className="text-center text-white font-semibold">Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
