import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function EditMember() {
  const navigate = useNavigate();
  const location = useLocation();
  const index = location.state?.index;

  const [form, setForm] = useState({ name: "", reg: "", role: "", year: "" });

  // ✅ LOAD SELECTED MEMBER
  useEffect(() => {
    const members = JSON.parse(localStorage.getItem("members")) || [];
    if (index !== undefined && members[index]) {
      setForm(members[index]);
    }
  }, [index]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAVE UPDATED MEMBER
  const handleSave = () => {
    const members = JSON.parse(localStorage.getItem("members")) || [];
    if (index !== undefined) {
      members[index] = form;
      localStorage.setItem("members", JSON.stringify(members));
    }
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
        .em-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px 48px;
          max-width: 900px;
        }
        .em-btn-row {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 48px;
        }
        @media (max-width: 640px) {
          .em-form-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .em-btn-row {
            flex-direction: column !important;
            padding-top: 32px;
          }
          .em-btn-row button {
            width: 100% !important;
          }
          .em-main-pad {
            padding: 20px 16px !important;
          }
        }
      `}</style>

      <div
        className="em-main-pad"
        style={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", overflowY: "auto" }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1f2937", marginBottom: 48 }}>
          Edit Member
        </h1>

        {/* FORM */}
        <div className="em-form-grid">

          <div>
            <label style={labelStyle}>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Register Number</label>
            <input
              name="reg"
              value={form.reg}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Year</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="em-btn-row">
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#023347", color: "#fff",
              padding: "9px 24px", borderRadius: 8,
              border: "none", fontWeight: 600,
              fontSize: 14, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              background: "#023347", color: "#fff",
              padding: "9px 24px", borderRadius: 8,
              border: "none", fontWeight: 600,
              fontSize: 14, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Save
          </button>
        </div>

      </div>
    </AdminSidebar>
  );
}