import { TextInput, View, Text } from "react-native";

type MoneyInputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
};

const formatMoneyInput = (text: string) => {
  const digits = text.replace(/\D/g, "");
  if (!digits) return "";

  const number = parseFloat(digits) / 100;

  return (
    "R$ " +
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number)
  );
};

export default function MoneyInput({
  label,
  value,
  onChange,
}: MoneyInputProps) {
  const handleChange = (text: string) => {
    const formatted = formatMoneyInput(text);
    onChange(formatted); 
  };

  return (
    <View className="mb-4 mt-2">
      <Text className="text-black mb-2 font-bold">{label}</Text>
      <TextInput
        value={value} 
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder="R$ 0,00"
        placeholderTextColor="#9ca3af"
        className="bg-gray-800 text-white font-bold px-4 py-3 rounded-lg"
      />
    </View>
  );
}
