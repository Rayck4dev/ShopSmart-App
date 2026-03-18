import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

type HomeHeaderProps = {
  title: string;
  subtitle: string;
  avatarUrl: string;
};

export default function HomeHeader({ title, subtitle, avatarUrl }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F7BE2C",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 70,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "400",
    lineHeight: 22,
  },
});
