import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      {...props}
      className={` font-semibold w-full px-4 py-3 rounded-lg border 
        border-[#b37c4c]
        text-black
        bg-[#ffebcd] ${className}`}
      placeholderTextColor="#000000a6"
    />
  );
}
