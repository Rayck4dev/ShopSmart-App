import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { supabase } from "@/src/lib/supabaseClient";

import HomeHeader from "@/src/components/home/HomeHeader";
import HomeCard from "@/src/components/home/HomeCard";
import RecentListRow from "@/src/components/home/RecentListRow";
import SpendingCard from "@/src/components/home/SpendingCard";

export default function HomeScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [recentLists, setRecentLists] = useState<any[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(p);

      const { data: lists, error } = await supabase
        .from("lists")
        .select(
          `
        id, 
        name, 
        created_at,
        products (price) 
      `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (lists) {
        const listsWithTotal = lists.map((list) => {
          const total =
            list.products?.reduce(
              (acc: number, prod: any) => acc + (prod.price || 0),
              0,
            ) || 0;
          return { ...list, total };
        });

        setRecentLists(listsWithTotal.slice(0, 3));

        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

        const monthlySum = listsWithTotal
          .filter((list) => new Date(list.created_at) >= firstDay)
          .reduce((acc, list) => acc + list.total, 0);

        setMonthlyTotal(monthlySum);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor="#f4a11c" />
      <SafeAreaView style={styles.topSafeArea} edges={["top"]} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader
          title={`Olá, ${profile?.name || profile?.username || "..."}`}
          subtitle="Controle suas compras com facilidade"
          avatarUrl={`https://api.dicebear.com/7.x/avataaars/png?seed=${profile?.username || "user"}`}
        />

        <View style={styles.content}>
          <View style={styles.cardsRow}>
            <HomeCard
              title="Minhas Listas"
              iconType="material"
              iconName="checklist"
              badgeIcon="checkmark"
              onPress={() => router.push("/mylists")}
            />

            <SpendingCard amount={monthlyTotal} label="Gasto no Mês" />
          </View>

          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Últimas Listas</Text>
              <TouchableOpacity onPress={() => router.push("/mylists")}>
                <Text style={styles.seeAllText}>Ver todas</Text>
              </TouchableOpacity>
            </View>

            {recentLists.map((list) => (
              <RecentListRow
                key={list.id}
                name={list.name}
                date={new Date(list.created_at).toLocaleDateString("pt-BR")}
                onPress={() => router.push(`/listas/${list.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F6F1EE" },
  topSafeArea: { backgroundColor: "#F7BE2C" },
  container: { flex: 1 },
  content: {
    marginTop: -35,
    paddingHorizontal: 16,
    paddingBottom: 100,
    zIndex: 10,
  },
  cardsRow: { flexDirection: "row", gap: 12 },
  recentSection: { marginTop: 32 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  seeAllText: { color: "#FF7A00", fontWeight: "600" },
});
