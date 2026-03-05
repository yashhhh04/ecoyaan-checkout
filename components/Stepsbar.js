const STEPS = ["Cart", "Address", "Payment", "Done"];

export default function StepsBar({ current }) {
  return (
    <div style={{ background: "#ede5d4", padding: "16px 24px", overflowX: "auto" }}>
      <div style={{
        display: "flex", gap: 8, alignItems: "center",
        justifyContent: "center", minWidth: "max-content", margin: "0 auto"
      }}>
        {STEPS.map((s, i) => {
          const isDone   = i < current;
          const isActive = i === current;
          return (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 600,
                background: isDone ? "#2d5a27" : isActive ? "white" : "transparent",
                color:      isDone ? "white"   : isActive ? "#2d5a27" : "#999",
                border:     isDone || isActive ? "2px solid #2d5a27" : "2px solid #ccc",
              }}>
                {isDone ? "✓" : i + 1}
              </div>
              <span style={{
                fontSize: 12,
                color: isActive ? "#2d5a27" : "#999",
                fontWeight: isActive ? 600 : 400,
              }}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div style={{ width: 32, height: 2, background: isDone ? "#2d5a27" : "#ccc" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}