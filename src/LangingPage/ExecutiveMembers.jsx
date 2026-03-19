import React from "react";

const members = [
  { id: 1, name: "Rithish Barath N", designation: "Designation", image: null },
  { id: 2, name: "Rithish Barath N", designation: "Designation", image: null },
  { id: 3, name: "Rithish Barath N", designation: "Designation", image: null },
  { id: 4, name: "Rithish Barath N", designation: "Designation", image: null },
  { id: 5, name: "Rithish Barath N", designation: "Designation", image: null },
  { id: 6, name: "Rithish Barath N", designation: "Designation", image: null },
];

export default function ExecutiveMember() {
  return (
    <>
      <style>{`
        .em-section {
          background: #eef4f7;
          border-radius: 14px;
          padding: 28px 32px 32px;
          font-family: 'Segoe UI', sans-serif;
        }

        .em-title {
          font-size: 20px;
          font-weight: 700;
          color: #023347;
          margin-bottom: 24px;
        }

        .em-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px 32px;
        }

        .em-card {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .em-avatar {
          width: 90px;
          height: 90px;
          min-width: 90px;
          border-radius: 50%;
          border: 2px solid #023347;
          background: #d5d9dc;
          overflow: hidden;
          flex-shrink: 0;
        }

        .em-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .em-info-name {
          font-size: 15px;
          font-weight: 700;
          color: #023347;
          margin-bottom: 4px;
        }

        .em-info-designation {
          font-size: 13px;
          color: #5a6a72;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .em-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px 12px;
          }
          .em-avatar {
            width: 70px;
            height: 70px;
            min-width: 70px;
          }
          .em-info-name { font-size: 14px; }
          .em-info-designation { font-size: 12px; }
        }

        @media (max-width: 480px) {
          .em-section { padding: 20px 16px 24px; }
          .em-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .em-avatar {
            width: 64px;
            height: 64px;
            min-width: 64px;
          }
        }
      `}</style>

      <div className="em-section">
        <div className="em-title">Executive Member</div>

        <div className="em-grid">
          {members.map((member) => (
            <div key={member.id} className="em-card">
              <div className="em-avatar">
                {member.image && (
                  <img src={member.image} alt={member.name} />
                )}
              </div>
              <div>
                <div className="em-info-name">{member.name}</div>
                <div className="em-info-designation">{member.designation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}