"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import morrisons from "@/public/images/morrisons.svg";
import sainsburys from "@/public/images/sainsburys-logo.svg";
import lidl from "@/public/images/lidl.svg";
import tesco from "@/public/images/tesco-logo.svg";
import aldi from "@/public/images/aldi-logo.svg";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const supermarketLogos = [
  {
    id: 1,
    name: "morrison",
    image: morrisons,
  },
  {
    id: 2,
    name: "sainsbury’s",
    image: sainsburys,
  },
  {
    id: 3,
    name: "lidl",
    image: lidl,
  },
  {
    id: 4,
    name: "tesco",
    image: tesco,
  },
  {
    id: 5,
    name: "aldi",
    image: aldi,
  },
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

function Compare() {
  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<ListItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
          // Filter products initially, after fetching
          const initialFiltered = filterProducts(
            fetchedProducts,
            JSON.parse(storedList || "[]")
          );
          setFilteredProducts(initialFiltered);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, []);

  useEffect(() => {
    //Filter products when list changes
    const updatedFiltered = filterProducts(products, list);
    setFilteredProducts(updatedFiltered);
  }, [list, products]);

  const filterProducts = (
    allProducts: Product[],
    currentList: ListItem[]
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

    const lowestPriceProducts: Product[] = Object.values(groupedProducts).map(
      (group) => {
        return group.reduce((minProduct, currentProduct) => {
          const currentPrice = parseFloat(currentProduct.price);
          const minPrice = parseFloat(minProduct.price);
          return currentPrice < minPrice ? currentProduct : minProduct;
        });
      }
    );

    return lowestPriceProducts;
  };

  const sumTotalAmount = () => {
    return filteredProducts.reduce(
      (acc, product) => acc + parseFloat(product.price),
      0
    );
  };

  const renderProductCards = () => {
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

          <p className="font-semibold text-xs md:text-base">{product_name}</p>
          <p className="text-xl font-semibold text-green-500">{price}</p>
        </Card>
      ));
  };

  return (
    <div className="h-screen">
      <Header />
      <Container>
        <div className="flex flex-col gap-4 overflow-auto py-24">
          {renderProductCards()}
        </div>
      </Container>
      <Navbar />
      <div className="fixed bottom-24 right-4 min-w-20 text-xl font-semibold text-green-500 text-center">
        <h3>Total</h3>
        <p className="bg-orange/40 rounded-xl min-w-20 text-xl font-semibold text-green-500 text-center px-4 py-1">
          £ {sumTotalAmount()}
        </p>
      </div>
    </div>
  );
}

export default Compare;
