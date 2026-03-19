import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar'; // adjust path as needed

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
        border: '1.5px dashed #9bd3e0',
        borderRadius: 8,
        height: 130,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0fafc',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        fontSize: 13,
        color: '#64748b',
      }}
    >
      {value ? (
        <img
          src={value}
          alt="preview"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
      ) : (
        <span style={{ textAlign: 'center', padding: '0 16px' }}>
          Drag and Drop or <span style={{ color: '#2563eb' }}>choose file</span>
        </span>
      )}
      <input ref={ref} type="file" hidden accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
    </div>
  );
}

/* =========================================
   INFO ICON
========================================= */
const InfoIcon = () => (
  <span style={{
    width: 16, height: 16, borderRadius: '50%', background: '#d1d5db',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 10, color: '#6b7280', fontWeight: 700, cursor: 'default', flexShrink: 0,
  }}>i</span>
);

/* =========================================
   BACK ARROW ICON
========================================= */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/* =========================================
   INITIAL FORM STATE
========================================= */
const emptyForm = {
  title: '',
  description: '',
  resourceImage: null,
  resourceName: '',
  resourceDescription: '',
  participants: '',
  participantImages: [null, null],
  winnerImage: null,
  winnerName: '',
  winnerFeedback: '',
  testimonials: [{ name: '', className: '', feedback: '' }],
};

