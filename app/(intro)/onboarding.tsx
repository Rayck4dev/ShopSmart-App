import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingSlide from "@/src/components/onboarding/OnboardingSlide";
import PaginationDots from "@/src/components/onboarding/PaginationDots";
import PrimaryButton from "@/src/components/onboarding/PrimaryButton";

const screens = [
  {
    title: "Crie suas listas",
    subtitle: "Organize tudo o que você precisa comprar em segundos.",
    image: require("@/assets/onboarding/lista.png"),
    button: "Avançar",
  },
  {
    title: "Monte sua lista rapidamente",
    subtitle: "Adicione itens e planeje suas compras com facilidade.",
    image: require("@/assets/onboarding/ofertas.png"),
    button: "Avançar",
  },
  {
    title: "Nunca esqueça nada",
    subtitle: "Anote tudo o que precisa comprar em um só lugar.",
    image: require("@/assets/onboarding/organizar.png"),
    button: "Começar",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  async function next() {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      await AsyncStorage.setItem("introSeen", "true");
      router.replace("/(auth)/login");
    }
  }

  return (
    <LinearGradient
      colors={["#f9bf10", "#F6F1EE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 items-center justify-center px-[30px]"
    >
      <OnboardingSlide
        title={screens[step].title}
        subtitle={screens[step].subtitle}
        image={screens[step].image}
      />

      <View className="w-full mt-10">
        <PrimaryButton title={screens[step].button} onPress={next} />
      </View>

      <View className="mt-8">
        <PaginationDots total={screens.length} activeIndex={step} />
      </View>
    </LinearGradient>
  );
}
