import { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import NameInput from "@/src/components/edit-item/NameInput";
import CategoryInput from "@/src/components/edit-item/CategoryInput";
import MoneyInput from "@/src/components/edit-item/MoneyInput";
import ActionButtons from "@/src/components/edit-item/ActionButtons";
import NumberInput from "@/src/components/edit-item/NumberInput";
import SaleTypeSelector from "@/src/components/edit-item/SaleTypeSelector";

interface Category {
  id: string;
  nome: string;
  usa_valor_por_peso: boolean;
  emoji?: string;
}

export default function EditItem({ ownerId }: { ownerId: string }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saleType, setSaleType] = useState<"peso" | "unidade">("peso");
  const [pricePerKg, setPricePerKg] = useState("");
  const [weight, setWeight] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("Erro ao buscar categorias:", error.message);
      } else if (data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    if (!selectedCategory) return;

    if (!selectedCategory.usa_valor_por_peso) {
      setSaleType("unidade");
    } else if (selectedCategory.nome === "padaria") {
      setSaleType("peso");
    }
  }, [selectedCategory]);

  const parseMoney = (val: string) => {
    if (!val) return 0;
    const clean = val.replace(/[^\d,.-]/g, "").replace(",", ".");
    return Number(clean) || 0;
  };

  const parseWeight = (value: string) => {
    const num = Number(value);
    if (isNaN(num) || num <= 0) return 0;
    return num > 10 ? num / 1000 : num;
  };

  const calculateTotal = () => {
    const moneyKg = parseMoney(pricePerKg);
    const w = parseWeight(weight);
    const moneyUnit = parseMoney(priceUnit);
    const q = Number(quantity) || 1;

    console.log({ saleType, moneyKg, w, moneyUnit, q });

    if (saleType === "peso") {
      return moneyKg * w;
    }
    return moneyUnit * q;
  };

  const handleSave = async () => {
    const total = calculateTotal();

    const { error } = await supabase.from("products").insert([
      {
        title: name,
        price: total,
        quantity:
          saleType === "peso" ? parseWeight(weight) : Number(quantity) || 1,
        category_id: categoryId,
        owner_id: ownerId,
      },
    ]);

    if (error) {
      Alert.alert("Erro", "Não foi possível salvar: " + error.message);
    } else {
      Alert.alert("Sucesso", "Item salvo na tabela products!");
      setName("");
      setCategoryId("");
      setSaleType("peso");
      setPricePerKg("");
      setWeight("");
      setPriceUnit("");
      setQuantity("");
    }
  };

  return (
    <View className="flex-1 bg-dark-background px-6 py-10">
      <NameInput value={name} onChange={setName} />
      <CategoryInput value={categoryId} onChange={setCategoryId} />

      <SaleTypeSelector
        nome={selectedCategory?.nome}
        usaValorPorPeso={selectedCategory?.usa_valor_por_peso}
        saleType={saleType}
        setSaleType={setSaleType}
      />

      <View className="flex-row items-center mb-4">
        {saleType === "peso" ? (
          <MoneyInput
            label="Valor"
            value={pricePerKg}
            onChange={setPricePerKg}
          />
        ) : (
          <MoneyInput label="Valor" value={priceUnit} onChange={setPriceUnit} />
        )}
      </View>

      {saleType === "peso" ? (
        <NumberInput
          label="Peso total (kg ou g)"
          value={weight}
          onChange={setWeight}
        />
      ) : (
        <NumberInput
          label="Quantidade"
          value={quantity}
          onChange={setQuantity}
        />
      )}

      <Text className="text-black mb-2 font-bold">Valor total</Text>
      <Text className="text-gray-300 mb-6 bg-gray-800 px-4 py-3 rounded-lg font-bold">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(calculateTotal())}
      </Text>

      <ActionButtons onSave={handleSave} onCancel={() => setName("")} />
    </View>
  );
}
