import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "expo-router";
import Header from "@/src/components/lists/Header";
import ListCard from "@/src/components/lists/ListCard";

export default function MyListsScreen() {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchLists = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("lists")
      .select(
        `
        id, 
        name, 
        created_at,
        list_products (
          products (done)
        )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const formatted = data.map((list: any) => {
        const items = list.list_products || [];
        return {
          id: list.id,
          name: list.name,
          total: items.length,
          done: items.filter((i: any) => i.products?.done).length,
        };
      });
      setLists(formatted);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Tela de Loading centralizada com NativeWind
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#FB923C" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Header title="Minhas Listas" subtitle="Organize suas compras" />

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchLists();
            }}
            tintColor="#FB923C"
          />
        }
        renderItem={({ item }) => (
          <View className="mb-4">
            <ListCard
              nome={item.name}
              itens={item.done}
              total={item.total}
              // Ajustado para o padrão de rotas que você está usando (confirme se a pasta é listas ou (list))
              onPress={() => router.push(`/listas/${item.id}`)}
            />
          </View>
        )}
        ListEmptyComponent={
          <View className="mt-10 items-center">
            <Text className="text-nav text-center text-base font-medium">
              Toque no + para criar sua primeira lista!
            </Text>
          </View>
        }
      />
    </View>
  );
}
