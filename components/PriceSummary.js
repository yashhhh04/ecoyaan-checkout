export default function PriceSummary({ subtotal, shippingFee, discount, total }) {
  return (
    <div style={{ marginTop: 8, paddingTop: 8 }}>
      <div className="price-row">
        <span>Subtotal</span>
        <span style={{ fontWeight: 500 }}>₹{subtotal.toLocaleString()}</span>
      </div>
      <div className="price-row">
        <span>Standard Shipping</span>
        <span style={{ color: shippingFee === 0 ? "var(--green)" : "inherit", fontWeight: 500 }}>
          {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
        </span>
      </div>
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