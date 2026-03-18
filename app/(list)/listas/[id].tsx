import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabaseClient";

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("list_products")
        .select("quantity, products(id, title, done)")
        .eq("list_id", id);

      if (error) {
        console.error(error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [id]);

  const toggleDone = async (productId: string, currentDone: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ done: !currentDone })
      .eq("id", productId);

    if (!error) {
      setProducts((prev) =>
        prev.map((p) =>
          p.products.id === productId
            ? { ...p, products: { ...p.products, done: !currentDone } }
            : p,
        ),
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text>Carregando itens...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Lista</Text>
      </View>

      {products.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            Essa lista ainda não tem produtos
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.products.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, item.products.done && styles.cardDone]}
              onPress={() => toggleDone(item.products.id, item.products.done)}
            >
              <Text style={styles.title}>{item.products.title}</Text>
              <Text style={styles.subtitle}>Quantidade: {item.quantity}</Text>
              <Text style={styles.status}>
                {item.products.done ? "Concluído" : "Pendente"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FF7A00",
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
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
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardDone: {
    backgroundColor: "#E6FFE6",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#FF7A00",
  },
});
