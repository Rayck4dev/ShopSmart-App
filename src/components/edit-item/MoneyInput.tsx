import { TextInput, View, Text } from "react-native";

type MoneyInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function MoneyInput({
  label,
  value,
  onChange,
  placeholder = "R$ 0,00",
}: MoneyInputProps) {
  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "");
    if (!digits) {
      onChange("");
      return;
    }

    const number = parseFloat(digits) / 100;
    const formatted = number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    onChange(formatted);
  };

  return (
    <View className="mb-4 mt-2">
      <Text className="text-gray-700 mb-2 font-bold ml-1">{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className="bg-gray-100 text-black font-bold px-4 py-4 rounded-xl border border-gray-200"
      />
    </View>
  );
}
