import React from "react";
import { View, Text, Switch, Platform } from "react-native";

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

  if (!usaValorPorPeso) {
    return (
      <View className="flex-row items-center mt-4 mb-2">
        <Text className="text-gray-500 text-base font-semibold">
          Venda por: <Text className="text-black">Unidade</Text>
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center mt-4 mb-2 bg-gray-50 p-2 rounded-lg">
      <Switch
        value={isUnit}
        onValueChange={(val) => setSaleType(val ? "unidade" : "peso")}
        trackColor={{ false: "#9CA3AF", true: "#FF7A00" }}
        thumbColor={Platform.OS === "ios" ? undefined : "#fff"}
      />
      <View className="ml-3">
        <Text className="text-black text-base font-semibold">
          {isUnit ? "Preço por Unidade" : "Preço por Quilo (Kg)"}
        </Text>
        <Text className="text-gray-400 text-xs">
          Toque para alternar o modo de venda
        </Text>
      </View>
    </View>
  );
}
