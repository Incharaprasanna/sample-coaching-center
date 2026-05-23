'use client';

import React, { useState, useEffect } from 'react';
import './placements.css';

export default function Placements() {
  const [placements, setPlacements] = useState([]);
  const [filters, setFilters] = useState({
    company: 'All',
    search: ''
  });

  // Default Mock Placed Students
  const defaultPlacements = [
    {
      id: "P-1",
      name: "Sandeep Yellapragada",
      course: "Java Full Stack Development",
      company: "Capgemini",
      role: "Software Engineer",
      package: "4.8 LPA",
      year: "2026",
      college: "JNTU Kakinada (JNTUK)",
      quote: "The intensive mock tests and coding exercises at Skill Horizon made my Capgemini interview a breeze!",
      avatar: "https://i.pravatar.cc/150?u=sandeep"
    },
    {
      id: "P-2",
      name: "Sai Priya Malladi",
      course: "Python, AI & Machine Learning",
      company: "TCS",
      role: "Systems Engineer",
      package: "5.2 LPA",
      year: "2026",
      college: "Andhra University",
      quote: "Learned machine learning from scratch. The hands-on project was key to cracking the technical rounds.",
      avatar: "https://i.pravatar.cc/150?u=priya"
    },
    {
      id: "P-3",
      name: "Venkat Raman",
      course: "MERN Full Stack Development",
      company: "Amazon",
      role: "Cloud Associate",
      package: "12.0 LPA",
      year: "2026",
      college: "VIT-AP University",
      quote: "Skill Horizon's web development bootcamps and cloud training are outstanding. Truly industry-aligned.",
      avatar: "https://i.pravatar.cc/150?u=venkat"
    },
    {
      id: "P-4",
      name: "Durga Bhavani K.",
      course: "Automation Testing with Selenium",
      company: "Wipro",
      role: "QA Automation Engineer",
      package: "4.2 LPA",
      year: "2026",
      college: "JNTU Anantapur (JNTUA)",
      quote: "The manual + automation syllabus was perfect. Mock interviews helped build my confidence immensely.",
      avatar: "https://i.pravatar.cc/150?u=bhavani"
    },
    {
      id: "P-5",
      name: "Kishore Kumar V.",
      course: "DevOps & Cloud Engineering",
      company: "Accenture",
      role: "Associate Cloud Engineer",
      package: "4.5 LPA",
      year: "2026",
      college: "GVR & S College of Eng, Guntur",
      quote: "Mastered Kubernetes, Docker, and AWS. The placement assistance is genuine. I got placed in just 45 days!",
      avatar: "https://i.pravatar.cc/150?u=kishore"
    },
    {
      id: "P-6",
      name: "Manoj Kumar Reddy",
      course: "Java Full Stack Development",
      company: "Infosys",
      role: "Specialist Programmer",
      package: "6.5 LPA",
      year: "2026",
      college: "Tirupati College of Engineering",
      quote: "Writing custom code models in JSpiders-style classes gave me deep logical foundations in Java.",
      avatar: "https://i.pravatar.cc/150?u=manoj"
    }
  ];

  // Load placements on mount
  useEffect(() => {
    const loadPlacements = () => {
      const stored = localStorage.getItem('sh_placements');
      if (stored) {
        setPlacements(JSON.parse(stored));
      } else {
        localStorage.setItem('sh_placements', JSON.stringify(defaultPlacements));
        setPlacements(defaultPlacements);
      }
    };
    
    loadPlacements();
    
    // Listen to admin additions
    window.addEventListener('sh_placements_updated', loadPlacements);
    return () => window.removeEventListener('sh_placements_updated', loadPlacements);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Filter list
  const filteredPlacements = placements.filter(student => {
    const companyMatch = filters.company === 'All' || student.company === filters.company;
    const searchMatch = !filters.search || 
      student.name.toLowerCase().includes(filters.search.toLowerCase()) || 
      student.course.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.college.toLowerCase().includes(filters.search.toLowerCase());
    return companyMatch && searchMatch;
  });

  // Extract list of unique hiring companies for filters dropdown
  const companiesList = ['All', ...new Set(placements.map(p => p.company))];

  return (
    <div className="placements-page-wrapper">
      {/* Hero section */}
      <section className="placements-hero">
        <div className="placements-hero-glow"></div>
        <div className="placements-hero-container">
          <span className="placements-hero-tag">🏆 100% Placement Support</span>
          <h1 className="placements-hero-title">Student Placements & Success Stories</h1>
          <p className="placements-hero-subtitle">
            Celebrating our students who transitioned successfully from Andhra Pradesh colleges to top national and multinational IT brands.
          </p>
        </div>
      </section>

      {/* Stats Counter Dashboard */}
      <section className="placements-stats-strip section-container">
        <div className="stats-dashboard-grid">
          <div className="stat-card glass-panel animate-scaleUp">
            <span className="stat-number">1,240+</span>
            <span className="stat-label">Students Placed</span>
          </div>
          <div className="stat-card glass-panel animate-scaleUp">
            <span className="stat-number">12.0 LPA</span>
            <span className="stat-label">Highest Salary Package</span>
          </div>
          <div className="stat-card glass-panel animate-scaleUp">
            <span className="stat-number">4.8 LPA</span>
            <span className="stat-label">Average Salary Package</span>
          </div>
          <div className="stat-card glass-panel animate-scaleUp">
            <span className="stat-number">150+</span>
            <span className="stat-label">Recruiting Companies</span>
          </div>
        </div>
      </section>

      {/* Filters board */}
      <section className="placements-directory-container section-container">
        <div className="placements-filter-card glass-panel">
          <div className="filter-field">
            <label htmlFor="filter-company">Filter by Hiring Company</label>
            <select 
              id="filter-company" 
              name="company" 
              value={filters.company} 
              onChange={handleFilterChange}
            >
              {companiesList.map((comp, idx) => (
                <option key={idx} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          <div className="filter-field search-field">
            <label htmlFor="filter-search">Search Directory</label>
            <input 
              type="text" 
              id="filter-search" 
              name="search" 
              value={filters.search} 
              onChange={handleFilterChange}
              placeholder="Search by student name, college, or course..."
            />
          </div>
        </div>

        {/* Placed Students Grid */}
        {filteredPlacements.length > 0 ? (
          <div className="placements-cards-grid">
            {filteredPlacements.map((student) => (
              <div key={student.id} className="placement-student-card glass-panel animate-fadeIn">
                <div className="card-top-header">
                  <div className="student-profile-img">
                    <img 
                      src={student.avatar || "https://i.pravatar.cc/150?u=fallback"} 
                      alt={student.name} 
                      onError={(e) => {
                        e.target.src = "https://i.pravatar.cc/150?u=" + student.name;
                      }}
                    />
                  </div>
                  <div className="company-badge-placed">
                    <span className="placed-at-label">Placed at</span>
                    <span className="placed-company-name">{student.company}</span>
                  </div>
                </div>

                <div className="student-brief">
                  <h4>{student.name}</h4>
                  <p className="student-college">🏫 {student.college}</p>
                  <p className="student-course">🎓 Course: {student.course}</p>
                </div>

                <hr className="card-separator" />

                <div className="placement-financial-meta">
                  <div className="meta-block">
                    <span className="meta-label">Role Offered</span>
                    <span className="meta-val">{student.role}</span>
                  </div>
                  <div className="meta-block align-right">
                    <span className="meta-label">Package (CTC)</span>
                    <span className="meta-val highlight-val">{student.package}</span>
                  </div>
                </div>

                <blockquote className="student-testimonial-quote">
                  “{student.quote}”
                </blockquote>

                <div className="placement-year-footer">
                  Class of {student.year} · Verified Placement ✓
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="directory-empty-state glass-panel">
            🔍 No student matches found for your search. Try adjusting the company filter or clearing the search text box.
          </div>
        )}
      </section>

      {/* Recruiting Partners Marquee Banner */}
      <section className="partners-marquee-section">
        <div className="section-container" style={{ border: 'none' }}>
          <h3 className="marquee-title">Our Alumni Work at Leading Companies</h3>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {['Amazon', 'Capgemini', 'TCS', 'Wipro', 'Accenture', 'Infosys', 'Cognizant', 'Tech Mahindra', 'HCL', 'Mindtree', 'LTI'].map((c, i) => (
                <div className="marquee-item" key={i}>
                  <span className="partner-logo-mock">{c}</span>
                </div>
              ))}
              {/* Duplicate track for seamless infinite scroll */}
              {['Amazon', 'Capgemini', 'TCS', 'Wipro', 'Accenture', 'Infosys', 'Cognizant', 'Tech Mahindra', 'HCL', 'Mindtree', 'LTI'].map((c, i) => (
                <div className="marquee-item" key={i + 100}>
                  <span className="partner-logo-mock">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
