export default function PriceSummary({ subtotal, shippingFee, discount, total }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
        <span style={{ color: "#6b6b6b" }}>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
        <span style={{ color: "#6b6b6b" }}>Shipping</span>
        <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
      </div>
      {discount > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
          <span style={{ color: "#6b6b6b" }}>Discount</span>
          <span style={{ color: "#2d5a27" }}>−₹{discount}</span>
        </div>
      )}
      <div style={{
        display: "flex", justifyContent: "space-between",
        padding: "14px 0 8px", fontSize: 17, fontWeight: 700,
        color: "#2d5a27", borderTop: "2px solid #e8f0e6", marginTop: 6,
      }}>
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
}