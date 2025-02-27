import { classNames } from "@/app/utils/appearance";
import React from "react";

const ProductPrice = ({
  price,
  isHighest,
}: {
  price: string;
  isHighest: boolean;
}) => (
  <p
    className={classNames(
      "text-xl font-semibold",
      isHighest ? "text-red-500" : "text-green-500"
    )}
  >
    £{price}
  </p>
);

export default ProductPrice;
