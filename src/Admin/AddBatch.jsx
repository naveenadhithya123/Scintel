import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AddBatch() {
  const navigate = useNavigate();
  const fileRef = useRef();

  // ── Batch form state ──
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ── Members table state ──
  const [members, setMembers] = useState([]);

  // ── Add member modal ──
  const [showAddModal, setShowAddModal] = useState(false);
  const [memberForm, setMemberForm] = useState({ name: "", reg: "", role: "", year: "" });

  // ── Remove confirm modal ──
  const [removeIndex, setRemoveIndex] = useState(null);

  /* ── Image upload ── */
  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  /* ── Add member ── */
  const handleAddMember = () => {
    if (!memberForm.name.trim()) return;
    setMembers((prev) => [...prev, memberForm]);
    setMemberForm({ name: "", reg: "", role: "", year: "" });
    setShowAddModal(false);
  };

  /* ── Remove member ── */
  const handleRemove = () => {
    setMembers((prev) => prev.filter((_, i) => i !== removeIndex));
    setRemoveIndex(null);
  };

  /* ── Save batch ── */
  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a batch title.");
      return;
    }
    const existing = JSON.parse(localStorage.getItem("batches")) || [];
    const newBatch = { title, description, image, members };
    localStorage.setItem("batches", JSON.stringify([...existing, newBatch]));

    // Also persist members to shared members key used by EditBatch
    const allMembers = JSON.parse(localStorage.getItem("members")) || [];
    localStorage.setItem("members", JSON.stringify([...allMembers, ...members]));

    navigate(-1);
  };

  const inputStyle = {
    width: "100%", border: "1px solid #d1d5db", borderRadius: 8,
    padding: "12px", fontSize: 14, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box", color: "#111827",
  };

  const labelStyle = { display: "block", marginBottom: 4, color: "#4b5563", fontSize: 14 };

  const btnPrimary = {
    background: "#083A4B", color: "#fff", padding: "9px 24px",
    borderRadius: 8, border: "none", fontWeight: 600,
    fontSize: 14, cursor: "pointer", fontFamily: "inherit",
  };

  return (
    <AdminSidebar>
      <style>{`
        .ab-top-form {
          display: flex;
          gap: 40px;
          margin-bottom: 32px;
          align-items: flex-start;
        }
        .ab-upload-box {
          width: 420px;
          min-width: 420px;
          height: 220px;
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 14px;
          flex-shrink: 0;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }
        .ab-upload-box img {
          width: 100%; height: 100%; object-fit: cover;
          position: absolute; inset: 0;
        }
        .ab-fields {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ab-table-wrap {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }
        .ab-table { width: 100%; border-collapse: collapse; }
        .ab-table thead { background: #3DA6B6; color: #fff; }
        .ab-table th, .ab-table td { padding: 16px; text-align: left; font-size: 14px; }
        .ab-table td { color: #6b7280; border-top: 1px solid #f3f4f6; }
        .ab-table tbody tr:hover { background: #f9fafb; }
        .ab-cards { display: none; }
        .ab-btn-row {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          margin-top: 32px;
        }

        /* Modal */
        .ab-modal-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center;
          z-index: 50; padding: 0 16px;
        }
        .ab-modal {
          background: #fff; border-radius: 14px; padding: 32px;
          width: 100%; max-width: 480px; box-sizing: border-box;
        }
        .ab-modal h3 { font-size: 17px; font-weight: 700; color: #111827; margin-bottom: 20px; }
        .ab-modal-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; margin-bottom: 20px;
        }
        .ab-modal-btns { display: flex; justify-content: flex-end; gap: 12px; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .ab-top-form   { flex-direction: column; gap: 20px; }
          .ab-upload-box { width: 100%; min-width: unset; height: 180px; }
          .ab-table      { display: none; }
          .ab-cards      { display: flex; flex-direction: column; }
          .ab-card       { padding: 14px 16px; border-top: 1px solid #f3f4f6; }
          .ab-card:first-child { border-top: none; }
          .ab-card-name  { font-weight: 600; font-size: 14px; color: #111827; margin-bottom: 6px; }
          .ab-card-row   { display: flex; justify-content: space-between; font-size: 13px; color: #6b7280; margin-bottom: 3px; }
          .ab-card-label { font-weight: 500; color: #374151; }
          .ab-card-actions { display: flex; gap: 10px; margin-top: 10px; }
          .ab-card-actions button { flex: 1; }
          .ab-modal-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 480px) {
          .ab-btn-row        { flex-direction: column; }
          .ab-btn-row button { width: 100%; }
          .ab-main-pad       { padding: 20px 16px !important; }
          .ab-modal-btns     { flex-direction: column; }
          .ab-modal-btns button { width: 100%; }
        }
      `}</style>

      <div className="ab-main-pad" style={{ flex: 1, padding: "40px", overflowY: "auto" }}>

        <h1 style={{ fontSize: 22, fontWeight: 600, color: "#111827", marginBottom: 24 }}>
          Add Batch
        </h1>

        {/* TOP FORM */}
        <div className="ab-top-form">

          {/* Upload box */}
          <div
            className="ab-upload-box"
            onClick={() => fileRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleImage(e.dataTransfer.files[0]); }}
          >
            {image
              ? <img src={image} alt="batch" />
              : <>Drag and Drop or&nbsp;<span style={{ color: "#2563eb", cursor: "pointer" }}>choose file</span></>
            }
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files[0])} />
          </div>

          {/* Fields */}
          <div className="ab-fields">
            <div>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                style={inputStyle}
                value={title}
                placeholder="e.g. 2025-26"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                rows="4"
                style={{ ...inputStyle, resize: "vertical" }}
                value={description}
                placeholder="Describe this batch..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

        </div>

        {/* Members header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>Members</span>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ ...btnPrimary, padding: "7px 16px", fontSize: 13 }}
          >
            + Add Member
          </button>
        </div>

        {/* TABLE */}
        <div className="ab-table-wrap">

          {/* Desktop table */}
          <table className="ab-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Register no.</th>
                <th>Role</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "64px 16px", color: "#9ca3af" }}>
                    Members are not added yet
                  </td>
                </tr>
              ) : (
                members.map((m, i) => (
                  <tr key={i}>
                    <td>{m.name}</td>
                    <td>{m.reg}</td>
                    <td>{m.role}</td>
                    <td>{m.year}</td>
                    <td>
                      <button
                        onClick={() => setRemoveIndex(i)}
                        style={{ ...btnPrimary, padding: "6px 16px", fontSize: 13 }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="ab-cards">
            {members.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 16px", color: "#9ca3af", fontSize: 14 }}>
                Members are not added yet
              </div>
            ) : (
              members.map((m, i) => (
                <div key={i} className="ab-card">
                  <div className="ab-card-name">{m.name}</div>
                  <div className="ab-card-row"><span className="ab-card-label">Reg no.</span><span>{m.reg}</span></div>
                  <div className="ab-card-row"><span className="ab-card-label">Role</span><span>{m.role}</span></div>
                  <div className="ab-card-row"><span className="ab-card-label">Year</span><span>{m.year}</span></div>
                  <div className="ab-card-actions">
                    <button
                      onClick={() => setRemoveIndex(i)}
                      style={{ ...btnPrimary, padding: "8px 0", fontSize: 13 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* BUTTONS */}
        <div className="ab-btn-row">
          <button style={btnPrimary} onClick={() => navigate(-1)}>Cancel</button>
          <button style={btnPrimary} onClick={handleSave}>Save</button>
        </div>

      </div>

      {/* ── Add Member Modal ── */}
      {showAddModal && (
        <div className="ab-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="ab-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Member</h3>
            <div className="ab-modal-grid">
              {[
                { label: "Name",            key: "name",  placeholder: "Full name" },
                { label: "Register Number", key: "reg",   placeholder: "e.g. 611224104121" },
                { label: "Role",            key: "role",  placeholder: "e.g. Developer" },
                { label: "Year",            key: "year",  placeholder: "e.g. II" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    style={inputStyle}
                    value={memberForm[key]}
                    onChange={(e) => setMemberForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <div className="ab-modal-btns">
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: "#f1f5f9", color: "#374151", padding: "9px 22px",
                  borderRadius: 8, border: "1px solid #d1d5db", fontWeight: 500,
                  fontSize: 14, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
              <button style={btnPrimary} onClick={handleAddMember}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Remove Confirm Modal ── */}
      {removeIndex !== null && (
        <div className="ab-modal-backdrop" onClick={() => setRemoveIndex(null)}>
          <div className="ab-modal" style={{ maxWidth: 380, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%", background: "#fef2f2",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Remove Member?</h3>
            <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24, lineHeight: 1.5 }}>
              This member will be removed from the batch.
            </p>
            <button
              onClick={handleRemove}
              style={{ ...btnPrimary, background: "#ef4444", width: "100%", padding: "11px 0", marginBottom: 10 }}
            >
              Remove
            </button>
            <button
              onClick={() => setRemoveIndex(null)}
              style={{
                width: "100%", padding: "10px 0", borderRadius: 8, background: "#fff",
                border: "1.5px solid #e2e8f0", color: "#374151", fontWeight: 500,
                fontSize: 14, cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </AdminSidebar>
  );
}