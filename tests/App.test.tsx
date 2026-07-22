import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
  it("renders the products screen after loading", async () => {
    const { findByText } = render(<App />);
    expect(await findByText("Products")).toBeTruthy();
  });

  it("renders the tab bar", async () => {
    const { findByText } = render(<App />);
    expect(await findByText("Products")).toBeTruthy();
    expect(await findByText("🛒 Cart")).toBeTruthy();
  });
});
