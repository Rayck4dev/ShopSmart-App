import { Tabs } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { Home, Plus, User } from "lucide-react-native";

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#fff",
        elevation: 5,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
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
                borderRadius: 30,
                padding: 12,
                marginBottom: 8,
              }}
            >
              <Plus color="#fff" size={28} />
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
            {route.name !== "add" && (
              <Text
                style={{
                  color: isFocused ? "#f97316" : "#666",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {route.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="add" options={{ title: "Add" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
