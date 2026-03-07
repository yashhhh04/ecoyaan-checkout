import { useRouter } from "next/router";

export default function StickyBar({ backLabel, backPath, nextLabel, onNext, nextDisabled }) {
  const router = useRouter();

  return (
    <>
      <div style={{ height: 88 }} />
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--sand)",
        padding: "14px 24px",
        display: "flex", gap: 12, alignItems: "center",
        boxShadow: "0 -4px 24px rgba(30,61,26,0.1)",
      }}>
        {backPath && (
          <button
            onClick={() => router.push(backPath)}
            style={{
              flex: 1, padding: "14px 0",
              background: "transparent", color: "var(--green)",
              border: "1.5px solid var(--green)", borderRadius: "var(--radius-sm)",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={e => e.target.style.background = "var(--green-pale)"}
            onMouseOut={e => e.target.style.background = "transparent"}
          >
            ← {backLabel || "Back"}
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            style={{
              flex: 2, padding: "14px 0",
              background: nextDisabled ? "var(--green-light)" : "var(--green)",
              color: "white", border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: 14, fontWeight: 600,
              cursor: nextDisabled ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: nextDisabled ? "none" : "0 4px 14px rgba(45,90,39,0.3)",
            }}
          >
            {nextLabel || "Continue"} {!nextDisabled && "→"}
          </button>
        )}
      </div>
    </>
  );
}