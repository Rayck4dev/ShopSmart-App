import { View, Text, Switch } from "react-native";

type Props = {
  saleType: "peso" | "unidade";
  setSaleType: (val: "peso" | "unidade") => void;
};

export default function SaleTypeSwitch({ saleType, setSaleType }: Props) {
  const isUnit = saleType === "unidade";

  return (
    <View className="flex-row items-center mt-4">
      <Switch
        value={isUnit}
        onValueChange={(val) => setSaleType(val ? "unidade" : "peso")}
        trackColor={{ false: "#9CA3AF", true: "#22C55E" }} // cinza e verde
        thumbColor="#fff" // bolinha branca
      />
      <Text className="text-black text-base font-semibold ml-3">
        Por unidade
      </Text>
    </View>
  );
}
