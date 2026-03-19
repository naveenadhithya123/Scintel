import React, { useState, useRef } from "react";

/* =========================================
   DROP ZONE
========================================= */
function DropZone({ value, onChange }) {
  const ref = useRef();

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => ref.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
      style={{
        border: "1.5px dashed #9bd3e0",
        borderRadius: 8,
        height: 130,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0fafc",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        fontSize: 13,
        color: "#64748b",
      }}
    >
      {value ? (
        <img
          src={value}
          alt="preview"
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
        />
      ) : (
        <span style={{ textAlign: "center", padding: "0 16px" }}>
          Drag and Drop or{" "}
          <span style={{ color: "#2563eb" }}>choose file</span>
        </span>
      )}
      <input
        ref={ref}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

/* =========================================
   INFO ICON
========================================= */
const InfoIcon = () => (
  <span style={{
    width: 16, height: 16, borderRadius: "50%", background: "#d1d5db",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: 10, color: "#6b7280", fontWeight: 700, cursor: "default", flexShrink: 0,
  }}>i</span>
);

/* =========================================
   INITIAL STATE
========================================= */
const emptyForm = {
  title: "",
  description: "",
  resourceImage: null,
  resourceName: "",
  resourceDescription: "",
  participants: "",
  participantImages: [null, null],
  winnerImage: null,
  winnerName: "",
  winnerFeedback: "",
  testimonials: [{ name: "", className: "", feedback: "" }],
};

/* =========================================
   EVENT FORM
   
   This is a plain form component — NO AdminSidebar inside.
   It is rendered as a child of AdminSidebar via EventsGrid.

   Props:
     mode        → "add" | "edit"
     initialData → pre-fill values for edit mode
     onSubmit    → called with form data
     onCancel    → called when Cancel is clicked
========================================= */
export default function EventForm({ onSubmit, onCancel, mode = "add", initialData = {} }) {
  const [form, setForm] = useState({ ...emptyForm, ...initialData });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateParticipantImage = (index, value) => {
    const arr = [...form.participantImages];
    arr[index] = value;
    set("participantImages", arr);
  };

  const updateTestimonial = (index, key, value) => {
    const arr = form.testimonials.map((t, i) =>
      i === index ? { ...t, [key]: value } : t
    );
    set("testimonials", arr);
  };

  const addTestimonial = () =>
    set("testimonials", [
      ...form.testimonials,
      { name: "", className: "", feedback: "" },
    ]);

  /* ── shared styles ── */
  const inputStyle = {
    width: "100%",
    padding: "9px 11px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    background: "#fff",
    fontSize: 13,
    color: "#111827",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    height: 90,
    resize: "vertical",
    display: "block",
  };

  const labelStyle = {
    display: "block",
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 5,
  };

  const fieldStyle = { marginBottom: 14 };

  const sectionStyle = {
    fontSize: 15,
    fontWeight: 600,
    color: "#111827",
    margin: "22px 0 12px",
  };

  return (
    <>
      {/* Responsive CSS — scoped to ef- classes */}
      <style>{`
        .ef-grid-2    { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ef-testi-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px; }
        .ef-btn-row   { display: flex; justify-content: flex-end; gap: 10px; margin-top: 28px; }

        @media (max-width: 600px) {
          .ef-grid-2    { grid-template-columns: 1fr !important; }
          .ef-testi-row { grid-template-columns: 1fr !important; }
          .ef-btn-row   { flex-direction: column !important; }
          .ef-btn-row button { width: 100% !important; }
        }
      `}</style>

      {/* ── Heading ── */}
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 24 }}>
        {mode === "add" ? "Add Event" : "Edit Event"}
      </h2>

      {/* ── Title ── */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Title</label>
        <input
          style={inputStyle}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
        />
      </div>

      {/* ── Description ── */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={textareaStyle}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      {/* ════ RESOURCE PERSON ════ */}
      <p style={sectionStyle}>Resource Person</p>

      <div style={fieldStyle}>
        <label style={labelStyle}>Image</label>
        <DropZone value={form.resourceImage} onChange={(v) => set("resourceImage", v)} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          value={form.resourceName}
          onChange={(e) => set("resourceName", e.target.value)}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={textareaStyle}
          value={form.resourceDescription}
          onChange={(e) => set("resourceDescription", e.target.value)}
        />
      </div>

      {/* ════ PARTICIPANTS ════ */}
      <p style={sectionStyle}>Participants</p>

      <div style={fieldStyle}>
        <label style={labelStyle}>Participants</label>
        <input
          style={inputStyle}
          value={form.participants}
          onChange={(e) => set("participants", e.target.value)}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Images</span>
        <InfoIcon />
      </div>
      <div className="ef-grid-2" style={{ marginBottom: 14 }}>
        {form.participantImages.map((img, i) => (
          <DropZone key={i} value={img} onChange={(v) => updateParticipantImage(i, v)} />
        ))}
      </div>

      {/* ════ WINNER ════ */}
      <p style={sectionStyle}>Winner</p>

      <div style={fieldStyle}>
        <label style={labelStyle}>Image</label>
        <DropZone value={form.winnerImage} onChange={(v) => set("winnerImage", v)} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          value={form.winnerName}
          onChange={(e) => set("winnerName", e.target.value)}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Feedback</label>
        <textarea
          style={textareaStyle}
          value={form.winnerFeedback}
          onChange={(e) => set("winnerFeedback", e.target.value)}
        />
      </div>

      {/* ════ TESTIMONIALS ════ */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "22px 0 12px" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>Testimonials</span>
        <InfoIcon />
      </div>

      {form.testimonials.map((t, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div className="ef-testi-row">
            <input
              placeholder="Name"
              style={inputStyle}
              value={t.name}
              onChange={(e) => updateTestimonial(i, "name", e.target.value)}
            />
            <input
              placeholder="Class"
              style={inputStyle}
              value={t.className}
              onChange={(e) => updateTestimonial(i, "className", e.target.value)}
            />
          </div>
          <textarea
            placeholder="Feedback"
            style={textareaStyle}
            value={t.feedback}
            onChange={(e) => updateTestimonial(i, "feedback", e.target.value)}
          />
        </div>
      ))}

      {/* Add testimonial */}
      <button
        onClick={addTestimonial}
        style={{
          background: "none",
          border: "1px dashed #9bd3e0",
          borderRadius: 6,
          padding: "7px 16px",
          fontSize: 12,
          color: "#2A8E9E",
          cursor: "pointer",
          marginBottom: 8,
          fontFamily: "inherit",
        }}
      >
        + Add Testimonial
      </button>

      {/* ── Buttons ── */}
      <div className="ef-btn-row">
        <button
          onClick={() => onCancel && onCancel()}
          style={{
            padding: "9px 22px", borderRadius: 6, fontSize: 13, fontWeight: 500,
            cursor: "pointer", background: "#f1f5f9", border: "1px solid #d1d5db",
            color: "#374151", fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit && onSubmit(form)}
          style={{
            padding: "9px 25px", borderRadius: 6, fontSize: 13, fontWeight: 500,
            cursor: "pointer", background: "#083A4B", color: "#fff",
            border: "none", fontFamily: "inherit",
          }}
        >
          {mode === "add" ? "Add" : "Save"}
        </button>
      </div>
    </>
  );
}