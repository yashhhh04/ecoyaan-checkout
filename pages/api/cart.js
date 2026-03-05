export default function handler(req, res) {
  res.status(200).json({
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        emoji: "🪥",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        emoji: "🛍️",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  });
}