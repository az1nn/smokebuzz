import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
  it("renders the home screen", async () => {
    const { findAllByText } = render(<App />);
    const elements = await findAllByText("SmokeBuzz");
    expect(elements.length).toBeGreaterThan(0);
  });

  it("renders the tab bar", async () => {
    const { findByText, findAllByText } = render(<App />);
    expect(await findByText("Home")).toBeTruthy();
    const produtos = await findAllByText("Produtos");
    expect(produtos.length).toBeGreaterThan(0);
  });
});
