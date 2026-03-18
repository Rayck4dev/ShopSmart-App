import { View, Text, TextInput } from "react-native";

type NumberInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  allowDecimal?: boolean;
};

export default function NumberInput({
  label,
  value,
  onChange,
  allowDecimal = true,
}: NumberInputProps) {
  return (
    <View className="mb-4">
      <Text className="text-black mb-2 font-bold">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={allowDecimal ? "decimal-pad" : "numeric"}
        placeholder="0"
        placeholderTextColor="#888"
        className="bg-gray-800 text-white font-bold px-4 py-3 rounded-lg"
      />
    </View>
  );
}
