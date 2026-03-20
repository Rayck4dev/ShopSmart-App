import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


interface SpendingCardProps {
  amount: number;
  label: string;
}

export default function SpendingCard({ amount, label }: SpendingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <MaterialIcons name="payments" size={20} color="#2D6A4F" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.amountText}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 36,
    height: 36,
    backgroundColor: "#D8F3DC",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  label: { fontSize: 10, color: "#999", fontWeight: "bold" },
  amountText: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
