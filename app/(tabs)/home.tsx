import React, { useEffect, useState } from "react";
import { ScrollView, View, Alert, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabaseClient";
import * as Location from "expo-location";
import { MapPin } from "lucide-react-native";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

import HomeHeader from "@/src/components/home/HomeHeader";
import HomeCard from "@/src/components/home/HomeCard";
import { LocationMapCard } from "@/src/components/home/LocationCard";
import { GamificationCard } from "@/src/components/profile/GamificationCard";

export default function HomeScreen() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: p } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (p) {
      setProfile(p);

      if (p.avatar_url) {
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(p.avatar_url);
        setAvatarUrl(data.publicUrl);
      } else {
        setAvatarUrl(
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            p.name || p.username,
          )}&background=f97316&color=fff&bold=true`,
        );
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, []),
  );

  const handleGetLocation = async () => {
    setLoadingLoc(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Para mostrar o mapa e os mercados, precisamos da sua localização.",
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCoords(newCoords);

      let reverseGeocode = await Location.reverseGeocodeAsync(newCoords);

      if (reverseGeocode.length > 0) {
        const { city, street, streetNumber } = reverseGeocode[0];
        setAddress(
          `${street}${streetNumber ? ", " + streetNumber : ""} - ${city}`,
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro de Conexão",
        "Não foi possível acessar o GPS do dispositivo.",
      );
    } finally {
      setLoadingLoc(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F6F1EE]">
      <StatusBar style="dark" />

      <SafeAreaView className="bg-[#F7BE2C]" edges={["top"]} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <HomeHeader
          title={`Olá, ${profile?.name?.split(" ")[3] || profile?.username || "..."}`}
          subtitle="Economize em suas próximas compras"
          avatarUrl={avatarUrl}
        />

        <View className="px-6 -mt-8">
          <GamificationCard xp={profile?.xp || 0} level={profile?.level || 1} />

          <View className="flex-row space-x-4 mb-6">
            <HomeCard
              title="Minhas Listas"
              iconType="material"
              iconName="checklist"
              onPress={() => router.push("/mylists")}
            />
          </View>

          <View className="ml-2">
            <View className="flex-row items-center space-x-2 ">
              <MapPin color="#fb923c" size={20} />
              <Text className="font-bold text-xl text-gray-800 ml-2 mt-1">
                Explore a região
              </Text>
            </View>
            <Text className="font-sans text-sm text-gray-500 italic mt-2">
              Encontre os supermercados perto de você
            </Text>
          </View>

          <LocationMapCard
            address={address}
            location={coords}
            loading={loadingLoc}
            onGetLocation={handleGetLocation}
          />
        </View>
      </ScrollView>
    </View>
  );
}
