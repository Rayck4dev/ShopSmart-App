import React from "react";
import { View, Text, StyleSheet } from "react-native";

type HomeHeaderProps = {
  title: string;
  subtitle: string;
};

export default function HomeHeader({ title, subtitle }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F7BE2C",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 70,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "400",
    lineHeight: 24,
  },
});