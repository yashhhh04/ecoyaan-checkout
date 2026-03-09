import { useCheckout } from "../context/CheckoutContext";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty } = useCheckout();

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "16px 0", borderBottom: "1px solid var(--cream-dark)",
    }}>
      {/* Image */}
      <div style={{
        width: 64, height: 64, flexShrink: 0,
        borderRadius: "var(--radius-md)", overflow: "hidden",
        border: "1px solid var(--sand)", background: "var(--cream-dark)",
      }}>
        <img
          src="https://placehold.co/150"
          alt={item.product_name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Name + qty controls */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: "var(--text)",
          lineHeight: 1.4, marginBottom: 10,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {item.product_name}
        </div>

        {/* Quantity stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <button
            onClick={() => decreaseQty(item.product_id)}
            disabled={item.quantity <= 1}
            style={{
              width: 30, height: 30,
              border: "1.5px solid var(--sand)",
              borderRadius: "6px 0 0 6px",
              background: item.quantity <= 1 ? "var(--cream-dark)" : "white",
              color: item.quantity <= 1 ? "var(--text-muted)" : "var(--green)",
              fontSize: 18, fontWeight: 700,
              cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            −
          </button>
          <div style={{
            width: 36, height: 30,
            border: "1.5px solid var(--sand)",
            borderLeft: "none", borderRight: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 600, color: "var(--text)",
            background: "white",
          }}>
            {item.quantity}
          </div>
          <button
            onClick={() => increaseQty(item.product_id)}
            style={{
              width: 30, height: 30,
              border: "1.5px solid var(--sand)",
              borderRadius: "0 6px 6px 0",
              background: "white", color: "var(--green)",
              fontSize: 18, fontWeight: 700,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--forest)" }}>
          ₹{(item.product_price * item.quantity).toLocaleString()}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
          ₹{item.product_price} each
        </div>
      </div>
    </div>
  );
}