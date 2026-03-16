import { Text, TextInput } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
}

export default function InputField({
  label,
  value,
  onChangeText,
  editable = true,
}: InputFieldProps) {
  return (
    <>
      <Text className="mb-2">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        selectTextOnFocus={editable}
        className={`border border-gray-300 rounded-lg p-3 mb-4 ${
          editable ? "" : "bg-gray-100 text-gray-500"
        }`}
      />
    </>
  );
}
