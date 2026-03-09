export default function PriceSummary({ subtotal, shippingFee, discount, total, isFreeShipping }) {
  return (
    <div style={{ marginTop: 8, paddingTop: 8 }}>
      <div className="price-row">
        <span>Subtotal</span>
        <span style={{ fontWeight: 500 }}>₹{subtotal.toLocaleString()}</span>
      </div>

      <div className="price-row">
        <span>Standard Shipping</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {isFreeShipping && (
            <span style={{
              background: "var(--green)", color: "white",
              fontSize: 10, fontWeight: 700, padding: "2px 7px",
              borderRadius: 20, letterSpacing: "0.3px",
            }}>FREE</span>
          )}
          <span style={{
            fontWeight: 500,
            color: isFreeShipping ? "var(--green)" : "inherit",
            textDecoration: isFreeShipping ? "line-through" : "none",
            opacity: isFreeShipping ? 0.5 : 1,
          }}>
            ₹{shippingFee === 0 ? 50 : shippingFee}
          </span>
        </div>
      </div>

      {/* Free shipping progress bar */}
      {!isFreeShipping && (
        <div style={{ marginTop: 4, marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: "var(--green)", marginBottom: 4, fontWeight: 500 }}>
            Add ₹{(700 - subtotal).toLocaleString()} more for free shipping!
          </div>
          <div style={{ background: "var(--sand)", borderRadius: 10, height: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 10,
              background: "linear-gradient(90deg, var(--green-light), var(--green))",
              width: `${Math.min((subtotal / 700) * 100, 100)}%`,
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>
      )}

      {discount > 0 && (
        <div className="price-row">
          <span>Discount</span>
          <span style={{ color: "var(--green)", fontWeight: 600 }}>−₹{discount}</span>
        </div>
      )}

      <div className="price-row-total">
        <span>Total Payable</span>
        <span>₹{total.toLocaleString()}</span>
      </div>
    </div>
  );
}