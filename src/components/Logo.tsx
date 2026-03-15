import { View, Text, Image } from "react-native";

export default function Logo() {
  return (
    <View className="flex-row items-center mb-6">
      <Image
        source={require("../../assets/carrinho_transp.png")}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />

      <View className="flex-row ml-2">
        <Text className="text-3xl font-extrabold text-orange-500">Shop</Text>
        <Text className="text-3xl font-extrabold text-black">Smart</Text>
      </View>
    </View>
  );
}
