import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
  
  const total = calculateTotal() || 0;

  return (
    <View style={styles.formContainer}>
      <NameInput value={name} onChange={setName} />

      <CategoryInput
        value={categoryId}
        onChange={setCategoryId}
        categories={categories}
      />

      {categoryId ? (
        <SaleTypeSelector
          nome={selectedCategory?.nome}
          usaValorPorPeso={selectedCategory?.usa_valor_por_peso}
          saleType={saleType}
          setSaleType={setSaleType}
        />
      ) : null}

      <View style={styles.dynamicInputsContainer}>
        {categoryId && saleType === "peso" ? (
          <View key="group-layout-peso">
            <MoneyInput
              label="Valor por Kg"
              value={pricePerKg}
              onChange={setPricePerKg}
              placeholder="Ex: R$ 6,95"
            />
            <NumberInput
              label="Peso total (kg ou g)"
              value={weight}
              onChange={setWeight}
              placeholder="Ex: 0,690"
            />
          </View>
        ) : categoryId && saleType === "unidade" ? (
          <View key="group-layout-unidade">
            <MoneyInput
              label="Valor por Unidade"
              value={priceUnit}
              onChange={setPriceUnit}
              placeholder="Ex: R$ 5,00"
            />
            <NumberInput
              label="Quantidade"
              value={quantity}
              onChange={setQuantity}
              allowDecimal={false}
              placeholder="Ex: 3"
            />
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Selecione uma categoria acima</Text>
          </View>
        )}
      </View>

      <Text style={styles.totalLabel}>Valor do item:</Text>
      <View style={styles.totalCard}>
        <Text style={styles.totalAmount}>
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
const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 4,
  },
  dynamicInputsContainer: {
    marginTop: 8,
    minHeight: 120,
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  totalLabel: {
    fontWeight: "bold",
    marginTop: 24,
    color: "#374151",
    marginLeft: 4,
  },
  totalCard: {
    backgroundColor: "#FFF7ED",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginBottom: 24,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    alignItems: "center",
  },
  totalAmount: {
    color: "#EA580C",
    fontWeight: "900",
    fontSize: 28,
  },
});