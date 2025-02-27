"use client";
import React, { useEffect, useState, useCallback } from "react";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Spinner from "@/app/components/Spinner";
import { classNames } from "@/app/utils/appearance";
import { useTheme } from "@/app/context/ThemeContext";
import { getDataFromIndexedDb } from "@/app/utils/getDataFromIndexedDb";
import { useToastMessage } from "@/app/context/ToastMessageContext";
import PriceComparisonFooter from "@/app/components/compare-prices/PriceComparisonFooter";
import RenderProductCards from "@/app/components/compare-prices/RenderProductCards";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  id: number;
  supermarket_name: string;
  product_name: string;
  price: string;
}

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
