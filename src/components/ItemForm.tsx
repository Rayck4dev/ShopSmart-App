import InputField from "./InputField";

interface ItemFormProps {
  name: string;
  quantity: string;
  category: string;
  price: string;
}

export default function ItemForm({
  name,
  quantity,
  category,
  price,
}: ItemFormProps) {
  return (
    <>
      <InputField label="Nome" value={name} onChangeText={() => {}} />
      <InputField
        label="Quantidade"
        value={quantity}
        onChangeText={() => {}}
      />
      <InputField
        label="Categoria"
        value={category}
        onChangeText={() => {}}
      />
      <InputField label="Preço" value={price} onChangeText={() => {}} />
    </>
  );
}
