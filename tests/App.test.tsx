import React from "react";
import { render } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";
import App from "../App";

jest.mock("react-native-safe-area-context", () =>
  require("react-native-safe-area-context/jest/mock").default
);

AccessibilityInfo.isReduceMotionEnabled = jest.fn(() =>
  Promise.resolve(false)
);
jest
  .spyOn(AccessibilityInfo, "addEventListener")
  .mockReturnValue({ remove: jest.fn() } as any);

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
