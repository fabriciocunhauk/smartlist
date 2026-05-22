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
    .replace(/£\d+\.?\d*[a-zA-Z]?/g, "")
    .replace(/[*#"'`]/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Maps a canonical user search term to all known aliases/abbreviations
 * found in the scanned-receipt product data from the API.
 *
 * Keys are lowercase. Values are arrays of strings — ALL must appear as
 * word-boundary matches in the cleaned product name for it to be considered
 * a match (i.e. aliases are OR'd, but multi-word aliases are AND'd).
 */
const KEYWORD_ALIASES: Record<string, string[][]> = {
  // Dairy
  milk:        [["milk"], ["mlk"], ["semi skim"], ["s/skim"], ["skim mi"], ["skimmi"]],
  butter:      [["butter"], ["btr"], ["lurpak"], ["spreadable"]],
  eggs:        [["eggs"], ["egg"]],
  cheese:      [["cheese"], ["chedd"], ["mozz"], ["mozzarella"], ["cheddar"]],
  yogurt:      [["yogurt"], ["yoghurt"], ["yog"], ["fromage"]],
  cream:       [["cream"], ["crean"], ["elmlea"], ["dble"]],

  // Produce
  tomato:      [["tomato"], ["toms"], ["toms"], ["classic tomatoes"], ["salad tomato"], ["cherry tomato"], ["plum"], ["pomodor"]],
  tomatoes:    [["tomato"], ["toms"], ["classic tomatoes"], ["salad tomato"], ["cherry tomato"], ["plum"], ["pomodor"]],
  strawberry:  [["strawb"], ["stwb"], ["strawberries"], ["strawbs"], ["strawb"]],
  strawberries:[["strawb"], ["stwb"], ["strawberries"], ["strawbs"]],
  banana:      [["banana"], ["bananasxs"]],
  bananas:     [["banana"], ["bananasxs"]],
  apple:       [["apple"], ["apples"]],
  apples:      [["apple"]],
  grapes:      [["grapes"], ["grape"]],
  cherry:      [["cherr"], ["cherries"]],
  cherries:    [["cherr"], ["cherries"]],
  orange:      [["orange"], ["oranges"]],
  oranges:     [["orange"]],
  lemon:       [["lemon"], ["lehon"]],
  lemons:      [["lemon"], ["unwaxed lemon"]],
  mango:       [["mango"]],
  onion:       [["onion"], ["onions"]],
  onions:      [["onion"]],
  garlic:      [["garlic"]],
  carrot:      [["carrot"], ["carrots"]],
  carrots:     [["carrot"]],
  cucumber:    [["cucumber"]],
  broccoli:    [["brocoli"], ["broccoli"]],
  potato:      [["potato"], ["potatoes"]],
  potatoes:    [["potato"], ["baby potatoes"]],
  blueberries: [["blueberr"]],
  blueberry:   [["blueberr"]],
  raspberries: [["raspberr"], ["raspbs"]],
  mushroom:    [["mushr"], ["mushroom"]],
  sweetcorn:   [["sweetcorn"], ["corn"]],

  // Bread & Bakery
  bread:       [["bread"], ["loaf"], ["kingsmill"], ["hovis"], ["brioche"]],
  croissant:   [["croissant"]],
  croissants:  [["croissant"]],

  // Meat
  chicken:     [["chicken"], ["chickenbrest"]],
  mince:       [["mince"], ["steak mince"]],
  ham:         [["ham"], ["gamhon ham"]],
  pork:        [["pork"]],

  // Pantry
  sugar:       [["sugar"]],
  rice:        [["rice"]],
  pasta:       [["pasta"], ["spaghetti"], ["linguine"]],
  spaghetti:   [["spaghetti"]],
  oil:         [["oil"]],
  "olive oil": [["extra virgin"], ["napolina"], ["evo"]],
  "sunflower oil": [["sunflower oil"]],
  salt:        [["salt"]],
  vinegar:     [["vinegar"]],
  flour:       [["flour"], ["flr"]],
  beans:       [["beans"], ["baked beans"]],

  // Drinks
  juice:       [["juice"]],
  water:       [["water"]],
  coffee:      [["coffee"], ["coff"], ["latte"], ["lavazza"], ["starbucks"], ["alcafe"]],

  // Other
  ketchup:     [["ketchup"], ["hp sauce"]],
};



/** Tokens that are clearly size/quantity — not part of the product name. */
const SIZE_TOKEN = /^(\d+\.?\d*(g|kg|ml|cl|l|oz|lb|lbs)?|x\d+|\d+x|\d+)$/i;
const UNIT_TOKEN = /^(g|kg|ml|cl|l|oz|lb|lbs|pints?|litre?s?|pack|pk|pck|each|ea|jar|tin|can|bag|bkg|pkg|box|bottle|btl|tub|tray|pcs|pc|loaf|loaves)$/i;

function wordsMatch(kwWord: string, prodWord: string): boolean {
  const kw = kwWord.toLowerCase();
  const prod = prodWord.toLowerCase();

  if (kw === prod) return true;

  // Plural/singular check
  if (
    kw === `${prod}s` ||
    kw === `${prod}es` ||
    prod === `${kw}s` ||
    prod === `${kw}es`
  ) {
    return true;
  }

  // Alias check
  const kwAliases = KEYWORD_ALIASES[kw];
  if (kwAliases) {
    for (const terms of kwAliases) {
      if (terms.some((term) => term.toLowerCase() === prod)) {
        return true;
      }
    }
  }

  const prodAliases = KEYWORD_ALIASES[prod];
  if (prodAliases) {
    for (const terms of prodAliases) {
      if (terms.some((term) => term.toLowerCase() === kw)) {
        return true;
      }
    }
  }

  return false;
}

function findCoreAliasKey(text: string): string | null {
  const lower = text.toLowerCase().trim();
  const words = lower.split(/\s+/).filter(Boolean);

  const aliasKeys = Object.keys(KEYWORD_ALIASES).sort((a, b) => b.length - a.length);

  for (let i = words.length - 1; i >= 0; i--) {
    const candidate = words.slice(i).join(" ");
    for (const key of aliasKeys) {
      if (
        key === candidate ||
        KEYWORD_ALIASES[key].some((andTerms) =>
          andTerms.every((term) => term === candidate)
        )
      ) {
        return key;
      }
    }
  }

  for (const key of aliasKeys) {
    const escaped = escapeRegex(key);
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(lower)) {
      return key;
    }
  }

  return null;
}

function isGenuineMatch(
  keyword: string,
  product: Product & { cleaned_name: string }
): boolean {
  const cleanedKeyword = cleanProductName(keyword);

  const kwWords = cleanedKeyword
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !SIZE_TOKEN.test(word) && !UNIT_TOKEN.test(word));
  const prodWords = product.cleaned_name
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !SIZE_TOKEN.test(word) && !UNIT_TOKEN.test(word));

  if (kwWords.length === 0) return false;

  // 1. Try strict multi-word match
  const strictMatch = kwWords.every((kwWord) =>
    prodWords.some((prodWord) => wordsMatch(kwWord, prodWord))
  );
  if (strictMatch) return true;

  // 2. Loose fallback via core subject
  const kwCore = findCoreAliasKey(cleanedKeyword);
  const prodCore = findCoreAliasKey(product.cleaned_name);

  if (kwCore && prodCore && kwCore === prodCore) {
    const hasConflictingAdjective =
      (kwWords.includes("apple") && prodWords.includes("orange")) ||
      (kwWords.includes("orange") && prodWords.includes("apple")) ||
      (kwWords.includes("white") && prodWords.includes("brown")) ||
      (kwWords.includes("brown") && prodWords.includes("white")) ||
      (kwWords.includes("salted") && prodWords.includes("unsalted")) ||
      (kwWords.includes("unsalted") && prodWords.includes("salted"));

    if (!hasConflictingAdjective) {
      return true;
    }
  }

  return false;
}

export function compareShoppingList(
  list: { name: string; status: boolean }[],
  products: Product[]
): ComparedItem[] {
  const cleanedProducts = products.map((product) => ({
    ...product,
    cleaned_name: cleanProductName(product.product_name),
  }));

  return list
    .map((item) => {
      const keyword = item.name.trim();
      if (!keyword) return null;

      const matches = cleanedProducts
        .filter((product) => isGenuineMatch(keyword, product))
        // Prefer shorter product names (more specific)
        .sort(
          (a, b) =>
            a.cleaned_name.split(/\s+/).length - b.cleaned_name.split(/\s+/).length
        );

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
