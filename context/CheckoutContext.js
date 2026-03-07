import { createContext, useContext, useState, useEffect } from "react";

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children, initialCart }) {
  const [cart] = useState(initialCart);

  // Load saved addresses from localStorage on first render
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Current form address (for adding new)
  const [address, setAddress] = useState({
    fullName: "", email: "", phone: "",
    pinCode: "", city: "", state: "",
  });

  useEffect(() => {
    // Load persisted data from localStorage
    try {
      const storedAddresses = localStorage.getItem("ecoyaan_addresses");
      const storedSelectedId = localStorage.getItem("ecoyaan_selected_address_id");
      if (storedAddresses) {
        const parsed = JSON.parse(storedAddresses);
        setSavedAddresses(parsed);
        // Auto-select the last selected address
        if (storedSelectedId) {
          setSelectedAddressId(storedSelectedId);
          const found = parsed.find((a) => a.id === storedSelectedId);
          if (found) setAddress(found);
        }
      }
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    }
  }, []);

  // Persist addresses to localStorage whenever they change
  useEffect(() => {
    if (savedAddresses.length > 0) {
      localStorage.setItem("ecoyaan_addresses", JSON.stringify(savedAddresses));
    }
  }, [savedAddresses]);

  // Persist selected address id
  useEffect(() => {
    if (selectedAddressId) {
      localStorage.setItem("ecoyaan_selected_address_id", selectedAddressId);
    }
  }, [selectedAddressId]);

  // Save a new address to the list
  const saveAddress = (newAddress) => {
    const id = "addr_" + Date.now();
    const withId = { ...newAddress, id };
    const updated = [...savedAddresses, withId];
    setSavedAddresses(updated);
    setSelectedAddressId(id);
    setAddress(withId);
    return id;
  };

  // Select an existing saved address
  const selectAddress = (id) => {
    setSelectedAddressId(id);
    const found = savedAddresses.find((a) => a.id === id);
    if (found) setAddress(found);
  };

  // Delete a saved address
  const deleteAddress = (id) => {
    const updated = savedAddresses.filter((a) => a.id !== id);
    setSavedAddresses(updated);
    if (selectedAddressId === id) {
      setSelectedAddressId(updated[0]?.id || null);
      setAddress(updated[0] || { fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" });
    }
    if (updated.length === 0) localStorage.removeItem("ecoyaan_addresses");
  };

  const subtotal = cart.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity, 0
  );
  const total = subtotal + cart.shipping_fee - cart.discount_applied;

  return (
    <CheckoutContext.Provider value={{
      cart, address, setAddress,
      savedAddresses, selectedAddressId,
      saveAddress, selectAddress, deleteAddress,
      subtotal, total,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);