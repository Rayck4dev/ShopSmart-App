import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home, Plus, User } from "lucide-react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function BottomTab({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute bottom-6 left-5 right-5">
      <SafeAreaView
        edges={["bottom"]}
        className="flex-row justify-around items-center py-3 bg-white rounded-[25px] shadow-lg"
        style={{ elevation: 8 }}
      >
        {state.routes
          .filter((route) => ["home", "add", "profile"].includes(route.name))
          .map((route, index) => {
            const isFocused = state.routes[state.index].name === route.name;

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

            const getIcon = (focused: boolean) => {
              const color = focused ? "#FFFFFF" : "#94A3B8"; 
              switch (route.name) {
                case "home": return <Home size={24} color={color} />;
                case "add": return <Plus size={24} color={color} />;
                case "profile": return <User size={24} color={color} />;
                default: return null;
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                activeOpacity={0.7}
                className={`p-3 rounded-2xl ${isFocused ? "bg-orange-500" : "bg-transparent"}`}
              >
                {getIcon(isFocused)}
              </TouchableOpacity>
            );
          })}
      </SafeAreaView>
    </View>
  );
}