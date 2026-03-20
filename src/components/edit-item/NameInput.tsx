import { View, Text, TextInput } from "react-native";

type NameInputProps = {
  label?: string;
  value: string;
  onChange: (val: string) => void;
};

export default function NameInput({
  label = "Nome do item:",
  value,
  onChange,
}: NameInputProps) {
  return (
    <View className="mb-4">
      <Text className="text-black mb-2 font-bold">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Ex: Tomate"
        placeholderTextColor="#888"
        className="bg-gray-100 text-black font-bold px-4 py-3 rounded-lg border border-gray-200"
      />
    </View>
  );
}
