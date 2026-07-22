import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useCart } from "../context/CartContext";

export default function CheckoutScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  const { items, total, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <View className="flex-1 bg-slate-900 items-center justify-center p-4">
        <Text className="text-5xl mb-4">✅</Text>
        <Text className="text-white text-2xl font-bold mb-2">
          Payment Successful!
        </Text>
        <Text className="text-slate-400 text-center mb-6">
          Your order of R$ {total.toFixed(2)} has been processed.
        </Text>
        <Pressable
          onPress={onDone}
          className="bg-sky-500 rounded-xl py-3 px-8"
        >
          <Text className="text-white font-bold text-lg">
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    );
  }

  const inputClass =
    "bg-slate-800 text-white rounded-xl px-4 py-3 mb-4 border border-slate-700";

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <Text className="text-white text-2xl font-bold mb-6">Checkout</Text>

      {processing ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl mb-4">⏳</Text>
          <Text className="text-white text-lg">
            Processing payment...
          </Text>
        </View>
      ) : (
        <>
          <Text className="text-slate-400 text-sm mb-2">Card Number</Text>
          <TextInput
            className={inputClass}
            placeholder="4111 1111 1111 1111"
            placeholderTextColor="#64748b"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="number-pad"
          />

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-slate-400 text-sm mb-2">Expiry</Text>
              <TextInput
                className={inputClass}
                placeholder="MM/YY"
                placeholderTextColor="#64748b"
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 text-sm mb-2">CVV</Text>
              <TextInput
                className={inputClass}
                placeholder="123"
                placeholderTextColor="#64748b"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>

          <Text className="text-slate-400 text-sm mb-2">Cardholder Name</Text>
          <TextInput
            className={inputClass}
            placeholder="John Doe"
            placeholderTextColor="#64748b"
            value={cardName}
            onChangeText={setCardName}
          />

          <View className="border-t border-slate-700 pt-4 mt-2">
            {items.map((item) => (
              <View
                key={item.product.id}
                className="flex-row justify-between mb-1"
              >
                <Text className="text-slate-300">
                  {item.product.name} x{item.quantity}
                </Text>
                <Text className="text-white">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View className="flex-row justify-between mt-2 pt-2 border-t border-slate-700">
              <Text className="text-white font-bold text-lg">Total</Text>
              <Text className="text-sky-400 font-bold text-lg">
                R$ {total.toFixed(2)}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handlePay}
            className="bg-green-500 rounded-xl py-3 items-center mt-6"
          >
            <Text className="text-white font-bold text-lg">
              Pay R$ {total.toFixed(2)}
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
