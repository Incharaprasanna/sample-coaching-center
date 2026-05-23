'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './register.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    universityNo: '',
    branch: '',
    yearOfPassout: '',
    cgpa: '',
    dob: '',
    mobileNo: '',
    email: '',
    gender: '',
    address: '',
    modeOfClasses: '',
    courseType: '',
  });

  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('sh_registrations') || '[]');
    if (existing && existing.length > 0) {
      setFormData(existing[0]);
    } else {
      const portalUser = JSON.parse(localStorage.getItem('sh_portal_user'));
      if (portalUser) {
        setFormData(prev => ({ 
          ...prev, 
          studentName: portalUser.name || '', 
          email: portalUser.email || '', 
          mobileNo: portalUser.phone || '',
          courseType: portalUser.course || ''
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName.trim())    newErrors.studentName    = 'Student name is required';
    if (!formData.universityNo.trim())   newErrors.universityNo   = 'University number is required';
    if (!formData.branch.trim())         newErrors.branch         = 'Branch is required';
    if (!formData.yearOfPassout.trim())  newErrors.yearOfPassout  = 'Year of passout is required';
    if (!formData.cgpa.trim())           newErrors.cgpa           = 'CGPA is required';
    if (!formData.dob)                   newErrors.dob            = 'Date of birth is required';
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNo.replace(/\D/g, ''))) {
      newErrors.mobileNo = 'Must be a 10-digit number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.gender)         newErrors.gender         = 'Please select gender';
    if (!formData.modeOfClasses)  newErrors.modeOfClasses  = 'Please select mode of classes';
    if (!formData.courseType)     newErrors.courseType     = 'Please select a course';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save to localStorage
    const registration = {
      ...formData,
      id: 'REG-' + Date.now(),
      registeredAt: new Date().toLocaleString(),
      status: 'Pending Review',
    };
    const existing = JSON.parse(localStorage.getItem('sh_registrations') || '[]');
    localStorage.setItem('sh_registrations', JSON.stringify([registration, ...existing]));

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData({
      studentName: '', universityNo: '', branch: '', yearOfPassout: '',
      cgpa: '', dob: '', mobileNo: '', email: '', gender: '',
      address: '', modeOfClasses: '', courseType: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="reg-page">
        <div className="reg-success-card">
          <div className="success-icon">✓</div>
          <h2>Registration Successful!</h2>
          <p>
            Thank you, <strong>{formData.studentName}</strong>! Your registration has been
            received. Our team will contact you shortly on{' '}
            <strong>{formData.mobileNo}</strong>.
          </p>
          <div className="success-actions">
            <button onClick={handleReset} className="btn-register">Register Another</button>
            <Link href="/" className="btn-home">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-page">
      {/* Page header */}
      <div className="reg-hero">
        <div className="reg-hero-badge">
          <span className="badge-dot"></span>
          Skill Horizon Academy
        </div>
        <h1>Student Detail</h1>
        <p>Fill in your details below to register for a programme. Our team will reach out to confirm your slot.</p>
      </div>

      {/* Form card */}
      <div className="reg-container">
        <form id="registration-form" className="reg-form" onSubmit={handleSubmit} noValidate>

          {/* ── Section 1: Personal Info ── */}
          <div className="form-section">
            <h3 className="form-section-title">Personal Information</h3>
            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="studentName">Student Name <span className="req">*</span></label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="e.g. Ravi Kumar"
                  className={errors.studentName ? 'error' : ''}
                />
                {errors.studentName && <span className="field-error">{errors.studentName}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="dob">Date of Birth <span className="req">*</span></label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={errors.dob ? 'error' : ''}
                />
                {errors.dob && <span className="field-error">{errors.dob}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="gender">Gender <span className="req">*</span></label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">-- Select Gender --</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="field-error">{errors.gender}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="mobileNo">Mobile No <span className="req">*</span></label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={errors.mobileNo ? 'error' : ''}
                />
                {errors.mobileNo && <span className="field-error">{errors.mobileNo}</span>}
              </div>

              <div className="form-field full-width">
                <label htmlFor="email">Email Address <span className="req">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. ravi@gmail.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-field full-width">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your current address"
                  rows={3}
                />
              </div>

            </div>
          </div>

          {/* ── Section 2: Academic Info ── */}
          <div className="form-section">
            <h3 className="form-section-title">Academic Information</h3>
            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="universityNo">University No <span className="req">*</span></label>
                <input
                  type="text"
                  id="universityNo"
                  name="universityNo"
                  value={formData.universityNo}
                  onChange={handleChange}
                  placeholder="e.g. 21BG1A0501"
                  className={errors.universityNo ? 'error' : ''}
                />
                {errors.universityNo && <span className="field-error">{errors.universityNo}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="branch">Branch <span className="req">*</span></label>
                <input
                  type="text"
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g. CSE, ECE, IT"
                  className={errors.branch ? 'error' : ''}
                />
                {errors.branch && <span className="field-error">{errors.branch}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="yearOfPassout">Year of Passout <span className="req">*</span></label>
                <input
                  type="text"
                  id="yearOfPassout"
                  name="yearOfPassout"
                  value={formData.yearOfPassout}
                  onChange={handleChange}
                  placeholder="e.g. 2025"
                  maxLength={4}
                  className={errors.yearOfPassout ? 'error' : ''}
                />
                {errors.yearOfPassout && <span className="field-error">{errors.yearOfPassout}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="cgpa">CGPA <span className="req">*</span></label>
                <input
                  type="text"
                  id="cgpa"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="e.g. 8.5"
                  className={errors.cgpa ? 'error' : ''}
                />
                {errors.cgpa && <span className="field-error">{errors.cgpa}</span>}
              </div>

            </div>
          </div>

          {/* ── Section 3: Programme ── */}
          <div className="form-section">
            <h3 className="form-section-title">Programme Preferences</h3>
            <div className="form-grid">

              <div className="form-field">
                <label htmlFor="courseType">Course Type <span className="req">*</span></label>
                <select
                  id="courseType"
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  className={errors.courseType ? 'error' : ''}
                >
                  <option value="">-- Select Course --</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Testing">Testing (Selenium / Manual)</option>
                  <option value="Data Science & AI">Data Science &amp; AI</option>
                  <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                  <option value="Academic Project Guidance">Academic Project Guidance</option>
                  <option value="Internship Programme">Internship Programme</option>
                </select>
                {errors.courseType && <span className="field-error">{errors.courseType}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="modeOfClasses">Mode of Classes <span className="req">*</span></label>
                <select
                  id="modeOfClasses"
                  name="modeOfClasses"
                  value={formData.modeOfClasses}
                  onChange={handleChange}
                  className={errors.modeOfClasses ? 'error' : ''}
                >
                  <option value="">-- Select Mode --</option>
                  <option value="Online">Online (Live Sessions)</option>
                  <option value="Offline">Offline (Vijayawada / Vizag)</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.modeOfClasses && <span className="field-error">{errors.modeOfClasses}</span>}
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button type="submit" className="btn-register">
              {formData.id ? 'Update Details ↗' : 'Submit Registration ↗'}
            </button>
            <button type="button" className="btn-reset" onClick={handleReset}>
              Clear Form
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
