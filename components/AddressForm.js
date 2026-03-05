import { useState } from "react";

const FIELDS = [
  { key: "fullName",  label: "Full Name",      placeholder: "Jane Doe",         full: true },
  { key: "email",     label: "Email Address",   placeholder: "jane@example.com", full: true, type: "email" },
  { key: "phone",     label: "Phone Number",    placeholder: "9876543210" },
  { key: "pinCode",   label: "PIN Code",        placeholder: "110001" },
  { key: "city",      label: "City",            placeholder: "New Delhi" },
  { key: "state",     label: "State",           placeholder: "Delhi" },
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

export default function AddressForm({ address, setAddress, onSubmit }) {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const updated = { ...address, [field]: value };
    setAddress(updated);
    if (touched[field]) setErrors(validate(updated));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(address));
  };

  const handleSubmit = () => {
    const allTouched = Object.fromEntries(FIELDS.map((f) => [f.key, true]));
    setTouched(allTouched);
    const errs = validate(address);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit();
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {FIELDS.map((field) => {
          const hasError = errors[field.key] && touched[field.key];
          return (
            <div
              key={field.key}
              style={{ gridColumn: field.full ? "1 / -1" : "auto", display: "flex", flexDirection: "column", gap: 6 }}
            >
              <label style={{ fontSize: 12, fontWeight: 600, color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={address[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                onBlur={() => handleBlur(field.key)}
                style={{
                  padding: "12px 14px",
                  border: `2px solid ${hasError ? "#c0392b" : "#ede5d4"}`,
                  borderRadius: 8, fontSize: 14,
                  background: hasError ? "#fff8f8" : "#f5f0e8",
                  outline: "none", fontFamily: "inherit",
                }}
              />
              {hasError && (
                <span style={{ fontSize: 11, color: "#c0392b" }}>⚠ {errors[field.key]}</span>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: "100%", marginTop: 20, padding: 16,
          background: "#2d5a27", color: "white", border: "none",
          borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer",
        }}
      >
        Continue to Payment →
      </button>
    </div>
  );
}