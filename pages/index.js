import { useRouter } from "next/router";
import { useCheckout } from "../context/CheckoutContext";
import CartItem from "../components/CartItem";
import PriceSummary from "../components/PriceSummary";
import StepsBar from "../components/Stepsbar";
import StickyBar from "../components/StickyBar";
import Header from "../components/Header";

export default function Home() {
  const { cart, subtotal, total } = useCheckout();
  const router = useRouter();

  return (
    <div className="page-enter" style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <Header />
      <StepsBar current={0} />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px" }}>
        <div className="eco-card">
          <div className="eco-card-header">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="eco-card-title">Your Cart</div>
                <div className="eco-card-subtitle">{cart.cartItems.length} items, thoughtfully chosen</div>
              </div>
              <span className="eco-badge">🌱 Eco Picks</span>
            </div>
          </div>

          <div className="eco-card-body">
            {cart.cartItems.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}
            <PriceSummary
              subtotal={subtotal}
              shippingFee={cart.shipping_fee}
              discount={cart.discount_applied}
              total={total}
            />
            <div className="trust-row" style={{ marginTop: 20 }}>
              <span>🔒 256-bit SSL</span>
              <span style={{ color: "var(--sand)" }}>·</span>
              <span>📦 Free returns</span>
              <span style={{ color: "var(--sand)" }}>·</span>
              <span>🌿 Planet-friendly packaging</span>
            </div>
          </div>
        </div>
      </main>

      <StickyBar
        nextLabel="Proceed to Checkout"
        onNext={() => router.push("/checkout")}
      />
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