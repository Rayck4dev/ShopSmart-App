import { View, Text, StyleSheet } from "react-native"

export default function Header() {
  return (
    <View style={styles.container}>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Listas</Text>
        <Text style={styles.subtitle}>Organize suas compras</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF7A00",
    paddingTop: 64,
    paddingBottom: 24,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },

  content: {
    paddingHorizontal: 20,
  },

  subtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    letterSpacing: 0.5,
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 4,
    letterSpacing: 0.3,
  },
})