import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductItemProps {
  item: {
    title: string;
    quantity: number;
    price: number;
    done: boolean;
  };
  onToggle: () => void;
}

export function ProductItem({ item, onToggle }: ProductItemProps) {
  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 rounded-[20px] mb-3 shadow-sm
        ${item.done ? "bg-gray-100 opacity-60" : "bg-white"}
      `}
      style={{ elevation: 2 }}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View
        className={`w-[26px] h-[26px] rounded-full border-2 items-center justify-center mr-[15px]
          ${item.done ? "bg-orange-500 border-orange-500" : "border-orange-500"}
        `}
      >
        {item.done && <Ionicons name="checkmark" size={16} color="white" />}
      </View>

      <View className="flex-1">
        <Text
          className={`text-base font-bold
            ${item.done ? "text-gray-400 line-through" : "text-[#1F1F1F]"}
          `}
        >
          {item.title}
        </Text>

        <Text className="text-xs text-gray-500 mt-0.5">
          Qtd: {item.quantity} •{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
