import { useRouter } from "next/router";
import { useCheckout } from "../context/CheckoutContext";
import CartItem from "../components/CartItem";
import PriceSummary from "../components/PriceSummary";
import StepsBar from "../components/Stepsbar";

export default function Home() {
  const { cart, subtotal, total } = useCheckout();
  const router = useRouter();

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

      <StepsBar current={0} />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px" }}>
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(45,90,39,0.10)", overflow: "hidden" }}>
          <div style={{ background: "#e8f0e6", padding: "18px 24px", borderBottom: "1px solid #d8e8d5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#2d5a27", fontWeight: 600 }}>Your Cart</div>
                <div style={{ fontSize: 13, color: "#6b6b6b" }}>{cart.cartItems.length} items, thoughtfully chosen</div>
              </div>
              <span style={{
                background: "#e8f0e6", border: "1px solid #c8ddc5",
                padding: "4px 10px", borderRadius: 20, fontSize: 11,
                fontWeight: 600, color: "#2d5a27",
              }}>🌱 Eco Picks</span>
            </div>
          </div>

          <div style={{ padding: "20px 24px" }}>
            {cart.cartItems.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}
            <PriceSummary
              subtotal={subtotal}
              shippingFee={cart.shipping_fee}
              discount={cart.discount_applied}
              total={total}
            />
            <button
              onClick={() => router.push("/checkout")}
              style={{
                width: "100%", marginTop: 20, padding: 16,
                background: "#2d5a27", color: "white", border: "none",
                borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}
            >
              Proceed to Checkout →
            </button>
            <div style={{ textAlign: "center", fontSize: 12, color: "#6b6b6b", marginTop: 10 }}>
              🔒 Secure 256-bit SSL · Free returns · Planet-friendly packaging
            </div>
          </div>
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