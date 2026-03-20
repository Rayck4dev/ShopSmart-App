import { Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Página Home</Text>
      <Text style={{ marginTop: 10 }}>Aqui é só um exemplo simples.</Text>
    </View>
  );
}
