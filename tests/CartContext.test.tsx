import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CartProvider, useCart } from "../src/context/CartContext";
import { Text, Pressable, View, ImageSourcePropType } from "react-native";
import { Product } from "../src/types";

const testProduct: Product = {
  id: "1",
  name: "Test Product",
  description: "Test description",
  price: 10.0,
  image: require("../assets/icon.png") as ImageSourcePropType,
  category: "Test",
};

function TestComponent() {
  const { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount } =
    useCart();

  return (
    <View>
      <Text testID="count">{itemCount}</Text>
      <Text testID="total">{total.toFixed(2)}</Text>
      <Text testID="items">{items.length}</Text>
      <Pressable
        testID="add"
        onPress={() => addItem(testProduct)}
      />
      <Pressable
        testID="add-two"
        onPress={() => addItem(testProduct, 2)}
      />
      <Pressable
        testID="remove"
        onPress={() => removeItem("1")}
      />
      <Pressable
        testID="update"
        onPress={() => updateQuantity("1", 5)}
      />
      <Pressable testID="clear" onPress={clearCart} />
    </View>
  );
}

function renderTest() {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
}

describe("CartContext", () => {
  it("starts empty", () => {
    const { getByTestId } = renderTest();
    expect(getByTestId("count").props.children).toBe(0);
    expect(getByTestId("items").props.children).toBe(0);
  });

  it("adds an item", () => {
    const { getByTestId } = renderTest();
    fireEvent.press(getByTestId("add"));
    expect(getByTestId("count").props.children).toBe(1);
    expect(getByTestId("items").props.children).toBe(1);
  });

  it("increments quantity on duplicate add", () => {
    const { getByTestId } = renderTest();
    fireEvent.press(getByTestId("add"));
    fireEvent.press(getByTestId("add"));
    expect(getByTestId("count").props.children).toBe(2);
    expect(getByTestId("items").props.children).toBe(1);
  });

  it("adds with specific quantity", () => {
    const { getByTestId } = renderTest();
    fireEvent.press(getByTestId("add-two"));
    expect(getByTestId("count").props.children).toBe(2);
  });

  it("removes an item", () => {
    const { getByTestId } = renderTest();
    fireEvent.press(getByTestId("add"));
    fireEvent.press(getByTestId("remove"));
    expect(getByTestId("count").props.children).toBe(0);
    expect(getByTestId("items").props.children).toBe(0);
  });

  it("updates quantity", () => {
    const { getByTestId } = renderTest();
    fireEvent.press(getByTestId("add"));
    fireEvent.press(getByTestId("update"));
    expect(getByTestId("count").props.children).toBe(5);
  });

  it("calculates total", () => {
    const { getByTestId } = renderTest();
    fireEvent.press(getByTestId("add"));
    expect(getByTestId("total").props.children).toBe("10.00");
  });

  it("clears cart", () => {
    const { getByTestId } = renderTest();
    fireEvent.press(getByTestId("add"));
    fireEvent.press(getByTestId("clear"));
    expect(getByTestId("count").props.children).toBe(0);
    expect(getByTestId("items").props.children).toBe(0);
  });
});
