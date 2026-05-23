'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './portal.css';

export default function StudentPortal() {
  const [user, setUser] = useState(null);
  const [isLoginView, setIsLoginView] = useState(true);
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    course: 'Java Full Stack Development',
    branch: 'Vijayawada Branch'
  });
  
  // MCQ Quiz State
  const [quizState, setQuizState] = useState('idle'); // idle, active, finished
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [testHistory, setTestHistory] = useState([]);

  // Mock Checklist
  const [checklist, setChecklist] = useState({
    theoryMock: true,
    codingMock: false,
    resumeUploaded: true,
    attendanceCleared: true
  });

  const quizQuestions = [
    {
      question: "Which of the following is NOT a feature of Java Programming Language?",
      options: [
        "Object-Oriented Programming",
        "Use of Pointers for Direct Memory Access",
        "Platform Independent (Write Once Run Anywhere)",
        "Automatic Garbage Collection"
      ],
      correct: 1,
      explanation: "Java does not support direct pointers to prevent unauthorized memory access and maintain safety, unlike C/C++."
    },
    {
      question: "In React.js, what hook is primarily used to fetch data and perform side effects?",
      options: [
        "useState",
        "useContext",
        "useEffect",
        "useReducer"
      ],
      correct: 2,
      explanation: "useEffect hook lets you perform side effects (data fetching, DOM mutations, timers) in functional React components."
    },
    {
      question: "Which CSS display property allows easy creation of single-dimension layouts (rows or columns) with alignment control?",
      options: [
        "display: grid",
        "display: block",
        "display: inline",
        "display: flex"
      ],
      correct: 3,
      explanation: "display: flex triggers CSS Flexbox, which is designed for one-dimensional layouts (either a single row or a single column)."
    },
    {
      question: "In database management, which SQL join returns all records when there is a match in either left or right table?",
      options: [
        "INNER JOIN",
        "FULL OUTER JOIN",
        "LEFT JOIN",
        "RIGHT JOIN"
      ],
      correct: 1,
      explanation: "FULL OUTER JOIN (or FULL JOIN) returns all rows from both tables as long as there is a match in either of the tables."
    },
    {
      question: "What does the command 'git push origin main' accomplish?",
      options: [
        "Pulls code changes from remote 'main' branch to local",
        "Merges main branch into origin branch",
        "Sends local commits of 'main' branch to the remote repository named 'origin'",
        "Deletes the remote main branch"
      ],
      correct: 2,
      explanation: "git push uploads your local repository commits to a remote repository (origin) on the specified branch (main)."
    }
  ];

  // Active Placement Drives List
  const activeDrives = [
    { id: "D-1", company: "Capgemini", role: "Associate Software Engineer", ctc: "4.2 LPA", date: "June 05, 2026", applied: false },
    { id: "D-2", company: "TCS", role: "Ninja Developer", ctc: "3.6 LPA", date: "June 08, 2026", applied: false },
    { id: "D-3", company: "Wipro", role: "Project Engineer", ctc: "4.0 LPA", date: "June 12, 2026", applied: false }
  ];
  const [drives, setDrives] = useState(activeDrives);

  // Load User session & Quiz history on mount
  useEffect(() => {
    const session = localStorage.getItem('sh_portal_user');
    if (session) {
      setUser(JSON.parse(session));
    }
    const history = localStorage.getItem('sh_test_history');
    if (history) {
      setTestHistory(JSON.parse(history));
    } else {
      const defaultHistory = [
        { testName: "HTML & CSS Foundation", score: "5/5", pct: 100, date: "May 10, 2026" },
        { testName: "Java Syntax Basics", score: "4/5", pct: 80, date: "May 18, 2026" }
      ];
      localStorage.setItem('sh_test_history', JSON.stringify(defaultHistory));
      setTestHistory(defaultHistory);
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      if (!loginForm.email || !loginForm.password) return;
      
      const nameFromEmail = loginForm.email.split('@')[0];
      const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      
      const mockStudent = {
        name: displayName || "Student",
        email: loginForm.email,
        course: "Java Full Stack Development",
        branch: "Vijayawada Branch",
        id: 'SH-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
        issueDate: new Date().toLocaleDateString(),
        validUntil: '12/31/2026',
        avatar: 'https://i.pravatar.cc/150?u=' + (displayName || "Student").replace(/\s+/g, '')
      };
      
      localStorage.setItem('sh_portal_user', JSON.stringify(mockStudent));
      setUser(mockStudent);
    } else {
      if (!loginForm.name || !loginForm.email || !loginForm.password) return;

      const randomId = 'SH-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      const mockStudent = {
        ...loginForm,
        id: randomId,
        issueDate: new Date().toLocaleDateString(),
        validUntil: '12/31/2026',
        avatar: 'https://i.pravatar.cc/150?u=' + loginForm.name.replace(/\s+/g, '')
      };

      localStorage.setItem('sh_portal_user', JSON.stringify(mockStudent));
      setUser(mockStudent);
    }
  };

  const handleGuestDemo = () => {
    const guestStudent = {
      name: "Karthik Penugonda",
      email: "karthik.p@gmail.com",
      course: "Java Full Stack Development",
      branch: "Vijayawada Branch",
      id: "SH-2026-9812",
      issueDate: "05/01/2026",
      validUntil: "12/31/2026",
      avatar: "https://i.pravatar.cc/150?u=karthikpenugonda"
    };

    localStorage.setItem('sh_portal_user', JSON.stringify(guestStudent));
    setUser(guestStudent);
  };

  const handleLogout = () => {
    localStorage.removeItem('sh_portal_user');
    localStorage.removeItem('sh_test_history');
    setUser(null);
    setIsLoginView(true);   // always show login (not register) after logout
    setQuizState('idle');
    setCurrentQIndex(0);
    setSelectedAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mock Test Functions
  const handleSelectAnswer = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIndex]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });

    setQuizScore(score);
    setQuizState('finished');

    // Add to test history
    const pct = Math.round((score / quizQuestions.length) * 100);
    const newRecord = {
      testName: "Full Stack Developer Weekly Mock Test",
      score: `${score}/${quizQuestions.length}`,
      pct: pct,
      date: new Date().toLocaleDateString()
    };

    const updatedHistory = [newRecord, ...testHistory];
    localStorage.setItem('sh_test_history', JSON.stringify(updatedHistory));
    setTestHistory(updatedHistory);

    // Dynamic reactivity: If student scores 4/5 or higher, unlock codingMock checklist!
    if (score >= 4) {
      setChecklist(prev => ({ ...prev, codingMock: true }));
    }
  };

  const resetQuiz = () => {
    setQuizState('idle');
    setCurrentQIndex(0);
    setSelectedAnswers({});
  };

  // Apply to placements drive
  const handleApplyDrive = (driveId, company) => {
    setDrives(prev => prev.map(d => d.id === driveId ? { ...d, applied: true } : d));
    alert(`Placement Application Submitted! Company: ${company}. Drive Code: SH-DRIVE-${Math.floor(100 + Math.random() * 900)}.`);
  };

  const handlePrintID = () => {
    window.print();
  };

  // Render Login page if no session
  if (!user) {
    return (
      <div className="portal-login-wrapper">
        <div className="portal-login-glow"></div>
        <div className="portal-login-card glass-panel animate-scaleUp">
          <div className="login-card-header">
            <h3>{isLoginView ? 'Student Login' : 'Student Registration'}</h3>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-card-form">
            {!isLoginView && (
              <div className="form-field">
                <label>Full Name:</label>
                <input 
                  type="text" 
                  placeholder="" 
                  value={loginForm.name}
                  onChange={(e) => setLoginForm(p => ({ ...p, name: e.target.value }))}
                  required={!isLoginView}
                />
              </div>
            )}

            <div className="form-field">
              <label>Email{isLoginView ? ' Address *' : ':'}</label>
              <input 
                type="email" 
                placeholder={isLoginView ? "e.g. rahul@gmail.com" : ""}
                value={loginForm.email}
                onChange={(e) => setLoginForm(p => ({ ...p, email: e.target.value }))}
                required
              />
            </div>

            {!isLoginView && (
              <div className="form-field">
                <label>Phone Number:</label>
                <input 
                  type="tel" 
                  placeholder="" 
                  value={loginForm.phone}
                  onChange={(e) => setLoginForm(p => ({ ...p, phone: e.target.value }))}
                  required={!isLoginView}
                />
              </div>
            )}

            <div className="form-field">
              <label>Password{isLoginView ? ' *' : ':'}</label>
              <input 
                type="password" 
                placeholder={isLoginView ? "••••••••" : ""} 
                value={loginForm.password}
                onChange={(e) => setLoginForm(p => ({ ...p, password: e.target.value }))}
                required
              />
            </div>

            {!isLoginView && (
              <div className="form-field">
                <label>Select Course:</label>
                <select 
                  value={loginForm.course}
                  onChange={(e) => setLoginForm(p => ({ ...p, course: e.target.value }))}
                >
                  <option value="Java Full Stack">Java Full Stack</option>
                  <option value="Python Development">Python Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>
            )}

            <div className="login-action-buttons">
              <button type="submit" className="btn-login-submit">
                {isLoginView ? 'Login Button' : 'Register Button'}
              </button>
              
              {isLoginView && (
                <div className="login-links" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.9rem' }}>
                  <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Forgot Password?</a>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Don't have account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginView(false); }} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Register</a>
                  </span>
                </div>
              )}
              
              {!isLoginView && (
                <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginView(true); }} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Login</a>
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-dashboard-wrapper">
      {/* Top Welcome Bar */}
      <section className="portal-welcome-bar">
        <div className="welcome-container">
          <div className="welcome-student-meta">
            <h2>Welcome back, <span className="welcome-name">{user.name}</span>!</h2>
            <p>Role: Enrolled Student | ID: <code>{user.id}</code></p>
          </div>
          <button className="btn-portal-logout" onClick={handleLogout}>
            Log Out ⎋
          </button>
        </div>
      </section>

      {/* Layout with Sidebar */}
      <div className="portal-layout-container">

        {/* LEFT SIDEBAR — Profile, My Account & Log Out only */}
        <aside className="portal-sidebar">
          <div className="sidebar-user-head" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #8B5CF6' }}
              onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?u=' + user.name.replace(/\s+/g, ''); }}
            />
            <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{user.name}</span>
            <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '600' }}>● Online</span>

            {/* My Account */}
            <button
              onClick={() => {}}
              style={{ width: '100%', marginTop: '12px', fontSize: '0.88rem', fontWeight: '700', color: '#374151', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              My Account
            </button>

            {/* Log Out */}
            <button
              onClick={handleLogout}
              style={{ width: '100%', fontSize: '0.88rem', fontWeight: '700', color: '#ef4444', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log Out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="portal-main-content">
          <section className="portal-grid">

            {/* Left column: ID card & Progress Checklist */}
            <div className="portal-left-column">

              {/* Printable ID Card */}
              <div className="portal-card-container glass-panel no-print">
                <div className="card-block-header">
                  <h3>Academy ID Card</h3>
                  <p>Verify registration credentials or print/download physical copy.</p>
                </div>
                <div className="id-card-layout-wrapper">
                  <div id="student-identity-card" className="student-id-card-element">
                    <div className="id-card-header">
                      <span className="academy-initials">SH</span>
                      <div className="academy-branding-id">
                        <h4>SKILL HORIZON</h4>
                        <p>TECHNOLOGIES ACADEMY</p>
                      </div>
                    </div>
                    <div className="id-card-body">
                      <div className="id-student-photo">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          onError={(e) => { e.target.src = "https://i.pravatar.cc/150?u=" + user.name.replace(/\s+/g, ''); }}
                        />
                      </div>
                      <h3 className="id-student-name">{user.name}</h3>
                      <span className="id-student-reg">{user.id}</span>
                      <div className="id-details-grid">
                        <div className="id-detail-line"><span className="label">Course</span><span className="val">{user.course}</span></div>
                        <div className="id-detail-line"><span className="label">Branch</span><span className="val">{user.branch}</span></div>
                        <div className="id-detail-line"><span className="label">Issued</span><span className="val">{user.issueDate}</span></div>
                        <div className="id-detail-line"><span className="label">Valid To</span><span className="val">{user.validUntil}</span></div>
                      </div>
                    </div>
                    <div className="id-card-footer">
                      <div className="barcode-mock-svg">
                        <svg width="180" height="28">
                          <rect width="180" height="28" fill="white" />
                          <g fill="black">
                            <rect x="10" y="2" width="2" height="24" /><rect x="14" y="2" width="4" height="24" />
                            <rect x="20" y="2" width="1" height="24" /><rect x="24" y="2" width="2" height="24" />
                            <rect x="28" y="2" width="5" height="24" /><rect x="36" y="2" width="2" height="24" />
                            <rect x="40" y="2" width="1" height="24" /><rect x="44" y="2" width="3" height="24" />
                            <rect x="50" y="2" width="4" height="24" /><rect x="56" y="2" width="1" height="24" />
                            <rect x="60" y="2" width="2" height="24" /><rect x="64" y="2" width="5" height="24" />
                            <rect x="72" y="2" width="3" height="24" /><rect x="78" y="2" width="1" height="24" />
                            <rect x="82" y="2" width="4" height="24" /><rect x="88" y="2" width="2" height="24" />
                            <rect x="94" y="2" width="1" height="24" /><rect x="98" y="2" width="5" height="24" />
                            <rect x="106" y="2" width="2" height="24" /><rect x="110" y="2" width="1" height="24" />
                            <rect x="114" y="2" width="3" height="24" /><rect x="120" y="2" width="4" height="24" />
                            <rect x="126" y="2" width="2" height="24" /><rect x="132" y="2" width="1" height="24" />
                            <rect x="136" y="2" width="5" height="24" /><rect x="144" y="2" width="3" height="24" />
                            <rect x="150" y="2" width="1" height="24" /><rect x="154" y="2" width="4" height="24" />
                            <rect x="160" y="2" width="2" height="24" /><rect x="164" y="2" width="5" height="24" />
                          </g>
                        </svg>
                      </div>
                      <span className="card-verification-seal">Verified Admission Seal ✓</span>
                    </div>
                  </div>
                </div>
                <button className="btn-print-id-card" onClick={handlePrintID}>
                  🖨️ Print / Save Student ID Card
                </button>
              </div>

              {/* Placement Checklist */}
              <div className="portal-card-container glass-panel mt-4 no-print">
                <div className="card-block-header">
                  <h3>Placement Assistance Checklist</h3>
                  <p>Complete these milestones to qualify for campus recruitment drives.</p>
                </div>
                <div className="checklist-items-list">
                  <div className="checklist-item-row completed">
                    <span className="checklist-check-icon">✓</span>
                    <div className="checklist-info"><h4>Theory Mock Test</h4><p>Cleared Java &amp; CSS Theory exams (Score &gt; 80%).</p></div>
                  </div>
                  <div className={`checklist-item-row ${checklist.codingMock ? 'completed' : 'pending'}`}>
                    <span className="checklist-check-icon">{checklist.codingMock ? '✓' : '○'}</span>
                    <div className="checklist-info"><h4>Coding Exam / MCQ Mock Test</h4><p>{checklist.codingMock ? 'Cleared with excellent score!' : 'Pending. Score 4/5 or higher on the Weekly Mock Test to clear!'}</p></div>
                  </div>
                  <div className="checklist-item-row completed">
                    <span className="checklist-check-icon">✓</span>
                    <div className="checklist-info"><h4>Resume Optimization</h4><p>Professional LinkedIn-shareable resume verified by mentor.</p></div>
                  </div>
                  <div className="checklist-item-row completed">
                    <span className="checklist-check-icon">✓</span>
                    <div className="checklist-info"><h4>Attendance Threshold</h4><p>Maintained attendance above required limit (Current: 88%).</p></div>
                  </div>
                </div>
                <div className="placement-eligibility-meter">
                  <span className="meter-label">Eligibility Progress</span>
                  <div className="meter-track">
                    <div className="meter-bar" style={{ width: checklist.codingMock ? '100%' : '75%' }}></div>
                  </div>
                  <span className="meter-percent">{checklist.codingMock ? '100% Eligible! (Drive Token unlocked)' : '75% Completed'}</span>
                </div>
              </div>

            </div>{/* end portal-left-column */}

            {/* Right column: Interactive Quiz & Drives */}
            <div className="portal-right-column">

              {/* Daily Mock Exam Engine */}
              <div className="portal-card-container glass-panel no-print">
                <div className="card-block-header">
                  <h3>Weekly Technical Mock Test</h3>
                  <p>Practice standard corporate aptitude and coding multiple-choice questions to unlock placement drives.</p>
                </div>

                {quizState === 'idle' && (
                  <div className="quiz-screen-idle">
                    <span className="quiz-icon">📝</span>
                    <h4>FSD Technical Mock Assessment 2026</h4>
                    <ul className="quiz-rules-list">
                      <li><strong>Total Questions:</strong> 5 Multiple-Choice Questions</li>
                      <li><strong>Target:</strong> Score 4 out of 5 (80%) to unlock the Coding Exam checklist item.</li>
                      <li><strong>Syllabus:</strong> Java syntax, React hooks, SQL joins, CSS models, and Git operations.</li>
                    </ul>
                    <button className="btn-start-quiz" onClick={() => setQuizState('active')}>Launch Mock Assessment 🚀</button>
                  </div>
                )}

                {quizState === 'active' && (
                  <div className="quiz-screen-active animate-fadeIn">
                    <div className="quiz-progress-header">
                      <span>Question {currentQIndex + 1} of {quizQuestions.length}</span>
                      <div className="mini-progress-track">
                        <div className="mini-progress-bar" style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}></div>
                      </div>
                    </div>
                    <h4 className="quiz-question-title">{quizQuestions[currentQIndex].question}</h4>
                    <div className="quiz-options-list">
                      {quizQuestions[currentQIndex].options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[currentQIndex] === optIdx;
                        return (
                          <button key={optIdx} className={`quiz-option-button ${isSelected ? 'selected' : ''}`} onClick={() => handleSelectAnswer(optIdx)}>
                            <span className="option-letter">{['A', 'B', 'C', 'D'][optIdx]}.</span>
                            <span className="option-text">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="quiz-navigation-footer">
                      <button className="btn-quiz-nav" onClick={handlePrevQuestion} disabled={currentQIndex === 0}>← Previous</button>
                      {currentQIndex < quizQuestions.length - 1 ? (
                        <button className="btn-quiz-nav next" onClick={handleNextQuestion} disabled={selectedAnswers[currentQIndex] === undefined}>Next Question →</button>
                      ) : (
                        <button className="btn-quiz-submit" onClick={submitQuiz} disabled={selectedAnswers[currentQIndex] === undefined}>Submit Exam 📥</button>
                      )}
                    </div>
                  </div>
                )}

                {quizState === 'finished' && (
                  <div className="quiz-screen-results animate-scaleUp">
                    <div className="results-metrics">
                      <div className="circle-score-wrapper">
                        <span className="score-big">{quizScore}/5</span>
                        <span className="score-percent">{Math.round((quizScore / quizQuestions.length) * 100)}%</span>
                      </div>
                      <div className="results-feedback-brief">
                        <h4>{quizScore >= 4 ? '🎉 Assessment Cleared!' : '⚠️ Try Again to Clear'}</h4>
                        <p>{quizScore >= 4 ? 'You scored 80% or higher. Your Coding Mock Exam requirement has been automatically checked!' : 'Minimum 80% required. Revise topics and click below to retake.'}</p>
                      </div>
                    </div>
                    <div className="quiz-explanations-accordions">
                      <h5>Question Review &amp; Explanations</h5>
                      {quizQuestions.map((q, idx) => {
                        const studentAns = selectedAnswers[idx];
                        const isCorrect = studentAns === q.correct;
                        return (
                          <div key={idx} className={`explanation-accordion-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                            <div className="explanation-accordion-header">
                              <span className="indicator-symbol">{isCorrect ? '✓' : '✗'}</span>
                              <h6>Q{idx + 1}: {q.question.substring(0, 50)}...</h6>
                            </div>
                            <div className="explanation-accordion-body">
                              <p><strong>Your Answer:</strong> {q.options[studentAns] || 'Not Answered'}</p>
                              <p><strong>Correct Answer:</strong> {q.options[q.correct]}</p>
                              <p className="explanation-text-block">💡 <strong>Explanation:</strong> {q.explanation}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button className="btn-retake-quiz" onClick={resetQuiz}>Retake Mock Assessment 🔄</button>
                  </div>
                )}
              </div>

              {/* Test History */}
              <div className="portal-card-container glass-panel mt-4 no-print">
                <div className="card-block-header">
                  <h3>Academic Test History</h3>
                  <p>Performance logs of your technical evaluations and mock interviews.</p>
                </div>
                <div className="portal-history-table-wrapper">
                  <table className="portal-history-table">
                    <thead>
                      <tr><th>Exam Name</th><th>Score</th><th>Percentage</th><th>Date Taken</th></tr>
                    </thead>
                    <tbody>
                      {testHistory.map((item, idx) => (
                        <tr key={idx}>
                          <td className="cell-testname">{item.testName}</td>
                          <td>{item.score}</td>
                          <td><span className={`pct-badge ${item.pct >= 80 ? 'pass' : 'fail'}`}>{item.pct}%</span></td>
                          <td className="cell-history-date">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Placement Drives */}
              <div className="portal-card-container glass-panel mt-4 no-print">
                <div className="card-block-header">
                  <h3>Active Placement Drives</h3>
                  <p>Submit job drive application tokens. Exclusively available to eligible students.</p>
                </div>
                <div className="drives-list">
                  {drives.map((d) => {
                    const isStudentEligible = checklist.codingMock || checklist.theoryMock;
                    return (
                      <div key={d.id} className="drive-alert-card">
                        <div className="drive-header-meta">
                          <h4>{d.company}</h4>
                          <span className="drive-ctc">{d.ctc}</span>
                        </div>
                        <p className="drive-role">💼 Role: {d.role}</p>
                        <p className="drive-deadline">📅 Drive Date: {d.date}</p>
                        {d.applied ? (
                          <button className="btn-drive-apply applied" disabled>Applied Successfully ✓</button>
                        ) : (
                          <button className="btn-drive-apply" onClick={() => handleApplyDrive(d.id, d.company)} disabled={!isStudentEligible}>
                            {isStudentEligible ? 'Apply with Profile Token ➔' : 'Locked (Clear Mock Exam to Unlock)'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>{/* end portal-right-column */}

          </section>
        </main>
      </div>
    </div>
  );
}
