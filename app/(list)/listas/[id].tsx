import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useListDetails } from "@/src/hooks/useListDetails";
import { ProductItem } from "@/src/components/lists/ProductItem";
import { supabase } from "@/src/lib/supabaseClient";

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { products, listName, loading, listTotalValue, isAllDone, toggleDone } =
    useListDetails(id as string);

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
      <View style={styles.center}>
        <ActivityIndicator color="#FF7A00" size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{listName}</Text>
        <TouchableOpacity onPress={deleteList} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Apagar</Text>
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
            onToggle={() => toggleDone(item.id, item.done)}
          />
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total da Lista:</Text>
          <Text style={styles.totalValue}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(listTotalValue)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.finishButton, !isAllDone && styles.finishBtnOff]}
          onPress={() => router.back()}
        >
          <Text style={styles.finishText}>Finalizar Compras</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: "#FF7A00",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginHorizontal: 10,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 8,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    marginRight: 4,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: { color: "#666", fontWeight: "600" },
  totalValue: { fontSize: 22, fontWeight: "900" },
  finishButton: {
    backgroundColor: "#FF7A00",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  finishBtnOff: { backgroundColor: "#DDD" },
  finishText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
