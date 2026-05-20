export interface Product {
  id: number;
  supermarket_name: string;
  product_name: string;
  price: string;
}

export interface ComparedItem {
  shoppingListItem: string;
  cheapestProduct: Product;
  expensiveProduct: Product;
  hasDifference: boolean;
  savings: string;
  savingsPercent: number;
}

export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function cleanProductName(name: string): string {
  return name
    .replace(/£\d+\.\d+[a-zA-Z]?/g, "")
    .trim()
    .toLowerCase();
}

export function compareShoppingList(
  list: { name: string; status: boolean }[],
  products: Product[]
): ComparedItem[] {
  return list
    .map((item) => {
      const keyword = item.name.toLowerCase().trim();
      if (!keyword) return null;

      const escapedKeyword = escapeRegex(keyword);
      const regexKeywordPlural = new RegExp(`\\b${escapedKeyword}(?:es|s)?\\b`, "i");

      const matches = products
        .map((product) => ({
          ...product,
          cleaned_name: cleanProductName(product.product_name),
        }))
        .filter((product) => {
          if (regexKeywordPlural.test(product.cleaned_name)) return true;

          if (keyword.endsWith("s")) {
            let singularKeyword = keyword;
            if (keyword.endsWith("es")) {
              singularKeyword = keyword.slice(0, -2);
            } else {
              singularKeyword = keyword.slice(0, -1);
            }
            const escapedSingular = escapeRegex(singularKeyword);
            const regexSingular = new RegExp(`\\b${escapedSingular}\\b`, "i");
            if (regexSingular.test(product.cleaned_name)) return true;
          }

          return false;
        });

      if (matches.length === 0) return null;

      const cheapestProduct = matches.reduce(
        (min, current) =>
          parseFloat(current.price) < parseFloat(min.price) ? current : min,
        matches[0]
      );

      const expensiveProduct = matches.reduce(
        (max, current) =>
          parseFloat(current.price) > parseFloat(max.price) ? current : max,
        matches[0]
      );

      const cheapestPrice = parseFloat(cheapestProduct.price);
      const expensivePrice = parseFloat(expensiveProduct.price);
      const hasDifference = expensivePrice > cheapestPrice;
      const savings = (expensivePrice - cheapestPrice).toFixed(2);
      const savingsPercent =
        expensivePrice > 0
          ? Math.round(((expensivePrice - cheapestPrice) / expensivePrice) * 100)
          : 0;

      return {
        shoppingListItem: item.name,
        cheapestProduct,
        expensiveProduct,
        hasDifference,
        savings,
        savingsPercent,
      };
    })
    .filter(Boolean) as ComparedItem[];
}
