import React from "react";
import { View, Text } from "react-native";
import NameInput from "@/src/components/edit-item/NameInput";
import CategoryInput from "@/src/components/edit-item/CategoryInput";
import MoneyInput from "@/src/components/edit-item/MoneyInput";
import NumberInput from "@/src/components/edit-item/NumberInput";
import SaleTypeSelector from "@/src/components/edit-item/SaleTypeSelector";
import ActionButtons from "@/src/components/edit-item/ActionButtons";

interface Category {
  id: string;
  nome: string;
  usa_valor_por_peso: boolean;
  emoji?: string;
}

interface AddItemFormProps {
  name: string;
  setName: (val: string) => void;
  categoryId: string;
  setCategoryId: (val: string) => void;
  categories: Category[];
  saleType: "peso" | "unidade";
  setSaleType: (val: "peso" | "unidade") => void;
  pricePerKg: string;
  setPricePerKg: (val: string) => void;
  weight: string;
  setWeight: (val: string) => void;
  priceUnit: string;
  setPriceUnit: (val: string) => void;
  quantity: string;
  setQuantity: (val: string) => void;
  selectedCategory: Category | undefined;
  calculateTotal: () => number;
  onAdd: () => void;
  onClear: () => void;
  saving: boolean;
}

export default function AddItemForm({
  name,
  setName,
  categoryId,
  setCategoryId,
  categories,
  saleType,
  setSaleType,
  pricePerKg,
  setPricePerKg,
  weight,
  setWeight,
  priceUnit,
  setPriceUnit,
  quantity,
  setQuantity,
  selectedCategory,
  calculateTotal,
  onAdd,
  onClear,
  saving,
}: AddItemFormProps) {
  const total = calculateTotal();

  return (
    <View>
      <NameInput value={name} onChange={setName} />
      <CategoryInput
        value={categoryId}
        onChange={setCategoryId}
        categories={categories}
      />
      <SaleTypeSelector
        nome={selectedCategory?.nome}
        usaValorPorPeso={selectedCategory?.usa_valor_por_peso}
        saleType={saleType}
        setSaleType={setSaleType}
      />

      <View className="mt-2">
        {saleType === "peso" ? (
          <>
            <MoneyInput
              label="Valor por Kg"
              value={pricePerKg}
              onChange={setPricePerKg}
            />
            <NumberInput
              label="Peso total (kg ou g)"
              value={weight}
              onChange={setWeight}
            />
          </>
        ) : (
          <>
            <MoneyInput
              label="Valor por Unidade"
              value={priceUnit}
              onChange={setPriceUnit}
            />
            <NumberInput
              label="Quantidade"
              value={quantity}
              onChange={setQuantity}
            />
          </>
        )}
      </View>

      <Text className="font-bold mt-4 text-gray-700">Valor do item</Text>
      <View className="bg-gray-100 px-4 py-4 rounded-2xl mb-6 mt-2 border border-gray-100">
        <Text className="text-orange-500 font-bold text-xl text-center">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </Text>
      </View>

      <ActionButtons onSave={onAdd} onCancel={onClear} saving={saving} />
    </View>
  );
}
