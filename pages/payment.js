import { useState } from "react";
import { useRouter } from "next/router";
import { useCheckout } from "../context/CheckoutContext";
import OrderSummary from "../components/OrderSummary";
import StepsBar from "../components/Stepsbar";

const PAYMENT_OPTIONS = [
  { id: "upi",        label: "UPI / Google Pay / PhonePe", icon: "📱" },
  { id: "card",       label: "Credit / Debit Card",        icon: "💳" },
  { id: "netbanking", label: "Net Banking",                icon: "🏦" },
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
    <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
      {/* Header */}
      <header style={{
        background: "#2d5a27", padding: "16px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "#f5f0e8" }}>
          eco<span style={{ color: "#a8d5a0", fontStyle: "italic" }}>yaan</span>
        </div>
        <div style={{ fontSize: 12, color: "#a8d5a0", letterSpacing: 2, textTransform: "uppercase" }}>
          Secure Checkout
        </div>
      </header>

      <StepsBar current={2} />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px" }}>
        <button
          onClick={() => router.push("/checkout")}
          style={{
            padding: "10px 20px", background: "transparent", color: "#2d5a27",
            border: "2px solid #2d5a27", borderRadius: 8, fontSize: 14,
            fontWeight: 600, cursor: "pointer", marginBottom: 12,
          }}
        >
          ← Edit Address
        </button>

        {/* Payment Method — ON TOP so user sees it first without scrolling */}
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(45,90,39,0.10)", overflow: "hidden", marginBottom: 16 }}>
          <div style={{ background: "#e8f0e6", padding: "18px 24px", borderBottom: "1px solid #d8e8d5" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#2d5a27", fontWeight: 600 }}>Payment Method</div>
            <div style={{ fontSize: 13, color: "#6b6b6b" }}>Choose how you'd like to pay</div>
          </div>
          <div style={{ padding: "20px 24px" }}>
            {PAYMENT_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 16px", marginBottom: 10,
                  border: `2px solid ${selected === opt.id ? "#2d5a27" : "#ede5d4"}`,
                  borderRadius: 8, cursor: "pointer",
                  background: selected === opt.id ? "#e8f0e6" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: 24 }}>{opt.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{opt.label}</span>
                <input type="radio" checked={selected === opt.id} readOnly style={{ marginLeft: "auto", accentColor: "#2d5a27" }} />
              </div>
            ))}

            <button
              onClick={handlePay}
              disabled={paying}
              style={{
                width: "100%", marginTop: 8, padding: 16,
                background: paying ? "#a8c9a5" : "#2d5a27",
                color: "white", border: "none", borderRadius: 8,
                fontSize: 15, fontWeight: 600, cursor: paying ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s",
              }}
            >
              {paying ? (
                <>
                  <span style={{
                    width: 16, height: 16,
                    border: "2px solid white", borderTopColor: "transparent",
                    borderRadius: "50%", display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Processing…
                </>
              ) : (
                `🔒 Pay Securely ₹${total}`
              )}
            </button>

            <div style={{ textAlign: "center", fontSize: 12, color: "#6b6b6b", marginTop: 10 }}>
              🌿 Eco-certified packaging · 🔒 Secured by Razorpay
            </div>
          </div>
        </div>

        {/* Order Summary — below as secondary reference */}
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(45,90,39,0.10)", overflow: "hidden" }}>
          <div style={{ background: "#e8f0e6", padding: "18px 24px", borderBottom: "1px solid #d8e8d5" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#2d5a27", fontWeight: 600 }}>Order Summary</div>
            <div style={{ fontSize: 13, color: "#6b6b6b" }}>Review your items and delivery details</div>
          </div>
          <div style={{ padding: "20px 24px" }}>
            <OrderSummary cart={cart} subtotal={subtotal} total={total} address={address} />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
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
            { product_id: 101, product_name: "Bamboo Toothbrush (Pack of 4)", product_price: 299, quantity: 2, emoji: "🪥" },
            { product_id: 102, product_name: "Reusable Cotton Produce Bags", product_price: 450, quantity: 1, emoji: "🛍️" },
          ],
          shipping_fee: 50,
          discount_applied: 0,
        },
      },
    };
  }
}