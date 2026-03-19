import React, { useState, useRef } from "react";
import AdminSidebar from "./AdminSidebar";

/* ================= INITIAL DATA ================= */
const initialGlories = [
  { id: 1, name: "Name", description: "Student have developed the web application for solving the problem of CGPA calculation.", image: null },
  { id: 2, name: "Name", description: "Student have developed the web application for solving the problem of CGPA calculation.", image: null },
  { id: 3, name: "Name", description: "Student have developed the web application for solving the problem of CGPA calculation.", image: null },
  { id: 4, name: "Name", description: "Student have developed the web application for solving the problem of CGPA calculation.", image: null },
];

/* ================= RESPONSIVE STYLES ================= */
const STYLES = `
  /* ── List grid ── */
  .gl-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  /* ── Form layout ── */
  .gl-form-main {
    flex: 1;
    padding: 28px 36px;
    overflow-y: auto;
  }

  /* ── List header ── */
  .gl-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
  }

  /* ── Form buttons ── */
  .gl-form-btns {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  /* ── Card action buttons ── */
  .gl-card-btns {
    display: flex;
    gap: 10px;
  }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .gl-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 480px) {
    .gl-grid {
      grid-template-columns: 1fr !important;
    }
    .gl-form-main {
      padding: 20px 16px !important;
    }
    .gl-form-btns {
      flex-direction: column !important;
    }
    .gl-form-btns button {
      width: 100% !important;
    }
    .gl-card-btns button {
      flex: 1 !important;
    }
    .gl-list-header button {
      width: 100% !important;
    }
  }
`;

