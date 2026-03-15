import { Text, View } from "react-native";
import IconButton from "../src/components/IconButton";
import Input from "../src/components/Input";

export default function EditItem() {
  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background px-6 py-10">
      <Text className="text-light-text dark:text-dark-text text-2xl font-bold mb-6">
        Editar Item
      </Text>

      <Input placeholder="Nome" value="Tomate" className="mb-4" />
      <Input placeholder="Quantidade" value="3" className="mb-4" />
      <Input placeholder="Categoria" value="Alimentos" className="mb-4" />
      <Input placeholder="Preço" value="R$ 7,50" className="mb-6" />

      <View className="flex-row justify-between">
        <IconButton
          icon="trash"
          label="Excluir"
          color="action"
          onPress={() => console.log("Excluir item")}
        />
        <IconButton
          icon="check"
          label="Salvar"
          color="success"
          onPress={() => console.log("Salvar item")}
        />
      </View>
    </View>
  );
}
