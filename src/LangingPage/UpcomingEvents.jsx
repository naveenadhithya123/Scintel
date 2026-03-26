import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// NOTE: If this line shows an error, run: npm install lucide-react
import { ChevronLeft, ChevronRight } from "lucide-react"; 

export default function UpcomingEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://scintel-4.onrender.com/api/upcoming-events");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting), 
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const cardsPerPage = 4;
  const pages = [];
  for (let i = 0; i < events.length; i += cardsPerPage) {
    pages.push(events.slice(i, i + cardsPerPage));
  }

  const scrollToPage = (pageIndex) => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ 
      left: containerWidth * pageIndex, 
      behavior: "smooth" 
    });
    setActiveIndex(pageIndex);
  };

  return (
    <div ref={sectionRef} id="events" className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-hidden py-16 relative">
      
      <div className="px-6 md:px-12 pb-10 max-w-7xl mx-auto w-full">
        <h2 className={`text-[40px] font-extrabold text-[#023347] transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
          Upcoming Events
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto w-full flex-1 group">
        
        {/* Navigation Arrows */}
        {activeIndex > 0 && (
          <button 
            type="button"
            onClick={() => scrollToPage(activeIndex - 1)}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 bg-white p-3.5 rounded-full shadow-xl hover:bg-gray-50 transition-all border border-gray-100 hidden xl:block"
          >
            <ChevronLeft size={28} className="text-[#023347]" />
          </button>
        )}

        {activeIndex < pages.length - 1 && (
          <button 
            type="button"
            onClick={() => scrollToPage(activeIndex + 1)}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 bg-white p-3.5 rounded-full shadow-xl hover:bg-gray-50 transition-all border border-gray-100 hidden xl:block"
          >
            <ChevronRight size={28} className="text-[#023347]" />
          </button>
        )}

        <div ref={scrollRef} className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth no-scrollbar">
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          
          {pages.map((pageCards, pageIndex) => (
            <div key={pageIndex} className="flex-none w-full snap-center px-4 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {pageCards.map((event) => (
                  <div 
                    key={event.event_id} 
                    className={`flex flex-col sm:flex-row bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-auto sm:h-[270px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
                  >
                    
                    {/* The Fixed Image Box */}
                    <div className="w-full sm:w-[210px] h-[220px] sm:h-full bg-[#023347] relative flex-shrink-0 overflow-hidden">
                      <img 
                        src={event.brochure_url} 
                        alt={event.event_title} 
                        className="w-full h-full object-cover block" 
                      />
                    </div>

                    <div className="p-7 flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h3 className="text-2xl font-bold text-[#023347] mb-3 line-clamp-1">{event.event_title}</h3>
                        <p className="text-[15px] text-[#3C3E40] line-clamp-3 leading-relaxed">
                          {event.event_short_description}
                        </p>
                      </div>

                      <div className="mt-4">
                        <button 
                          type="button"
                          onClick={() => navigate(`/event-register/${event.event_id}`)}
                          className="w-full h-[48px] bg-[#023347] text-white rounded-xl text-sm font-semibold hover:bg-[#388E9C] transition-all shadow-md active:scale-95"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}