import { View, StyleSheet, Pressable } from "react-native"
import { Home, Clock, User } from "lucide-react-native"

export default function BottomTab() {
  return (
    <View style={styles.container}>

      <TabItem active>
        <Home size={22} color="#FFF" />
      </TabItem>

      <TabItem>
        <Clock size={22} color="#9CA3AF" />
      </TabItem>

      <TabItem>
        <User size={22} color="#9CA3AF" />
      </TabItem>

    </View>
  )
}

function TabItem({ children, active = false }: any) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        active && styles.activeItem,
        pressed && styles.pressed,
      ]}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 12,

    backgroundColor: "#FFF",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },

  item: {
    padding: 10,
    borderRadius: 12,
  },

  activeItem: {
    backgroundColor: "#FF7A00",
  },

  pressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.8,
  },
})