"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Spinner from "@/app/components/Spinner";
import { classNames } from "@/app/utils/appearance";
import { useTheme } from "@/app/context/ThemeContext";
import morrisons from "@/public/images/morrisons.svg";
import sainsburys from "@/public/images/sainsburys-logo.svg";
import lidl from "@/public/images/lidl.svg";
import tesco from "@/public/images/tesco-logo.svg";
import aldi from "@/public/images/aldi-logo.svg";
import asda from "@/public/images/asda.svg";
import { getDataFromIndexedDb } from "@/app/utils/getDataFromIndexedDb";
import { useToastMessage } from "@/app/context/ToastMessageProvider";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const supermarketLogos = [
  {
    image: morrisons,
    nameVariants: ["morrisons", "morrison"],
    alt: "Morrisons",
  },
  {
    image: sainsburys,
    nameVariants: ["sainsburys", "sainsbury’s", "sainsbury"],
    alt: "Sainsbury's",
  },
  {
    image: lidl,
    nameVariants: ["lidl"],
    alt: "Lidl",
  },
  {
    image: tesco,
    nameVariants: ["tesco"],
    alt: "Tesco",
  },
  {
    image: aldi,
    nameVariants: ["aldi"],
    alt: "Aldi",
  },
  {
    image: asda,
    nameVariants: ["asda"],
    alt: "Asda",
  },
];

interface Product {
  id: number;
  supermarket_name: string;
  product_name: string;
  price: string;
}

const PriceComparisonFooter = ({
  lowestTotal,
  highestTotal,
  saveTotal,
  setShowLowestPrice,
  theme,
}: {
  lowestTotal: string;
  highestTotal: string;
  saveTotal: string;
  setShowLowestPrice: (value: boolean) => void;
  theme: any;
}) => (
  <div
    style={{
      backgroundImage: `linear-gradient(to top, ${theme.colorCode} 50%, transparent)`,
    }}
    className="fixed bottom-20 flex justify-between text-xl font-semibold text-center w-full p-4"
  >
    <div
      style={{ borderColor: theme.colorCode }}
      className="flex flex-col items-center border bg-white/80 rounded-xl max-w-max px-4 py-2 text-red-500"
      onClick={() => setShowLowestPrice(false)}
    >
      <span>Other</span>
      <p className="flex gap-2 text-lg font-semibold">
        <span>£</span>
        <span>{highestTotal}</span>
      </p>
    </div>
    <div
      style={{ borderColor: theme.colorCode }}
      className="flex flex-col items-end border bg-white/80 rounded-xl max-w-max px-4 py-2 text-green-500"
      onClick={() => setShowLowestPrice(true)}
    >
      <span>SmartList</span>
      <p className="flex text-lg font-semibold">
        <span>£</span>
        <span>{lowestTotal}</span>
      </p>
      <span className="text-xs">Save £{saveTotal}</span>
    </div>
  </div>
);

// New component for supermarket logo
const SupermarketLogo = ({ supermarketName }: { supermarketName: string }) => {
  const normalizeName = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]/g, "");

  const logo = supermarketLogos.find((logo) => {
    const cleanSupermarketName = normalizeName(supermarketName);
    return logo.nameVariants.some((variant) =>
      cleanSupermarketName.includes(normalizeName(variant))
    );
  });

  if (!logo) return null;

  return (
    <Image
      src={logo.image}
      className="flex-shrink-0 w-20 h-16 object-contain"
      alt={logo.alt}
      width={logo.image.width}
      height={logo.image.height}
    />
  );
};

const ProductPrice = ({
  price,
  isHighest,
}: {
  price: string;
  isHighest: boolean;
}) => (
  <p
    className={classNames(
      "text-xl font-semibold",
      isHighest ? "text-red-500" : "text-green-500"
    )}
  >
    £{price}
  </p>
);

const ProductCard = ({
  product,
  highestPrice,
}: {
  product: Product;
  highestPrice: Product[];
}) => (
  <Card>
    <SupermarketLogo supermarketName={product.supermarket_name} />
    <p className="font-semibold text-xs md:text-base uppercase">
      {product.product_name}
    </p>
    <ProductPrice
      price={product.price}
      isHighest={highestPrice.some((p) => p.id === product.id)}
    />
  </Card>
);

