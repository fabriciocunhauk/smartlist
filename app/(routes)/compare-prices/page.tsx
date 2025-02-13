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

  useEffect(() => {
    const storedList = localStorage.getItem("list_item");
    if (storedList) {
      setList(JSON.parse(storedList));
    }

    if (BASE_URL) {
      fetch(`${BASE_URL}/api/price-list`)
        .then((response) => response.json())
        .then((products) => setProducts(products))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, []);

  const filterProductsData = (): Product[] => {
    return products.filter((product) =>
      list.some((item) =>
        product.product_name
          .toLocaleLowerCase()
          .includes(item.name.toLocaleLowerCase())
      )
    );
  };
  const makeTotal = () => {
    const total = filterProductsData().reduce(
      (acc: any, product: any) => acc + parseFloat(product.price),
      0
    );

    return total;
  };

  const renderProductCards = () => {
    return filterProductsData()
      .sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
      })
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
        <p className="bg-orange bg-opacity-40 rounded-xl min-w-20 text-xl font-semibold text-green-500 text-center px-4 py-1">
          £ {makeTotal()}
        </p>
      </div>
    </div>
  );
}

export default Compare;
