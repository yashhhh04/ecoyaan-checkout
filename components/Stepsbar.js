const STEPS = ["Cart", "Address", "Payment", "Done"];

export default function StepsBar({ current }) {
  return (
    <div style={{
      background: "var(--cream-dark)",
      borderBottom: "1px solid var(--sand)",
      padding: "14px 24px",
      overflowX: "auto",
    }}>
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center",
        minWidth: "max-content", margin: "0 auto",
        gap: 0,
      }}>
        {STEPS.map((label, i) => {
          const isDone   = i < current;
          const isActive = i === current;
          const isLast   = i === STEPS.length - 1;

          return (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              {/* Step */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                  transition: "all 0.3s",
                  background: isDone ? "var(--green)" : isActive ? "var(--white)" : "transparent",
                  color:      isDone ? "white"        : isActive ? "var(--green)" : "var(--text-muted)",
                  border:     isDone || isActive ? "2px solid var(--green)" : "2px solid var(--sand)",
                  boxShadow:  isActive ? "0 0 0 4px rgba(45,90,39,0.12)" : "none",
                }}>
                  {isDone ? "✓" : i + 1}
                </div>
                <span style={{
                  fontSize: 12, fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--green)" : isDone ? "var(--text-mid)" : "var(--text-muted)",
                  whiteSpace: "nowrap",
                }}>
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div style={{
                  width: 40, height: 2, margin: "0 8px",
                  background: isDone ? "var(--green)" : "var(--sand)",
                  transition: "background 0.3s",
                  borderRadius: 2,
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}