import { useRouter } from "next/router";
import { useCheckout } from "../context/CheckoutContext";
import StepsBar from "../components/Stepsbar";

export default function Success() {
  const { total, address } = useCheckout();
  const router = useRouter();
  const orderId = "ECO" + Math.random().toString(36).substr(2, 8).toUpperCase();
  const firstName = address?.fullName?.split(" ")[0] || "Friend";

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
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

      <StepsBar current={3} />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px" }}>
        <div style={{
          background: "white", borderRadius: 16,
          boxShadow: "0 4px 24px rgba(45,90,39,0.10)",
          padding: "48px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>🌿</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 34, fontWeight: 600, color: "#2d5a27", marginBottom: 8 }}>
            Order Placed!
          </div>
          <div style={{ fontSize: 15, color: "#6b6b6b", lineHeight: 1.6 }}>
            Thank you, {firstName}! Your eco-friendly order is confirmed.<br />
            A confirmation has been sent to <strong>{address?.email}</strong>.
          </div>
          <div style={{
            display: "inline-block", background: "#e8f0e6",
            padding: "6px 14px", borderRadius: 20,
            fontSize: 13, fontWeight: 600, color: "#2d5a27", marginTop: 12,
          }}>
            Order ID: {orderId}
          </div>
          <div style={{
            marginTop: 24, padding: "14px 16px",
            background: "#e8f0e6", borderRadius: 12,
            fontSize: 13, color: "#6b6b6b", lineHeight: 1.7,
          }}>
            <strong style={{ color: "#2d5a27" }}>🌍 Your Impact</strong><br />
            By choosing Ecoyaan, you have helped reduce single-use plastic and supported sustainable livelihoods.
          </div>
          <div style={{ marginTop: 16, fontSize: 20, fontWeight: 700, color: "#2d5a27" }}>
            ₹{total} paid successfully
          </div>
          <button
            onClick={() => router.push("/")}
            style={{
              marginTop: 24, padding: "12px 28px",
              background: "#2d5a27", color: "white",
              border: "none", borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      </main>
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
          shipping_fee: 50,
          discount_applied: 0,
        },
      },
    };
  }
}