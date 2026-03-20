import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type Props = {
  name: string;
  date: string;
  onPress: () => void;
};

export default function RecentListRow({ name, date, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconBox}>
        <Text style={{ fontSize: 20 }}>🛒</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.date}>Criada em {date}</Text>
      </View>
      <Text style={styles.arrow}>❯</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: "#F6F1EE",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#444" },
  date: { fontSize: 12, color: "#AAA", marginTop: 2 },
  arrow: { color: "#CCC", fontSize: 18, marginLeft: 8 },
});
