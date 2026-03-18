import React from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import HomeHeader from "../../components/home/HomeHeader";
import HomeCard from "../../components/home/HomeCard";
import BottomNav from "../../components/home/BottomNav";

export default function HomeScreen() {
  const router = useRouter();

  const cards = [
    {
      id: "1",
      title: "Minhas Listas",
      iconType: "material" as const,
      iconName: "checklist",
      badgeIcon: "checkmark",
      onPress: () => router.push("/teste/listas-teste"),
    },
  ];

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor="#f4a11c" />

      <SafeAreaView style={styles.topSafeArea} edges={["top"]} />

      <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
        <HomeHeader
          title="Olá!"
          subtitle="Organize seu dia de forma fácil e rápida"
        />

        <View style={styles.content}>
          <View style={styles.cardsRow}>
            {cards.map((item) => (
              <HomeCard
                key={item.id}
                title={item.title}
                iconType={item.iconType}
                iconName={item.iconName}
                badgeIcon={item.badgeIcon}
                onPress={item.onPress}
              />
            ))}
          </View>
        </View>

        <BottomNav />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F1EE",
  },

  topSafeArea: {
    backgroundColor: "#F7BE2C",
  },

  container: {
    flex: 1,
    backgroundColor: "#F6F1EE",
  },

  content: {
    flex: 1,
    marginTop: -35,
    paddingHorizontal: 16,
  },

  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
});
