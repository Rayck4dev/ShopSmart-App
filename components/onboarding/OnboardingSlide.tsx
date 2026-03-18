import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

type OnboardingSlideProps = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

export default function OnboardingSlide({
  title,
  subtitle,
  image,
}: OnboardingSlideProps) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  image: {
    width: "80%",
    height: 400,
    resizeMode: "contain",
  },
});