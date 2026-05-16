import { TouchableOpacity, View, LayoutChangeEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home, Plus, User } from "lucide-react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MotiView } from "moti";
import { useState } from "react";

export default function BottomTab({ state, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const tabWidth = dimensions.width / 3; 

  const onLayout = (event: LayoutChangeEvent) => {
    setDimensions(event.nativeEvent.layout);
  };

  return (
    <View className="absolute bottom-6 left-5 right-5">
      <SafeAreaView
        onLayout={onLayout}
        edges={["bottom"]}
        className="flex-row items-center py-3 bg-white rounded-[25px] shadow-lg overflow-hidden"
        style={{ elevation: 8 }}
      >
        <MotiView
          transition={{ type: "spring", damping: 70, stiffness: 120 }}
          animate={{
            translateX: state.index * tabWidth + (tabWidth / 1.9 - 25), 
          }}
          className="absolute h-12 w-12 bg-orange-500 rounded-2xl"
        />

        {state.routes
          .filter((route) => ["home", "add", "profile"].includes(route.name))
          .map((route, index) => {
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

            const getIcon = (focused: boolean) => {
              const color = focused ? "#FFFFFF" : "#94A3B8";
              switch (route.name) {
                case "home":
                  return <Home size={24} color={color} />;
                case "add":
                  return <Plus size={24} color={color} />;
                case "profile":
                  return <User size={24} color={color} />;
                default:
                  return null;
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                activeOpacity={0.9}
                style={{ width: tabWidth }}
                className="items-center justify-center py-2"
              >
                <MotiView
                  animate={{
                    scale: isFocused ? 1.1 : 1,
                  }}
                  transition={{ type: "timing", duration: 200 }}
                >
                  {getIcon(isFocused)}
                </MotiView>
              </TouchableOpacity>
            );
          })}
      </SafeAreaView>
    </View>
  );
}
