import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

type BottomNavProps = {
  onHomePress?: () => void;
  onAddPress?: () => void;
  onProfilePress?: () => void;
};

export default function BottomNav({
  onHomePress,
  onAddPress,
  onProfilePress,
}: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isHome =
    pathname === "/(tabs)" ||
    pathname === "/(tabs)/index" ||
    pathname === "/";

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.navButton}
        activeOpacity={0.7}
        onPress={() => {
          if (onHomePress) {
            onHomePress();
          } else {
            router.push("/(tabs)");
          }
        }}
      >
        <Ionicons
          name="home"
          size={28}
          color={isHome ? "#ff8000" : "#9CA3AF"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.85}
        onPress={() => {
          if (onAddPress) {
            onAddPress();
          } else {
            // router.push("");
          }
        }}
      >
        <Ionicons name="add" size={34} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.avatarButton}
        activeOpacity={0.7}
        onPress={() => {
          if (onProfilePress) {
            onProfilePress();
          }
        }}
      >
        <Ionicons name="person" size={28} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 90,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 34,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 10,
  },

  navButton: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarButton: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  floatingButton: {
    alignSelf: "center",
    top: -24,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 8,
  },
});