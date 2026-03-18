import React from "react";
import { View, StyleSheet } from "react-native";

type PaginationDotsProps = {
  total: number;
  activeIndex: number;
};

export default function PaginationDots({
  total,
  activeIndex,
}: PaginationDotsProps) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, activeIndex === index && styles.dotActive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: "row",
    marginTop: 20,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 5,
  },

  dotActive: {
    backgroundColor: "#06B6D4",
  },
});