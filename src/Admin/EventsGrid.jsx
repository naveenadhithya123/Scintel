import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const initialEvents = [
  { id: 1, title: 'Tech Talk 4.0', description: 'Student have developed the web application for solving the problem of CGPA calculation.' },
  { id: 2, title: 'Tech Talk 4.0', description: 'Student have developed the web application for solving the problem of CGPA calculation.' },
  { id: 3, title: 'Tech Talk 4.0', description: 'Student have developed the web application for solving the problem of CGPA calculation.' },
  { id: 4, title: 'Tech Talk 4.0', description: 'Student have developed the web application for solving the problem of CGPA calculation.' },
  { id: 5, title: 'Tech Talk 4.0', description: 'Student have developed the web application for solving the problem of CGPA calculation.' },
  { id: 6, title: 'Tech Talk 4.0', description: 'Student have developed the web application for solving the problem of CGPA calculation.' },
];

function DeleteModal({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      backgroundColor: 'rgba(0,0,0,0.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div
        style={{
          background: '#fff', borderRadius: 16, padding: '36px 32px 28px',
          width: 380, boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          backgroundColor: '#fef2f2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </div>

        {/* Text */}
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0d2233', marginBottom: 8 }}>
          Delete Event?
        </h3>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 28, lineHeight: 1.5 }}>
          Are you sure you want to delete this event?<br />This action cannot be undone.
        </p>

        {/* Buttons */}
        <button
          onClick={onConfirm}
          style={{
            width: '100%', padding: '12px 0', borderRadius: 10,
            backgroundColor: '#ef4444', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer',
            marginBottom: 10,
          }}
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          style={{
            width: '100%', padding: '11px 0', borderRadius: 10,
            backgroundColor: '#fff', color: '#374151',
            border: '1.5px solid #e2e8f0', fontWeight: 500, fontSize: 14, cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function EventsGrid() {
  // Captures the dynamic year from the URL (e.g. "2024-25")
  const { year } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <AdminSidebar>
      <main style={{ flex: 1, padding: '32px 36px', backgroundColor: '#fff', minHeight: '100vh', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0d2233' }}>
            {decodeURIComponent(year || '')}
          </h1>
          <button
            onClick={() => navigate(`/admin/activities/${year}/add-event`)}
            style={{
              padding: '9px 20px', borderRadius: 8, border: 'none',
              backgroundColor: '#0d2233', color: '#fff',
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}
          >
            + Add Event
          </button>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {events.map(event => (
            <div
              key={event.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid #e8edf2',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {/* Image placeholder */}
              <div style={{
                width: '100%',
                height: 160,
                backgroundColor: '#3a4a5c',
              }} />

              <div style={{ padding: '14px 16px 16px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d2233', marginBottom: 6 }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.5, marginBottom: 14 }}>
                  {event.description}
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => navigate(`/admin/activities/${year}/edit-event/${event.id}`)}                  
                    style={{
                      padding: '7px 20px', borderRadius: 7, border: 'none',
                      backgroundColor: '#0d2233', color: '#fff',
                      fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(event.id)}
                    style={{
                      padding: '7px 18px', borderRadius: 7, border: 'none',
                      backgroundColor: '#0d2233', color: '#fff',
                      fontWeight: 600, fontSize: 13, cursor: 'pointer',
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

      <DeleteModal
        open={deleteId !== null}
        onConfirm={() => { setEvents(prev => prev.filter(e => e.id !== deleteId)); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </AdminSidebar>
  );
}