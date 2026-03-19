import { useState, useEffect, useCallback } from "react";
import { Alert, Keyboard } from "react-native";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "expo-router";
import { PreviewItem, Category } from "@/src/types/list";

export function useAddScreen() {
  const router = useRouter();

  const [creatingListName, setCreatingListName] = useState("");
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingAll, setSavingAll] = useState(false);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [saleType, setSaleType] = useState<"peso" | "unidade">("peso");
  const [pricePerKg, setPricePerKg] = useState("");
  const [weight, setWeight] = useState("");
  const [priceUnit, setPriceUnit] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("nome");

        if (error) throw error;

        if (data) {
          setCategories(data);
          setCategoryId(data[0]?.id || "");
        }
      } catch (e: any) {
        console.error("Erro ao buscar categorias:", e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    if (selectedCategory) {
      setSaleType(selectedCategory.usa_valor_por_peso ? "peso" : "unidade");
    }
  }, [categoryId]);

  const parseMoney = (v: string) =>
    Number(v.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0;

  const handleWeightChange = (text: string) => {
    const cleanText = text.replace(/\D/g, "");
    const numberValue = Number(cleanText) / 1000;

    const formatted = numberValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });

    setWeight(formatted);
  };

  const parseWeight = (v: string) => {
    if (!v) return 0;
    return Number(v.replace(",", ".")) || 0;
  };

  const calculateTotal = useCallback(() => {
    if (saleType === "peso") {
      return parseMoney(pricePerKg) * parseWeight(weight);
    }
    return parseMoney(priceUnit) * (Number(quantity) || 1);
  }, [saleType, pricePerKg, weight, priceUnit, quantity]);


  const addPreviewItem = () => {
    if (!name.trim()) {
      return Alert.alert("Ops!", "Dê um nome ao item antes de adicionar.");
    }

    const newItem: PreviewItem = {
      _localId: String(Date.now()),
      title: name,
      category_id: categoryId,
      category_emoji: selectedCategory?.emoji,
      saleType,
      pricePerKg,
      weight,
      priceUnit,
      quantity,
      total: calculateTotal(),
    };

    setPreviewItems((prev) => [...prev, newItem]);

    setName("");
    setPricePerKg("");
    setWeight("");
    setPriceUnit("");
    setQuantity("");
    Keyboard.dismiss();
  };

  const handleSaveAll = async () => {
    if (!creatingListName.trim() || previewItems.length === 0) {
      return Alert.alert("Erro", "Dê um nome à lista e adicione itens.");
    }

    setSavingAll(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não logado.");

      const { data: list, error: listError } = await supabase
        .from("lists")
        .insert([{ name: creatingListName, user_id: user.id }])
        .select("id")
        .single();

      if (listError) throw listError;

      const productsToInsert = previewItems.map((p) => ({
        title: p.title,
        price: p.total,
        category_id: p.category_id,
        owner_id: user.id,
      }));

      const { data: insertedProducts, error: prodError } = await supabase
        .from("products")
        .insert(productsToInsert)
        .select("id");

      if (prodError) throw prodError;

      const listProductsLinks = insertedProducts.map((prod, index) => {
        const item = previewItems[index];
        return {
          list_id: list.id,
          product_id: prod.id,
          quantity:
            item.saleType === "peso"
              ? parseWeight(item.weight || "0")
              : Number(item.quantity) || 1,
        };
      });

      await supabase.from("list_products").insert(listProductsLinks);

      Alert.alert("Sucesso!", "Lista salva!");
      router.back();
    } catch (e: any) {
      Alert.alert("Erro", e.message);
    } finally {
      setSavingAll(false);
    }
  };

  return {
    state: {
      creatingListName,
      previewItems,
      categories,
      loading,
      savingAll,
      name,
      categoryId,
      saleType,
      pricePerKg,
      weight,
      priceUnit,
      quantity,
      selectedCategory,
    },
    actions: {
      setCreatingListName,
      setName,
      setCategoryId,
      setSaleType,
      setPricePerKg,
      setWeight: handleWeightChange,
      setPriceUnit,
      setQuantity,
      calculateTotal,
      addPreviewItem,
      handleSaveAll,
      setPreviewItems,
    },
  };
}
