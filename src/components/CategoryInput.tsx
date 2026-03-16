import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { supabase } from "@/src/lib/supabaseClient";

type Category = {
  id: string;
  nome: string;
  usa_valor_por_peso: boolean;
  emoji?: string;
};

type CategoryInputProps = {
  value: string;
  onChange: (val: string) => void;
};

export default function CategoryInput({ value, onChange }: CategoryInputProps) {
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <View className="mb-4">
      <Text className="text-black mb-2 font-bold">Categoria:</Text>
      <View className="bg-gray-800 rounded-lg">
        <RNPickerSelect
          onValueChange={onChange}
          value={value}
          items={categories.map((cat) => ({
            label: `${cat.emoji ?? ""} ${cat.nome}`, 
            value: cat.id,
          }))}
          placeholder={{ label: "Selecione uma categoria", value: "" }}
          style={{
            inputIOS: { color: "#fff", padding: 12 },
            inputAndroid: { color: "#fff", padding: 12 },
            placeholder: { color: "#888" },
          }}
        />
      </View>
    </View>
  );
}
