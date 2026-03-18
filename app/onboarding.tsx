import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import OnboardingSlide from "../components/onboarding/OnboardingSlide";
import PaginationDots from "../components/onboarding/PaginationDots";
import PrimaryButton from "../components/onboarding/PrimaryButton";

const screens = [
  {
    title: "Crie suas listas",
    subtitle: "Organize tudo o que você precisa comprar em segundos.",
    image: require("../assets/images/onboarding/lista.png"),
    button: "Avançar",
  },
  {
    title: "Monte sua lista rapidamente",
    subtitle: "Adicione itens e planeje suas compras com facilidade.",
    image: require("../assets/images/onboarding/ofertas.png"),
    button: "Avançar",
  },
  {
    title: "Nunca esqueça nada",
    subtitle: "Anote tudo o que precisa comprar em um só lugar.",
    image: require("../assets/images/onboarding/organizar.png"),
    button: "Começar",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  function next() {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      router.replace("/(tabs)");
    }
  }

  return (
    <LinearGradient
      colors={["#f9bf10", "#ffffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <OnboardingSlide
        title={screens[step].title}
        subtitle={screens[step].subtitle}
        image={screens[step].image}
      />

      <PrimaryButton title={screens[step].button} onPress={next} />

      <PaginationDots total={screens.length} activeIndex={step} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});