import React from "react";
import { View, Text, Pressable } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { CartProvider, useCart } from "../src/context/CartContext";
import { products } from "../src/data/products";
import CheckoutScreen from "../src/screens/CheckoutScreen";
import Container from "../src/components/Container";
import { useCheckoutForm } from "../src/hooks/useCheckoutForm";
import strings from "../src/strings";

jest.mock("../src/hooks/usePayment", () => ({
  usePayment: () => ({
    processPayment: jest.fn(async () => ({ success: true })),
    loading: false,
    error: null,
  }),
}));

function CheckoutHarness() {
  const { addItem } = useCart();
  const added = React.useRef(false);
  React.useEffect(() => {
    if (!added.current) {
      added.current = true;
      addItem(products[2]);
    }
  }, [addItem]);
  return <CheckoutScreen onDone={() => {}} />;
}

function renderCheckout() {
  return render(
    <CartProvider>
      <CheckoutHarness />
    </CartProvider>
  );
}

function FormHarness() {
  const { errors, submit } = useCheckoutForm();
  return (
    <View>
      <Pressable testID="submit" onPress={() => submit()} />
      <Text testID="cardNameError">{errors.cardName}</Text>
      <Text testID="cvvError">{errors.cvv}</Text>
    </View>
  );
}

describe("ui-polish", () => {
  it("checkout success renders the pre-clear total", async () => {
    const { getByPlaceholderText, getByText, queryByText } = renderCheckout();

    fireEvent.changeText(
      getByPlaceholderText(strings.cardNumberPlaceholder),
      "4111111111111111"
    );
    fireEvent.changeText(
      getByPlaceholderText(strings.expiryPlaceholder),
      "12/30"
    );
    fireEvent.changeText(getByPlaceholderText(strings.cvvPlaceholder), "123");
    fireEvent.changeText(
      getByPlaceholderText(strings.cardNamePlaceholder),
      "Maria Silva"
    );

    fireEvent.press(getByText(strings.payButton(10)));

    await waitFor(() =>
      expect(getByText(strings.paymentSuccessMessage(10))).toBeTruthy()
    );
    expect(queryByText(strings.paymentSuccessMessage(0))).toBeNull();
  });

  it("useCheckoutForm validation messages are pt-BR", () => {
    const { getByTestId } = render(<FormHarness />);
    fireEvent.press(getByTestId("submit"));
    expect(getByTestId("cardNameError").props.children).toBe(
      "Informe o nome no cartão"
    );
    expect(getByTestId("cvvError").props.children).toBe(
      "O código deve ter 3 dígitos"
    );
  });

  it("Container renders the maxWidth inline style", () => {
    const { UNSAFE_getByType } = render(
      <Container maxWidth={1180}>
        <Text>hello</Text>
      </Container>
    );
    const view = UNSAFE_getByType(View);
    expect(view.props.style).toMatchObject({ maxWidth: 1180 });
  });
});
