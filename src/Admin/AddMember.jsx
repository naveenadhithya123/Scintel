import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AddMember() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", reg: "", role: "", year: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const existing = JSON.parse(localStorage.getItem("members")) || [];
    const updated = [...existing, form];
    localStorage.setItem("members", JSON.stringify(updated));
    navigate("/edit-batch");
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "12px",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    color: "#111827",
  };

  const labelStyle = {
    display: "block",
    color: "#4b5563",
    marginBottom: 8,
    fontSize: 14,
  };

  return (
    <AdminSidebar>
      <style>{`
        /* Form grid: 2 cols on desktop, 1 col on mobile */
        .am-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px 48px;
          max-width: 900px;
        }

        /* Button row */
        .am-btn-row {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 48px;
        }

        @media (max-width: 640px) {
          .am-form-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .am-btn-row {
            flex-direction: column !important;
            padding-top: 32px;
          }
          .am-btn-row button {
            width: 100% !important;
          }
          .am-main-pad {
            padding: 20px 16px !important;
          }
        }
      `}</style>

      <div
        className="am-main-pad"
        style={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", overflowY: "auto" }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1f2937", marginBottom: 48 }}>
          Add Member
        </h1>

        {/* FORM */}
        <div className="am-form-grid">

          <div>
            <label style={labelStyle}>Name</label>
            <input
              name="name"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Register Number</label>
            <input
              name="reg"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Role</label>
            <input
              name="role"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Year</label>
            <input
              name="year"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="am-btn-row">
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#083A4B", color: "#fff",
              padding: "9px 24px", borderRadius: 8,
              border: "none", fontWeight: 600,
              fontSize: 14, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            style={{
              background: "#083A4B", color: "#fff",
              padding: "9px 24px", borderRadius: 8,
              border: "none", fontWeight: 600,
              fontSize: 14, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Add
          </button>
        </div>

      </div>
    </AdminSidebar>
  );
}