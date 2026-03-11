import { View, Text } from "react-native";

export default function Add() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Página Add</Text>
      <Text style={{ marginTop: 10 }}>
        Aqui você poderia colocar o formulário ou ação de adicionar item.
      </Text>
    </View>
  );
}
