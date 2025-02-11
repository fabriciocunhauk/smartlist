"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import morrisons from "@/public/images/morrisons.svg";
import sainsburys from "@/public/images/sainsburys-logo.svg";
import lidl from "@/public/images/lidl.svg";
import tesco from "@/public/images/tesco_logo.svg";
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

  const renderProductCards = () => {
    return filterProductsData().map(
      ({ id, supermarket_name, product_name, price }) => (
        <Card
          key={id}
          classes={{
            card: "flex items-center justify-between w-full h-20 border rounded",
          }}
        >
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
      )
    );
  };

  return (
    <>
      <Header />
      <Container classes={{ container: "py-24" }}>
        <div className="flex flex-col gap-4 overflow-auto h-screen pb-20">
          {renderProductCards()}
        </div>
      </Container>
      <Navbar />
    </>
  );
}

export default Compare;
