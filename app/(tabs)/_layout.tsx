import { Tabs } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { Home, Plus, User } from "lucide-react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#fff",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: "visible",
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let icon;
        if (route.name === "home") {
          icon = <Home color={isFocused ? "#f97316" : "#666"} size={24} />;
        } else if (route.name === "add") {
          icon = (
            <View
              style={{
                backgroundColor: "#f97316",
                borderRadius: 35,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                marginTop: -40,
                elevation: 8,
                shadowColor: "#f97316",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <Plus color="#fff" size={30} />
            </View>
          );
        } else if (route.name === "profile") {
          icon = <User color={isFocused ? "#f97316" : "#666"} size={24} />;
        }

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            style={{ alignItems: "center" }}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="add" options={{ title: "Add" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
