import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MapPin, Navigation } from "lucide-react-native";

interface LocationMapCardProps {
  address: string;
  location: { latitude: number; longitude: number } | null;
  loading: boolean;
  onGetLocation: () => void;
}

export function LocationMapCard({
  address,
  location,
  loading,
  onGetLocation,
}: LocationMapCardProps) {
  return (
    <View className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mt-6">
      <View className="h-48 w-full bg-gray-200">
        {location ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            className="w-full h-full"
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker coordinate={location} />
          </MapView>
        ) : (
          <View className="flex-1 items-center justify-center p-5">
            <MapPin color="#9ca3af" size={32} />
            <Text className="text-gray-400 text-center mt-2 text-xs">
              O mapa será exibido após encontrar sua localização
            </Text>
          </View>
        )}
      </View>

      <View className="p-5">
        <View className="flex-row items-center mb-4">
          <View className="bg-orange-100 p-2 rounded-full">
            <MapPin color="#f97316" size={18} />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-gray-400 text-[10px] font-bold uppercase">
              Mercado Atual
            </Text>

            <Text className="text-gray-800 font-bold" numberOfLines={1}>
              {address
                ? address
                : location
                  ? `Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}`
                  : "Localização não definida"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onGetLocation}
          disabled={loading}
          className="bg-orange-500 py-3 rounded-xl flex-row items-center justify-center active:bg-orange-600"
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Navigation color="#fff" size={18} />
              <Text className="ml-2 text-white font-bold">
                {location ? "Atualizar Localização" : "Buscar Localização"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
