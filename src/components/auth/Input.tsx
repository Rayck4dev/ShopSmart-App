import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      {...props}
      className={`w-full px-4 py-3 rounded-lg border 
        border-light-nav dark:border-dark-nav 
        text-light-text dark:text-dark-text 
        bg-white dark:bg-gray-800 ${className}`}
      placeholderTextColor="#9CA3AF" 
    />
  );
}
