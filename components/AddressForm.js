import { useState } from "react";
import { useCheckout } from "../context/CheckoutContext";

const FIELDS = [
  { key: "fullName", label: "Full Name",     placeholder: "Jane Doe",         full: true },
  { key: "email",    label: "Email Address", placeholder: "jane@example.com", full: true, type: "email" },
  { key: "phone",    label: "Phone Number",  placeholder: "9876543210" },
  { key: "pinCode",  label: "PIN Code",      placeholder: "110001" },
  { key: "city",     label: "City",          placeholder: "New Delhi" },
  { key: "state",    label: "State",         placeholder: "Delhi" },
];

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email";
  if (!values.phone.trim()) errors.phone = "Phone is required";
  else if (!/^\d{10}$/.test(values.phone.replace(/\s/g, ""))) errors.phone = "Enter a 10-digit phone number";
  if (!values.pinCode.trim()) errors.pinCode = "PIN code is required";
  else if (!/^\d{6}$/.test(values.pinCode)) errors.pinCode = "Enter a valid 6-digit PIN";
  if (!values.city.trim()) errors.city = "City is required";
  if (!values.state.trim()) errors.state = "State is required";
  return errors;
}

function AddressCard({ addr, isSelected, onSelect, onDelete }) {
  return (
    <div
      onClick={() => onSelect(addr.id)}
      style={{
        padding: "16px 18px",
        borderRadius: "var(--radius-md)", marginBottom: 10,
        cursor: "pointer",
        border: `2px solid ${isSelected ? "var(--green)" : "var(--sand)"}`,
        background: isSelected ? "var(--green-pale)" : "var(--white)",
        transition: "all 0.2s",
        boxShadow: isSelected ? "0 2px 12px rgba(45,90,39,0.1)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 5, color: "var(--text)" }}>
            {addr.fullName}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
            {addr.phone} &nbsp;·&nbsp; {addr.email}<br />
            {addr.city}, {addr.state} — {addr.pinCode}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, marginLeft: 12 }}>
          {isSelected && (
            <span style={{
              background: "var(--green)", color: "white",
              fontSize: 10, fontWeight: 700, padding: "3px 10px",
              borderRadius: 20, letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}>
              ✓ Selected
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(addr.id); }}
            style={{
              background: "transparent", border: "none",
              color: "var(--text-muted)", cursor: "pointer",
              fontSize: 20, lineHeight: 1, padding: "0 2px",
              transition: "color 0.2s",
            }}
            onMouseOver={e => e.target.style.color = "var(--red)"}
            onMouseOut={e => e.target.style.color = "var(--text-muted)"}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AddressForm({ onSubmit }) {
  const { savedAddresses, selectedAddressId, saveAddress, selectAddress, deleteAddress } = useCheckout();
  const [showForm, setShowForm] = useState(savedAddresses.length === 0);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", pinCode: "", city: "", state: "",
  });

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) setErrors(validate(updated));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSave = () => {
    const allTouched = Object.fromEntries(FIELDS.map((f) => [f.key, true]));
    setTouched(allTouched);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      saveAddress(formData);
      setFormData({ fullName: "", email: "", phone: "", pinCode: "", city: "", state: "" });
      setTouched({}); setErrors({});
      setShowForm(false);
    }
  };

  return (
    <div>
      {/* Saved addresses */}
      {savedAddresses.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: "var(--text-muted)",
            textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10,
          }}>
            Saved Addresses
          </div>
          {savedAddresses.map((addr) => (
            <AddressCard
              key={addr.id}
              addr={addr}
              isSelected={selectedAddressId === addr.id}
              onSelect={selectAddress}
              onDelete={deleteAddress}
            />
          ))}
        </div>
      )}

      {/* Add new toggle */}
      {!showForm && (
        <button className="btn-dashed" onClick={() => setShowForm(true)} style={{ marginBottom: 8 }}>
          + Add New Address
        </button>
      )}

      {/* New address form */}
      {showForm && (
        <div style={{
          background: "var(--cream)", borderRadius: "var(--radius-md)",
          padding: 18, marginBottom: 8,
          border: "1.5px solid var(--sand)",
        }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: "var(--green)",
            textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 14,
          }}>
            New Address
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {FIELDS.map((field) => {
              const hasError = errors[field.key] && touched[field.key];
              return (
                <div key={field.key} style={{ gridColumn: field.full ? "1 / -1" : "auto" }}>
                  <label className="eco-label">{field.label}</label>
                  <input
                    className={`eco-input${hasError ? " error" : ""}`}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onBlur={() => handleBlur(field.key)}
                  />
                  {hasError && <div className="eco-error">⚠ {errors[field.key]}</div>}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              onClick={() => { setShowForm(false); setTouched({}); setErrors({}); }}
              style={{
                flex: 1, padding: "12px 0", background: "transparent",
                color: "var(--text-muted)", border: "1.5px solid var(--sand)",
                borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                flex: 2, padding: "12px 0", background: "var(--green)",
                color: "white", border: "none", borderRadius: "var(--radius-sm)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                boxShadow: "0 4px 12px rgba(45,90,39,0.25)",
              }}
            >
              Save Address
            </button>
          </div>
        </div>
      )}

      {/* Continue — disabled until address selected */}
      <button
        className="btn-primary"
        onClick={() => selectedAddressId && onSubmit()}
        disabled={!selectedAddressId}
        style={{ marginTop: 8 }}
      >
        Continue to Payment →
      </button>

      {!selectedAddressId && (
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
          Please select or add a delivery address to continue
        </div>
      )}
    </div>
  );
}