import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/src/lib/supabaseClient";

export function useListDetails(id: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const { data: listData } = await supabase
        .from("lists")
        .select("name")
        .eq("id", id)
        .single();
      if (listData) setListName(listData.name);

      const { data, error } = await supabase
        .from("list_products")
        .select("quantity, products!inner(id, title, done, price)")
        .eq("list_id", id);

      if (!error && data) {
        setProducts(
          data.map((item: any) => ({
            ...item.products,
            quantity: item.quantity,
          })),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = async (productId: string, currentDone: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ done: !currentDone })
      .eq("id", productId);
    if (!error) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, done: !currentDone } : p,
        ),
      );
    }
  };

  const listTotalValue = useMemo(() => {
    return products.reduce((acc, curr) => acc + (curr.price || 0), 0);
  }, [products]);

  const isAllDone = products.length > 0 && products.every((p) => p.done);

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  return {
    products,
    listName,
    loading,
    listTotalValue,
    isAllDone,
    toggleDone,
    fetchDetails,
  };
}
