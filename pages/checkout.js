import { useRouter } from "next/router";
import { useCheckout } from "../context/CheckoutContext";
import AddressForm from "../components/AddressForm";
import StepsBar from "../components/Stepsbar";

export default function Checkout() {
  const { address, setAddress } = useCheckout();
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

      <StepsBar current={1} />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px" }}>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "10px 20px", background: "transparent", color: "#2d5a27",
            border: "2px solid #2d5a27", borderRadius: 8, fontSize: 14,
            fontWeight: 600, cursor: "pointer", marginBottom: 12,
          }}
        >
          ← Back to Cart
        </button>

        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(45,90,39,0.10)", overflow: "hidden" }}>
          <div style={{ background: "#e8f0e6", padding: "18px 24px", borderBottom: "1px solid #d8e8d5" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#2d5a27", fontWeight: 600 }}>Shipping Address</div>
            <div style={{ fontSize: 13, color: "#6b6b6b" }}>Where should we deliver your eco-goodies?</div>
          </div>
          <div style={{ padding: "20px 24px" }}>
            <AddressForm
              address={address}
              setAddress={setAddress}
              onSubmit={() => router.push("/payment")}
            />
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