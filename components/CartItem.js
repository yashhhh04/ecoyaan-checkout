export default function CartItem({ item }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      padding: "14px 0", borderBottom: "1px solid #ede5d4",
    }}>
      <div style={{ width: 56, height: 56, flexShrink: 0 }}>
  <img
    src={`https://placehold.co/150`}
    alt={item.product_name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 12,
    }}
  />
</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{item.product_name}</div>
        <div style={{ fontSize: 13, color: "#6b6b6b", marginTop: 3 }}>
          Qty: {item.quantity} × ₹{item.product_price}
        </div>
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#2d5a27" }}>
        ₹{item.product_price * item.quantity}
      </div>
    </div>
  );
}