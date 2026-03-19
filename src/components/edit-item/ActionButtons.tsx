import { View, Text, TouchableOpacity } from "react-native";

type ActionButtonsProps = {
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
};

export default function ActionButtons({
  onSave,
  onCancel,
  saving,
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
        disabled={saving} 
        className={`flex-1 py-3 rounded-lg ml-2 ${saving ? "bg-green-300" : "bg-green-600"}`}
      >
        <Text className="text-center text-white font-semibold">
          {saving ? "Salvando..." : "Salvar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
