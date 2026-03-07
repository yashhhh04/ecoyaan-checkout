import { useRouter } from "next/router";
import AddressForm from "../components/AddressForm";
import StepsBar from "../components/Stepsbar";
import Header from "../components/Header";
import StickyBar from "../components/StickyBar";

export default function Checkout() {
  const router = useRouter();

  return (
    <div className="page-enter" style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <Header />
      <StepsBar current={1} />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "28px 16px" }}>
        <div className="eco-card">
          <div className="eco-card-header">
            <div className="eco-card-title">Shipping Address</div>
            <div className="eco-card-subtitle">Select a saved address or add a new one</div>
          </div>
          <div className="eco-card-body">
            <AddressForm onSubmit={() => router.push("/payment")} />
          </div>
        </div>
      </main>

      <StickyBar backLabel="Back to Cart" backPath="/" />
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