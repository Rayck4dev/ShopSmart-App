import { View, Text, StyleSheet, Pressable } from "react-native"

type Props = {
  nome: string
  itens: number
  total: number
}

export default function ListCard({ nome, itens, total }: Props) {
  const progress = total > 0 ? itens / total : 0

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.icon} />
        <Text style={styles.title} numberOfLines={1}>
          {nome}
        </Text>
      </View>

      {/* PROGRESSO */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {/* INFO */}
      <View style={styles.footer}>
        <Text style={styles.info}>
          {itens} de {total} itens
        </Text>

        <Text style={styles.percent}>
          {Math.round(progress * 100)}%
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 26,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
  },

  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF7A00",
    marginRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F1F1F",
    flex: 1,
  },

  progressContainer: {
    height: 6,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#FF7A00",
    borderRadius: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },

  info: {
    fontSize: 13,
    color: "#6B6B6B",
  },

  percent: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF7A00",
  },
})