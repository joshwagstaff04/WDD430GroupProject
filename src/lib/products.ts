export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
};

export const CATEGORIES = [
  'Pottery',
  'Textiles',
  'Woodwork',
  'Home',
  'Jewelry',
  'Art',
  'Clothing',
  'Food & Drink',
];

const STORAGE_KEY = 'hh_products';

export function getProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function saveProduct(product: Product): void {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function deleteProduct(id: string): void {
  const updated = getProducts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
