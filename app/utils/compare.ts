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

/**
 * Returns all alias patterns for a given keyword (normalised to lowercase).
 * Falls back to the keyword itself if no alias entry exists.
 */
function getAliasPatterns(keyword: string): string[][] {
  const lower = keyword.toLowerCase().trim();
  return KEYWORD_ALIASES[lower] ?? [[lower]];
}

/** Tokens that are clearly size/quantity — not part of the product name. */
const SIZE_TOKEN = /^(\d+\.?\d*(g|kg|ml|cl|l|oz|lb|lbs)?|x\d+|\d+x|\d+)$/i;
const UNIT_TOKEN = /^(g|kg|ml|cl|l|oz|lb|lbs|pints?|litre?s?|pack|pk|each|ea|jar|tin|can|bag|box|bottle|btl)$/i;

function getMainWords(productWords: string[]): string[] {
  const words = [...productWords];
  while (words.length > 1) {
    const last = words[words.length - 1];
    if (SIZE_TOKEN.test(last) || UNIT_TOKEN.test(last)) {
      words.pop();
    } else {
      break;
    }
  }
  return words;
}

/**
 * For single-word keywords NOT in the alias map, fall back to the
 * "last meaningful word" heuristic to avoid false positives.
 */
function isKeywordMainSubject(keyword: string, productWords: string[]): boolean {
  const mainWords = getMainWords(productWords);
  if (mainWords.length === 0) return false;
  const lastWord = mainWords[mainWords.length - 1];
  const kw = keyword.toLowerCase();
  return (
    lastWord === kw ||
    lastWord === `${kw}s` ||
    lastWord === `${kw}es` ||
    kw === `${lastWord}s` ||
    kw === `${lastWord}es`
  );
}

function matchesAliasPatterns(keyword: string, cleanedName: string): boolean {
  const patterns = getAliasPatterns(keyword);
  return patterns.some((andTerms) =>
    andTerms.every((term) => {
      const escaped = escapeRegex(term.toLowerCase());
      const isAlphanumeric = /^[a-z0-9]+$/i.test(term);
      const regex = isAlphanumeric
        ? new RegExp(`\\b${escaped}\\b`, "i")
        : new RegExp(escaped, "i");
      return regex.test(cleanedName);
    })
  );
}

/**
 * Determines whether a product is a genuine match for the keyword.
 * Priority:
 *   1. If keyword has a known alias map → use it
 *   2. Otherwise → use last-word heuristic for single-word keywords
 *   3. Multi-word keywords without aliases → simple substring check
 */
function isGenuineMatch(keyword: string, product: Product & { cleaned_name: string }): boolean {
  const lower = keyword.toLowerCase().trim();
  const hasAlias = lower in KEYWORD_ALIASES;

  if (hasAlias) {
    return matchesAliasPatterns(lower, product.cleaned_name);
  }

  const productWords = product.cleaned_name.split(/\s+/).filter(Boolean);
  const keywordWords = lower.split(/\s+/).filter(Boolean);

  if (keywordWords.length === 1) {
    // Single word without alias: must be the main subject (last meaningful word)
    const escaped = escapeRegex(lower);
    const regex = new RegExp(`\\b${escaped}(?:es|s)?\\b`, "i");
    if (!regex.test(product.cleaned_name)) return false;
    return isKeywordMainSubject(lower, productWords);
  }

  // Multi-word: all words must appear
  return keywordWords.every((word) => {
    const escaped = escapeRegex(word);
    return new RegExp(`\\b${escaped}\\b`, "i").test(product.cleaned_name);
  });
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
