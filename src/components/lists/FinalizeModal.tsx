import React from "react";
import {
  Modal,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { PreviewItem } from "@/src/types/list";

export interface FinalizeModalProps {
  visible: boolean;
  items: PreviewItem[];
  total: number;
  onSave: () => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
  saving: boolean;
}

export default function FinalizeModal({
  visible,
  items,
  total,
  onSave,
  onEdit,
  onRemove,
  onClose,
  saving,
}: FinalizeModalProps) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
      >
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
          <Text className="text-2xl font-bold text-orange-500 text-center mt-10 mb-6">
            Resumo da Lista
          </Text>

          {items.map((item) => (
            <View
              key={item._localId}
              className="mb-3 bg-gray-50 border border-gray-100 rounded-lg p-3"
            >
              <Text className="font-bold text-base">
                {item.category_emoji} {item.title}
              </Text>
              <Text className="text-gray-500">
                {item.saleType === "peso"
                  ? `${item.weight}kg x ${item.pricePerKg}`
                  : `${item.quantity} un x ${item.priceUnit}`}
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <Text className="font-bold text-orange-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.total)}
                </Text>
                <TouchableOpacity onPress={() => onRemove(item._localId)}>
                  <Text className="text-red-500 font-semibold">Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View className="mt-6 p-4 bg-orange-50 rounded-xl">
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">Total Geral:</Text>
              <Text className="font-bold text-lg text-orange-700">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={onSave}
            disabled={saving}
            className={`mt-8 py-4 rounded-xl items-center ${saving ? "bg-gray-400" : "bg-green-600"}`}
          >
            <Text className="text-white font-bold text-lg">
              {saving ? "Salvando..." : "Confirmar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="mt-4 py-2">
            <Text className="text-center text-gray-500">
              Voltar para a edição
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
