import { useState } from "react";
import * as Location from "expo-location";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useUserLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function getAbsoluteLocation() {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert(
          "Precisamos da permissão de localização para encontrar o mercado!",
        );
        setLoading(false);
        return;
      }

      const currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      };

      setLocation(coords);

      const [backAddress] = await Location.reverseGeocodeAsync(coords);

      if (backAddress) {
        const street = backAddress.street || "";
        const district = backAddress.district || "";
        const city = backAddress.city || "Cidade não identificada";
        const state = backAddress.region || "";

        let formatted = "";

        if (street) {
          formatted = `${street}, ${city}`;
        } else if (district) {
          formatted = `${district}, ${city}`;
        } else {
          const placeName = backAddress.name || "Zona Rural";
          formatted = `${placeName} - ${city} ${state ? `, ${state}` : ""}`;
        }

        setAddress(formatted.replace(/,\s*,/g, ",").trim());
      }
    } catch (error) {
      console.warn("Erro ao buscar coordenadas:", error);
      alert(
        "Não foi possível obter a sua localização. Verifique se o seu GPS está ligado.",
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    location,
    address,
    loading,
    getAbsoluteLocation,
  };
}