/* =========================================
   EVENT FORM  (pure form — no sidebar)
========================================= */
function EventForm({ mode = 'add', initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...emptyForm, ...initialData });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateParticipantImage = (index, value) => {
    const arr = [...form.participantImages];
    arr[index] = value;
    set('participantImages', arr);
  };

  const updateTestimonial = (index, key, value) => {
    const arr = form.testimonials.map((t, i) =>
      i === index ? { ...t, [key]: value } : t
    );
    set('testimonials', arr);
  };

  const addTestimonial = () =>
    set('testimonials', [...form.testimonials, { name: '', className: '', feedback: '' }]);

  /* shared styles */
  const input = {
    width: '100%', padding: '9px 11px',
    border: '1px solid #d1d5db', borderRadius: 6,
    background: '#fff', fontSize: 13, color: '#111827',
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  };
  const textarea  = { ...input, height: 90, resize: 'vertical', display: 'block' };
  const lbl       = { display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 5 };
  const field     = { marginBottom: 14 };
  const section   = { fontSize: 15, fontWeight: 600, color: '#111827', margin: '22px 0 12px' };

  return (
    <>
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

      {/* Title */}
      <div style={field}>
        <label style={lbl}>Title</label>
        <input style={input} value={form.title} onChange={(e) => set('title', e.target.value)} />
      </div>

      {/* Description */}
      <div style={field}>
        <label style={lbl}>Description</label>
        <textarea style={textarea} value={form.description} onChange={(e) => set('description', e.target.value)} />
      </div>

      {/* Resource Person */}
      <p style={section}>Resource Person</p>
      <div style={field}>
        <label style={lbl}>Image</label>
        <DropZone value={form.resourceImage} onChange={(v) => set('resourceImage', v)} />
      </div>
      <div style={field}>
        <label style={lbl}>Name</label>
        <input style={input} value={form.resourceName} onChange={(e) => set('resourceName', e.target.value)} />
      </div>
      <div style={field}>
        <label style={lbl}>Description</label>
        <textarea style={textarea} value={form.resourceDescription} onChange={(e) => set('resourceDescription', e.target.value)} />
      </div>

      {/* Participants */}
      <p style={section}>Participants</p>
      <div style={field}>
        <label style={lbl}>Participants</label>
        <input style={input} value={form.participants} onChange={(e) => set('participants', e.target.value)} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Images</span>
        <InfoIcon />
      </div>
      <div className="ef-grid-2" style={{ marginBottom: 14 }}>
        {form.participantImages.map((img, i) => (
          <DropZone key={i} value={img} onChange={(v) => updateParticipantImage(i, v)} />
        ))}
      </div>

      {/* Winner */}
      <p style={section}>Winner</p>
      <div style={field}>
        <label style={lbl}>Image</label>
        <DropZone value={form.winnerImage} onChange={(v) => set('winnerImage', v)} />
      </div>
      <div style={field}>
        <label style={lbl}>Name</label>
        <input style={input} value={form.winnerName} onChange={(e) => set('winnerName', e.target.value)} />
      </div>
      <div style={field}>
        <label style={lbl}>Feedback</label>
        <textarea style={textarea} value={form.winnerFeedback} onChange={(e) => set('winnerFeedback', e.target.value)} />
      </div>

      {/* Testimonials */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '22px 0 12px' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>Testimonials</span>
        <InfoIcon />
      </div>
      {form.testimonials.map((t, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div className="ef-testi-row">
            <input placeholder="Name"  style={input} value={t.name}      onChange={(e) => updateTestimonial(i, 'name',      e.target.value)} />
            <input placeholder="Class" style={input} value={t.className} onChange={(e) => updateTestimonial(i, 'className', e.target.value)} />
          </div>
          <textarea placeholder="Feedback" style={textarea} value={t.feedback} onChange={(e) => updateTestimonial(i, 'feedback', e.target.value)} />
        </div>
      ))}

      <button
        onClick={addTestimonial}
        style={{
          background: 'none', border: '1px dashed #9bd3e0', borderRadius: 6,
          padding: '7px 16px', fontSize: 12, color: '#2A8E9E',
          cursor: 'pointer', marginBottom: 8, fontFamily: 'inherit',
        }}
      >
        + Add Testimonial
      </button>

      {/* Action buttons */}
      <div className="ef-btn-row">
        <button
          onClick={() => onCancel && onCancel()}
          style={{
            padding: '9px 22px', borderRadius: 6, fontSize: 13, fontWeight: 500,
            cursor: 'pointer', background: '#f1f5f9', border: '1px solid #d1d5db',
            color: '#374151', fontFamily: 'inherit',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit && onSubmit(form)}
          style={{
            padding: '9px 25px', borderRadius: 6, fontSize: 13, fontWeight: 500,
            cursor: 'pointer', background: '#083A4B', color: '#fff',
            border: 'none', fontFamily: 'inherit',
          }}
        >
          {mode === 'add' ? 'Add' : 'Save'}
        </button>
      </div>
    </>
  );
}

/* =========================================
   EVENT PAGE SHELL
   — AdminSidebar + sticky top-bar + full-width scrollable form
========================================= */
function EventPage({ title, year, mode, initialData, onSubmit, onCancel }) {
  const navigate = useNavigate();

  return (
    <AdminSidebar>
      {/* Responsive tweaks */}
      <style>{`
        .ep-topbar  { padding: 16px 32px; }
        .ep-content { padding: 28px 32px 60px; }
        @media (max-width: 600px) {
          .ep-topbar  { padding: 12px 16px !important; }
          .ep-content { padding: 20px 16px 60px !important; }
        }
      `}</style>

      {/* Full-height scrollable column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ── Sticky top bar ── */}
        <div
          className="ep-topbar"
          style={{
            position: 'sticky', top: 0, zIndex: 10,
            backgroundColor: '#f4f7f9',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', gap: 12,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => onCancel ? onCancel() : navigate(`/admin/activities/${year}`)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#64748b', padding: 0,
              display: 'flex', alignItems: 'center',
            }}
          >
            <BackIcon />
          </button>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0d2233', margin: 0 }}>{title}</h1>
          <span style={{
            marginLeft: 4, padding: '2px 10px', borderRadius: 20,
            backgroundColor: '#e0f7fa', color: '#0d7a8a',
            fontSize: 12, fontWeight: 600,
          }}>
            {decodeURIComponent(year || '')}
          </span>
        </div>

        {/* ── Scrollable form area — full width ── */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f4f7f9' }}>
          <div
            className="ep-content"
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            {/* Form heading */}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
              {title}
            </h2>

            <EventForm
              mode={mode}
              initialData={initialData}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          </div>
        </div>

      </div>
    </AdminSidebar>
  );
}

/* =========================================
   ADD EVENT PAGE
========================================= */
export function AddEvent() {
  const { year } = useParams();
  const navigate  = useNavigate();

  return (
    <EventPage
      title="Add Event"
      year={year}
      mode="add"
      initialData={{}}
      onSubmit={(data) => {
        console.log('New event:', data);
        navigate(`/admin/activities/${year}`);
      }}
      onCancel={() => navigate(`/admin/activities/${year}`)}
    />
  );
}

/* =========================================
   EDIT EVENT PAGE
========================================= */
const mockEvent = {
  title: 'Tech Talk 4.0',
  description: 'Students have developed the web application for solving the problem of CGPA calculation.',
  resourceName: 'Dr. John Smith',
  resourceDescription: 'Professor at XYZ University with 15 years of experience.',
  participants: '45',
  winnerName: 'Alice',
  winnerFeedback: 'It was a great experience participating in this event.',
  testimonials: [{ name: 'Bob', className: 'CSE-A', feedback: 'Very insightful session!' }],
};

export function EditEvent() {
  const { year } = useParams();
  const navigate  = useNavigate();

  return (
    <EventPage
      title="Edit Event"
      year={year}
      mode="edit"
      initialData={mockEvent}
      onSubmit={(data) => {
        console.log('Updated:', data);
        navigate(`/admin/activities/${year}`);
      }}
      onCancel={() => navigate(`/admin/activities/${year}`)}
    />
  );
}