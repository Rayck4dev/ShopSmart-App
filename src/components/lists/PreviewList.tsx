import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { PreviewItem } from "@/src/types/list";

interface PreviewListProps {
  items: PreviewItem[];
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  contentContainerStyle?: any;
}

export default function PreviewList({
  items,
  onEdit,
  onRemove,
  ListHeaderComponent,
  contentContainerStyle,
}: PreviewListProps) {
  const renderItem = ({ item }: { item: PreviewItem }) => {
    const isGram = item.weight?.startsWith("0,");
    const displayWeight = isGram
      ? `${item.weight.replace("0,", "").replace(/^0+/, "")}g`
      : `${item.weight}kg`;

    return (
      <View className="bg-gray-50 rounded-lg p-3 mb-3 flex-row justify-between items-center mx-6">
        <View style={{ flex: 1 }}>
          <Text className="font-semibold">
            {item.category_emoji ? `${item.category_emoji} ` : ""}
            {item.title}
          </Text>
          <Text className="text-gray-500 text-xs">
            {item.saleType === "peso"
              ? `Peso: ${displayWeight} • ${item.pricePerKg}/kg`
              : `Qtd: ${item.quantity} • ${item.priceUnit}/und`}
          </Text>
        </View>
        <View className="items-end ml-3">
          <Text className="font-bold text-orange-600">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.total)}
          </Text>
          <View className="flex-row mt-2">
            <TouchableOpacity
              onPress={() => onEdit(item._localId)}
              className="px-3 py-1 mr-2 bg-orange-100 rounded"
            >
              <Text className="text-orange-600 text-xs font-bold">Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onRemove(item._localId)}
              className="px-3 py-1 bg-red-100 rounded"
            >
              <Text className="text-red-600 text-xs font-bold">Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => i._localId}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={true}
      ListEmptyComponent={
        items.length === 0 ? (
          <Text className="text-center text-gray-400 mt-4">
            Nenhum item adicionado ainda.
          </Text>
        ) : null
      }
    />
  );
}
