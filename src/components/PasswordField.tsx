import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

interface PasswordFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
}

export default function PasswordField({ label, value, onChangeText }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Text className="mb-2">{label}</Text>
      <View className="flex-row items-center border border-gray-300 rounded-lg mb-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!show}
          className="flex-1 p-3"
        />
        <TouchableOpacity onPress={() => setShow(!show)} className="p-3">
          {show ? <EyeOff color="#f97316" /> : <Eye color="#f97316" />}
        </TouchableOpacity>
      </View>
    </>
  );
}
