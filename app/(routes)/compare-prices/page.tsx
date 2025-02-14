"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import { classNames } from "@/app/utils/appearance";
import morrisons from "@/public/images/morrisons.svg";
import sainsburys from "@/public/images/sainsburys-logo.svg";
import lidl from "@/public/images/lidl.svg";
import tesco from "@/public/images/tesco-logo.svg";
import aldi from "@/public/images/aldi-logo.svg";
import asda from "@/public/images/asda.svg";

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
  const [highestPrice, setHighestPrice] = useState<number | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [showLowestPrice, setShowLowestPrice] = useState<boolean>(true);
  const [lowestPriceProducts, setLowestPriceProducts] = useState<Product[]>([]);
  const [highestPriceProducts, setHighestPriceProducts] = useState<Product[]>(
    []
  );

  const backgroundGradient = `linear-gradient(to top, #FBB14B, 50%, transparent)`;

  useEffect(() => {
    const storedList = localStorage.getItem("list_item");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    if (BASE_URL) {
      fetch(`${BASE_URL}/api/price-list`)
        .then((response) => response.json())
        .then((fetchedProducts: Product[]) => setProducts(fetchedProducts))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = filterProducts(products, list);
      setLowestPriceProducts(findMinMaxPrices(filteredProducts, "lowest"));
      setHighestPriceProducts(findMinMaxPrices(filteredProducts, "highest"));
    }
  }, [products, list]);

  const filterProducts = useCallback(
    (allProducts: Product[], currentList: ListItem[]) => {
      const cleanedProducts = allProducts.map((product) => ({
        ...product,
        product_name: product.product_name
          .replace(/£\d+\.\d+[a-zA-Z]?/g, "")
          .trim(),
      }));

      return cleanedProducts.filter((product) =>
        currentList.some((item) =>
          product.product_name
            .toLocaleLowerCase()
            .includes(item.name.toLocaleLowerCase())
        )
      );
    },
    []
  );

  const findMinMaxPrices = useCallback(
    (productsToCalculate: Product[], type: "highest" | "lowest") => {
      const groupedProducts = productsToCalculate.reduce(
        (acc: { [key: string]: Product[] }, product) => {
          const name = product.product_name.toLocaleLowerCase();
          acc[name] = [...(acc[name] || []), product];
          return acc;
        },
        {}
      );

      const minMaxProducts = Object.values(groupedProducts).map((group) =>
        group.reduce((minMax, current) => {
          const currentPrice = parseFloat(current.price);
          const minMaxPrice = parseFloat(minMax.price);
          return type === "lowest"
            ? currentPrice < minMaxPrice
              ? current
              : minMax
            : currentPrice > minMaxPrice
            ? current
            : minMax;
        })
      );
      return minMaxProducts;
    },
    []
  );

  useEffect(() => {
    if (lowestPriceProducts.length > 0 && highestPriceProducts.length > 0) {
      const lowestSum = lowestPriceProducts.reduce(
        (acc, p) => acc + parseFloat(p.price),
        0
      );
      const highestSum = highestPriceProducts.reduce(
        (acc, p) => acc + parseFloat(p.price),
        0
      );

      setHighestPrice(parseFloat(highestSum.toFixed(2)));
      setLowestPrice(parseFloat(lowestSum.toFixed(2)));
    } else {
      setHighestPrice(null);
      setLowestPrice(null);
    }
  }, [lowestPriceProducts, highestPriceProducts]);

  const renderProductCards = useCallback(() => {
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
              className="flex-shrink-0 object-cover w-20"
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
  }, [highestPriceProducts, lowestPriceProducts, products, showLowestPrice]);

  const saveTotal = () =>
    highestPrice && lowestPrice ? highestPrice - lowestPrice : 0;

  const formattedHighestPrice = highestPrice?.toFixed(2);
  const formattedLowestPrice = lowestPrice?.toFixed(2);
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
          onClick={() => setShowLowestPrice(false)}
        >
          <p className="flex gap-2 text-xl font-semibold">
            <span>£</span>
            <span>{formattedHighestPrice}</span>
          </p>
        </div>

        <div
          className="flex flex-col items-end border border-orange bg-white/80 rounded-xl max-w-max p-2 text-green-500"
          onClick={() => setShowLowestPrice(true)}
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
