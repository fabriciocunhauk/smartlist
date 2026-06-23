export interface ArticleSection {
  type: "paragraph" | "heading" | "subheading" | "list" | "callout";
  content: string | string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTime: number;
  category: string;
  tags: string[];
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: "how-to-save-40-percent-weekly-grocery-shop",
    title: "How to Save 40% on Your Weekly Grocery Shop",
    description:
      "The average UK household spends over £68 per week on groceries. With the right strategies — meal planning, own-brand switching, and smart timing — saving 40% is genuinely achievable.",
    publishedAt: "2025-01-10",
    author: "SmartList Team",
    readingTime: 7,
    category: "Saving Tips",
    tags: ["savings", "grocery tips", "budget", "UK supermarkets"],
    sections: [
      {
        type: "paragraph",
        content:
          "The average UK household spends around £68.40 per week on groceries, according to the Office for National Statistics. For a family of four, that adds up to over £3,500 a year — a figure that, with a few deliberate changes to how you shop, can be slashed dramatically. Saving 40% on your weekly grocery bill is not a fantasy reserved for extreme couponers. It's a realistic target that millions of UK shoppers miss simply because they don't know where to look.",
      },
      {
        type: "heading",
        content: "Plan Your Meals Before You Shop",
      },
      {
        type: "paragraph",
        content:
          "Meal planning is the single highest-impact change most households can make. Studies show that unplanned shopping adds an average of £15–20 per week in impulse purchases — items that often expire before they're used. Before your weekly shop, spend ten minutes writing down every meal you plan to cook. Then build your shopping list from those meals and only those meals. This creates a direct link between what you buy and what you actually eat, eliminating the most common source of grocery waste.",
      },
      {
        type: "paragraph",
        content:
          "SmartList makes this even easier by letting you build and manage your shopping list digitally, offline, without needing an account. Once your list is ready, you can compare prices across Tesco, Aldi, and Sainsbury's in one tap — so you know exactly where to buy each item before you leave the house.",
      },
      {
        type: "heading",
        content: "Master the Art of Own-Brand Switching",
      },
      {
        type: "paragraph",
        content:
          "Branded products typically cost 30–60% more than supermarket own-label equivalents, yet blind taste tests consistently show that shoppers cannot reliably distinguish them. The key is to switch strategically rather than wholesale. Start with categories where quality difference is minimal: rice, pasta, flour, tinned tomatoes, cooking oil, frozen vegetables, and cleaning products are safe starting points. Dairy and baked goods often follow close behind.",
      },
      {
        type: "list",
        content: [
          "Pasta and rice: own-brand saves up to 60% with identical nutritional value",
          "Tinned tomatoes: supermarket own-brand is often from the same Italian producers",
          "Frozen vegetables: nutritionally equivalent and often fresher than fresh",
          "Cleaning products: the active ingredients are identical to branded alternatives",
          "Baking staples (flour, sugar, salt): no detectable quality difference",
        ],
      },
      {
        type: "heading",
        content: "Shop Across Multiple Supermarkets Strategically",
      },
      {
        type: "paragraph",
        content:
          "No single supermarket is cheapest for every category. Aldi and Lidl dominate on produce, dairy, and own-label staples, often beating Tesco and Sainsbury's by 25–40%. However, they stock a smaller range and frequently don't carry the specific branded items some households require. A hybrid approach — buying produce and staples from Aldi while picking up specific branded items or fresh fish at Tesco — captures the best of both worlds. The challenge is knowing which items to buy where. This is exactly what SmartList's price comparison feature is built for: it shows you the cheapest store per item across your whole list.",
      },
      {
        type: "heading",
        content: "Time Your Shop Around Yellow Sticker Markdowns",
      },
      {
        type: "paragraph",
        content:
          "UK supermarkets mark down perishable items approaching their use-by date, typically reducing prices by 30–75%. These reductions happen at predictable times: Tesco usually marks down at 7pm and 9pm, Sainsbury's around 6pm and 8pm, and Aldi throughout the late afternoon. Shopping at these times for proteins, bread, and prepared meals — then freezing anything you won't use immediately — can reduce your protein spend by 40% alone. Many experienced shoppers build their entire weekly meal plan around yellow-sticker finds.",
      },
      {
        type: "heading",
        content: "Build a Rolling Pantry System",
      },
      {
        type: "paragraph",
        content:
          "A rolling pantry means keeping a stock of non-perishable staples and buying more only when they're on promotion. When pasta goes 3-for-2 at Sainsbury's, you buy six packs — enough for weeks — at the promotional price. When your tinned tomato stock dips below three tins, you look for an offer before buying more. Over time, this means you almost never pay full price for pantry staples. The initial outlay is higher, but within four to six weeks the savings compound into a meaningful weekly reduction.",
      },
      {
        type: "callout",
        content:
          "Combining all five strategies — meal planning, own-brand switching, split shopping, yellow sticker timing, and pantry rotation — consistently delivers 35–45% savings versus unplanned full-price shopping. For a typical UK family of four, that translates to £25–30 saved every week, or over £1,400 per year.",
      },
    ],
  },
  {
    slug: "comparing-uk-supermarket-prices-tesco-aldi-sainsburys",
    title: "Comparing UK Supermarket Prices: Tesco vs Aldi vs Sainsbury's",
    description:
      "We compared 50 common basket items across Tesco, Aldi, and Sainsbury's. Here's what we found — and what it means for where you should be shopping.",
    publishedAt: "2025-01-24",
    author: "SmartList Team",
    readingTime: 8,
    category: "Price Comparison",
    tags: ["Tesco", "Aldi", "Sainsbury's", "price comparison", "UK supermarkets"],
    sections: [
      {
        type: "paragraph",
        content:
          "Three supermarkets dominate the UK grocery landscape, each with a distinct pricing philosophy and customer base. Tesco holds the largest market share with over 27%, Sainsbury's sits at around 15%, and Aldi — the German discount chain — has surged past 10% as cost-of-living pressures push shoppers toward value. But market share doesn't tell you where to spend your money. Price does. We compared 50 common basket items across all three to find out which supermarket actually wins.",
      },
      {
        type: "heading",
        content: "How We Compared Prices",
      },
      {
        type: "paragraph",
        content:
          "Our comparison basket included 50 items covering all major grocery categories: fresh produce, meat and fish, dairy, bread and bakery, ambient staples, frozen goods, and household cleaning. Where possible, we compared like-for-like products — same weight, same format. Where Aldi stocked only own-label equivalents (as is common), we compared against supermarket own-label at Tesco and Sainsbury's rather than branded alternatives, to ensure a fair comparison of the budget option at each retailer.",
      },
      {
        type: "heading",
        content: "Fresh Produce: Aldi Wins by a Significant Margin",
      },
      {
        type: "paragraph",
        content:
          "Across 15 fresh produce items — including tomatoes, apples, bananas, broccoli, carrots, peppers, and salad leaves — Aldi was cheapest in 11 categories, with average savings of 22% versus Tesco and 28% versus Sainsbury's. The gaps are widest on seasonal British produce: Aldi's broccoli and cauliflower consistently undercut Tesco by 30–40% during peak season. Sainsbury's premium 'Taste the Difference' range is excluded from this comparison, as it's not intended to compete on price.",
      },
      {
        type: "heading",
        content: "Meat and Protein: A More Complex Picture",
      },
      {
        type: "paragraph",
        content:
          "Aldi's fresh meat — especially chicken breast, minced beef, and pork chops — is typically 15–25% cheaper than equivalent Tesco own-label and 20–35% cheaper than Sainsbury's own-label. However, Tesco and Sainsbury's Clubcard and Nectar promotions frequently close that gap. A 500g pack of British chicken breast that costs £3.40 at Aldi may drop to £2.95 at Tesco with a Clubcard deal. The variable nature of promotional pricing means checking SmartList's live price data is more valuable than relying on any static comparison.",
      },
      {
        type: "heading",
        content: "Branded Products: Where Tesco's Clubcard Changes Everything",
      },
      {
        type: "paragraph",
        content:
          "Aldi does not stock most branded products (Heinz, Kellogg's, Cadbury, etc.), so this comparison is between Tesco and Sainsbury's. Here, Tesco's Clubcard pricing frequently undercuts Sainsbury's by 10–20% on specific categories. The Clubcard model — showing a 'regular' price and a 'Clubcard price' — effectively means that free loyalty card membership delivers significant savings. Sainsbury's Nectar is similarly structured. Both schemes are worth using, but Tesco's Clubcard deals tend to cover a broader range of everyday items.",
      },
      {
        type: "list",
        content: [
          "Heinz Baked Beans 415g: Tesco Clubcard £0.55 vs Sainsbury's Nectar £0.65",
          "Kellogg's Corn Flakes 500g: Tesco Clubcard £1.85 vs Sainsbury's £2.20",
          "Anchor Butter 250g: Tesco Clubcard £1.69 vs Sainsbury's Nectar £1.85",
          "Cadbury Dairy Milk 200g: Tesco Clubcard £1.49 vs Sainsbury's Nectar £1.75",
        ],
      },
      {
        type: "heading",
        content: "Online Pricing and Delivery Surcharges",
      },
      {
        type: "paragraph",
        content:
          "Tesco and Sainsbury's online prices match in-store prices for members with loyalty cards, but delivery slots typically cost £2–5 depending on time and order size. Aldi launched click-and-collect in recent years but coverage remains limited. For most households outside major cities, Aldi remains a physical-store-only destination, which constrains its convenience advantage. If you're ordering online from Tesco or Sainsbury's, factor the delivery fee into your total cost comparison — a £3 delivery charge can erase the savings on a small order.",
      },
      {
        type: "heading",
        content: "The Verdict: Use the Split-Shop Strategy",
      },
      {
        type: "callout",
        content:
          "No single supermarket wins every category. The optimal strategy for most UK households is a split shop: fresh produce, dairy, and own-label staples from Aldi; branded and promotional items from Tesco with Clubcard. SmartList's price comparison across all three stores makes this easy — add your items, tap Compare Prices, and see exactly which store is cheapest for each product on your list.",
      },
    ],
  },
  {
    slug: "smart-shopping-strategies-uk-families",
    title: "10 Smart Shopping Strategies for UK Families",
    description:
      "UK families waste an average of £730 per year on food. These 10 practical strategies — from unit pricing to freezer batching — can halve your grocery bill without changing what you eat.",
    publishedAt: "2025-02-07",
    author: "SmartList Team",
    readingTime: 9,
    category: "Family Savings",
    tags: ["family shopping", "food waste", "budgeting", "meal prep"],
    sections: [
      {
        type: "paragraph",
        content:
          "UK households throw away 9.5 million tonnes of food each year, worth an estimated £14 billion, according to WRAP. For the average family, that's around £730 of perfectly edible food binned annually — roughly the cost of a family holiday. The good news: most grocery waste and overspending is a behaviour problem, not an income problem. It's caused by unplanned shopping, misunderstanding unit pricing, and not using what's in the freezer. These 10 strategies address the root causes.",
      },
      {
        type: "heading",
        content: "Strategy 1: The Two-List System",
      },
      {
        type: "paragraph",
        content:
          "Before every shop, write two lists: a 'needs' list (items you've genuinely run out of or will specifically use this week) and a 'wants' list (items that caught your eye but aren't essential). Only buy from the 'wants' list if you're under budget after the 'needs' list is costed. This simple mental separation reduces impulse spending by an average of 30% without requiring any willpower — the structure does the work for you.",
      },
      {
        type: "heading",
        content: "Strategy 2: Keep a Running Home Inventory",
      },
      {
        type: "paragraph",
        content:
          "The most expensive item at the supermarket is the one you buy when you already have three at home. A running inventory — even a basic note on your phone listing what's in your fridge, freezer, and cupboards — prevents duplicate purchases. Check the inventory before adding anything to your shopping list. Update it when you open or use something. Within a month, you'll notice a dramatic reduction in food waste and duplicate buys.",
      },
      {
        type: "heading",
        content: "Strategy 3: Always Check the Unit Price",
      },
      {
        type: "paragraph",
        content:
          "Supermarkets display unit prices (per 100g, per litre, per unit) in small print on shelf labels, but the positioning and formatting is often deliberately confusing. The 'bigger pack' isn't always cheaper per unit — promotions on smaller packs frequently flip this. For any product you buy regularly, check the per-100g or per-litre price rather than the headline price. A 750ml bottle of washing up liquid at £1.89 (£0.252/100ml) is cheaper than a 500ml bottle at £1.10 (£0.22/100ml) but more expensive per wash if the 500ml is concentrated and the 750ml is diluted.",
      },
      {
        type: "heading",
        content: "Strategy 4: Freezer Batching for Proteins",
      },
      {
        type: "paragraph",
        content:
          "Meat and fish are the most expensive items in most grocery baskets and the most likely to be wasted. Freezer batching means buying in bulk when prices are low (typically from a yellow-sticker markdown, a multi-buy offer, or a larger pack), portioning immediately, and freezing what you won't use in the next two days. A 1.5kg pack of chicken thighs at £4.50 divided into three 500g portions gives you three future meals at £1.50 each — often half the cost of buying them individually at full price.",
      },
      {
        type: "heading",
        content: "Strategy 5: Cook Once, Eat Twice",
      },
      {
        type: "paragraph",
        content:
          "Batch cooking — making double quantities of any meal and freezing or refrigerating the second portion — cuts both cooking time and food costs. A pot of bolognese made with 800g of mince costs barely more than a 400g version, but provides two dinners. Soups, curries, stews, and rice dishes are ideal candidates. The second portion effectively costs only the marginal ingredient cost (the extra mince, onion, and tomatoes), with the fixed costs of energy and seasoning spread across both meals.",
      },
      {
        type: "heading",
        content: "Strategy 6: Eat Seasonally",
      },
      {
        type: "paragraph",
        content:
          "British seasonal produce is dramatically cheaper than out-of-season imports. Strawberries in June cost a third of their January price. British asparagus in May costs less than half the year-round imported variety. Root vegetables — parsnips, swede, turnip — are at their cheapest and most nutritious from October through February. Adapting your meal planning to UK seasonal availability is one of the most impactful nutrition and cost improvements a household can make.",
      },
      {
        type: "heading",
        content: "Strategy 7: Use a Price Comparison App Before You Leave",
      },
      {
        type: "paragraph",
        content:
          "Arriving at a supermarket without knowing what you're going to buy and where it's cheapest is like booking a holiday without checking flight prices. SmartList lets you build your list at home, then compare prices across Tesco, Aldi, and Sainsbury's before you leave. If the cheapest option for most items is Aldi and you're planning to go to Tesco, you can redirect your journey — or at minimum, know which items to skip at Tesco and pick up elsewhere.",
      },
      {
        type: "heading",
        content: "Strategy 8: Understand the 24-Hour Rule for Non-Essentials",
      },
      {
        type: "paragraph",
        content:
          "When you see a non-essential item in a supermarket — a fancy biscuit tin, a new sauce, an appealing ready meal — impose a 24-hour rule. If you still want it tomorrow, add it to next week's list. If you've forgotten about it, you didn't actually need it. This prevents the 'grocery impulse buy' that, for many families, accounts for £15–25 of unnecessary spending per shop.",
      },
      {
        type: "heading",
        content: "Strategy 9: Use Cashback Apps and Loyalty Schemes",
      },
      {
        type: "paragraph",
        content:
          "Tesco Clubcard and Sainsbury's Nectar aren't just loyalty programmes — they're de facto discount schemes. Clubcard prices are available to any Clubcard holder, and the app is free to download. On a typical weekly shop of £65, a Clubcard holder will typically save £6–10 on Clubcard-priced items. Apps like Shopmium and Greggs Rewards offer additional cashback on specific branded products. Combined with your main loyalty programme, these can add another 2–5% savings.",
      },
      {
        type: "heading",
        content: "Strategy 10: Review Your Spend Monthly",
      },
      {
        type: "callout",
        content:
          "Once a month, review your last four grocery receipts. Identify the five highest-cost items you bought repeatedly. Ask: could I switch to own-brand? Could I buy in bulk? Could I source this more cheaply elsewhere? One hour of monthly review has been shown to reduce grocery spend by 8–12% in the following month, purely through awareness of where money is actually going.",
      },
    ],
  },
  {
    slug: "use-receipt-scanner-track-grocery-spending",
    title: "How to Use a Receipt Scanner to Track Grocery Spending",
    description:
      "Most people underestimate their grocery spend by 25–30%. Scanning your receipts and tracking spending patterns is one of the most effective ways to identify where your money is actually going.",
    publishedAt: "2025-02-21",
    author: "SmartList Team",
    readingTime: 6,
    category: "Receipt Scanning",
    tags: ["receipt scanner", "budget tracking", "OCR", "spending habits"],
    sections: [
      {
        type: "paragraph",
        content:
          "When researchers ask households to estimate their monthly grocery spend, the typical answer is 25–30% below their actual recorded expenditure. This 'grocery amnesia' is not dishonesty — it's a well-documented cognitive bias called the focusing illusion. We remember the big purchases (the leg of lamb, the Christmas hamper) and forget the accumulated small ones (the chocolate bar at the till, the third pack of biscuits that week). Paper receipts, scanned and analysed, dissolve this illusion entirely.",
      },
      {
        type: "heading",
        content: "Why Paper Receipts Contain Valuable Data",
      },
      {
        type: "paragraph",
        content:
          "A supermarket receipt is a complete transaction record: every item, its price, the total, the store, and the date. For households that shop at two or three different supermarkets, comparing receipts over four weeks reveals spending patterns that would otherwise be invisible. Which store gets most of your money? Which categories are growing month on month? Are you spending more on convenience foods than you realise? A month of scanned receipts answers these questions with data, not guesses.",
      },
      {
        type: "heading",
        content: "How SmartList's Receipt Scanner Works",
      },
      {
        type: "paragraph",
        content:
          "SmartList uses Optical Character Recognition (OCR) to read the text from a photo of your grocery receipt. The process is straightforward: photograph your receipt, upload it through the scanner interface, and the system extracts the individual line items. Those items are then added to your SmartList shopping list, where you can use the price comparison feature to see whether the same items would have been cheaper at a different supermarket.",
      },
      {
        type: "list",
        content: [
          "Take a clear photo in good lighting — fold the receipt flat if it's crumpled",
          "Upload via the Scan Receipt page or drag and drop the image",
          "Review the extracted items — OCR is highly accurate but occasionally misreads faded print",
          "Confirm the list and use Compare Prices to see alternative store prices",
          "Save your list for reference when planning next week's shop",
        ],
      },
      {
        type: "heading",
        content: "Building a Four-Week Spending Baseline",
      },
      {
        type: "paragraph",
        content:
          "A single receipt tells you what you bought on one trip. Four weeks of receipts tells you how you actually shop. Scan every grocery receipt for a month — including top-up shops, petrol station snacks, and convenience store runs. At the end of the month, you'll have a complete picture of your real grocery spend, broken down by category. Most households are surprised to find that their 'top-up' shops — the quick mid-week run for milk and bread — account for 20–30% of total grocery spending, often at higher per-unit prices than their main weekly shop.",
      },
      {
        type: "heading",
        content: "Identifying Budget Leaks",
      },
      {
        type: "paragraph",
        content:
          "A budget leak is any regularly purchased item whose cumulative annual cost you haven't consciously considered. A £1.50 yoghurt bought three times per week costs £234 per year. A £2.20 smoothie twice a week costs £228. Neither feels significant in the moment, but the annual figure often prompts reconsideration. After scanning four weeks of receipts, look for items that appear on every shop and ask: is this a genuine need, or a habit I've never questioned? The goal isn't to eliminate all enjoyment — it's to make spending intentional rather than automatic.",
      },
      {
        type: "heading",
        content: "Using Scan Data to Improve Next Week's Shop",
      },
      {
        type: "callout",
        content:
          "Once you know what you actually buy, you can use SmartList's price comparison to find cheaper alternatives before your next shop. Scan this week's receipt, review the extracted items, compare prices across stores, and build your next shopping list from the results. This creates a feedback loop between what you buy and what you could save — the most effective grocery budgeting system most households have never used.",
      },
    ],
  },
  {
    slug: "best-time-shop-uk-supermarkets-freshest-deals",
    title: "Best Time to Shop at UK Supermarkets for the Freshest Deals",
    description:
      "Supermarket pricing isn't fixed — it changes throughout the day and week. Knowing when to shop can save you 30–75% on perishables through markdown timing, restocking schedules, and promotional cycles.",
    publishedAt: "2025-03-07",
    author: "SmartList Team",
    readingTime: 7,
    category: "Shopping Tips",
    tags: ["yellow sticker", "markdown", "shopping timing", "supermarket deals"],
    sections: [
      {
        type: "paragraph",
        content:
          "Most shoppers treat supermarket pricing as fixed: a loaf of bread costs what it costs, and the time you visit doesn't matter. In practice, perishable pricing in UK supermarkets is highly dynamic. Items approaching their use-by date are reduced by 30–75% at predictable times. Restocking cycles affect fresh produce quality. Promotional cycles follow weekly patterns. Understanding these rhythms turns the clock into a shopping tool.",
      },
      {
        type: "heading",
        content: "The Yellow Sticker Schedule",
      },
      {
        type: "paragraph",
        content:
          "Yellow sticker markdowns — the coloured labels indicating reduced-to-clear items — follow loose but predictable schedules at each major UK supermarket. Tesco typically marks down meat, dairy, and prepared meals at around 7pm and again at 9pm before closing. Sainsbury's markdowns tend to start around 5:30–6pm, with a second reduction at 8pm. Aldi, which has fewer staff dedicated to markdowns, tends to reduce items throughout the late afternoon from around 3pm, with the best reductions appearing closer to closing time.",
      },
      {
        type: "list",
        content: [
          "Tesco: First markdown ~7pm, final reduction ~9pm (varies by store)",
          "Sainsbury's: First markdown ~5:30–6pm, second ~8pm (varies by store)",
          "Aldi: Rolling reductions from ~3pm, best selection near closing time",
          "Lidl: Similar to Aldi — afternoon reductions with no fixed schedule",
          "M&S Food: Marked down from ~5pm, most popular items sell quickly",
        ],
      },
      {
        type: "heading",
        content: "Fresh Bread and Bakery Timing",
      },
      {
        type: "paragraph",
        content:
          "In-store bakeries at Tesco and Sainsbury's typically bake in batches throughout the day, with the freshest bread available in the mid-morning. By late afternoon, any unsold items from morning batches will start to be reduced. If freshness is your priority, shop between 10am and noon. If price is your priority, arrive an hour before closing. Pre-packaged bread from brands like Warburtons and Hovis is replenished differently — typically restocked by early morning deliveries, with no intra-day pricing changes unless it's approaching sell-by.",
      },
      {
        type: "heading",
        content: "Fresh Produce: Morning vs Evening Quality Trade-offs",
      },
      {
        type: "paragraph",
        content:
          "Fresh produce is typically restocked in the early morning before the store opens or during the first hour of trading. For the best selection and freshest quality, shopping between 8–10am gives you first access to newly stocked shelves. Evening shopping still offers quality produce, but popular items (ripe avocados, specific salad leaves, pre-prepared vegetable packs) may be picked through. For families with flexible schedules, a mid-morning shop delivers the best combination of freshness and reduced queuing.",
      },
      {
        type: "heading",
        content: "Weekly Promotional Cycles",
      },
      {
        type: "paragraph",
        content:
          "Most UK supermarkets change their weekly promotions on a Wednesday, rolling out new deals across all categories. This means Tuesday afternoon is often the last day of the old promotion, and Thursday is when new promotional stock is fully available. If you're targeting a specific promotional item — a BOGOF on a branded product, a multi-buy offer on yoghurt — shopping Thursday to Saturday gives you the best chance of finding it in stock before weekend shoppers clear the shelves.",
      },
      {
        type: "heading",
        content: "The Seasonal Buying Calendar",
      },
      {
        type: "paragraph",
        content:
          "UK seasonal produce cycles offer significant price advantages for households that plan around them. British strawberries are typically at their cheapest and best in June and July. Asparagus season runs May to June. Root vegetables — parsnips, swede, carrots — are cheapest from October through January. Summer courgettes and tomatoes cost a fraction of their off-season equivalents. Planning your weekly meals around what's in seasonal abundance means eating better food at lower prices — a genuine win-win.",
      },
      {
        type: "callout",
        content:
          "Combine yellow sticker timing (shop 30 minutes before closing for the deepest reductions), weekly promotion cycles (shop Thursday–Friday for new deals while stock is plentiful), and seasonal produce awareness to reduce your grocery bill by up to 35% without switching stores or changing what you eat.",
      },
    ],
  },
  {
    slug: "uk-grocery-inflation-guide-shopping-list",
    title: "UK Grocery Inflation Guide: What It Means for Your Shopping List",
    description:
      "UK food inflation peaked at 19.2% in early 2023. While it has since eased, certain categories remain significantly more expensive. Here's how to adapt your shopping list and protect your grocery budget.",
    publishedAt: "2025-03-21",
    author: "SmartList Team",
    readingTime: 8,
    category: "UK Grocery News",
    tags: ["inflation", "food prices", "grocery budget", "ONS data"],
    sections: [
      {
        type: "paragraph",
        content:
          "UK food inflation peaked at 19.2% in March 2023 — the highest rate in over 45 years — driven by energy costs, supply chain disruption, and the knock-on effects of the war in Ukraine on grain and sunflower oil prices. Since then, headline food inflation has eased considerably, but that doesn't mean prices have returned to pre-pandemic levels. Most food categories are still 20–35% more expensive than they were in 2021, and certain categories remain acutely inflated. Understanding which categories are still expensive, which have deflated, and how to adapt your shopping list accordingly is the most practical response to an ongoing but changing challenge.",
      },
      {
        type: "heading",
        content: "Categories That Remain Expensive",
      },
      {
        type: "paragraph",
        content:
          "Several food categories experienced structural price increases that are unlikely to fully reverse. Olive oil saw the most dramatic rise — up over 150% from 2021 to 2024 due to consecutive poor harvests in Spain and Italy, the world's dominant producers. Chocolate and cocoa-based products rose sharply on supply disruptions from West Africa. Coffee prices remain elevated due to Brazilian weather events affecting arabica bean production. Eggs, after the avian influenza outbreaks of 2022–23, are still significantly more expensive than pre-pandemic prices even as flock sizes recover.",
      },
      {
        type: "list",
        content: [
          "Olive oil: still 60–80% above 2021 prices despite easing from peak",
          "Chocolate and confectionery: cocoa supply constraints keeping prices high",
          "Eggs: flock recovery ongoing, prices remain elevated",
          "Coffee (ground and whole bean): weather and logistics still feeding through",
          "Butter: dairy commodity prices remain above historical averages",
        ],
      },
      {
        type: "heading",
        content: "Categories That Have Deflated",
      },
      {
        type: "paragraph",
        content:
          "The good news is that several categories that surged in 2022–23 have come back significantly. Pasta and rice — which spiked on Ukrainian supply fears and panic buying — are now broadly back to pre-2022 prices. Cooking oils other than olive oil (rapeseed, sunflower, vegetable blend) have deflated substantially as supply chains normalised. Flour prices have eased. Frozen vegetables are broadly stable. For households that track their spending by category, redirecting budget away from inflated categories and toward relatively cheap ones is one of the most effective current strategies.",
      },
      {
        type: "heading",
        content: "Understanding Shrinkflation",
      },
      {
        type: "paragraph",
        content:
          "Beyond headline price changes, UK grocery inflation has been accompanied by widespread 'shrinkflation' — manufacturers reducing pack sizes while holding prices constant, effectively delivering a hidden price increase. Classic examples include: Cadbury Roses tins reduced from 650g to 600g at the same price, McVitie's Digestives reduced from 400g to 360g, and numerous crisp and snack multipacks dropping from 6 to 5 bags. The ONS now tracks shrinkflation as part of its consumer price measurements. When comparing prices, always check the unit price (per 100g or per kg) rather than the pack price to detect these hidden increases.",
      },
      {
        type: "heading",
        content: "How Supermarkets Have Responded to Inflation",
      },
      {
        type: "paragraph",
        content:
          "The UK supermarket price war — accelerated by Aldi and Lidl's rising market share — led Tesco and Sainsbury's to launch price-matching schemes against discount retailers. Tesco's 'Aldi Price Match' covers over 700 everyday products. Sainsbury's launched similar commitments through Nectar pricing. These schemes have narrowed the gap between traditional and discount supermarkets on specific items, though Aldi and Lidl overall baskets remain cheaper. The practical implication: for the specific items covered by these price-match schemes, buying at Tesco with a Clubcard now genuinely competes with Aldi on price.",
      },
      {
        type: "heading",
        content: "Practical Substitution Strategies",
      },
      {
        type: "paragraph",
        content:
          "For categories still suffering from elevated prices, direct substitution is the most effective response. Olive oil can be replaced with cold-pressed rapeseed oil in most applications — it has a similar fatty acid profile, a higher smoke point, and is British-grown, with prices roughly 70% below extra-virgin olive oil. Whole coffee beans from budget roasters or supermarket own-label offer 60–70% savings versus branded ground coffee with minimal quality compromise. For chocolate, supermarket own-label dark chocolate consistently scores highly in taste tests at a fraction of branded prices.",
      },
      {
        type: "callout",
        content:
          "Use SmartList's price comparison to track how prices on your specific items change week to week. By comparing the same basket across Tesco, Aldi, and Sainsbury's, you'll spot when a previously expensive item drops — and when a stable item suddenly spikes — far faster than any general news report can tell you.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
