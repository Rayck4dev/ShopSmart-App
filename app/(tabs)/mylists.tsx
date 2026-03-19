import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
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

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7A00" />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <Header />
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
            tintColor="#FF7A00"
          />
        }
        renderItem={({ item }) => (
          <ListCard
            nome={item.name}
            itens={item.done}
            total={item.total}
            onPress={() => router.push(`/listas/${item.id}`)} 
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Toque no + para criar sua primeira lista!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 16,
  },
});
