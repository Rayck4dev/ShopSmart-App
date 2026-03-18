import { View, Text, StyleSheet } from "react-native";

export default function ListasTeste() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Teste</Text>
      <Text>Funcionou 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});