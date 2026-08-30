import type { MenuItem } from "../types/menu";

const BASE = import.meta.env.BASE_URL;

function img(path: string): string {
  return `${BASE}${path.replace(/^\//, "")}`;
}

export const MENU_ITEMS: MenuItem[] = [
  // === الوجبات ===
  {
    id: "braiz",
    name: "برايز",
    category: "meals",
    description: "تشمل بطاطا وصوصات",
    image: img("/braiz.webp"),
    price: 25,
  },
  {
    id: "shrak",
    name: "شراك عراقي",
    category: "meals",
    description: "لفة شراك عراقية تشمل الصوص",
    image: img("/shrak_iraqi.webp"),
    price: 15,
  },
  {
    id: "bashka",
    name: "باشكا",
    category: "meals",
    description: "تشمل بطاطا وصوصات وسلطة",
    image: img("/bashka.webp"),
    price: 20,
  },
  {
    id: "burger",
    name: "برجر لحم",
    category: "meals",
    description: "يشمل بطاطا وسلطات وصوصات",
    image: img("/beef_burger.webp"),
    price: 22,
    variants: [
      { id: "single", name: "عادي", price: 22 },
      { id: "double", name: "دبل", price: 32 },
    ],
  },
  {
    id: "crispy",
    name: "كرسبي دجاج",
    category: "meals",
    description: "يشمل بطاطا وسلطات وخبز وصوصات",
    image: img("/crispy_chicken.webp"),
    price: 20,
  },
  {
    id: "arabic-shawarma",
    name: "شاورما عربي",
    category: "meals",
    description: "شاورما عربي",
    image: img("/arabic_shawarma.webp"),
    price: 19,
  },
  {
    id: "crispy-burger",
    name: "برجر كرسبي",
    category: "meals",
    description: "يشمل بطاطا وصوصات",
    image: img("/crispy_burger.webp"),
    price: 18,
  },

  // === المشروبات ===
  {
    id: "cola",
    name: "كولا",
    category: "drinks",
    description: "",
    image: img("/cola.webp"),
    price: 1,
  },
  {
    id: "blue",
    name: "بلو عادي",
    category: "drinks",
    description: "",
    image: img("/blu_original.webp"),
    price: 4,
  },
  {
    id: "blue-mint",
    name: "بلو نعنع",
    category: "drinks",
    description: "",
    image: img("/blu_mint.webp"),
    price: 4,
  },
  {
    id: "blue-dye",
    name: "بلو داي",
    category: "drinks",
    description: "",
    image: img("/blu_day.webp"),
    price: 4,
  },
  {
    id: "xl",
    name: "XL",
    category: "drinks",
    description: "",
    image: img("/4xl.webp"),
    price: 4,
  },
  {
    id: "kool",
    name: "كول",
    category: "drinks",
    description: "",
    image: img("/cool.webp"),
    price: 2,
  },
];
