import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function ProductItem({
  item,
  onToggle,
}: {
  item: any;
  onToggle: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.card, item.done && styles.cardDone]}
      onPress={onToggle}
    >
      <View style={[styles.checkCircle, item.done && styles.checkActive]}>
        {item.done && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, item.done && styles.textDone]}>
          {item.title}
        </Text>
        <Text style={styles.subtitle}>
          Qtd: {item.quantity} •{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
  },
  cardDone: { opacity: 0.6, backgroundColor: "#F1F1F1" },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#FF7A00",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkActive: { backgroundColor: "#FF7A00" },
  title: { fontSize: 16, fontWeight: "700", color: "#1F1F1F" },
  textDone: { textDecorationLine: "line-through", color: "#999" },
  subtitle: { fontSize: 13, color: "#666", marginTop: 2 },
});
