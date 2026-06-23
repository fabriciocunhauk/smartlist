import { Product } from "./compare";

const CACHE_KEY = "smartlist_products_cache";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface CacheEntry {
  products: Product[];
  fetchedAt: number;
}

export function getCachedProducts(): Product[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.fetchedAt > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.products;
  } catch {
    return null;
  }
}

function setCachedProducts(products: Product[]): void {
  try {
    const entry: CacheEntry = { products, fetchedAt: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // sessionStorage full or unavailable — silently skip
  }
}

export async function prefetchProducts(baseUrl: string): Promise<void> {
  if (!baseUrl) return;
  if (getCachedProducts()) return; // already warm
  try {
    const response = await fetch(`${baseUrl}/api/price-list`);
    if (!response.ok) return;
    const products: Product[] = await response.json();
    setCachedProducts(products);
  } catch {
    // background prefetch failure is silent — compare page will retry
  }
}
