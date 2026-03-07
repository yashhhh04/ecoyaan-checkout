import { useRouter } from "next/router";
import { useCheckout } from "../context/CheckoutContext";
import StepsBar from "../components/Stepsbar";
import Header from "../components/Header";

export default function Success() {
  const { total, address } = useCheckout();
  const router = useRouter();
  const orderId = "ECO" + Math.random().toString(36).substr(2, 8).toUpperCase();
  const firstName = address?.fullName?.split(" ")[0] || "Friend";

  return (
    <div className="page-enter" style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <Header />
      <StepsBar current={3} />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px 48px" }}>
        <div className="eco-card">
          <div style={{
            background: "linear-gradient(160deg, #1e3d1a 0%, #2d5a27 50%, #3d7a35 100%)",
            padding: "48px 24px 40px", textAlign: "center",
          }}>
            <div style={{ fontSize: 72, animation: "pop 0.6s ease both", marginBottom: 16 }}>🌿</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 36, fontWeight: 600, color: "white",
              marginBottom: 8, letterSpacing: "-0.5px",
            }}>
              Order Placed!
            </div>
            <div style={{ fontSize: 15, color: "rgba(168,213,160,0.9)", lineHeight: 1.6 }}>
              Thank you, {firstName}!<br />
              Confirmation sent to <strong style={{ color: "white" }}>{address?.email}</strong>
            </div>
          </div>

          <div className="eco-card-body">
            {/* Order ID */}
            <div style={{
              background: "var(--green-pale)", borderRadius: "var(--radius-md)",
              padding: "14px 18px", marginBottom: 16,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              border: "1px solid rgba(45,90,39,0.12)",
            }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>Order ID</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--forest)", letterSpacing: "0.5px" }}>
                {orderId}
              </span>
            </div>

            {/* Amount */}
            <div style={{
              background: "var(--green-pale)", borderRadius: "var(--radius-md)",
              padding: "14px 18px", marginBottom: 20,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              border: "1px solid rgba(45,90,39,0.12)",
            }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>Amount Paid</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--forest)" }}>
                ₹{total?.toLocaleString()}
              </span>
            </div>

            {/* Eco impact */}
            <div style={{
              background: "linear-gradient(135deg, var(--green-pale), #dff0db)",
              borderRadius: "var(--radius-md)", padding: "18px",
              border: "1px solid rgba(45,90,39,0.12)", marginBottom: 20,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--forest)", marginBottom: 6 }}>
                🌍 Your Eco Impact
              </div>
              <div style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.7 }}>
                By choosing Ecoyaan, you've helped reduce single-use plastic and supported sustainable livelihoods. Every purchase makes a difference.
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>

      <style>{`@keyframes pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }`}</style>
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