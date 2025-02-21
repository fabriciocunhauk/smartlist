"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Spinner from "@/app/components/Spinner";
import { classNames } from "@/app/utils/appearance";
import { useTheme } from "@/app/components/ThemeProvider";
import morrisons from "@/public/images/morrisons.svg";
import sainsburys from "@/public/images/sainsburys-logo.svg";
import lidl from "@/public/images/lidl.svg";
import tesco from "@/public/images/tesco-logo.svg";
import aldi from "@/public/images/aldi-logo.svg";
import asda from "@/public/images/asda.svg";
import { getDataFromIndexedDb } from "@/app/utils/getDataFromIndexedDb";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const supermarketLogos = [
  { id: 1, name: "morrisons", image: morrisons },
  { id: 2, name: "sainsbury’s", image: sainsburys },
  { id: 3, name: "lidl", image: lidl },
  { id: 4, name: "tesco", image: tesco },
  { id: 5, name: "aldi", image: aldi },
  { id: 6, name: "asda", image: asda },
];

interface Product {
  id: number;
  supermarket_name: string;
  product_name: string;
  price: string;
}

const Compare = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<{ name: string; status: boolean }[]>([]);
  const [lowestPriceProducts, setLowestPriceProducts] = useState<Product[]>([]);
  const [highestPriceProducts, setHighestPriceProducts] = useState<Product[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [showLowestPrice, setShowLowestPrice] = useState(true);

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
      <div
        style={{
          backgroundImage: `linear-gradient(to top, ${theme.colorCode} 50%, transparent)`,
        }}
        className="fixed bottom-20 flex justify-between text-xl font-semibold text-center w-full p-4"
      >
        <div
          className="flex flex-col items-center border border-orange bg-white/80 rounded-xl max-w-max px-4 py-2 text-red-500"
          onClick={() => setShowLowestPrice(false)}
        >
          <span>Other</span>
          <p className="flex gap-2 text-lg font-semibold">
            <span>£</span>
            <span>{highestTotal}</span>
          </p>
        </div>
        <div
          className="flex flex-col items-end border border-orange bg-white/80 rounded-xl max-w-max px-4 py-2 text-green-500"
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
    </div>
  );
};

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

  return productsToRender.map(
    ({ id, supermarket_name, product_name, price }) => (
      <Card key={id}>
        {supermarketLogos.find((logo) =>
          supermarket_name
            .toLocaleLowerCase()
            .split(" ")
            .some((word) =>
              logo.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())
            )
        ) && (
          <Image
            src={
              supermarketLogos.find((logo) =>
                supermarket_name
                  .toLocaleLowerCase()
                  .split(" ")
                  .some((word) =>
                    logo.name
                      .toLocaleLowerCase()
                      .includes(word.toLocaleLowerCase())
                  )
              )?.image.src
            }
            className="flex-shrink-0  w-20 h-16"
            alt={supermarket_name}
            width={
              supermarketLogos.find((logo) =>
                supermarket_name
                  .toLocaleLowerCase()
                  .split(" ")
                  .some((word) =>
                    logo.name
                      .toLocaleLowerCase()
                      .includes(word.toLocaleLowerCase())
                  )
              )?.image.width
            }
            height={
              supermarketLogos.find((logo) =>
                supermarket_name
                  .toLocaleLowerCase()
                  .split(" ")
                  .some((word) =>
                    logo.name
                      .toLocaleLowerCase()
                      .includes(word.toLocaleLowerCase())
                  )
              )?.image.height
            }
          />
        )}
        <p className="font-semibold text-xs md:text-base uppercase">
          {product_name}
        </p>
        <p
          className={classNames(
            "text-xl font-semibold",
            highestPrice.some((product) => product.id === id)
              ? "text-red-500"
              : "text-green-500"
          )}
        >
          £{price}
        </p>
      </Card>
    )
  );
};

export default Compare;
