export type Category = "meals" | "drinks";

export interface Variant {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  price: number | null;
  variants?: Variant[];
}
