import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 

export default function ProblemDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/current-problem/${id}`);
        const data = await response.json();
        setProblem(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [loading]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading details...</div>;
  if (!problem) return <div className="min-h-screen flex items-center justify-center">Problem not found.</div>;

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#F5F9FA] py-16 px-6 flex justify-center select-none font-sans">
      <div className="w-full max-w-6xl">
        <div className="flex items-start justify-between mb-10">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-[#023347]">{problem.title}</h1>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Category: {problem.category}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-[#023347] text-white px-6 py-2 rounded-xl text-xs font-bold shadow-sm
              transition-all duration-300 ease-out
              hover:bg-[#388E9C] hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
            Back to List
          </button>
        </div>

        <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-xl font-semibold text-[#023347] mb-8 border-b pb-4">Detailed Description</h2>
          <div className="text-[#3C3E40] text-[16px] leading-relaxed">
            <p className="whitespace-pre-line">{problem.detailed_description}</p>
          </div>

          <div className="flex justify-end mt-12">
            <button
              onClick={() => navigate("/verification-mentor", { state: { problem_id: id } })} 
              className="bg-[#0B1C3D] text-white px-10 py-3 rounded-xl font-semibold shadow-md hover:bg-[#142d63] transition duration-300"
            >
              Lock Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}