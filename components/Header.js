export default function Header() {
  return (
    <header style={{
      background: "linear-gradient(135deg, #1e3d1a 0%, #2d5a27 60%, #3a7030 100%)",
      padding: "18px 28px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      position: "sticky", top: 0, zIndex: 200,
      boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 28, color: "#faf7f2", letterSpacing: "-0.5px",
      }}>
        eco<span style={{ color: "#a8d5a0", fontStyle: "italic" }}>yaan</span>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 11, color: "rgba(168,213,160,0.9)",
        letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500,
      }}>
        <span>🔒</span> Secure Checkout
      </div>
    </header>
  );
}