'use client';

import React, { useState, useEffect } from 'react';
import './admin.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('batches'); // 'batches', 'placements', 'enquiries'
  const [batches, setBatches] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  // Batch Form State
  const [batchForm, setBatchForm] = useState({
    course: '',
    category: 'Development',
    startDate: '',
    timing: '',
    branch: 'Vijayawada Branch',
    trainer: '',
    mode: 'Offline',
    status: 'Open'
  });

  // Placement Form State
  const [placementForm, setPlacementForm] = useState({
    name: '',
    course: '',
    company: '',
    role: '',
    package: '',
    year: '2026',
    college: '',
    quote: '',
    avatar: ''
  });

  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Show status notification helper
  const showStatus = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // Load all data from LocalStorage
  const loadData = () => {
    // Batches
    const storedBatches = localStorage.getItem('sh_batches');
    if (storedBatches) {
      setBatches(JSON.parse(storedBatches));
    } else {
      setBatches([]);
    }

    // Placements
    const storedPlacements = localStorage.getItem('sh_placements');
    if (storedPlacements) {
      setPlacements(JSON.parse(storedPlacements));
    } else {
      setPlacements([]);
    }

    // Enquiries
    const storedEnquiries = localStorage.getItem('sh_enquiries');
    if (storedEnquiries) {
      setEnquiries(JSON.parse(storedEnquiries));
    } else {
      setEnquiries([]);
    }
  };

  useEffect(() => {
    loadData();

    // Listen to real-time events in case multiple tabs are open
    const handleBatchesUpdate = () => loadData();
    const handlePlacementsUpdate = () => loadData();
    const handleEnquiriesUpdate = () => loadData();

    window.addEventListener('sh_batches_updated', handleBatchesUpdate);
    window.addEventListener('sh_placements_updated', handlePlacementsUpdate);
    window.addEventListener('sh_enquiries_updated', handleEnquiriesUpdate);

    return () => {
      window.removeEventListener('sh_batches_updated', handleBatchesUpdate);
      window.removeEventListener('sh_placements_updated', handlePlacementsUpdate);
      window.removeEventListener('sh_enquiries_updated', handleEnquiriesUpdate);
    };
  }, []);

  // BATCH ACTIONS
  const handleBatchSubmit = (e) => {
    e.preventDefault();
    if (!batchForm.course || !batchForm.startDate || !batchForm.timing || !batchForm.trainer) {
      showStatus('Please fill in all batch fields.', 'error');
      return;
    }

    const newBatch = {
      ...batchForm,
      id: 'B-' + Date.now()
    };

    const updated = [newBatch, ...batches];
    localStorage.setItem('sh_batches', JSON.stringify(updated));
    setBatches(updated);
    
    // Reset form
    setBatchForm({
      course: '',
      category: 'Development',
      startDate: '',
      timing: '',
      branch: 'Vijayawada Branch',
      trainer: '',
      mode: 'Offline',
      status: 'Open'
    });

    window.dispatchEvent(new Event('sh_batches_updated'));
    showStatus('New coaching batch published successfully!');
  };

  const deleteBatch = (id) => {
    const updated = batches.filter(b => b.id !== id);
    localStorage.setItem('sh_batches', JSON.stringify(updated));
    setBatches(updated);
    window.dispatchEvent(new Event('sh_batches_updated'));
    showStatus('Batch successfully deleted.');
  };

  // PLACEMENT ACTIONS
  const handlePlacementSubmit = (e) => {
    e.preventDefault();
    if (!placementForm.name || !placementForm.course || !placementForm.company || !placementForm.role || !placementForm.package || !placementForm.college) {
      showStatus('Please fill in all placed student fields.', 'error');
      return;
    }

    const avatarUrl = placementForm.avatar.trim() || `https://i.pravatar.cc/150?u=${encodeURIComponent(placementForm.name)}`;
    const newStudent = {
      ...placementForm,
      avatar: avatarUrl,
      id: 'P-' + Date.now()
    };

    const updated = [newStudent, ...placements];
    localStorage.setItem('sh_placements', JSON.stringify(updated));
    setPlacements(updated);

    // Reset form
    setPlacementForm({
      name: '',
      course: '',
      company: '',
      role: '',
      package: '',
      year: '2026',
      college: '',
      quote: '',
      avatar: ''
    });

    window.dispatchEvent(new Event('sh_placements_updated'));
    showStatus('Student placement record logged successfully!');
  };

  const deletePlacement = (id) => {
    const updated = placements.filter(p => p.id !== id);
    localStorage.setItem('sh_placements', JSON.stringify(updated));
    setPlacements(updated);
    window.dispatchEvent(new Event('sh_placements_updated'));
    showStatus('Placement record deleted.');
  };

  // ENQUIRY ACTIONS
  const toggleEnquiryStatus = (id) => {
    const updated = enquiries.map(enq => {
      if (enq.id === id) {
        return { ...enq, status: enq.status === 'Pending' ? 'Contacted' : 'Pending' };
      }
      return enq;
    });
    localStorage.setItem('sh_enquiries', JSON.stringify(updated));
    setEnquiries(updated);
    window.dispatchEvent(new Event('sh_enquiries_updated'));
    showStatus('Callback enquiry status updated!');
  };

  const deleteEnquiry = (id) => {
    const updated = enquiries.filter(enq => enq.id !== id);
    localStorage.setItem('sh_enquiries', JSON.stringify(updated));
    setEnquiries(updated);
    window.dispatchEvent(new Event('sh_enquiries_updated'));
    showStatus('Enquiry deleted.');
  };

  const clearAllEnquiries = () => {
    if (window.confirm('Are you sure you want to delete all enquiries? This cannot be undone.')) {
      localStorage.setItem('sh_enquiries', '[]');
      setEnquiries([]);
      window.dispatchEvent(new Event('sh_enquiries_updated'));
      showStatus('All callback enquiries cleared successfully.');
    }
  };

  return (
    <div className="admin-page-wrapper">
      {/* Toast Notification */}
      {notification.show && (
        <div className={`toast-notification ${notification.type} animate-slideIn`}>
          <span>{notification.type === 'success' ? '⚡' : '⚠️'}</span>
          <p>{notification.message}</p>
        </div>
      )}

      {/* Admin Hero Header */}
      <section className="admin-hero">
        <div className="admin-hero-glow"></div>
        <div className="admin-hero-container">
          <span className="admin-hero-tag">⚙️ Control Panel</span>
          <h1 className="admin-hero-title">Academy Operations Center</h1>
          <p className="admin-hero-subtitle">
            Publish new batches, log placed students, and manage callback leads dynamically. Real-time updates reflect across the entire portal instantly.
          </p>
        </div>
      </section>

      {/* Main Dashboard Panel */}
      <section className="admin-board-container section-container">
        <div className="admin-tab-nav glass-panel">
          <button 
            className={`tab-link ${activeTab === 'batches' ? 'active' : ''}`}
            onClick={() => setActiveTab('batches')}
          >
            📅 Batches Board ({batches.length})
          </button>
          <button 
            className={`tab-link ${activeTab === 'placements' ? 'active' : ''}`}
            onClick={() => setActiveTab('placements')}
          >
            🏆 Placements Directory ({placements.length})
          </button>
          <button 
            className={`tab-link ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            📨 Enquiries Inbox ({enquiries.filter(e => e.status === 'Pending').length} Pending)
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="admin-tab-content-container">
          
          {/* TAB 1: BATCHES */}
          {activeTab === 'batches' && (
            <div className="admin-tab-pane animate-fadeIn">
              <div className="admin-split-grid">
                {/* Form to Add Batch */}
                <div className="admin-form-card glass-panel">
                  <h3>Publish New Batch</h3>
                  <form onSubmit={handleBatchSubmit} className="admin-vertical-form">
                    <div className="form-field">
                      <label htmlFor="course">Course Name *</label>
                      <input 
                        type="text" 
                        id="course"
                        value={batchForm.course}
                        onChange={(e) => setBatchForm({...batchForm, course: e.target.value})}
                        placeholder="e.g. Java Full Stack Development"
                        required
                      />
                    </div>

                    <div className="form-row-grid">
                      <div className="form-field">
                        <label htmlFor="category">Course Stream *</label>
                        <select 
                          id="category"
                          value={batchForm.category}
                          onChange={(e) => setBatchForm({...batchForm, category: e.target.value})}
                        >
                          <option value="Development">Software Development</option>
                          <option value="Python/Data">Python, AI & Data Science</option>
                          <option value="Cloud">Cloud & DevOps</option>
                          <option value="Testing">Software Testing</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label htmlFor="mode">Training Mode *</label>
                        <select 
                          id="mode"
                          value={batchForm.mode}
                          onChange={(e) => setBatchForm({...batchForm, mode: e.target.value})}
                        >
                          <option value="Offline">Offline Classroom</option>
                          <option value="Online">Online Live</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row-grid">
                      <div className="form-field">
                        <label htmlFor="startDate">Start Date *</label>
                        <input 
                          type="text" 
                          id="startDate"
                          value={batchForm.startDate}
                          onChange={(e) => setBatchForm({...batchForm, startDate: e.target.value})}
                          placeholder="e.g. June 01, 2026"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="timing">Batch Timings *</label>
                        <input 
                          type="text" 
                          id="timing"
                          value={batchForm.timing}
                          onChange={(e) => setBatchForm({...batchForm, timing: e.target.value})}
                          placeholder="e.g. 07:30 AM - 09:30 AM"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="branch">Campus / Location *</label>
                      <select 
                        id="branch"
                        value={batchForm.branch}
                        onChange={(e) => setBatchForm({...batchForm, branch: e.target.value})}
                      >
                        <option value="Online Training">Online Training</option>
                        <option value="Vijayawada Branch">Vijayawada Branch</option>
                        <option value="Visakhapatnam Branch">Visakhapatnam Branch</option>
                        <option value="Guntur Branch">Guntur Branch</option>
                        <option value="Tirupati Branch">Tirupati Branch</option>
                      </select>
                    </div>

                    <div className="form-row-grid">
                      <div className="form-field">
                        <label htmlFor="trainer">Faculty Mentor *</label>
                        <input 
                          type="text" 
                          id="trainer"
                          value={batchForm.trainer}
                          onChange={(e) => setBatchForm({...batchForm, trainer: e.target.value})}
                          placeholder="e.g. Mr. Satish Kumar"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="status">Batch Status *</label>
                        <select 
                          id="status"
                          value={batchForm.status}
                          onChange={(e) => setBatchForm({...batchForm, status: e.target.value})}
                        >
                          <option value="Open">Open (Enrolling)</option>
                          <option value="Filling Fast">Filling Fast</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="btn-admin-submit">
                      Publish Live Batch ↗
                    </button>
                  </form>
                </div>

                {/* List of Batches */}
                <div className="admin-list-card glass-panel">
                  <h3>Active Batch Board</h3>
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Course</th>
                          <th>Details</th>
                          <th>Faculty/Branch</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {batches.length > 0 ? (
                          batches.map((batch) => (
                            <tr key={batch.id}>
                              <td className="bold-cell">{batch.course}</td>
                              <td>
                                <div>📅 {batch.startDate}</div>
                                <div className="text-secondary">⏱ {batch.timing}</div>
                                <span className={`mini-badge mode-${batch.mode.toLowerCase()}`}>{batch.mode}</span>
                              </td>
                              <td>
                                <div>👨‍🏫 {batch.trainer}</div>
                                <div className="text-secondary">{batch.branch}</div>
                              </td>
                              <td>
                                <span className={`mini-badge status-${batch.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                  {batch.status}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className="btn-delete"
                                  onClick={() => deleteBatch(batch.id)}
                                  title="Delete Batch"
                                >
                                  🗑️ Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="empty-table-cell">No batches logged in LocalStorage yet. Enter a batch on the left!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLACEMENTS */}
          {activeTab === 'placements' && (
            <div className="admin-tab-pane animate-fadeIn">
              <div className="admin-split-grid">
                {/* Form to Log Placement */}
                <div className="admin-form-card glass-panel">
                  <h3>Log Placed Student</h3>
                  <form onSubmit={handlePlacementSubmit} className="admin-vertical-form">
                    <div className="form-field">
                      <label htmlFor="name">Student Name *</label>
                      <input 
                        type="text" 
                        id="name"
                        value={placementForm.name}
                        onChange={(e) => setPlacementForm({...placementForm, name: e.target.value})}
                        placeholder="e.g. Sandeep Yellapragada"
                        required
                      />
                    </div>

                    <div className="form-row-grid">
                      <div className="form-field">
                        <label htmlFor="p-course">Course Finished *</label>
                        <input 
                          type="text" 
                          id="p-course"
                          value={placementForm.course}
                          onChange={(e) => setPlacementForm({...placementForm, course: e.target.value})}
                          placeholder="e.g. Java Full Stack Development"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="company">Hiring Company *</label>
                        <input 
                          type="text" 
                          id="company"
                          value={placementForm.company}
                          onChange={(e) => setPlacementForm({...placementForm, company: e.target.value})}
                          placeholder="e.g. Capgemini"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row-grid">
                      <div className="form-field">
                        <label htmlFor="role">Offered Role *</label>
                        <input 
                          type="text" 
                          id="role"
                          value={placementForm.role}
                          onChange={(e) => setPlacementForm({...placementForm, role: e.target.value})}
                          placeholder="e.g. Software Engineer"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="package">Salary Package *</label>
                        <input 
                          type="text" 
                          id="package"
                          value={placementForm.package}
                          onChange={(e) => setPlacementForm({...placementForm, package: e.target.value})}
                          placeholder="e.g. 4.8 LPA"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row-grid">
                      <div className="form-field">
                        <label htmlFor="college">College / University *</label>
                        <input 
                          type="text" 
                          id="college"
                          value={placementForm.college}
                          onChange={(e) => setPlacementForm({...placementForm, college: e.target.value})}
                          placeholder="e.g. JNTU Kakinada"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="year">Graduation Year</label>
                        <input 
                          type="text" 
                          id="year"
                          value={placementForm.year}
                          onChange={(e) => setPlacementForm({...placementForm, year: e.target.value})}
                          placeholder="e.g. 2026"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="quote">Placed Student Testimonial / Quote</label>
                      <textarea 
                        id="quote"
                        value={placementForm.quote}
                        onChange={(e) => setPlacementForm({...placementForm, quote: e.target.value})}
                        placeholder="The intensive training and mock interviews really made cracking the technical rounds simple..."
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="form-field">
                      <label htmlFor="avatar">Student Avatar / Photo URL (Optional)</label>
                      <input 
                        type="url" 
                        id="avatar"
                        value={placementForm.avatar}
                        onChange={(e) => setPlacementForm({...placementForm, avatar: e.target.value})}
                        placeholder="e.g. https://i.pravatar.cc/150?u=sandeep"
                      />
                    </div>

                    <button type="submit" className="btn-admin-submit">
                      Add Student Placement 🏆
                    </button>
                  </form>
                </div>

                {/* List of Placements */}
                <div className="admin-list-card glass-panel">
                  <h3>Placed Students Roster</h3>
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Student Details</th>
                          <th>Company / Role</th>
                          <th>Package</th>
                          <th>College</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {placements.length > 0 ? (
                          placements.map((p) => (
                            <tr key={p.id}>
                              <td>
                                <div className="admin-student-cell">
                                  <img 
                                    className="admin-avatar"
                                    src={p.avatar} 
                                    alt={p.name}
                                    onError={(e) => {
                                      e.target.src = "https://i.pravatar.cc/150?u=" + p.name;
                                    }}
                                  />
                                  <div>
                                    <div className="bold-cell">{p.name}</div>
                                    <div className="text-secondary font-sm">{p.course}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div><strong>{p.company}</strong></div>
                                <div className="text-secondary font-sm">{p.role}</div>
                              </td>
                              <td className="highlight-text bold-cell">{p.package}</td>
                              <td className="font-sm">{p.college} ({p.year})</td>
                              <td>
                                <button 
                                  className="btn-delete"
                                  onClick={() => deletePlacement(p.id)}
                                  title="Delete Record"
                                >
                                  🗑️ Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="empty-table-cell">No placement records logged. Enter a placement on the left!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="admin-tab-pane animate-fadeIn">
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px' }}>
                <div className="inbox-header">
                  <div>
                    <h3>Callback Lead Inbox</h3>
                    <p className="section-subtitle">Real-time submitted admission enquiries and batch registration requests.</p>
                  </div>
                  {enquiries.length > 0 && (
                    <button className="btn-clear-all" onClick={clearAllEnquiries}>
                      💥 Clear All Enquiries
                    </button>
                  )}
                </div>

                <div className="admin-table-container" style={{ marginTop: '20px' }}>
                  <table className="admin-table enquiry-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Student Name & Contact</th>
                        <th>Preferred Stream & Location</th>
                        <th>Additional Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.length > 0 ? (
                        enquiries.map((enq) => (
                          <tr key={enq.id} className={enq.status === 'Contacted' ? 'row-contacted' : ''}>
                            <td className="font-sm date-cell">📅 {enq.date}</td>
                            <td>
                              <div className="bold-cell">{enq.name}</div>
                              <div className="contact-hotlinks">
                                <a href={`tel:${enq.phone}`} className="contact-link">📞 {enq.phone}</a>
                                <br />
                                <a href={`mailto:${enq.email}`} className="contact-link email-link">✉️ {enq.email}</a>
                              </div>
                            </td>
                            <td>
                              <div><strong>📚 {enq.course}</strong></div>
                              <div className="text-secondary font-sm">📍 {enq.branch}</div>
                            </td>
                            <td className="message-cell">
                              <p className="enq-msg-bubble">
                                {enq.message || <em className="text-muted">No custom message. Required callback assistance.</em>}
                              </p>
                            </td>
                            <td>
                              <span className={`status-pill ${enq.status.toLowerCase()}`}>
                                {enq.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons-cell">
                                <button 
                                  className={`btn-action-status ${enq.status === 'Contacted' ? 'pending' : 'contacted'}`}
                                  onClick={() => toggleEnquiryStatus(enq.id)}
                                >
                                  {enq.status === 'Contacted' ? 'Mark Pending' : 'Mark Contacted ✓'}
                                </button>
                                <button 
                                  className="btn-action-delete"
                                  onClick={() => deleteEnquiry(enq.id)}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="empty-table-cell pad-lg">
                            🎉 Hooray! No pending callback enquiries. All student registrations are clear.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
