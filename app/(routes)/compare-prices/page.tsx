"use client";
import React, { useEffect, useState, useCallback } from "react";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import morrisons from "@/public/images/morrisons.svg";
import sainsburys from "@/public/images/sainsburys-logo.svg";
import lidl from "@/public/images/lidl.svg";
import tesco from "@/public/images/tesco-logo.svg";
import aldi from "@/public/images/aldi-logo.svg";
import asda from "@/public/images/asda.svg";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const supermarketLogos = [
  { id: 1, name: "morrison", image: morrisons },
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

interface ListItem {
  name: string;
  status: boolean;
}

const Compare = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<ListItem[]>([]);
  const [filteredProductsLowPrice, setFilteredProductsLowPrice] = useState<
    Product[]
  >([]);
  const [filteredProductsHighPrice, setFilteredProductsHighPrice] = useState<
    Product[]
  >([]);
  const [highestPrice, setHighestPrice] = useState<number | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [isLowestPrice, setIsLowestPrice] = useState<boolean>(true);
  const backgroundGradient = `linear-gradient(to top, #FBB14B, 50%, transparent)`;

  useEffect(() => {
    const storedList = localStorage.getItem("list_item");
    if (storedList) {
      setList(JSON.parse(storedList));
    }

    if (BASE_URL) {
      fetch(`${BASE_URL}/api/price-list`)
        .then((response) => response.json())
        .then((fetchedProducts: Product[]) => {
          setProducts(fetchedProducts);
          const initialFiltered = filterProducts(
            fetchedProducts,
            JSON.parse(storedList || "[]"),
            "lowest"
          );
          setFilteredProductsLowPrice(initialFiltered);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, []);

  useEffect(() => {
    const updatedFilteredLowestPrice = filterProducts(products, list, "lowest");
    const updatedFilteredHighestPrice = filterProducts(
      products,
      list,
      "highest"
    );
    setFilteredProductsLowPrice(updatedFilteredLowestPrice);
    setFilteredProductsHighPrice(updatedFilteredHighestPrice);
  }, [list, products]);

  const filterProducts = useCallback(
    (
      allProducts: Product[],
      currentList: ListItem[],
      type: "lowest" | "highest"
    ): Product[] => {
      const cleanedProducts = allProducts.map((product) => ({
        ...product,
        product_name: product.product_name
          .replace(/£\d+\.\d+[a-zA-Z]?/g, "")
          .trim(),
      }));

      const filtered = cleanedProducts.filter((product) =>
        currentList.some((item) =>
          product.product_name
            .toLocaleLowerCase()
            .includes(item.name.toLocaleLowerCase())
        )
      );

      const groupedProducts = filtered.reduce(
        (acc: { [key: string]: Product[] }, product) => {
          const name = product.product_name.toLocaleLowerCase();
          if (!acc[name]) {
            acc[name] = [];
          }
          acc[name].push(product);
          return acc;
        },
        {}
      );

      return Object.values(groupedProducts).map((group) =>
        group.reduce((minProduct, currentProduct) => {
          const currentPrice = parseFloat(currentProduct.price);
          const minPrice = parseFloat(minProduct.price);
          return type === "lowest"
            ? currentPrice < minPrice
              ? currentProduct
              : minProduct
            : currentPrice > minPrice
            ? currentProduct
            : minProduct;
        })
      );
    },
    []
  );

  const calculatePrices = useCallback(
    (productsToCalculate: Product[], type: "highest" | "lowest") => {
      const prices: { [product: string]: number } = {};
      let sum = 0;

      productsToCalculate.forEach((product) => {
        const productName = product.product_name.toLocaleLowerCase();
        const price = parseFloat(product.price);

        if (
          !prices[productName] ||
          (type === "highest"
            ? price > prices[productName]
            : price < prices[productName])
        ) {
          prices[productName] = price;
        }
      });

      sum = Object.values(prices).reduce((acc, p) => acc + p, 0);

      return { prices, sum: parseFloat(sum.toFixed(2)) };
    },
    []
  );

  useEffect(() => {
    if (
      filteredProductsLowPrice.length > 0 ||
      filteredProductsHighPrice.length > 0
    ) {
      const { sum: lowestSum } = calculatePrices(
        filteredProductsLowPrice,
        "lowest"
      );
      const { sum: highestSum } = calculatePrices(
        filteredProductsHighPrice,
        "highest"
      );

      console.log({ filteredProductsLowPrice, filteredProductsHighPrice });

      setHighestPrice(highestSum);
      setLowestPrice(lowestSum);
    } else {
      setHighestPrice(null);
      setLowestPrice(null);
    }
  }, [
    filteredProductsLowPrice,
    calculatePrices,
    products,
    filteredProductsHighPrice,
  ]);

  const renderProductCards = useCallback(() => {
    const productsToRender = isLowestPrice
      ? filteredProductsLowPrice
      : filteredProductsHighPrice.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );

    return productsToRender.map(
      ({ id, supermarket_name, product_name, price }) => (
        <Card key={id}>
          {supermarketLogos.map((logo) => {
            if (
              supermarket_name
                .toLocaleLowerCase()
                .split(" ")
                .some((word) => logo.name.toLocaleLowerCase().includes(word))
            ) {
              return (
                <Image
                  key={logo.id}
                  src={logo.image.src}
                  className="flex-shrink-0 object-cover w-20"
                  alt="Receipt Preview"
                  width={logo.image.width}
                  height={logo.image.height}
                />
              );
            }
          })}

          <p className="font-semibold text-xs md:text-base uppercase">
            {product_name}
          </p>
          <p className="text-xl font-semibold text-green-500">£{price}</p>
        </Card>
      )
    );
  }, [filteredProductsLowPrice, filteredProductsHighPrice, isLowestPrice]);

  const saveTotal = () => {
    if (highestPrice !== null && lowestPrice !== null) {
      return highestPrice - lowestPrice;
    }
    return 0;
  };

  const formattedHighestPrice =
    highestPrice !== null ? highestPrice.toFixed(2) : null;
  const formattedLowestPrice =
    lowestPrice !== null ? lowestPrice.toFixed(2) : null;
  const formattedSaveTotal = saveTotal().toFixed(2);

  return (
    <div className="h-screen">
      <Header />
      <Container>
        <div className="flex flex-col gap-4 overflow-auto py-24">
          {renderProductCards()}
        </div>
      </Container>
      <Navbar />
      <div
        style={{ backgroundImage: backgroundGradient }}
        className="fixed bottom-20 flex justify-between text-xl font-semibold text-center w-full p-4"
      >
        <div
          className="flex items-center gap-2 border border-orange bg-white/80 rounded-xl max-w-max p-2 text-red-500"
          onClick={() => setIsLowestPrice(false)}
        >
          <p className="flex gap-2 text-xl font-semibold">
            <span>£</span>
            <span>{formattedHighestPrice}</span>
          </p>
        </div>

        <div
          className="flex flex-col items-end border border-orange bg-white/80 rounded-xl max-w-max p-2 text-green-500"
          onClick={() => setIsLowestPrice(true)}
        >
          <p className="flex gap-2 text-xl font-semibold">
            <span>£</span>
            <span>{formattedLowestPrice}</span>
          </p>

          <span className="text-xs">Save {formattedSaveTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Compare;
