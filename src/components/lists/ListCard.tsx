import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  nome: string;
  itens: number;
  total: number;
  onPress?: () => void;
  index?: number;
};

export default function ListCard({
  nome,
  itens,
  total,
  onPress,
  index = 0,
}: Props) {
  const progress = total > 0 ? itens / total : 0;
  const isCompleted = total > 0 && itens === total;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: translateY }],
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
          isCompleted && styles.cardCompleted,
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View
              style={[
                styles.iconContainer,
                isCompleted && styles.iconContainerDone,
              ]}
            >
              <Ionicons
                name={isCompleted ? "checkmark-circle" : "cart-outline"}
                size={20}
                color="white"
              />
            </View>

            <View style={styles.titleWrapper}>
              <Text style={styles.title} numberOfLines={1}>
                {nome}
              </Text>
              <Text style={styles.dateText}>Toque para ver detalhes</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#D1D1D1" />
          </View>

          <View style={styles.progressSection}>
            <View style={styles.footer}>
              <Text style={styles.info}>
                <Text style={styles.boldInfo}>{itens}</Text> de {total} itens
              </Text>
              <Text style={[styles.percent, isCompleted && styles.percentDone]}>
                {Math.round(progress * 100)}%
              </Text>
            </View>

            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${progress * 100}%` },
                  isCompleted && styles.progressBarDone,
                ]}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1.8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    overflow: "hidden"
  },
  cardCompleted: {
    borderColor: "#E8F5E9",
    backgroundColor: "#F9FFFA",
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  content: { padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FF7A00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  iconContainerDone: { backgroundColor: "#4CAF50" },
  titleWrapper: { flex: 1 },
  title: { fontSize: 17, fontWeight: "800", color: "#1A1A1A" },
  dateText: { fontSize: 12, color: "#A0A0A0", marginTop: 2 },
  progressContainer: {
    height: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginTop: 10,
  },
  progressBar: { height: "100%", backgroundColor: "#FF7A00", borderRadius: 10 },
  progressBarDone: { backgroundColor: "#4CAF50" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: { fontSize: 13, color: "#707070" },
  boldInfo: { fontWeight: "700", color: "#1A1A1A" },
  percent: { fontSize: 14, fontWeight: "800", color: "#FF7A00" },
  percentDone: { color: "#4CAF50" },
  progressSection: { marginTop: 4 },
});
