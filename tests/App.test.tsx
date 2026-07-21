import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
  it("renders the title", () => {
    const { getByText } = render(<App />);
    expect(getByText("Meu App PWA")).toBeTruthy();
  });

  it("renders the subtitle", () => {
    const { getByText } = render(<App />);
    expect(getByText("React Native + Expo + TypeScript + Tailwind CSS")).toBeTruthy();
  });

  it("renders the button", () => {
    const { getByText } = render(<App />);
    expect(getByText("Clique Aqui")).toBeTruthy();
  });
});
