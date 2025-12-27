export enum ProductCategory {
  FRESH_FRUITS = 'Fresh Fruits & Vegetable',
  COOKING_OIL = 'Cooking Oil & Ghee',
  MEAT_FISH = 'Meat & Fish',
  BAKERY = 'Bakery & Snacks',
  DAIRY = 'Dairy & Eggs',
  BEVERAGES = 'Beverages',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  unit: string; // e.g., "1kg", "pcs"
  rating: number;
  calories?: string;
  brand?: string;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

export interface FilterState {
  categories: ProductCategory[];
  priceRange: [number, number];
}