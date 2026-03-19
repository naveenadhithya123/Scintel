import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function EditBatch() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // ✅ LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("members"));
    if (saved && saved.length > 0) {
      setMembers(saved);
    } else {
      const defaultData = [
        { name: "Muhammed Shuaib", reg: "611224104121", role: "Technical Support", year: "II" },
        { name: "Rahul",           reg: "611224104122", role: "Developer",          year: "II" },
        { name: "Santhosh",        reg: "611224104123", role: "Developer",          year: "II" },
        { name: "Kathir",          reg: "611224104124", role: "Designer",           year: "II" },
      ];
      setMembers(defaultData);
      localStorage.setItem("members", JSON.stringify(defaultData));
    }
  }, []);

  // ✅ DELETE FUNCTION
  const handleDelete = () => {
    const updated = members.filter((_, i) => i !== selectedIndex);
    setMembers(updated);
    localStorage.setItem("members", JSON.stringify(updated));
    setShowModal(false);
  };

  return (
    <AdminSidebar>
      <style>{`
        /* ── Header ── */
        .eb-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .eb-header h1 {
          font-size: 22px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        /* ── Batch info ── */
        .eb-batch-info {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
          align-items: flex-start;
        }
        .eb-batch-img {
          width: 256px;
          min-width: 256px;
          height: 160px;
          background: #083A4B;
          border-radius: 10px;
          flex-shrink: 0;
        }
        .eb-batch-text h3 {
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #111827;
        }
        .eb-batch-text p {
          color: #6b7280;
          max-width: 420px;
          line-height: 1.6;
          font-size: 14px;
        }

        /* ── Table wrap ── */
        .eb-table-wrap {
          background: #fff;
          border-radius: 16px;
          border: 1px solid rgba(42,142,158,0.4);
          overflow: hidden;
          margin-top: 24px;
        }

        /* ── Desktop table (default) ── */
        .eb-table { width: 100%; border-collapse: collapse; }
        .eb-table thead { background: #2F8C95; color: #fff; }
        .eb-table th, .eb-table td { padding: 18px 20px; text-align: left; font-size: 14px; }
        .eb-table th:last-child, .eb-table td:last-child { text-align: right; padding-right: 40px; }
        .eb-table td { border-top: 1px solid #f3f4f6; color: #374151; }
        .eb-table tbody tr:hover { background: #f9fafb; }
        .eb-action-btns { display: flex; justify-content: flex-end; gap: 12px; }

        /* Mobile cards hidden on desktop */
        .eb-cards { display: none; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .eb-header h1        { font-size: 18px; }
          .eb-batch-info       { flex-direction: column; gap: 14px; }
          .eb-batch-img        { width: 100%; min-width: unset; height: 180px; }
          .eb-table            { display: none; }
          .eb-cards            { display: flex; flex-direction: column; gap: 0; }

          .eb-card {
            padding: 14px 16px;
            border-top: 1px solid #f3f4f6;
          }
          .eb-card:first-child { border-top: none; }
          .eb-card-name {
            font-size: 15px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 6px;
          }
          .eb-card-row {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 4px;
          }
          .eb-card-label { font-weight: 500; color: #374151; }
          .eb-card-actions {
            display: flex;
            gap: 10px;
            margin-top: 10px;
          }
          .eb-card-actions button { flex: 1; }
        }

        @media (max-width: 480px) {
          .eb-header button { width: 100%; }
        }
      `}</style>

      {/* Scrollable main */}
      <div style={{ flex: 1, overflowY: "auto", padding: "40px" }} className="eb-main-pad">
        <style>{`
          @media (max-width: 600px) { .eb-main-pad { padding: 20px 16px !important; } }
        `}</style>

        {/* Header */}
        <div className="eb-header">
          <h1>Edit Batch</h1>
          <button
            onClick={() => navigate("/add-member")}
            style={{
              background: "#083A4B", color: "#fff",
              padding: "9px 18px", borderRadius: 8,
              border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            + Add Member
          </button>
        </div>

        {/* Batch Info */}
        <div className="eb-batch-info">
          <div className="eb-batch-img" />
          <div className="eb-batch-text">
            <h3>Batch 2022 - 23</h3>
            <p>
              The mountain peak touches the golden sunrise. Cold wind brushes
              against your face. Clouds drift lazily below your feet.
              Nature feels powerful and peaceful at once.
            </p>
          </div>
        </div>

        {/* Table + Cards */}
        <div className="eb-table-wrap">

          {/* ── Desktop table ── */}
          <table className="eb-table">
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
              {members.map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.reg}</td>
                  <td>{member.role}</td>
                  <td>{member.year}</td>
                  <td>
                    <div className="eb-action-btns">
                      <button
                        onClick={() => navigate("/edit-member", { state: { index } })}
                        style={{
                          background: "#083A4B", color: "#fff",
                          padding: "8px 20px", borderRadius: 8,
                          border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => { setSelectedIndex(index); setShowModal(true); }}
                        style={{
                          background: "#083A4B", color: "#fff",
                          padding: "8px 20px", borderRadius: 8,
                          border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Mobile cards ── */}
          <div className="eb-cards">
            {members.map((member, index) => (
              <div key={index} className="eb-card">
                <div className="eb-card-name">{member.name}</div>
                <div className="eb-card-row">
                  <span className="eb-card-label">Reg no.</span>
                  <span>{member.reg}</span>
                </div>
                <div className="eb-card-row">
                  <span className="eb-card-label">Role</span>
                  <span>{member.role}</span>
                </div>
                <div className="eb-card-row">
                  <span className="eb-card-label">Year</span>
                  <span>{member.year}</span>
                </div>
                <div className="eb-card-actions">
                  <button
                    onClick={() => navigate("/edit-member", { state: { index } })}
                    style={{
                      background: "#083A4B", color: "#fff",
                      padding: "8px 0", borderRadius: 8,
                      border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setSelectedIndex(index); setShowModal(true); }}
                    style={{
                      background: "#083A4B", color: "#fff",
                      padding: "8px 0", borderRadius: 8,
                      border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.4)", zIndex: 50,
          padding: "0 16px",
        }}>
          <div style={{
            background: "#fff", borderRadius: 12,
            padding: "32px", width: "100%", maxWidth: 420,
            textAlign: "center", boxSizing: "border-box",
          }}>
            <h2 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8, color: "#111827" }}>
              Are you sure?
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 24, fontSize: 14 }}>
              This member will be permanently removed.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none", border: "none",
                  color: "#374151", fontWeight: 500,
                  fontSize: 14, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  background: "#ef4444", color: "#fff",
                  padding: "9px 24px", borderRadius: 8,
                  border: "none", fontWeight: 600,
                  fontSize: 14, cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminSidebar>
  );
}