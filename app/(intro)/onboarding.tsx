import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import OnboardingSlide from "@/src/components/onboarding/OnboardingSlide";
import PaginationDots from "@/src/components/onboarding/PaginationDots";
import PrimaryButton from "@/src/components/onboarding/PrimaryButton";
import { useAuth } from "@/src/context/AuthContext"; 
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
  const { finishOnboarding } = useAuth();
  const [step, setStep] = useState(0);

  async function next() {
    if (step < screens.length - 1) {
      setStep(step + 1);
    } else {
      try {
        await finishOnboarding();

        router.replace("/(auth)/login");
      } catch (error) {
        console.error("Erro ao finalizar onboarding:", error);
      }
    }
  }

  return (
    <LinearGradient colors={["#f9bf10", "#F6F1EE"]} className="flex-1">
      <SafeAreaView className="flex-1 items-center justify-between py-10 px-[30px]">
        <View className="flex-1 justify-center w-full">
          <OnboardingSlide
            title={screens[step].title}
            subtitle={screens[step].subtitle}
            image={screens[step].image}
          />
        </View>

        <View className="w-full items-center">
          <View className="w-full items-center mb-6">
            <PrimaryButton title={screens[step].button} onPress={next} />
          </View>

          <PaginationDots total={screens.length} activeIndex={step} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
