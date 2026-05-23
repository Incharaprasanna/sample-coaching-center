'use client';

import React, { useState, useEffect } from 'react';
import './EnquiryDrawer.css';

export default function EnquiryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    branch: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Listen to global open event for deep linking from other components
  useEffect(() => {
    const handleOpenEvent = (e) => {
      setIsOpen(true);
      if (e.detail && e.detail.course) {
        setFormData(prev => ({ ...prev, course: e.detail.course }));
      }
      if (e.detail && e.detail.branch) {
        setFormData(prev => ({ ...prev, branch: e.detail.branch }));
      }
    };
    window.addEventListener('open-enquiry', handleOpenEvent);
    return () => window.removeEventListener('open-enquiry', handleOpenEvent);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.branch) newErrors.branch = 'Please select a branch';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save submission to LocalStorage
    const newSubmission = {
      ...formData,
      id: 'ENQ-' + Date.now(),
      date: new Date().toLocaleString(),
      status: 'Pending'
    };

    const existingEnquiries = JSON.parse(localStorage.getItem('sh_enquiries') || '[]');
    localStorage.setItem('sh_enquiries', JSON.stringify([newSubmission, ...existingEnquiries]));

    // Trigger local state updates if admin page is open
    window.dispatchEvent(new Event('sh_enquiries_updated'));

    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      branch: '',
      message: ''
    });

    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className="floating-enquiry-btn animate-bounce-subtle" 
        onClick={() => setIsOpen(true)}
        aria-label="Open Enquiry Drawer"
      >
        <span className="floating-btn-icon">💬</span>
        <span className="floating-btn-text">Enquire Now</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && <div className="drawer-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Drawer Panel */}
      <div className={`enquiry-drawer-panel ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Quick Enquiry</h3>
          <button className="close-drawer-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="drawer-body">
          {isSubmitted ? (
            <div className="enquiry-success-message">
              <div className="success-icon-animation">✓</div>
              <h4>Thank you!</h4>
              <p>Your request has been received. Our expert career mentor will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="drawer-form">
              <p className="form-helper-text">Enter your details to request a callback, batch details, or a syllabus brochure.</p>
              
              <div className="form-field">
                <label htmlFor="drawer-name">Full Name *</label>
                <input 
                  type="text" 
                  id="drawer-name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="field-error-text">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="drawer-email">Email Address *</label>
                <input 
                  type="email" 
                  id="drawer-email"
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="e.g. rahul@gmail.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="drawer-phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="drawer-phone"
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="drawer-course">Preferred Course *</label>
                <select 
                  id="drawer-course"
                  name="course" 
                  value={formData.course} 
                  onChange={handleChange}
                  className={errors.course ? 'error' : ''}
                >
                  <option value="">-- Select Course --</option>
                  <option value="Java Full Stack Development">Java Full Stack Development</option>
                  <option value="Python & Data Science">Python & Data Science</option>
                  <option value="Cloud Computing & DevOps">Cloud & DevOps</option>
                  <option value="Software Testing (Selenium)">Software Testing (Selenium)</option>
                  <option value="UI/UX Design (Figma)">UI/UX Design (Figma)</option>
                  <option value="Academic Project Support">Academic Project Support</option>
                </select>
                {errors.course && <span className="field-error-text">{errors.course}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="drawer-branch">Preferred Branch *</label>
                <select 
                  id="drawer-branch"
                  name="branch" 
                  value={formData.branch} 
                  onChange={handleChange}
                  className={errors.branch ? 'error' : ''}
                >
                  <option value="">-- Select Location --</option>
                  <option value="Online Training">Online Live Batch</option>
                  <option value="Vijayawada Branch">Vijayawada (Krishna)</option>
                  <option value="Visakhapatnam Branch">Visakhapatnam (Vizag)</option>
                  <option value="Guntur Branch">Guntur</option>
                  <option value="Tirupati Branch">Tirupati</option>
                </select>
                {errors.branch && <span className="field-error-text">{errors.branch}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="drawer-message">Your Message (Optional)</label>
                <textarea 
                  id="drawer-message"
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange}
                  placeholder="Ask a question about batches, fees, or placements..."
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="btn-drawer-submit">
                Submit Enquiry ↗
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
