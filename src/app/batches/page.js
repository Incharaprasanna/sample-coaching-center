'use client';

import React, { useState, useEffect } from 'react';
import './batches.css';

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [filters, setFilters] = useState({
    branch: 'All',
    category: 'All',
    search: ''
  });
  
  // Registration Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Default Mock Batches
  const defaultBatches = [
    {
      id: "B-1",
      course: "Java Full Stack Development",
      category: "Development",
      startDate: "June 01, 2026",
      timing: "07:30 AM - 09:30 AM",
      branch: "Vijayawada Branch",
      trainer: "Mr. Satish Kumar",
      mode: "Offline",
      status: "Filling Fast"
    },
    {
      id: "B-2",
      course: "Python, AI & Machine Learning",
      category: "Python/Data",
      startDate: "May 28, 2026",
      timing: "10:00 AM - 12:00 PM",
      branch: "Visakhapatnam Branch",
      trainer: "Dr. Lakshmi Prasad",
      mode: "Offline",
      status: "Open"
    },
    {
      id: "B-3",
      course: "MERN Full Stack Development",
      category: "Development",
      startDate: "June 05, 2026",
      timing: "06:00 PM - 08:00 PM",
      branch: "Online Training",
      trainer: "Mr. Raghava Chowdary",
      mode: "Online",
      status: "Filling Fast"
    },
    {
      id: "B-4",
      course: "DevOps & Cloud Engineering",
      category: "Cloud",
      startDate: "June 03, 2026",
      timing: "07:00 PM - 09:00 PM",
      branch: "Online Training",
      trainer: "Mr. Srinivas Rao",
      mode: "Online",
      status: "Open"
    },
    {
      id: "B-5",
      course: "Automation Testing with Selenium",
      category: "Testing",
      startDate: "June 08, 2026",
      timing: "08:00 AM - 10:00 AM",
      branch: "Guntur Branch",
      trainer: "Mrs. Kavitha Reddy",
      mode: "Offline",
      status: "Open"
    },
    {
      id: "B-6",
      course: "Java Full Stack Development",
      category: "Development",
      startDate: "June 10, 2026",
      timing: "04:00 PM - 06:00 PM",
      branch: "Tirupati Branch",
      trainer: "Mr. Naresh Babu",
      mode: "Offline",
      status: "Open"
    }
  ];

  // Load batches from LocalStorage on mount
  useEffect(() => {
    const loadBatches = () => {
      const stored = localStorage.getItem('sh_batches');
      if (stored) {
        setBatches(JSON.parse(stored));
      } else {
        localStorage.setItem('sh_batches', JSON.stringify(defaultBatches));
        setBatches(defaultBatches);
      }
    };
    
    loadBatches();
    
    // Listen to admin additions in real-time
    window.addEventListener('sh_batches_updated', loadBatches);
    return () => window.removeEventListener('sh_batches_updated', loadBatches);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterClick = (batch) => {
    setSelectedBatch(batch);
    setIsModalOpen(true);
    setFormSubmitted(false);
    setFormError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email || !regForm.phone) {
      setFormError('Please fill out all fields.');
      return;
    }
    if (!/^\d{10}$/.test(regForm.phone.replace(/[^0-9]/g, ''))) {
      setFormError('Phone number must be 10 digits.');
      return;
    }

    // Save student enquiries directly from Batch registration!
    const newEnquiry = {
      id: 'ENQ-' + Date.now(),
      name: regForm.name,
      email: regForm.email,
      phone: regForm.phone,
      course: selectedBatch.course,
      branch: selectedBatch.branch,
      message: `Registered for Batch starting ${selectedBatch.startDate} (${selectedBatch.timing})`,
      date: new Date().toLocaleString(),
      status: 'Pending'
    };

    const existingEnquiries = JSON.parse(localStorage.getItem('sh_enquiries') || '[]');
    localStorage.setItem('sh_enquiries', JSON.stringify([newEnquiry, ...existingEnquiries]));
    window.dispatchEvent(new Event('sh_enquiries_updated'));

    setFormSubmitted(true);
    setRegForm({ name: '', email: '', phone: '' });

    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
    }, 2500);
  };

  // Filter batches
  const filteredBatches = batches.filter(batch => {
    const branchMatch = filters.branch === 'All' || batch.branch.toLowerCase().includes(filters.branch.toLowerCase());
    const catMatch = filters.category === 'All' || batch.category === filters.category;
    const searchMatch = !filters.search || 
      batch.course.toLowerCase().includes(filters.search.toLowerCase()) || 
      batch.trainer.toLowerCase().includes(filters.search.toLowerCase());
    return branchMatch && catMatch && searchMatch;
  });

  return (
    <div className="batches-page-wrapper">
      {/* Hero section */}
      <section className="batches-hero">
        <div className="batches-hero-glow"></div>
        <div className="batches-hero-container">
          <span className="batches-hero-tag">📅 Live Batch Board</span>
          <h1 className="batches-hero-title">Upcoming Coaching Batches</h1>
          <p className="batches-hero-subtitle">
            Find and register for newly opening schedules. Both offline classroom slots and live-online tracks available with professional JSpiders-style mentors.
          </p>
        </div>
      </section>

      {/* Filters board */}
      <section className="batches-board-container section-container">
        <div className="batches-filter-card glass-panel">
          <div className="filter-field">
            <label htmlFor="filter-branch">Select Campus / Branch</label>
            <select 
              id="filter-branch" 
              name="branch" 
              value={filters.branch} 
              onChange={handleFilterChange}
            >
              <option value="All">All Campuses</option>
              <option value="Online">Online Live</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Visakhapatnam">Visakhapatnam (Vizag)</option>
              <option value="Guntur">Guntur</option>
              <option value="Tirupati">Tirupati</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="filter-category">Course Stream</label>
            <select 
              id="filter-category" 
              name="category" 
              value={filters.category} 
              onChange={handleFilterChange}
            >
              <option value="All">All Streams</option>
              <option value="Development">Software Development</option>
              <option value="Python/Data">Python, AI & Data Science</option>
              <option value="Cloud">Cloud & DevOps</option>
              <option value="Testing">Software Testing</option>
            </select>
          </div>

          <div className="filter-field search-field">
            <label htmlFor="filter-search">Search Keyword</label>
            <input 
              type="text" 
              id="filter-search" 
              name="search" 
              value={filters.search} 
              onChange={handleFilterChange}
              placeholder="Search course or trainer name..."
            />
          </div>
        </div>

        {/* Dynamic Schedule List */}
        <div className="batches-table-wrapper glass-panel">
          <div className="table-responsive">
            <table className="batches-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Start Date</th>
                  <th>Batch Timing</th>
                  <th>Branch / Location</th>
                  <th>Faculty</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batch) => (
                    <tr key={batch.id} className="batch-row animate-fadeIn">
                      <td className="cell-course">{batch.course}</td>
                      <td className="cell-date">📅 {batch.startDate}</td>
                      <td className="cell-time">⏱ {batch.timing}</td>
                      <td className="cell-branch">{batch.branch}</td>
                      <td className="cell-trainer">👨‍🏫 {batch.trainer}</td>
                      <td className="cell-mode">
                        <span className={`badge-mode ${batch.mode.toLowerCase()}`}>
                          {batch.mode}
                        </span>
                      </td>
                      <td className="cell-status">
                        <span className={`badge-status ${batch.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {batch.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-register-batch"
                          onClick={() => handleRegisterClick(batch)}
                          disabled={batch.status.toLowerCase() === 'closed'}
                        >
                          {batch.status.toLowerCase() === 'closed' ? 'Closed' : 'Register ↗'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="table-empty-row">
                      🔍 No upcoming batches match your filters. Try selecting "All Streams" or modifying your search key.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Registration Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-scaleUp">
            <div className="modal-header">
              <h3>Confirm Batch Registration</h3>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <div className="modal-body">
              {formSubmitted ? (
                <div className="modal-success-screen">
                  <div className="modal-success-icon">✓</div>
                  <h4>Admission Requested!</h4>
                  <p>
                    You have successfully registered for the <strong>{selectedBatch?.course}</strong> batch starting on <strong>{selectedBatch?.startDate}</strong>. 
                  </p>
                  <p className="success-note">We have logged this in your enquiries database. A coordinator will call you to finalize batch coordinates.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="modal-batch-brief">
                    <p><strong>Course:</strong> {selectedBatch?.course}</p>
                    <p><strong>Batch Starts:</strong> {selectedBatch?.startDate} ({selectedBatch?.timing})</p>
                    <p><strong>Campus/Branch:</strong> {selectedBatch?.branch} ({selectedBatch?.mode} Mode)</p>
                  </div>
                  
                  {formError && <p className="modal-form-error">{formError}</p>}
                  
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      value={regForm.name}
                      onChange={(e) => {
                        setRegForm(p => ({...p, name: e.target.value}));
                        setFormError('');
                      }}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={regForm.email}
                      onChange={(e) => {
                        setRegForm(p => ({...p, email: e.target.value}));
                        setFormError('');
                      }}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="10-digit mobile number" 
                      value={regForm.phone}
                      onChange={(e) => {
                        setRegForm(p => ({...p, phone: e.target.value}));
                        setFormError('');
                      }}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-modal-submit">
                    Confirm Registration & Enrol ↗
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
