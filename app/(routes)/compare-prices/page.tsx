"use client";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import React, { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

  return (
    <>
      <Header />
      <Container>
        <div className="flex flex-col gap-4 overflow-auto h-screen pb-20">
          {filterProductsData().map(
            ({ id, supermarket_name, product_name, price }) => (
              <Card
                key={id}
                classes={{
                  card: "flex flex-col items-center justify-between w-full h-20 border rounded",
                }}
              >
                <h2>{supermarket_name}</h2>
                <p className="text-xs">{product_name}</p>
                <p className="text-xs">{price}</p>
              </Card>
            )
          )}
        </div>
      </Container>
      <Navbar />
    </>
  );
}

export default Compare;
