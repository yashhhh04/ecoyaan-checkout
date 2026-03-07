import { useState } from "react";
import { useRouter } from "next/router";
import { useCheckout } from "../context/CheckoutContext";
import OrderSummary from "../components/OrderSummary";
import StepsBar from "../components/Stepsbar";
import StickyBar from "../components/StickyBar";
import Header from "../components/Header";

const PAYMENT_OPTIONS = [
  { id: "upi",        label: "UPI / Google Pay / PhonePe", icon: "📱", sub: "Instant payment" },
  { id: "card",       label: "Credit / Debit Card",        icon: "💳", sub: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking",                icon: "🏦", sub: "All major banks" },
];

export default function Payment() {
  const { cart, address, subtotal, total } = useCheckout();
  const [selected, setSelected] = useState("upi");
  const [paying, setPaying] = useState(false);
  const router = useRouter();

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => router.push("/success"), 1800);
  };

  return (
    <div className="page-enter" style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <Header />
      <StepsBar current={2} />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px" }}>

        {/* Payment Method — top */}
        <div className="eco-card">
          <div className="eco-card-header">
            <div className="eco-card-title">Payment Method</div>
            <div className="eco-card-subtitle">Choose how you'd like to pay</div>
          </div>
          <div className="eco-card-body">
            {PAYMENT_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 16px", marginBottom: 10,
                  border: `2px solid ${selected === opt.id ? "var(--green)" : "var(--sand)"}`,
                  borderRadius: "var(--radius-md)", cursor: "pointer",
                  background: selected === opt.id ? "var(--green-pale)" : "var(--white)",
                  transition: "all 0.2s",
                  boxShadow: selected === opt.id ? "0 2px 10px rgba(45,90,39,0.1)" : "none",
                }}
              >
                <span style={{ fontSize: 26 }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{opt.sub}</div>
                </div>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${selected === opt.id ? "var(--green)" : "var(--sand)"}`,
                  background: selected === opt.id ? "var(--green)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {selected === opt.id && (
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />
                  )}
                </div>
              </div>
            ))}
            <div className="trust-row">
              <span>🌿 Eco-certified packaging</span>
              <span style={{ color: "var(--sand)" }}>·</span>
              <span>🔒 Secured by Razorpay</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="eco-card">
          <div className="eco-card-header">
            <div className="eco-card-title">Order Summary</div>
            <div className="eco-card-subtitle">Review your items and delivery details</div>
          </div>
          <div className="eco-card-body">
            <OrderSummary cart={cart} subtotal={subtotal} total={total} address={address} />
          </div>
        </div>
      </main>

      <StickyBar
        backLabel="Edit Address"
        backPath="/checkout"
        nextLabel={paying ? "Processing…" : `🔒 Pay ₹${total.toLocaleString()}`}
        onNext={handlePay}
        nextDisabled={paying}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  try {
    const res = await fetch(`${protocol}://${host}/api/cart`);
    const cartData = await res.json();
    return { props: { cartData } };
  } catch (error) {
    return {
      props: {
        cartData: {
          cartItems: [
            { product_id: 101, product_name: "Bamboo Toothbrush (Pack of 4)", product_price: 299, quantity: 2, image: "via.placeholder.com/150" },
            { product_id: 102, product_name: "Reusable Cotton Produce Bags", product_price: 450, quantity: 1, image: "via.placeholder.com/150" },
          ],
          shipping_fee: 50, discount_applied: 0,
        },
      },
    };
  }
}