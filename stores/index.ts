import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductCategory, User, Review } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';

// --- Auth Store ---
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  location: string | null;
  login: (email: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
  setLocation: (location: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      location: null,
      login: async (email) => {
        // Simulate API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          user: { id: '1', name: 'Demo User', email },
          isAuthenticated: true,
        });
      },
      signup: async (name, email) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          user: { id: '1', name, email },
          isAuthenticated: true,
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      setLocation: (location) => set({ location }),
    }),
    { name: 'auth-storage' }
  )
);

// --- Cart Store ---
interface CartState {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, qty = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === product.id);
        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: qty }] });
        }
      },
      removeFromCart: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },
      updateQuantity: (productId, delta) => {
        const newItems = get()
          .items.map((i) =>
            i.id === productId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
          )
          .filter((i) => i.quantity > 0);
        set({ items: newItems });
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    { name: 'cart-storage' }
  )
);

// --- Product Store ---
interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: ProductCategory[];
  searchQuery: string;
  selectedCategory: string | null;
  
  // Advanced Filters
  activeSubCategories: string[];
  activeBrands: string[];
  favorites: string[];

  toggleFavorite: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string | null) => void;
  toggleSubCategory: (sub: string) => void;
  toggleBrand: (brand: string) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  
  // Review Action
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: MOCK_PRODUCTS,
      filteredProducts: MOCK_PRODUCTS,
      categories: Object.values(ProductCategory),
      searchQuery: '',
      selectedCategory: null,
      activeSubCategories: [],
      activeBrands: [],
      favorites: [],

      toggleFavorite: (id) => {
        const favs = get().favorites;
        if (favs.includes(id)) {
          set({ favorites: favs.filter((f) => f !== id) });
        } else {
          set({ favorites: [...favs, id] });
        }
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().applyFilters();
      },

      setCategoryFilter: (category) => {
        set({ selectedCategory: category });
        get().applyFilters();
      },

      toggleSubCategory: (sub) => {
        const current = get().activeSubCategories;
        if (current.includes(sub)) {
          set({ activeSubCategories: current.filter(c => c !== sub) });
        } else {
          set({ activeSubCategories: [...current, sub] });
        }
        get().applyFilters();
      },

      toggleBrand: (brand) => {
        const current = get().activeBrands;
        if (current.includes(brand)) {
          set({ activeBrands: current.filter(b => b !== brand) });
        } else {
          set({ activeBrands: [...current, brand] });
        }
        get().applyFilters();
      },
      
      addReview: (productId, reviewData) => {
        const products = get().products;
        const updatedProducts = products.map((p) => {
          if (p.id === productId) {
             const reviews = p.reviews || [];
             const newReview: Review = {
                 id: Date.now().toString(),
                 date: new Date().toISOString(),
                 ...reviewData
             };
             const newReviews = [...reviews, newReview];
             // Recalculate average rating
             const totalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
             const newRating = parseFloat((totalRating / newReviews.length).toFixed(1));
             
             return { ...p, reviews: newReviews, rating: newRating };
          }
          return p;
        });
        
        set({ products: updatedProducts });
        get().applyFilters(); // Re-apply to update filtered list if necessary
      },

      resetFilters: () => {
        set({ 
          searchQuery: '', 
          selectedCategory: null, 
          activeSubCategories: [], 
          activeBrands: [], 
          filteredProducts: get().products 
        });
      },

      applyFilters: () => {
        const { products, searchQuery, selectedCategory, activeSubCategories, activeBrands } = get();
        let result = products;

        // 1. Search Query
        if (searchQuery) {
          result = result.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // 2. Main Category Context
        if (selectedCategory && activeSubCategories.length === 0) {
          const isStrictCategory = Object.values(ProductCategory).includes(selectedCategory as ProductCategory);
          if (isStrictCategory) {
              result = result.filter((p) => p.category === selectedCategory);
          } else {
              result = result.filter(p => p.name.toLowerCase().includes(selectedCategory.toLowerCase()));
          }
        }

        // 3. Sub Categories
        if (activeSubCategories.length > 0) {
          result = result.filter(p => {
            return activeSubCategories.some(cat => {
                if (cat === 'Eggs') return p.name.includes('Egg') && !p.name.includes('Noodles') && !p.name.includes('Pasta');
                if (cat === 'Noodles & Pasta') return p.name.includes('Noodle') || p.name.includes('Pasta');
                if (cat === 'Chips & Crisps') return p.name.includes('Chip') || p.name.includes('Crisp');
                if (cat === 'Fast Food') return p.name.includes('Burger') || p.name.includes('Pizza') || p.category === ProductCategory.BAKERY;
                return false;
            });
          });
        }

        // 4. Brands
        if (activeBrands.length > 0) {
            result = result.filter(p => p.brand && activeBrands.includes(p.brand));
        }

        set({ filteredProducts: result });
      },
    }),
    {
      name: 'product-storage',
      partialize: (state) => ({ favorites: state.favorites, products: state.products }), // Persist both favorites and modified products
    }
  )
);

// --- UI Store ---
interface UIState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showCheckoutModal: boolean;
  setShowCheckoutModal: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  showCheckoutModal: false,
  setShowCheckoutModal: (show) => set({ showCheckoutModal: show }),
}));