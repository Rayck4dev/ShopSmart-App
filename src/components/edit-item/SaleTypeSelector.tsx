import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  nome?: string;
  usaValorPorPeso?: boolean;
  saleType: "peso" | "unidade";
  setSaleType: (val: "peso" | "unidade") => void;
}

export default function SaleTypeSelector({
  nome,
  usaValorPorPeso,
  saleType,
  setSaleType,
}: Props) {
  if (!usaValorPorPeso) return null;

  const isPeso = saleType === "peso";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Como deseja medir este item ?</Text>
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setSaleType("peso")}
          style={[styles.tab, isPeso && styles.activeTab]}
        >
          <Text style={[styles.tabText, isPeso && styles.activeTabText]}>
            ⚖️ Kg / g
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSaleType("unidade")}
          style={[styles.tab, !isPeso && styles.activeTab]}
        >
          <Text style={[styles.tabText, !isPeso && styles.activeTabText]}>
            📦 Unidade
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, marginBottom: 8 },
  label: {
    color: "#374151",
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 14,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: { fontWeight: "700", color: "#9CA3AF" },
  activeTabText: { color: "#EA580C" },
});
