import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { PreviewItem } from "@/src/types/list";
import { formatWeight } from "@/src/utils/format";

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
    const displayWeight = formatWeight(item.weight);

    return (
      <View className="bg-white rounded-xl p-4 mb-3 flex-row justify-between items-center mx-6 shadow-sm border border-gray-100">
        <View style={{ flex: 1 }}>
          <Text className="font-bold text-gray-800 text-base">
            {item.category_emoji ? `${item.category_emoji} ` : ""}
            {item.title}
          </Text>

          <Text className="text-gray-500 text-xs mt-1">
            {item.saleType === "peso"
              ? `Peso: ${displayWeight} • R$ ${item.pricePerKg}/kg`
              : `Qtd: ${item.quantity} • R$ ${item.priceUnit}/und`}
          </Text>
        </View>

        <View className="items-end ml-4">
          <Text className="font-bold text-orange-600 text-base">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.total)}
          </Text>

          <View className="flex-row mt-3">
            <TouchableOpacity
              onPress={() => onEdit(item._localId)}
              className="px-3 py-1.5 mr-2 bg-orange-100 rounded-lg"
            >
              <Text className="text-orange-600 text-[10px] font-bold uppercase">
                Editar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onRemove(item._localId)}
              className="px-3 py-1.5 bg-red-100 rounded-lg"
            >
              <Text className="text-red-600 text-[10px] font-bold uppercase">
                Excluir
              </Text>
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
      contentContainerStyle={[{ paddingBottom: 120 }, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text className="text-center text-gray-400 mt-10">
          Nenhum item na lista ainda.
        </Text>
      }
    />
  );
}
