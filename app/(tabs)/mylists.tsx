import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import Header from "@/src/components/lists/Header";
import ListCard from "@/src/components/lists/ListCard";

export default function MyListsScreen() {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("lists")
        .select("id, name, created_at")
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
      } else {
        setLists(data || []);
      }
      setLoading(false);
    };

    fetchLists();
  }, []);

  const getListProgress = async (listId: string) => {
    const { data, error } = await supabase
      .from("list_products")
      .select("quantity, products(done)")
      .eq("list_id", listId);

    if (error || !data) return { total: 0, done: 0 };

    let total = 0;
    let done = 0;

    data.forEach((item) => {
      total += item.quantity;

      const product = Array.isArray(item.products)
        ? item.products[0]
        : item.products;

      if ((product as any)?.done) {
        done += item.quantity;
      }
    });

    return { total, done };
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text>Carregando listas...</Text>
      </View>
    );
  }

  if (lists.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.center}>
          <Text style={styles.emptyText}>Você ainda não criou uma lista</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const [progress, setProgress] = useState({ total: 0, done: 0 });

          useEffect(() => {
            getListProgress(item.id).then(setProgress);
          }, []);

          return (
            <ListCard
              nome={item.name}
              itens={progress.done}
              total={progress.total}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
