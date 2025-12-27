import { Product, ProductCategory } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bell Pepper Red',
    description: 'Fresh locally grown red bell pepper.',
    price: 4.99,
    image: 'https://picsum.photos/200/200?random=1',
    category: ProductCategory.FRESH_FRUITS,
    unit: '1kg',
    rating: 4.5,
    calories: '100 kcal',
    brand: 'Individual Collection'
  },
  {
    id: '2',
    name: 'Egg Chicken Red',
    description: 'Organic free-range eggs.',
    price: 1.99,
    image: 'https://pngimg.com/uploads/egg/egg_PNG40777.png',
    category: ProductCategory.DAIRY,
    unit: '4pcs',
    rating: 4.8,
    calories: '70 kcal',
    brand: 'Cocola'
  },
  {
    id: '3',
    name: 'Organic Bananas',
    description: 'Sweet organic bananas.',
    price: 3.00,
    image: 'https://picsum.photos/200/200?random=3',
    category: ProductCategory.FRESH_FRUITS,
    unit: '12kg',
    rating: 4.2,
    brand: 'Individual Collection'
  },
  {
    id: '4',
    name: 'Ginger',
    description: 'Fresh ginger root.',
    price: 2.99,
    image: 'https://picsum.photos/200/200?random=4',
    category: ProductCategory.FRESH_FRUITS,
    unit: '250gm',
    rating: 4.0,
    brand: 'Individual Collection'
  },
  {
    id: '11',
    name: 'Egg Chicken White',
    description: 'Fresh white chicken eggs.',
    price: 1.50,
    image: 'https://pngimg.com/uploads/egg/egg_PNG40786.png',
    category: ProductCategory.DAIRY,
    unit: '180g',
    rating: 4.5,
    brand: 'Kazi Farmas'
  },
  {
    id: '12',
    name: 'Egg Pasta',
    description: 'Delicious egg pasta.',
    price: 15.99,
    image: 'https://pngimg.com/uploads/pasta/pasta_PNG65.png',
    category: ProductCategory.BAKERY,
    unit: '30gm',
    rating: 4.3,
    brand: 'Individual Collection'
  },
  {
    id: '13',
    name: 'Egg Noodles',
    description: 'Instant egg noodles.',
    price: 15.99,
    image: 'https://pngimg.com/uploads/noodle/noodle_PNG46.png',
    category: ProductCategory.BAKERY,
    unit: '2L',
    rating: 4.1,
    brand: 'Ifad'
  },
  {
    id: '14',
    name: 'Mayonnais Eggless',
    description: 'Creamy eggless mayonnaise.',
    price: 4.99,
    image: 'https://pngimg.com/uploads/mayonnaise/mayonnaise_PNG15.png',
    category: ProductCategory.COOKING_OIL,
    unit: '300g',
    rating: 4.0,
    brand: 'Cocola'
  },
  {
    id: '5',
    name: 'Diet Coke',
    description: 'Refreshing carbonated soft drink.',
    price: 1.99,
    image: 'https://picsum.photos/200/200?random=5',
    category: ProductCategory.BEVERAGES,
    unit: '355ml',
    rating: 4.6,
    brand: 'Cocola'
  },
  {
    id: '6',
    name: 'Sprite Can',
    description: 'Lemon-lime flavored soft drink.',
    price: 1.50,
    image: 'https://picsum.photos/200/200?random=6',
    category: ProductCategory.BEVERAGES,
    unit: '325ml',
    rating: 4.5,
    brand: 'Cocola'
  },
  {
    id: '7',
    name: 'Apple & Grape Juice',
    description: '100% natural fruit juice.',
    price: 15.50,
    image: 'https://picsum.photos/200/200?random=7',
    category: ProductCategory.BEVERAGES,
    unit: '2L',
    rating: 4.7,
    brand: 'Individual Collection'
  },
  {
    id: '8',
    name: 'Coca Cola Can',
    description: 'Classic cola taste.',
    price: 4.99,
    image: 'https://picsum.photos/200/200?random=8',
    category: ProductCategory.BEVERAGES,
    unit: '325ml',
    rating: 4.8,
    brand: 'Cocola'
  },
  {
    id: '9',
    name: 'Beef Bone',
    description: 'Fresh beef bone for soup.',
    price: 4.99,
    image: 'https://picsum.photos/200/200?random=9',
    category: ProductCategory.MEAT_FISH,
    unit: '1kg',
    rating: 4.3,
    brand: 'Kazi Farmas'
  },
  {
    id: '10',
    name: 'Broiler Chicken',
    description: 'Whole broiler chicken.',
    price: 4.99,
    image: 'https://picsum.photos/200/200?random=10',
    category: ProductCategory.MEAT_FISH,
    unit: '1kg',
    rating: 4.6,
    brand: 'Kazi Farmas'
  },
  // --- New Items ---
  {
    id: '15',
    name: 'Beef Steak',
    description: 'Premium cut beef steak.',
    price: 25.99,
    image: 'https://picsum.photos/200/200?random=15',
    category: ProductCategory.MEAT_FISH,
    unit: '500g',
    rating: 4.8,
    brand: 'Kazi Farmas'
  },
  {
    id: '16',
    name: 'Atlantic Salmon',
    description: 'Fresh Atlantic Salmon fillet.',
    price: 18.50,
    image: 'https://picsum.photos/200/200?random=16',
    category: ProductCategory.MEAT_FISH,
    unit: '1kg',
    rating: 4.7,
    brand: 'Individual Collection'
  },
  {
    id: '17',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice.',
    price: 5.99,
    image: 'https://picsum.photos/200/200?random=17',
    category: ProductCategory.BEVERAGES,
    unit: '1L',
    rating: 4.5,
    brand: 'Individual Collection'
  },
  {
    id: '18',
    name: 'Pepsi Can',
    description: 'Carbonated soft drink.',
    price: 1.50,
    image: 'https://picsum.photos/200/200?random=18',
    category: ProductCategory.BEVERAGES,
    unit: '330ml',
    rating: 4.2,
    brand: 'Pepsi'
  },
  {
    id: '19',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold pressed extra virgin olive oil.',
    price: 12.99,
    image: 'https://picsum.photos/200/200?random=19',
    category: ProductCategory.COOKING_OIL,
    unit: '750ml',
    rating: 4.9,
    brand: 'Individual Collection'
  },
  {
    id: '20',
    name: 'Canola Oil',
    description: 'Pure canola oil for cooking.',
    price: 8.99,
    image: 'https://picsum.photos/200/200?random=20',
    category: ProductCategory.COOKING_OIL,
    unit: '2L',
    rating: 4.4,
    brand: 'Rupchanda'
  },
  {
    id: '21',
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread.',
    price: 2.50,
    image: 'https://picsum.photos/200/200?random=21',
    category: ProductCategory.BAKERY,
    unit: '400g',
    rating: 4.3,
    brand: 'Bakery Fresh'
  },
  {
    id: '22',
    name: 'Chocolate Chip Cookies',
    description: 'Crunchy chocolate chip cookies.',
    price: 4.99,
    image: 'https://picsum.photos/200/200?random=22',
    category: ProductCategory.BAKERY,
    unit: '200g',
    rating: 4.6,
    brand: 'Olympic'
  },
  {
    id: '23',
    name: 'Fresh Milk',
    description: 'Full cream fresh milk.',
    price: 1.99,
    image: 'https://picsum.photos/200/200?random=23',
    category: ProductCategory.DAIRY,
    unit: '1L',
    rating: 4.7,
    brand: 'Milk Vita'
  },
  {
    id: '24',
    name: 'Cheddar Cheese',
    description: 'Aged cheddar cheese block.',
    price: 6.99,
    image: 'https://picsum.photos/200/200?random=24',
    category: ProductCategory.DAIRY,
    unit: '200g',
    rating: 4.5,
    brand: 'Dhaka Cheese'
  },
  {
    id: '25',
    name: 'Potato',
    description: 'Organic fresh potatoes.',
    price: 0.99,
    image: 'https://picsum.photos/200/200?random=25',
    category: ProductCategory.FRESH_FRUITS,
    unit: '1kg',
    rating: 4.2,
    brand: 'Individual Collection'
  },
  {
    id: '26',
    name: 'Tomato',
    description: 'Red ripe tomatoes.',
    price: 1.49,
    image: 'https://picsum.photos/200/200?random=26',
    category: ProductCategory.FRESH_FRUITS,
    unit: '1kg',
    rating: 4.4,
    brand: 'Individual Collection'
  },
  {
    id: '27',
    name: 'Green Apple',
    description: 'Crunchy green apples.',
    price: 3.99,
    image: 'https://picsum.photos/200/200?random=27',
    category: ProductCategory.FRESH_FRUITS,
    unit: '1kg',
    rating: 4.3,
    brand: 'Individual Collection'
  },
  {
    id: '28',
    name: 'Cucumber',
    description: 'Fresh green cucumber.',
    price: 1.20,
    image: 'https://picsum.photos/200/200?random=28',
    category: ProductCategory.FRESH_FRUITS,
    unit: '500g',
    rating: 4.1,
    brand: 'Individual Collection'
  }
];

export const CATEGORY_IMAGES: Record<string, string> = {
  [ProductCategory.FRESH_FRUITS]: 'https://picsum.photos/100/100?random=11',
  [ProductCategory.COOKING_OIL]: 'https://picsum.photos/100/100?random=12',
  [ProductCategory.MEAT_FISH]: 'https://picsum.photos/100/100?random=13',
  [ProductCategory.BAKERY]: 'https://picsum.photos/100/100?random=14',
  [ProductCategory.DAIRY]: 'https://picsum.photos/100/100?random=15',
  [ProductCategory.BEVERAGES]: 'https://picsum.photos/100/100?random=16',
};