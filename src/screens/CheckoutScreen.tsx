import React from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Image } from "react-native";
import { useCart } from "../context/CartContext";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { usePayment } from "../hooks/usePayment";
import { useNavigation } from "../hooks/useNavigation";

export default function CheckoutScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  const { items, total, clearCart } = useCart();
  const { formData, errors, isValid, handleChange, handleBlur, validate, reset } = useCheckoutForm();
  const { processPayment, loading: paymentLoading, error: paymentError } = usePayment();
  const { goToProducts } = useNavigation();

  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async () => {
    if (!validate()) return;
    const result = await processPayment(total);
    if (result.success) {
      clearCart();
      reset();
      setSuccess(true);
    }
  };

  const handleDone = () => {
    setSuccess(false);
    onDone();
  };

  if (success) {
    return (
      <View className="flex-1 bg-slate-900 items-center justify-center p-4">
        <Text className="text-5xl mb-4">✅</Text>
        <Text className="text-white text-2xl font-bold mb-2">Payment Successful!</Text>
        <Text className="text-slate-400 text-center mb-6">
          Your order of R$ {total.toFixed(2)} has been processed.
        </Text>
        <Pressable onPress={handleDone} className="bg-sky-500 rounded-xl py-3 px-8">
          <Text className="text-white font-bold text-lg">Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  const inputClass =
    "bg-slate-800 text-white rounded-xl px-4 py-3 mb-4 border border-slate-700";
  const errorClass = "text-red-400 text-sm mb-3";

  return (
    <View className="flex-1 bg-slate-900 p-4">
      <Text className="text-white text-2xl font-bold mb-6">Checkout</Text>

      {paymentLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#38bdf8" />
          <Text className="text-white text-lg mt-4">Processing payment...</Text>
        </View>
      ) : (
        <>
          <Text className="text-slate-400 text-sm mb-2">Card Number</Text>
          <TextInput
            className={inputClass}
            placeholder="4111 1111 1111 1111"
            placeholderTextColor="#64748b"
            value={formData.cardNumber}
            onChangeText={(v) => handleChange("cardNumber", v)}
            onBlur={() => handleBlur("cardNumber")}
            keyboardType="number-pad"
            maxLength={19}
          />
          {errors.cardNumber && <Text className={errorClass}>{errors.cardNumber}</Text>}

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-slate-400 text-sm mb-2">Expiry</Text>
              <TextInput
                className={inputClass}
                placeholder="MM/YY"
                placeholderTextColor="#64748b"
                value={formData.expiry}
                onChangeText={(v) => handleChange("expiry", v)}
                onBlur={() => handleBlur("expiry")}
                maxLength={5}
              />
              {errors.expiry && <Text className={errorClass}>{errors.expiry}</Text>}
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 text-sm mb-2">CVV</Text>
              <TextInput
                className={inputClass}
                placeholder="123"
                placeholderTextColor="#64748b"
                value={formData.cvv}
                onChangeText={(v) => handleChange("cvv", v)}
                onBlur={() => handleBlur("cvv")}
                keyboardType="number-pad"
                secureTextEntry
                maxLength={3}
              />
              {errors.cvv && <Text className={errorClass}>{errors.cvv}</Text>}
            </View>
          </View>

          <Text className="text-slate-400 text-sm mb-2">Cardholder Name</Text>
          <TextInput
            className={inputClass}
            placeholder="John Doe"
            placeholderTextColor="#64748b"
            value={formData.cardName}
            onChangeText={(v) => handleChange("cardName", v)}
            onBlur={() => handleBlur("cardName")}
          />
          {errors.cardName && <Text className={errorClass}>{errors.cardName}</Text>}

          <View className="border-t border-slate-700 pt-4 mt-2">
            {items.map((item) => (
              <View key={item.product.id} className="flex-row justify-between mb-1">
                <View className="flex-row items-center">
                  <Image
                    source={item.product.image}
                    className="w-8 h-8 object-cover rounded mr-2"
                    resizeMode="cover"
                  />
                  <Text className="text-slate-300">
                    {item.product.name} x{item.quantity}
                  </Text>
                </View>
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
            onPress={handleSubmit}
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