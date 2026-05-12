import React, { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useListDetails } from "@/src/hooks/useListDetails";
import { ProductItem } from "@/src/components/lists/ProductItem";
import { supabase } from "@/src/lib/supabaseClient";
import { GamificationAPI } from "@/src/services/gamificationService";
import { GamificationModal } from "@/src/components/ui/GamificationModal";

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products, listName, loading, listTotalValue, isAllDone, toggleDone } =
    useListDetails(id as string);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<{
    type: "levelUp" | "bonus";
    value: number | string;
  }>({ type: "bonus", value: 0 });

  const handleToggle = async (productId: string, currentStatus: boolean) => {
    await toggleDone(productId, currentStatus);

    if (!currentStatus) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const result = await GamificationAPI.addExperience(
          user.id,
          GamificationAPI.XP_PER_ITEM,
        );

        if (result?.leveledUp) {
          setModalData({ type: "levelUp", value: result.level });
          setModalVisible(true);
        }
      }
    }
  };

  const handleFinalizeList = async () => {
    if (!isAllDone) {
      Alert.alert(
        "Lista incompleta",
        "Complete todos os itens para ganhar o bônus de finalização!",
      );
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const result = await GamificationAPI.addExperience(
        user.id,
        GamificationAPI.XP_PER_LIST,
      );

      if (result?.leveledUp) {
        setModalData({ type: "levelUp", value: result.level });
      } else {
        setModalData({ type: "bonus", value: GamificationAPI.XP_PER_LIST });
      }

      setModalVisible(true);
    } else {
      router.back();
    }
  };

  const deleteList = () => {
    Alert.alert("Apagar Lista?", "Isso excluirá permanentemente esta lista.", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await supabase.from("lists").delete().eq("id", id);
          router.back();
        },
      },
    ]);
  };

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="#FF7A00" size="large" />
      </View>
    );

  return (
    <View className="flex-1 bg-[#F8F9FA]">
      <GamificationModal
        visible={modalVisible}
        type={modalData.type}
        value={modalData.value}
        onClose={() => {
          setModalVisible(false);
          if (modalData.type === "bonus" || isAllDone) {
            router.back();
          }
        }}
      />

      <View className="flex-row justify-between items-center pt-[60px] px-4 pb-5 bg-[#FF7A00]">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold flex-1 mx-2.5">
          {listName}
        </Text>
        <TouchableOpacity
          onPress={deleteList}
          className="flex-row items-center bg-white/20 p-2 rounded-lg"
        >
          <Text className="text-white text-[11px] font-bold mr-1">Apagar</Text>
          <Ionicons name="trash-outline" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 180 }}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onToggle={() => handleToggle(item.id, item.done)}
          />
        )}
      />

      <View
        className="absolute bottom-0 w-full bg-white p-5 rounded-t-[30px]"
        style={{
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        }}
      >
        <View className="flex-row justify-between mb-[15px]">
          <Text className="text-[#666] font-semibold">Total da Lista:</Text>
          <Text className="text-[22px] font-black">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(listTotalValue)}
          </Text>
        </View>

        <TouchableOpacity
          className={`h-14 rounded-2xl justify-center items-center ${
            !isAllDone ? "bg-[#DDD]" : "bg-[#FF7A00]"
          }`}
          onPress={handleFinalizeList}
        >
          <Text className="text-white font-bold text-base">
            {isAllDone ? "Finalizar Compras (+100 XP)" : "Finalizar Compras"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
