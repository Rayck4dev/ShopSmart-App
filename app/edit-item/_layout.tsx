import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function EditItemLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{  
          title: "Editar Item",
          headerStyle: { backgroundColor: "#f97316" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile")}
              style={{ marginLeft: 4, paddingRight: 12 }}
            >
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
