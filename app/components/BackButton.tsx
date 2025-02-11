import React from "react";
import Button from "./Button";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  return (
    <Button
      classes={{ button: "bg-transparent fixed top-4 left-4" }}
      onClick={() => window.history.back()}
    >
      <FaArrowLeft />
    </Button>
  );
}

export default BackButton;
