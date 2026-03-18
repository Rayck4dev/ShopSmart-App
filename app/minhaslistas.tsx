import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useCallback } from "react"
import Header from "../components/Header"
import ListCard from "../components/ListCard"
import BottomTab from "../components/BottomTab"

type Lista = {
  id: string
  nome: string
  itens: number
  total: number
}

const DATA: Lista[] = [
  { id: "1", nome: "Compras da Semana", itens: 8, total: 12 },
  { id: "2", nome: "Feira", itens: 6, total: 10 },
]

export default function MinhasListas() {

  const renderItem = useCallback(
    ({ item }: { item: Lista }) => <ListCard {...item} />,
    []
  )

  const keyExtractor = useCallback((item: Lista) => item.id, [])

  return (
    <View style={styles.container}>
      
      <Header />

      <View style={styles.content}>

        {/* LISTA */}
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

      </View>

      <BottomTab />
 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EDE4",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  listContent: {
    paddingBottom: 40,
  },

  premiumButton: {
    backgroundColor: "#1F1F1F",
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 12,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },

  premiumTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  premiumSubtitle: {
    color: "#BFBFBF",
    fontSize: 12,
    marginTop: 3,
  },
})