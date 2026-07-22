import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
  it("renders the products screen", () => {
    const { getByText } = render(<App />);
    expect(getByText("Products")).toBeTruthy();
  });

  it("renders the tab bar", () => {
    const { getByText } = render(<App />);
    expect(getByText("Products")).toBeTruthy();
    expect(getByText("🛒 Cart")).toBeTruthy();
  });
});
