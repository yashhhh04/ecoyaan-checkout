export default function CartItem({ item }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      padding: "16px 0", borderBottom: "1px solid var(--cream-dark)",
    }}>
      <div style={{
        width: 64, height: 64, flexShrink: 0,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--sand)",
        background: "var(--cream-dark)",
      }}>
        <img
          src="https://placehold.co/150"
          alt={item.product_name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: "var(--text)",
          lineHeight: 1.4, marginBottom: 4,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {item.product_name}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
          Qty: {item.quantity} × ₹{item.product_price.toLocaleString()}
        </div>
      </div>

      <div style={{
        fontSize: 16, fontWeight: 700, color: "var(--forest)",
        whiteSpace: "nowrap",
      }}>
        ₹{(item.product_price * item.quantity).toLocaleString()}
      </div>
    </div>
  );
}