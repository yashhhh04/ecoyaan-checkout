import CartItem from "./CartItem";
import PriceSummary from "./PriceSummary";

export default function OrderSummary({ cart, subtotal, total, address }) {
  return (
    <div>
      {/* Items */}
      <div style={{ marginBottom: 16 }}>
        {cart.cartItems.map((item) => (
          <CartItem key={item.product_id} item={item} />
        ))}
        <PriceSummary
          subtotal={subtotal}
          shippingFee={cart.shipping_fee}
          discount={cart.discount_applied}
          total={total}
        />
      </div>

      {/* Address */}
      {address && address.fullName !== "" && (
        <div style={{
          background: "#e8f0e6", borderRadius: 8,
          padding: 16, border: "1px solid #c8ddc5", marginTop: 8,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{address.fullName}</div>
          <div style={{ fontSize: 13, color: "#6b6b6b", lineHeight: 1.7 }}>
            {address.email}<br />
            {address.phone}<br />
            {address.city}, {address.state} — {address.pinCode}
          </div>
        </div>
      )}
    </div>
  );
}