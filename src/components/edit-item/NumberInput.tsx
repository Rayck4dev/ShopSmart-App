import { View, Text, TextInput } from "react-native";

type NumberInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  allowDecimal?: boolean;
  placeholder?: string;
};

export default function NumberInput({
  label,
  value,
  onChange,
  allowDecimal = true,
  placeholder = "0",
}: NumberInputProps) {
  const handleTextChange = (text: string) => {
    if (allowDecimal) {
      let cleaned = text.replace(".", ",");
      cleaned = cleaned.replace(/[^0-9,]/g, "");

      const parts = cleaned.split(",");
      if (parts.length > 2) {
        cleaned = parts[0] + "," + parts.slice(1).join("");
      }
      onChange(cleaned);
    } else {
      onChange(text.replace(/\D/g, ""));
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-700 mb-2 font-bold ml-1">{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleTextChange}
        keyboardType={allowDecimal ? "decimal-pad" : "numeric"}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className="bg-gray-100 text-black font-bold px-4 py-4 rounded-xl border border-gray-200"
      />
    </View>
  );
}
