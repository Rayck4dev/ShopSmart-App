import { useRouter } from "expo-router";
import { Plus } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Add() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {}
        <TouchableOpacity style={styles.box} onPress={() => router.push('/novalista')}>
          <Plus size={32} color="#fff" />
          <Text style={styles.boxText}>Nova Lista</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#F9F9F9' },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 40 },
  grid: { flexDirection: 'row', gap: 20 },
  box: { width: 140, height: 140, backgroundColor: "#4CAF50", borderRadius: 20, justifyContent: "center", alignItems: "center" },
  boxText: { color: "#fff", marginTop: 10, fontWeight: "bold" }
});