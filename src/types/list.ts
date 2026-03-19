export interface Category {
  id: string;
  nome: string;
  usa_valor_por_peso: boolean;
  emoji?: string;
}

export interface PreviewItem {
  _localId: string;
  title: string;
  category_id: string;
  category_emoji?: string;
  saleType: "peso" | "unidade";
  pricePerKg: string;
  weight: string;
  priceUnit: string;
  quantity: string;
  total: number;
}