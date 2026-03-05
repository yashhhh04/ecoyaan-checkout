import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children, initialCart }) {
  const [cart] = useState(initialCart);
  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
  });
  const [step, setStep] = useState(0);

  const subtotal = cart.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + cart.shipping_fee - cart.discount_applied;

  return (
    <CheckoutContext.Provider
      value={{ cart, address, setAddress, step, setStep, subtotal, total }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);