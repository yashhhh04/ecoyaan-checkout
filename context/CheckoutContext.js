import { createContext, useContext, useState, useEffect } from "react";

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children, initialCart }) {
  // Cart items with quantity management
  const [cartItems, setCartItems] = useState(initialCart.cartItems);
  const shippingFee = initialCart.shipping_fee;

  const increaseQty = (product_id) => {
    setCartItems(prev => prev.map(item =>
      item.product_id === product_id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (product_id) => {
    setCartItems(prev => prev.map(item =>
      item.product_id === product_id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // Address management with localStorage persistence
  const [savedAddresses, setSavedAddresses] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("ecoyaan_addresses");
        return stored ? JSON.parse(stored) : [];
      } catch { return []; }
    }
    return [];
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ecoyaan_selected_address_id") || null;
    }
    return null;
  });

  const [address, setAddress] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("ecoyaan_addresses");
        const id = localStorage.getItem("ecoyaan_selected_address_id");
        if (stored && id) {
          const parsed = JSON.parse(stored);
          return parsed.find(a => a.id === id) || { fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" };
        }
      } catch {}
    }
    return { fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" };
  });

  useEffect(() => {
    if (savedAddresses.length > 0)
      localStorage.setItem("ecoyaan_addresses", JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  useEffect(() => {
    if (selectedAddressId)
      localStorage.setItem("ecoyaan_selected_address_id", selectedAddressId);
  }, [selectedAddressId]);

  const saveAddress = (newAddress) => {
    const id = "addr_" + Date.now();
    const withId = { ...newAddress, id };
    setSavedAddresses(prev => [...prev, withId]);
    setSelectedAddressId(id);
    setAddress(withId);
  };

  const selectAddress = (id) => {
    setSelectedAddressId(id);
    const found = savedAddresses.find(a => a.id === id);
    if (found) setAddress(found);
  };

  const deleteAddress = (id) => {
    const updated = savedAddresses.filter(a => a.id !== id);
    setSavedAddresses(updated);
    if (selectedAddressId === id) {
      const next = updated[0] || null;
      setSelectedAddressId(next?.id || null);
      setAddress(next || { fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" });
      if (updated.length === 0) localStorage.removeItem("ecoyaan_addresses");
    }
  };

  // Derived values
  const subtotal = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
  const isFreeShipping = subtotal >= 700;
  const effectiveShipping = isFreeShipping ? 0 : shippingFee;
  const total = subtotal + effectiveShipping;

  return (
    <CheckoutContext.Provider value={{
      cart: { ...initialCart, cartItems },
      cartItems, increaseQty, decreaseQty,
      address, setAddress,
      savedAddresses, selectedAddressId,
      saveAddress, selectAddress, deleteAddress,
      subtotal, total,
      shippingFee: effectiveShipping,
      isFreeShipping,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);