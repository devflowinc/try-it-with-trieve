import React from "react";
import { createRoot } from "react-dom/client";
import InsertButton from "./components/InsertButton";
import "./styles/tailwind.css";

const insertButton = (): void => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<InsertButton />);
};

insertButton();