/* ================= DELETE MODAL ================= */
function DeleteModal({ glory, onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      backgroundColor: "rgba(0,0,0,0.25)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: "0 16px",
    }}>
      {/* Backdrop close */}
      <div onClick={onCancel} style={{ position: "fixed", inset: 0 }} />

      <div style={{
        backgroundColor: "#FFFFFF", borderRadius: "16px",
        width: "100%", maxWidth: "380px",
        overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          width: "100%", height: "220px",
          backgroundColor: glory.image ? "transparent" : "#e8ecee",
        }}>
          {glory.image && (
            <img src={glory.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </div>

        <div style={{ padding: "16px 20px 20px" }}>
          <button
            onClick={onConfirm}
            style={{
              width: "100%", backgroundColor: "#e84040", color: "#ffffff",
              fontSize: "15px", fontWeight: 700, padding: "13px",
              borderRadius: "10px", border: "none", cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= GLORY FORM ================= */
function GloryForm({ heading, initialName, initialDescription, initialImage, onCancel, onSave, saveLabel }) {
  const [name, setName]               = useState(initialName        || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [image, setImage]             = useState(initialImage        || null);
  const fileInputRef = useRef();

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="gl-form-main">
      <h1 style={{ color: "#023347", fontSize: "22px", fontWeight: 700, marginBottom: "28px" }}>
        {heading}
      </h1>

      {/* Thumbnail */}
      <label style={{ marginBottom: "10px", display: "block" }}>Thumbnail Picture</label>
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        style={{
          border: "2px dashed #2A8E9E", borderRadius: "12px", height: "190px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", marginBottom: "24px", overflow: "hidden", position: "relative",
        }}
      >
        {image
          ? <img src={image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <p style={{ color: "#6b7280", fontSize: 14 }}>Drag and Drop or choose file</p>
        }
      </div>
      <input
        ref={fileInputRef} type="file" accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {/* Name */}
      <label style={{ display: "block", marginBottom: 6 }}>Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%", padding: "11px", borderRadius: "10px",
          border: "1.5px solid #2A8E9E", marginBottom: "20px",
          fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
        }}
      />

      {/* Description */}
      <label style={{ display: "block", marginBottom: 6 }}>Short Description</label>
      <textarea
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%", padding: "11px", borderRadius: "10px",
          border: "1.5px solid #2A8E9E", marginBottom: "30px",
          fontSize: 14, fontFamily: "inherit", outline: "none",
          boxSizing: "border-box", resize: "vertical",
        }}
      />

      {/* Buttons */}
      <div className="gl-form-btns">
        <button
          onClick={onCancel}
          style={{
            backgroundColor: "#023347", color: "#ffffff",
            padding: "9px 28px", borderRadius: "10px",
            border: "none", cursor: "pointer", fontFamily: "inherit",
            fontSize: 14, fontWeight: 600,
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onSave({ name, description, image })}
          style={{
            backgroundColor: "#023347", color: "#ffffff",
            padding: "9px 36px", borderRadius: "10px",
            border: "none", cursor: "pointer", fontFamily: "inherit",
            fontSize: 14, fontWeight: 600,
          }}
        >
          {saveLabel}
        </button>
      </div>
    </main>
  );
}

/* ================= MAIN PAGE ================= */
export default function GloriesAdmin() {
  const [glories, setGlories]         = useState(initialGlories);
  const [view, setView]               = useState("list");
  const [editTarget, setEditTarget]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (data) => {
    setGlories((prev) => [...prev, { id: Date.now(), ...data }]);
    setView("list");
  };

  const handleEdit = (data) => {
    setGlories((prev) => prev.map((g) => (g.id === editTarget.id ? { ...g, ...data } : g)));
    setEditTarget(null);
    setView("list");
  };

  const handleDelete = () => {
    setGlories((prev) => prev.filter((g) => g.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  /* ── ADD PAGE ── */
  if (view === "add") {
    return (
      <AdminSidebar>
        <style>{STYLES}</style>
        <GloryForm
          heading="Add Glories"
          onCancel={() => setView("list")}
          onSave={handleAdd}
          saveLabel="Add"
        />
      </AdminSidebar>
    );
  }

  /* ── EDIT PAGE ── */
  if (view === "edit" && editTarget) {
    return (
      <AdminSidebar>
        <style>{STYLES}</style>
        <GloryForm
          heading="Edit Glories"
          initialName={editTarget.name}
          initialDescription={editTarget.description}
          initialImage={editTarget.image}
          onCancel={() => { setEditTarget(null); setView("list"); }}
          onSave={handleEdit}
          saveLabel="Save"
        />
      </AdminSidebar>
    );
  }

  /* ── LIST PAGE ── */
  return (
    <AdminSidebar>
      <style>{STYLES}</style>

      <main style={{ flex: 1, padding: "28px 36px", overflowY: "auto" }} className="gl-list-main">
        <style>{`
          @media (max-width: 480px) {
            .gl-list-main { padding: 20px 16px !important; }
          }
        `}</style>

        {deleteTarget && (
          <DeleteModal
            glory={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}

        {/* Header */}
        <div className="gl-list-header">
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>Glories</h1>
          <button
            onClick={() => setView("add")}
            style={{
              backgroundColor: "#023347", color: "#fff",
              padding: "9px 20px", borderRadius: "10px",
              border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 14, fontWeight: 600,
            }}
          >
            + Add Glory
          </button>
        </div>

        {/* Grid */}
        <div className="gl-grid">
          {glories.map((glory) => (
            <div
              key={glory.id}
              style={{
                background: "#fff", borderRadius: "12px",
                border: "1px solid #e2e8ec", overflow: "hidden",
              }}
            >
              <div style={{ height: "160px", background: "#3a3f44" }}>
                {glory.image && (
                  <img src={glory.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </div>

              <div style={{ padding: "14px" }}>
                <h3 style={{ fontWeight: 700, marginBottom: 6 }}>{glory.name}</h3>
                <p style={{ fontSize: "12.5px", marginBottom: "12px", color: "#4b5563" }}>
                  {glory.description}
                </p>
                <div className="gl-card-btns">
                  <button
                    onClick={() => { setEditTarget(glory); setView("edit"); }}
                    style={{
                      background: "#023347", color: "#fff",
                      padding: "7px 24px", borderRadius: "10px",
                      border: "none", cursor: "pointer",
                      fontFamily: "inherit", fontSize: 13, fontWeight: 600,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(glory)}
                    style={{
                      background: "#023347", color: "#fff",
                      padding: "7px 20px", borderRadius: "10px",
                      border: "none", cursor: "pointer",
                      fontFamily: "inherit", fontSize: 13, fontWeight: 600,
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminSidebar>
  );
}