import React from "react";
import { View, Text, TextInput } from "react-native";

interface ListNameInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function ListNameInput({ value, onChange }: ListNameInputProps) {
  return (
    <View className="mt-6 mb-4">
      <Text className="text-md text-black font-bold mb-2">Nome da lista:</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Ex: Mercado do fim de semana"
        className="border border-gray-200 rounded-lg px-3 py-2"
        returnKeyType="done"
      />
    </View>
  );
}
