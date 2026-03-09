import CartItem from "./CartItem";
import PriceSummary from "./PriceSummary";

export default function OrderSummary({ cart, subtotal, total, shippingFee, isFreeShipping, address }) {
  return (
    <div>
      {cart.cartItems.map(item => (
        <CartItem key={item.product_id} item={item} />
      ))}
      <PriceSummary
        subtotal={subtotal}
        shippingFee={shippingFee}
        discount={cart.discount_applied}
        total={total}
        isFreeShipping={isFreeShipping}
      />
      {address && address.fullName !== "" && (
        <div style={{
          marginTop: 16, background: "var(--green-mist)",
          borderRadius: "var(--radius-md)", padding: 16,
          border: "1px solid rgba(45,90,39,0.12)",
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: "var(--green)",
            textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8,
          }}>Delivering To</div>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{address.fullName}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
            {address.email}<br />{address.phone}<br />
            {address.city}, {address.state} — {address.pinCode}
          </div>
        </div>
      )}
    </div>
  );
}