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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [highestPrice, setHighestPrice] = useState<number | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const backgroundGradient = `linear-gradient(to top, #FBB14B, 50%, transparent)`;

  // Fetch list items from local storage and products from API on component mount
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
            JSON.parse(storedList || "[]")
          );
          setFilteredProducts(initialFiltered);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, []);

  // Update filtered products when list or products change
  useEffect(() => {
    const updatedFiltered = filterProducts(products, list);
    setFilteredProducts(updatedFiltered);
  }, [list, products]);

  // Function to filter products based on the current list
  const filterProducts = useCallback(
    (allProducts: Product[], currentList: ListItem[]): Product[] => {
      // Clean product names by removing prices and trimming whitespace
      const cleanedProducts = allProducts.map((product) => ({
        ...product,
        product_name: product.product_name
          .replace(/£\d+\.\d+[a-zA-Z]?/g, "")
          .trim(),
      }));

      // Filter products based on the current list
      const filtered = cleanedProducts.filter((product) =>
        currentList.some((item) =>
          product.product_name
            .toLocaleLowerCase()
            .includes(item.name.toLocaleLowerCase())
        )
      );

      // Group products by name and select the one with the lowest price
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
          return currentPrice < minPrice ? currentProduct : minProduct;
        })
      );
    },
    []
  );

  // Function to calculate the total prices of products
  const calculatePrices = useCallback(
    (productsToCalculate: Product[], type: "highest" | "lowest") => {
      const prices: { [product: string]: number } = {};
      let sum = 0;

      // Calculate prices based on the type (highest or lowest)
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

      // Calculate the sum of prices
      sum = Object.values(prices).reduce((acc, p) => acc + p, 0);

      return { prices, sum: parseFloat(sum.toFixed(2)) };
    },
    []
  );

  // Update highest and lowest prices when filtered products change
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const { sum: lowestSum } = calculatePrices(products, "lowest");
      const { sum: highestSum } = calculatePrices(products, "highest");

      setHighestPrice(highestSum);
      setLowestPrice(lowestSum);
    } else {
      setHighestPrice(null);
      setLowestPrice(null);
    }
  }, [filteredProducts, calculatePrices, products]);

  // Function to calculate combined prices of filtered products
  const calculateCombinedPrices = useCallback(() => {
    const combinedFilteredProducts = filterProducts(products, list);

    const { sum: combinedLowestSum } = calculatePrices(
      combinedFilteredProducts,
      "lowest"
    );
    const { sum: combinedHighestSum } = calculatePrices(
      combinedFilteredProducts,
      "highest"
    );

    return { combinedLowestSum, combinedHighestSum };
  }, [filterProducts, products, list, calculatePrices]);

  // Log combined lowest and highest prices when they change
  useEffect(() => {
    const { combinedLowestSum, combinedHighestSum } = calculateCombinedPrices();
    console.log("Combined Lowest Price:", combinedLowestSum);
    console.log("Combined Highest Price:", combinedHighestSum);
  }, [calculateCombinedPrices]);

  // Function to render product cards
  const renderProductCards = useCallback(() => {
    return filteredProducts
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      .map(({ id, supermarket_name, product_name, price }) => (
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
      ));
  }, [filteredProducts]);

  // Function to calculate the total savings
  const saveTotal = () => {
    if (highestPrice !== null && lowestPrice !== null) {
      return highestPrice - lowestPrice;
    }
    return 0;
  };

  // Format prices for display
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
        <div className="flex items-center gap-2 border border-orange bg-white/80 rounded-xl max-w-max p-2 text-red-500">
          <h3>high</h3>
          <p className="flex gap-2 text-xl font-semibold">
            <span>£</span>
            <span>{formattedHighestPrice}</span>
          </p>
        </div>

        <div className="flex flex-col items-end border border-orange bg-white/80 rounded-xl max-w-max p-2 text-green-500">
          <p className="flex gap-2 text-xl font-semibold">
            <h3>low</h3>
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
