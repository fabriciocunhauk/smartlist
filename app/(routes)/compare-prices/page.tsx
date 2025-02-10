"use client";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Navbar from "@/app/components/Navbar";
import React, { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function Compare() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (BASE_URL) {
      fetch(`${BASE_URL}/api/price-list`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, []);

  return (
    <>
      <Container>
        <div className="flex flex-col gap-4 overflow-auto justify-between h-screen pb-20">
          {products.map(
            ({ id, supermarket_name, product_name, price }: any) => {
              console.log(supermarket_name);
              return (
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
              );
            }
          )}
        </div>
      </Container>
      <Navbar />
    </>
  );
}

export default Compare;
