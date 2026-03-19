import React from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

type Category = {
  id: string;
  nome: string;
  usa_valor_por_peso: boolean;
  emoji?: string;
};

type CategoryInputProps = {
  value: string;
  onChange: (val: string) => void;
  categories: Category[];
};

export default function CategoryInput({
  value,
  onChange,
  categories,
}: CategoryInputProps) {

  return (
    <View className="mb-4">
      <Text className="text-gray-700 mb-2 font-bold">Categoria</Text>

      <View className="bg-gray-100 rounded-xl border border-gray-200">
        <RNPickerSelect
          onValueChange={onChange}
          value={value}
          items={categories.map((cat) => ({
            label: `${cat.emoji ?? "📦"} ${cat.nome}`,
            value: cat.id,
            color: "#000",
          }))}
          placeholder={{ label: "Selecione uma categoria...", value: "" }}
          style={{
            inputIOS: { color: "#000", padding: 16, fontSize: 16 },
            inputAndroid: { color: "#000", padding: 12, fontSize: 16 },
            placeholder: { color: "#9CA3AF" },
          }}
        />
      </View>
    </View>
  );
}
