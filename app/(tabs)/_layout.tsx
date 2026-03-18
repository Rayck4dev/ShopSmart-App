import { Tabs } from "expo-router";
import BottomTab from "@/src/components/navigation/BottomTab";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: "none" },
      }}
      tabBar={(props) => <BottomTab {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen
        name="mylists"
        options={{
          title: "Minhas Listas",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen name="add" options={{ title: "Add" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
