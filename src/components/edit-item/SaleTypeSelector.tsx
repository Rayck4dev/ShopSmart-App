import { View, Text, Switch } from "react-native";

type Props = {
  nome?: string;
  usaValorPorPeso?: boolean;
  saleType: "peso" | "unidade";
  setSaleType: (val: "peso" | "unidade") => void;
};

export default function SaleTypeSelector({
  nome,
  usaValorPorPeso,
  saleType,
  setSaleType,
}: Props) {
  const isUnit = saleType === "unidade";

  if (!nome) {
    return (
      <View className="flex-row items-center mt-4">
        <Text className="text-black text-base font-semibold">
          Preço por unidade
        </Text>
      </View>
    );
  }

  if (!usaValorPorPeso) {
    return (
      <View className="flex-row items-center mt-4">
        <Text className="text-black text-base font-semibold">
          Preço por unidade
        </Text>
      </View>
    );
  }

  if (nome === "padaria") {
    return (
      <View className="flex-row items-center mt-4">
        <Text className="text-black text-base font-semibold">Preço por kg</Text>
      </View>
    );
  }

  if (nome === "verduras" || nome === "legumes") {
    return (
      <View className="flex-row items-center mt-4">
        <Switch
          value={isUnit}
          onValueChange={(val) => setSaleType(val ? "unidade" : "peso")}
          trackColor={{ false: "#9CA3AF", true: "#22C55E" }}
          thumbColor="#fff"
        />
        <Text className="text-black text-base font-semibold ml-3">
          {isUnit ? "Por unidade" : "Por kg"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center mt-4">
      <Text className="text-black text-base font-semibold">Preço por kg</Text>
    </View>
  );
}
