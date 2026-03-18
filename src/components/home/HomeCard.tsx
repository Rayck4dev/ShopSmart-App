import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type HomeCardProps = {
  title: string;
  iconType: "material" | "ion";
  iconName: string;
  badgeIcon: string;
  onPress: () => void;
};

export default function HomeCard({
  title,
  iconType,
  iconName,
  badgeIcon,
  onPress,
}: HomeCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.iconCircle}>
        {iconType === "material" ? (
          <MaterialIcons
            name={iconName as keyof typeof MaterialIcons.glyphMap}
            size={42}
            color="#C47B00"
          />
        ) : (
          <Ionicons
            name={iconName as keyof typeof Ionicons.glyphMap}
            size={42}
            color="#C47B00"
          />
        )}
      </View>

      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },

  iconCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#f8e9c5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    position: "relative",
  },

  cardText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
});
