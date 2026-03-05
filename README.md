# Ecoyaan Checkout Flow (Frontend Assignment)

A simplified checkout flow built using **Next.js** and **React**.
This project simulates a basic e-commerce checkout experience where users can review their cart, enter shipping details, and complete a mock payment.

The goal of this assignment is to demonstrate understanding of:

* Server-Side Rendering (SSR) in Next.js
* State management using React Context API
* Form handling and validation
* Responsive UI design
* Component-based architecture

---

## 🚀 Live Demo

Deployed application:
(Add your deployed Vercel link here)

---

## 📂 Project Structure

```
ecoyaan-checkout
│
├── pages
│   ├── index.js            # Cart / Order Summary page (SSR)
│   ├── checkout.js         # Shipping Address form
│   ├── payment.js          # Payment confirmation page
│   ├── success.js          # Order success page
│   │
│   └── api
│       └── cart.js         # Mock API returning cart data
│
├── components              # Reusable UI components
│
├── context
│   └── CheckoutContext.js  # Global state management
│
├── styles
│   └── globals.css
│
└── package.json
```

---

## 🧩 Checkout Flow

### 1. Cart / Order Summary

* Displays products in the cart
* Shows:

  * Product image
  * Product name
  * Price
  * Quantity
* Calculates:

  * Subtotal
  * Shipping Fee
  * Grand Total
* Includes **Proceed to Checkout** button

Cart data is fetched using **Next.js Server-Side Rendering (getServerSideProps)**.

---

### 2. Shipping Address

Users must enter:

* Full Name
* Email
* Phone Number
* PIN Code
* City
* State

Basic validation included:

* Required fields
* Email format validation
* Phone number must be 10 digits

Shipping data is stored using **React Context API**.

---

### 3. Payment Confirmation

Displays:

* Final order summary
* Shipping address details

Users can click **Pay Securely** to simulate a payment.

---

### 4. Order Success

A simple confirmation page showing:

```
🎉 Order Successful!
Thank you for shopping with Ecoyaan.
```

---

## ⚙️ Technical Implementation

### Server-Side Rendering (SSR)

The cart data is fetched using **Next.js getServerSideProps** to ensure the data is rendered on the server before sending the page to the client.

---

### State Management

The checkout flow requires data to persist across multiple pages.

This is handled using **React Context API**, which stores:

* Cart items
* Shipping address details

---

### Mock Backend

A mock API endpoint is created using **Next.js API Routes**:

```
/pages/api/cart.js
```

This simulates fetching cart data from a backend service.

---

## 🎨 UI & Styling

Styling is implemented using **Tailwind CSS**.

Design considerations:

* Clean and minimal layout
* Mobile responsive
* Clear checkout flow
* Simple user experience

---

## 🛠 Installation & Running Locally

Clone the repository:

```
git clone https://github.com/your-username/ecoyaan-checkout.git
```

Navigate to the project directory:

```
cd ecoyaan-checkout
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open the application:

```
http://localhost:3000
```

---

## 📦 Deployment

The project can be deployed easily using **Vercel**, which provides native support for Next.js.

Steps:

1. Push the repository to GitHub
2. Import the project in Vercel
3. Deploy

---

## 📌 Key Features

* Next.js Server-Side Rendering (SSR)
* React Context API state management
* Multi-step checkout flow
* Form validation
* Mock API backend
* Responsive UI

---

## 📄 Author

Yash Samar
