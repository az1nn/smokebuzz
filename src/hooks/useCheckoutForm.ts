import { useState, useCallback, useMemo } from "react";

type FormData = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  cardName: "",
};

export function useCheckoutForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});

  const validate = useCallback((data: FormData): Errors => {
    const newErrors: Errors = {};
    if (!data.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!data.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiry = "Expiry must be MM/YY format";
    }
    if (!data.cvv.match(/^\d{3}$/)) {
      newErrors.cvv = "CVV must be 3 digits";
    }
    if (data.cardName.trim().length < 2) {
      newErrors.cardName = "Cardholder name is required";
    }
    return newErrors;
  }, []);

  const validateAll = useCallback((): Errors => {
    return validate(formData);
  }, [validate, formData]);

  const handleChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleBlur = useCallback(
    (field: keyof FormData) => {
      const newErrors = validate(formData);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    },
    [validate, formData]
  );

  const isValid = useMemo(
    () => Object.keys(validate(formData)).length === 0,
    [validate, formData]
  );

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    isValid,
    handleChange,
    handleBlur,
    validate,
    validateAll,
    reset,
  };
}