import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminMembers() {
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState("2024-25");

  const batchMembers = {
    "2024-25": [
      { name: "Muhammed Shuaib", reg: "611224104121", role: "Technical Support", year: "II" },
      { name: "Rahul",           reg: "611224104122", role: "Developer",         year: "II" },
      { name: "Rithik Bharath",  reg: "611224104123", role: "Developer",         year: "II" },
      { name: "Santhosh Kumar",  reg: "611224104124", role: "Developer",         year: "II" },
      { name: "Kathir S",        reg: "611224104125", role: "Developer",         year: "II" },
      { name: "Naveen Aditya",   reg: "611224104126", role: "Developer",         year: "II" },
    ],
    "2023-24": [
      { name: "Arun",         reg: "611224104111", role: "Coordinator", year: "III" },
      { name: "Sanjeevsurya", reg: "611224104112", role: "Developer",   year: "II"  },
    ],
    "2022-23": [
      { name: "Karthik", reg: "611224104101", role: "Designer", year: "IV" },
    ],
  };

  return (
    <AdminSidebar>
      <style>{`
        /* ── Responsive overrides ── */

        /* Header row */
        .am-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .am-header h1 {
          font-size: 22px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }
        .am-header-btns {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        /* Batch tabs */
        .am-tabs {
          display: flex;
          gap: 28px;
          color: #6b7280;
          margin-bottom: 32px;
          font-size: 14px;
          flex-wrap: wrap;
        }
        .am-tab {
          cursor: pointer;
          padding-bottom: 4px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .am-tab.active {
          border-bottom: 2px solid #083A4B;
          font-weight: 600;
          color: #083A4B;
        }
        .am-tab:not(.active):hover { color: #111; }

        /* Batch info row */
        .am-batch-info {
          display: flex;
          gap: 28px;
          align-items: flex-start;
          margin-bottom: 36px;
        }
        .am-batch-img {
          width: 384px;
          min-width: 384px;
          height: 216px;
          background: #083A4B;
          border-radius: 12px;
          flex-shrink: 0;
        }
        .am-batch-text h3 {
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #111827;
        }
        .am-batch-text p {
          color: #6b7280;
          line-height: 1.65;
          font-size: 14px;
        }

        /* Table */
        .am-table-wrap {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        /* ─────────────────────────────
           DESKTOP table (default)
        ───────────────────────────── */
        .am-table { width: 100%; border-collapse: collapse; }
        .am-table thead { background: #3DA6B6; color: #fff; }
        .am-table th, .am-table td {
          padding: 14px 16px;
          text-align: left;
          font-size: 14px;
        }
        .am-table td { color: #4b5563; border-top: 1px solid #f3f4f6; }
        .am-table tbody tr:hover { background: #f9fafb; }

        /* Mobile card display hidden on desktop */
        .am-cards { display: none; }

        /* ─────────────────────────────
           MOBILE
        ───────────────────────────── */
        @media (max-width: 768px) {
          .am-header h1  { font-size: 18px; }

          /* Stack image above text on mobile */
          .am-batch-info { flex-direction: column; gap: 16px; }
          .am-batch-img  { width: 100%; min-width: unset; height: 180px; }

          /* Hide table, show cards */
          .am-table      { display: none; }
          .am-cards      { display: flex; flex-direction: column; gap: 0; }

          .am-card {
            padding: 14px 16px;
            border-top: 1px solid #f3f4f6;
          }
          .am-card:first-child { border-top: none; }
          .am-card-name {
            font-weight: 600;
            font-size: 14px;
            color: #111827;
            margin-bottom: 6px;
          }
          .am-card-row {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 3px;
          }
          .am-card-label { font-weight: 500; color: #374151; }
        }

        @media (max-width: 480px) {
          .am-header-btns { width: 100%; }
          .am-header-btns button { flex: 1; }
        }
      `}</style>

      {/* Scrollable main area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "36px 40px" }} className="am-main-pad">
        <style>{`
          @media (max-width: 600px) {
            .am-main-pad { padding: 20px 16px !important; }
          }
        `}</style>

        {/* Header */}
        <div className="am-header">
          <h1>Association Members</h1>
          <div className="am-header-btns">
            <button
              onClick={() => navigate("/edit-batch")}
              style={{
                background: "#083A4B", color: "#fff",
                padding: "9px 20px", borderRadius: 8,
                border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => navigate("/add-batch")}
              style={{
                background: "#083A4B", color: "#fff",
                padding: "9px 20px", borderRadius: 8,
                border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}
            >
              Add Batch
            </button>
          </div>
        </div>

        {/* Batch Tabs */}
        <div className="am-tabs">
          {["2024-25", "2023-24", "2022-23"].map((batch) => (
            <span
              key={batch}
              onClick={() => setSelectedBatch(batch)}
              className={`am-tab ${selectedBatch === batch ? "active" : ""}`}
            >
              {batch.replace("-", " - ")}
            </span>
          ))}
        </div>

        {/* Batch Info */}
        <div className="am-batch-info">
          <div className="am-batch-img" />
          <div className="am-batch-text">
            <h3>Batch {selectedBatch.replace("-", " - ")}</h3>
            <p>
              The mountain peak touches the golden sunrise. Cold wind brushes
              against your face. Clouds drift lazily below your feet. Nature
              feels powerful and peaceful at once.
            </p>
          </div>
        </div>

        {/* Members Table */}
        <div className="am-table-wrap">

          {/* ── Desktop table ── */}
          <table className="am-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Register no.</th>
                <th>Role</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {batchMembers[selectedBatch].map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.reg}</td>
                  <td>{member.role}</td>
                  <td>{member.year}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Mobile cards ── */}
          <div className="am-cards">
            {batchMembers[selectedBatch].map((member, index) => (
              <div key={index} className="am-card">
                <div className="am-card-name">{member.name}</div>
                <div className="am-card-row">
                  <span className="am-card-label">Reg no.</span>
                  <span>{member.reg}</span>
                </div>
                <div className="am-card-row">
                  <span className="am-card-label">Role</span>
                  <span>{member.role}</span>
                </div>
                <div className="am-card-row">
                  <span className="am-card-label">Year</span>
                  <span>{member.year}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </AdminSidebar>
  );
}