import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home, Plus, User } from "lucide-react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function BottomTab({ state, navigation }: BottomTabBarProps) {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 12,
        backgroundColor: "#FFF",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      {state.routes
        .filter((route) => ["home", "add", "profile"].includes(route.name))
        .map((route) => {
          const isFocused =
            state.index === state.routes.findIndex((r) => r.key === route.key);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          let icon;
          if (route.name === "home") {
            icon = <Home size={24} color={isFocused ? "#FFF" : "#666"} />;
          } else if (route.name === "add") {
            icon = <Plus size={24} color={isFocused ? "#FFF" : "#666"} />;
          } else if (route.name === "profile") {
            icon = <User size={24} color={isFocused ? "#FFF" : "#666"} />;
          }

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={[
                { padding: 10, borderRadius: 12 },
                isFocused && { backgroundColor: "#FF7A00" },
              ]}
            >
              {icon}
            </TouchableOpacity>
          );
        })}
    </SafeAreaView>
  );
}