const RenderProductCards: React.FC<{
  showLowestPrice: boolean;
  lowestPriceProducts: Product[];
  highestPriceProducts: Product[];
  products: Product[];
}> = ({
  showLowestPrice,
  lowestPriceProducts,
  highestPriceProducts,
  products,
}) => {
  const productsToRender = showLowestPrice
    ? lowestPriceProducts
    : highestPriceProducts;

  const highestPrice = highestPriceProducts.filter((high) =>
    products.some(
      (product) =>
        product.product_name === high.product_name &&
        product.price !== high.price
    )
  );

  return productsToRender.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      highestPrice={highestPrice}
    />
  ));
};

// Main Compare component
const Compare = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<{ name: string; status: boolean }[]>([]);
  const [lowestPriceProducts, setLowestPriceProducts] = useState<Product[]>([]);
  const [highestPriceProducts, setHighestPriceProducts] = useState<Product[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [showLowestPrice, setShowLowestPrice] = useState(true);
  const { theme } = useTheme();
  const { setToastContent } = useToastMessage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (BASE_URL) {
          const response = await fetch(`${BASE_URL}/api/price-list`);
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const fetchedProducts: Product[] = await response.json();
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setToastContent({
          active: true,
          color: "error",
          message: "Error fetching products, please try again later!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const getListFromIndexDb = async () => {
      const dbName = "list_db";
      const storeName = "list_store";
      const storedList = await getDataFromIndexedDb(dbName, storeName);
      if (storedList) setList(storedList);
    };

    getListFromIndexDb();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const filteredProducts = filterProducts(products, list);
      setLowestPriceProducts(findMinMaxPrices(filteredProducts, "lowest"));
      setHighestPriceProducts(findMinMaxPrices(filteredProducts, "highest"));
    }
  }, [products, list, loading]);

  const filterProducts = useCallback(
    (
      allProducts: Product[],
      currentList: { name: string; status: boolean }[]
    ) =>
      allProducts
        .map((product) => ({
          ...product,
          product_name: product.product_name
            .replace(/£\d+\.\d+[a-zA-Z]?/g, "")
            .trim(),
        }))
        .filter((product) =>
          currentList.some((item) =>
            product.product_name.toLowerCase().includes(item.name.toLowerCase())
          )
        ),
    []
  );

  const findMinMaxPrices = useCallback(
    (productsToCalculate: Product[], type: "highest" | "lowest") =>
      Object.values(
        productsToCalculate.reduce((acc, product) => {
          const name = product.product_name.toLowerCase();
          acc[name] = [...(acc[name] || []), product];
          return acc;
        }, {} as Record<string, Product[]>)
      ).map((group) =>
        group.reduce(
          (minMax, current) =>
            parseFloat(current.price) < parseFloat(minMax.price) ===
            (type === "lowest")
              ? current
              : minMax,
          group[0]
        )
      ),
    []
  );

  const calculateTotal = (products: Product[]) =>
    products.reduce((acc, p) => acc + parseFloat(p.price), 0).toFixed(2);

  const lowestTotal = calculateTotal(lowestPriceProducts);
  const highestTotal = calculateTotal(highestPriceProducts);
  const saveTotal = (
    parseFloat(highestTotal) - parseFloat(lowestTotal)
  ).toFixed(2);

  return (
    <div className={classNames("h-full relative pb-52 pt-24", theme.secondary)}>
      <Header />
      <Container>
        <div className="flex flex-col gap-4 overflow-auto">
          {loading ? (
            <Spinner />
          ) : (
            <RenderProductCards
              showLowestPrice={showLowestPrice}
              lowestPriceProducts={lowestPriceProducts}
              highestPriceProducts={highestPriceProducts}
              products={products}
            />
          )}
        </div>
      </Container>
      <Navbar />
      <PriceComparisonFooter
        lowestTotal={lowestTotal}
        highestTotal={highestTotal}
        saveTotal={saveTotal}
        setShowLowestPrice={setShowLowestPrice}
        theme={theme}
      />
    </div>
  );
};

export default Compare;
