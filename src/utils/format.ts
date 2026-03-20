export const formatWeight = (weightStr: string): string => {
  if (!weightStr) return "0g";

  const normalizedWeight = weightStr.replace(",", ".");
  const value = parseFloat(normalizedWeight);

  if (isNaN(value) || value <= 0) return "0g";

  if (value < 1) {
    return `${Math.round(value * 1000)}g`;
  }
  const formattedKg = value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

  return `${formattedKg}kg`;
};
