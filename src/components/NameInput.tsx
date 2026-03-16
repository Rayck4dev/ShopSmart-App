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
        placeholder="ex: tomate"
        placeholderTextColor="#888"
        className="bg-gray-800 text-white font-bold px-4 py-3 rounded-lg"
      />
    </View>
  );
}
