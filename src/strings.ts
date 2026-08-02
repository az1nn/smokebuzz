const strings = {
  productsLoading: "Loading products...",
  productsLoadFailed: "Failed to load products",
  cartEmpty: "Seu carrinho está vazio",
  checkoutTitle: "Finalizar Pedido",
  cardNumberLabel: "Número do Cartão",
  expiryLabel: "Validade",
  cvvLabel: "CVV",
  cardNameLabel: "Nome do Titular",
  cardNumberPlaceholder: "4111 1111 1111 1111",
  expiryPlaceholder: "MM/AA",
  cvvPlaceholder: "123",
  cardNamePlaceholder: "John Doe",
  processingPayment: "Processando pagamento...",
  paymentConfirmedTitle: "Pagamento Confirmado!",
  paymentSuccessMessage: (total: number) =>
    `Seu pedido de R$ ${total.toFixed(2).replace('.', ',')} foi processado com sucesso.`,
  continueShopping: "Continuar Comprando",
  totalLabel: "Total",
  payButton: (total: number) => `Pagar R$ ${total.toFixed(2).replace('.', ',')}`,
  cardNumberError: "Card number must be 16 digits",
  expiryError: "Expiry must be MM/YY format",
  cvvError: "CVV must be 3 digits",
  cardNameError: "Cardholder name is required",
  paymentDeclined: "Payment declined",
};

export default strings;
