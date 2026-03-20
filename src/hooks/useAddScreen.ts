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

  const handleCategoryChange = (id: string) => {
    setCategoryId(id);
    const cat = categories.find((c) => c.id === id);

    if (cat) {
      setSaleType(cat.usa_valor_por_peso ? "peso" : "unidade");
    }

    setPricePerKg("");
    setWeight("");
    setPriceUnit("");
    setQuantity("");
  };

  const parseNumber = (v: string) => {
    if (!v) return 0;
    return Number(v.replace(/\./g, "").replace(",", ".")) || 0;
  };

  const parseMoney = (v: string) => {
    if (!v) return 0;
    const clean = v.replace(/[^\d]/g, "");
    return Number(clean) / 100 || 0;
  };

  const calculateTotal = useCallback(() => {
    if (!categoryId) return 0; 
    if (saleType === "peso") {
      return parseMoney(pricePerKg) * parseNumber(weight);
    }
    return parseMoney(priceUnit) * parseNumber(quantity);
  }, [saleType, pricePerKg, weight, priceUnit, quantity, categoryId]);

  const addPreviewItem = () => {
    if (!categoryId)
      return Alert.alert("Ops!", "Selecione uma categoria primeiro.");
    if (!name.trim()) return Alert.alert("Ops!", "Dê um nome ao item.");

    const total = calculateTotal();
    if (total <= 0)
      return Alert.alert("Atenção", "O valor do item deve ser maior que zero.");

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
      total,
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
    if (!creatingListName.trim() || previewItems.length === 0) return;
    setSavingAll(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sessão expirada. Logue novamente.");

      const { data: list, error: e1 } = await supabase
        .from("lists")
        .insert([{ name: creatingListName, user_id: user.id }])
        .select("id")
        .single();
      if (e1) throw e1;

      const productsToInsert = previewItems.map((p) => ({
        title: p.title,
        price: p.total,
        category_id: p.category_id,
        owner_id: user.id,
      }));

      const { data: prods, error: e2 } = await supabase
        .from("products")
        .insert(productsToInsert)
        .select("id");
      if (e2 || !prods) throw e2 || new Error("Erro ao salvar produtos");

      const links = prods.map((prod, i) => ({
        list_id: list.id,
        product_id: prod.id,
        quantity:
          previewItems[i].saleType === "peso"
            ? parseNumber(previewItems[i].weight)
            : parseNumber(previewItems[i].quantity),
      }));

      const { error: e3 } = await supabase.from("list_products").insert(links);
      if (e3) throw e3;

      router.replace("/(tabs)/mylists");
    } catch (e: any) {
      Alert.alert("Erro ao salvar", e.message);
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
      setCategoryId: handleCategoryChange, 
      setSaleType,
      setPricePerKg,
      setWeight,
      setPriceUnit,
      setQuantity,
      calculateTotal,
      addPreviewItem,
      handleSaveAll,
      setPreviewItems,
    },
  };
}
