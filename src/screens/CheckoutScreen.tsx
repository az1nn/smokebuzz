import React from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { usePayment } from "../hooks/usePayment";
import BrassButton from "../components/BrassButton";

export default function CheckoutScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  const { items, total, clearCart } = useCart();
  const { formData, errors, handleChange, handleBlur, submit, reset } =
    useCheckoutForm();
  const {
    processPayment,
    loading: paymentLoading,
    error: paymentError,
  } = usePayment();

  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async () => {
    if (!submit()) return;
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
      <View className="flex-1 bg-noir items-center justify-center p-4">
        <Text className="text-5xl mb-4">✅</Text>
        <Text className="text-cream font-rye text-2xl mb-2">
          Pagamento Confirmado!
        </Text>
        <Text className="text-cream-dim text-center mb-6">
          Seu pedido de R$ {total.toFixed(2)} foi processado com sucesso.
        </Text>
        <BrassButton label="Continuar Comprando" onPress={handleDone} />
      </View>
    );
  }

  const inputClass =
    "bg-espresso text-cream rounded-xl px-4 py-3 mb-4 border border-line";
  const errorClass = "text-ember text-sm mb-3";

  return (
    <ScrollView className="flex-1 bg-noir p-4">
      <Text className="text-brass-light font-rye text-3xl mb-6">
        Finalizar Pedido
      </Text>

      {paymentLoading ? (
        <View className="flex-1 items-center justify-center py-20">
          <ActivityIndicator size="large" color="#c9a24b" />
          <Text className="text-cream-dim text-lg mt-4">
            Processando pagamento...
          </Text>
        </View>
      ) : (
        <>
          <Text className="text-cream-dim text-sm mb-2 font-jost">
            Número do Cartão
          </Text>
          <TextInput
            className={inputClass}
            placeholder="4111 1111 1111 1111"
            placeholderTextColor="#cfc3a4"
            value={formData.cardNumber}
            onChangeText={(v) => handleChange("cardNumber", v)}
            onBlur={() => handleBlur("cardNumber")}
            keyboardType="number-pad"
            maxLength={19}
          />
          {errors.cardNumber && (
            <Text className={errorClass}>{errors.cardNumber}</Text>
          )}

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-cream-dim text-sm mb-2 font-jost">
                Validade
              </Text>
              <TextInput
                className={inputClass}
                placeholder="MM/AA"
                placeholderTextColor="#cfc3a4"
                value={formData.expiry}
                onChangeText={(v) => handleChange("expiry", v)}
                onBlur={() => handleBlur("expiry")}
                maxLength={5}
              />
              {errors.expiry && (
                <Text className={errorClass}>{errors.expiry}</Text>
              )}
            </View>
            <View className="flex-1">
              <Text className="text-cream-dim text-sm mb-2 font-jost">
                CVV
              </Text>
              <TextInput
                className={inputClass}
                placeholder="123"
                placeholderTextColor="#cfc3a4"
                value={formData.cvv}
                onChangeText={(v) => handleChange("cvv", v)}
                onBlur={() => handleBlur("cvv")}
                keyboardType="number-pad"
                secureTextEntry
                maxLength={3}
              />
              {errors.cvv && (
                <Text className={errorClass}>{errors.cvv}</Text>
              )}
            </View>
          </View>

          <Text className="text-cream-dim text-sm mb-2 font-jost">
            Nome do Titular
          </Text>
          <TextInput
            className={inputClass}
            placeholder="John Doe"
            placeholderTextColor="#cfc3a4"
            value={formData.cardName}
            onChangeText={(v) => handleChange("cardName", v)}
            onBlur={() => handleBlur("cardName")}
          />
          {errors.cardName && (
            <Text className={errorClass}>{errors.cardName}</Text>
          )}

          <View className="border-t border-line pt-4 mt-4">
            {items.map((item) => (
              <View
                key={item.product.id}
                className="flex-row justify-between mb-2"
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-8 h-8 bg-white rounded items-center justify-center mr-2">
                    {typeof item.product.image === "string" ? (
                      <Text className="text-sm">{item.product.image}</Text>
                    ) : (
                      <Image
                        source={item.product.image}
                        className="w-7 h-7 object-contain"
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text className="text-cream-dim font-jost text-sm flex-1">
                    {item.product.name} x{item.quantity}
                  </Text>
                </View>
                <Text className="text-cream font-rye">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View className="flex-row justify-between mt-3 pt-3 border-t border-line">
              <Text className="text-cream font-rye text-lg">Total</Text>
              <Text className="text-brass font-rye text-lg">
                R$ {total.toFixed(2)}
              </Text>
            </View>
          </View>

          {paymentError && (
            <Text className="text-ember text-sm text-center mb-4">
              {paymentError.message}
            </Text>
          )}

          <View className="mt-6 mb-8">
            <BrassButton
              label={`Pagar R$ ${total.toFixed(2)}`}
              onPress={handleSubmit}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}
