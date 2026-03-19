import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useAddScreen } from "@/src/hooks/useAddScreen";
import AddItemForm from "@/src/components/lists/AddItemForm";
import ListNameInput from "@/src/components/lists/ListNameInput";
import PreviewList from "@/src/components/lists/PreviewList";
import FinalizeModal from "@/src/components/lists/FinalizeModal";

export default function AddScreen() {
  const { state, actions } = useAddScreen();
  const [finalized, setFinalized] = useState(false);

  const listHeader = useMemo(() => {
    return (
      <View className="px-6 pb-4">
        <Text className="text-2xl font-bold text-orange-500 text-center mt-8 mb-2">
          ➕ Nova Lista
        </Text>

        <ListNameInput
          value={state.creatingListName}
          onChange={actions.setCreatingListName}
        />

        <AddItemForm
          {...state}
          {...actions}
          onAdd={actions.addPreviewItem}
          onClear={() => actions.setName("")}
          saving={false}
        />

        <Text className="font-bold text-gray-700 mt-8 mb-4 border-t border-gray-100 pt-4">
          Itens na lista ({state.previewItems.length})
        </Text>
      </View>
    );
  }, [
    state.creatingListName,
    state.name,
    state.categoryId,
    state.saleType,
    state.pricePerKg,
    state.weight,
    state.priceUnit,
    state.quantity,
    state.categories,
    state.selectedCategory,
    state.previewItems.length, 
  ]);

  if (state.loading) {
    return (
      <ActivityIndicator className="flex-1" color="#FF7A00" size="large" />
    );
  }

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <PreviewList
          items={state.previewItems}
          onEdit={(id: string) => {
            const item = state.previewItems.find((p) => p._localId === id);
            if (item) {
              actions.setName(item.title);
              actions.setPricePerKg(item.pricePerKg || "");
              actions.setWeight(item.weight || "");
              actions.setPriceUnit(item.priceUnit || "");
              actions.setQuantity(item.quantity || "");
              actions.setSaleType(item.saleType);
              actions.setCategoryId(item.category_id);
              actions.setPreviewItems(
                state.previewItems.filter((p) => p._localId !== id),
              );
            }
          }}
          onRemove={(id: string) =>
            actions.setPreviewItems(
              state.previewItems.filter((p) => p._localId !== id),
            )
          }
          ListHeaderComponent={listHeader}
          contentContainerStyle={{ paddingBottom: 180 }}
        />

        <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 shadow-lg">
          <TouchableOpacity
            disabled={
              !state.creatingListName.trim() || state.previewItems.length === 0
            }
            onPress={() => setFinalized(true)}
            className={`py-4 rounded-2xl items-center ${
              !state.creatingListName.trim() || state.previewItems.length === 0
                ? "bg-gray-300"
                : "bg-orange-500"
            }`}
          >
            <Text className="text-white font-bold text-lg">
              Finalizar Lista
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <FinalizeModal
        visible={finalized}
        items={state.previewItems}
        total={state.previewItems.reduce((acc, item) => acc + item.total, 0)}
        onClose={() => setFinalized(false)}
        onSave={actions.handleSaveAll}
        onRemove={(id: string) =>
          actions.setPreviewItems(
            state.previewItems.filter((p) => p._localId !== id),
          )
        }
        onEdit={(id: string) => {
          const item = state.previewItems.find((p) => p._localId === id);
          if (item) {
            actions.setName(item.title);
            actions.setPreviewItems(
              state.previewItems.filter((p) => p._localId !== id),
            );
            setFinalized(false);
          }
        }}
        saving={state.savingAll}
      />
    </View>
  );
}
