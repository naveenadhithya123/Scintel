import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const suggestions = [
  {
    title: "Frontend Workshop",
    category: "Academics",
    name: "Rithish Barath N",
    year: "II",
    email: "2k24cse160@kiot.ac.in",
    mobile: "98989 92929",
    section: "C",
    type: "Suggestion",
    priority: "Medium",
    description:
      "I don't clearly understand the exact formula used for SGPA and CGPA calculation. Each subject has different credits, and multiplying credit with grade points manually often leads to mistakes. I usually depend on a basic calculator or Excel sheet, which is time-consuming and stressful.",
  },
  {
    title: "UI/UX Workshop",
    category: "Social",
    name: "Rithish Barath N",
    year: "II",
    email: "2k24cse160@kiot.ac.in",
    mobile: "98989 92929",
    section: "C",
    type: "Suggestion",
    priority: "Medium",
    description:
      "We need more hands-on UI/UX workshops to improve our design skills practically.",
  },
  {
    title: "Backend Workshop",
    category: "Social",
    name: "Rithish Barath N",
    year: "II",
    email: "2k24cse160@kiot.ac.in",
    mobile: "98989 92929",
    section: "C",
    type: "Suggestion",
    priority: "Medium",
    description:
      "Backend development workshops would help students understand server-side programming better.",
  },
];

export default function SuggestionAdmin() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#F5F9FA",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        /* ── Desktop table ── */
        .sg-header-row {
          display: grid;
          grid-template-columns: 2fr 1fr 2fr 1fr 1.5fr;
          padding: 11px 24px;
          color: #3C3E40;
          font-size: 13px;
        }
        .sg-data-row {
          display: grid;
          grid-template-columns: 2fr 1fr 2fr 1fr 1.5fr;
          padding: 18px 24px;
          align-items: center;
          font-size: 13px;
        }

        /* Mobile cards hidden on desktop */
        .sg-cards { display: none; }

        /* Detail buttons */
        .sg-detail-btns {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 40px;
        }

        /* ── MOBILE ── */
        @media (max-width: 700px) {
          .sg-main { padding: 20px 14px !important; }

          /* Hide desktop layout */
          .sg-desktop-header { display: none !important; }
          .sg-data-row       { display: none !important; }

          /* Show cards */
          .sg-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .sg-card {
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e2e8ec;
            box-shadow: 0 1px 4px rgba(2,51,71,0.07);
            padding: 16px;
            overflow: hidden;
          }

          /* Title bar at top of card */
          .sg-card-title {
            font-size: 15px;
            font-weight: 700;
            color: #023347;
            margin-bottom: 12px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f0f4f5;
          }

          /* Each info row: label left, value right */
          .sg-card-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            padding: 5px 0;
            border-bottom: 1px solid #f9fafb;
          }
          .sg-card-row:last-of-type { border-bottom: none; }

          .sg-card-label {
            font-weight: 600;
            color: #374151;
            min-width: 80px;
            flex-shrink: 0;
          }

          .sg-card-value {
            color: #4b5563;
            text-align: right;
            word-break: break-word;
          }

          /* Action button */
          .sg-card-action {
            margin-top: 14px;
          }
          .sg-card-action button {
            width: 100%;
            padding: 10px;
            font-size: 13px;
          }

          /* Detail page */
          .sg-detail-btns {
            flex-direction: column !important;
          }
          .sg-detail-btns button {
            width: 100% !important;
          }
        }
      `}</style>

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main
        className="sg-main"
        style={{ flex: 1, padding: "28px 36px", overflowY: "auto" }}
      >
        {selectedItem === null ? (
          <>
            <h1
              style={{
                color: "#023347",
                fontSize: "22px",
                fontWeight: 700,
                marginBottom: "20px",
                letterSpacing: "-0.01em",
              }}
            >
              Suggestions / Complaints
            </h1>

            {/* ── Desktop header ── */}
            <div
              className="sg-desktop-header"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: "1.5px solid #2A8E9E",
                marginBottom: "12px",
              }}
            >
              <div className="sg-header-row">
                <div>Title</div>
                <div style={{ textAlign: "center" }}>Category</div>
                <div style={{ textAlign: "center" }}>Name</div>
                <div style={{ textAlign: "center" }}>Year</div>
                <div style={{ textAlign: "center" }}>Action</div>
              </div>
            </div>

            {/* ── Desktop rows ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #e2e8ec",
                    boxShadow: "0 1px 4px rgba(2,51,71,0.07)",
                  }}
                >
                  <div className="sg-data-row">
                    <div style={{ color: "#000000", fontWeight: 700 }}>
                      {item.title}
                    </div>
                    <div style={{ color: "#3C3E40", textAlign: "center" }}>
                      {item.category}
                    </div>
                    <div style={{ color: "#3C3E40", textAlign: "center" }}>
                      {item.name}
                    </div>
                    <div style={{ color: "#3C3E40", textAlign: "center" }}>
                      {item.year}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => setSelectedItem(item)}
                        style={{
                          backgroundColor: "#023347",
                          color: "#ffffff",
                          fontSize: "12.5px",
                          fontWeight: 600,
                          padding: "8px 22px",
                          borderRadius: "10px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        View Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Mobile cards ── */}
            <div className="sg-cards">
              {suggestions.map((item, idx) => (
                <div key={idx} className="sg-card">
                  <div className="sg-card-title">{item.title}</div>
                  <div className="sg-card-row">
                    <span className="sg-card-label">Category</span>
                    <span className="sg-card-value">{item.category}</span>
                  </div>
                  <div className="sg-card-row">
                    <span className="sg-card-label">Name</span>
                    <span className="sg-card-value">{item.name}</span>
                  </div>
                  <div className="sg-card-row">
                    <span className="sg-card-label">Year</span>
                    <span className="sg-card-value">{item.year}</span>
                  </div>
                  <div className="sg-card-action">
                    <button
                      onClick={() => setSelectedItem(item)}
                      style={{
                        backgroundColor: "#023347",
                        color: "#ffffff",
                        fontWeight: 600,
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      View Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>

        ) : (
          /* ── DETAIL PAGE ── */
          <>
            <h1
              style={{
                color: "#023347",
                fontSize: "22px",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              Suggestions / Complaints
            </h1>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                border: "1px solid #e2e8ec",
                boxShadow: "0 1px 4px rgba(2,51,71,0.07)",
                padding: "28px 32px",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: 700 }}>
                {selectedItem.title}
              </h2>
              <p
                style={{
                  color: "#3C3E40",
                  fontSize: "13px",
                  lineHeight: "1.7",
                  marginTop: "12px",
                }}
              >
                {selectedItem.description}
              </p>

              <div className="sg-detail-btns">
                <button
                  onClick={() => setSelectedItem(null)}
                  style={{
                    backgroundColor: "#023347",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "9px 28px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Back
                </button>
                <button
                  style={{
                    backgroundColor: "#2A8E9E",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "9px 28px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}