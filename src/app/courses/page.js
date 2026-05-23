'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import './courses.css';

export default function Courses() {
  const [activeTab, setActiveTab] = useState('dev');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedSyllabusModule, setExpandedSyllabusModule] = useState({});

  const searchParams = useSearchParams();

  useEffect(() => {
    const stream = searchParams.get('stream');
    if (stream && ['dev', 'python', 'cloud', 'testing'].includes(stream)) {
      setActiveTab(stream);
    }
  }, [searchParams]);

  const courseStreams = {
    dev: {
      title: "Full Stack Web Development",
      description: "Become a professional software engineer building modern responsive frontends and highly scalable backends.",
      courses: [
        {
          id: "java-fs",
          title: "Java Full Stack Development",
          duration: "3 Months (120 Hours)",
          mode: "Online + Offline",
          cert: "Skill Horizon Certified (NASSCOM Aligned)",
          prereq: "Basic computer knowledge. Analytical mindset.",
          tools: ["Java", "Spring Boot", "Hibernate", "React", "SQL", "Git", "Docker"],
          outcomes: ["Full Stack Java Engineer", "Backend Developer", "Frontend Developer", "Database Administrator"],
          syllabus: [
            {
              title: "Module 1: Core Java Programming Essentials",
              topics: ["Introduction to OOPs concepts", "Variables, Data Types & Operators", "Control Statements & Loops", "Arrays, Strings & Stringbuffer", "Exception Handling & Multi-threading", "Java Collections Framework (List, Set, Map)"]
            },
            {
              title: "Module 2: Database Management & SQL",
              topics: ["Relational Database Basics", "SQL Queries (DML, DDL, DCL)", "Joins, Unions & Subqueries", "Database Normalization", "JDBC & Connection Pooling"]
            },
            {
              title: "Module 3: Advanced Java (JEE) & Spring Boot",
              topics: ["Servlets and JSP Fundamentals", "Hibernate ORM Integration", "Spring Framework & Dependency Injection", "Spring Boot Starter & REST APIs", "Spring Data JPA & Security basics"]
            },
            {
              title: "Module 4: Modern Frontend Technologies",
              topics: ["HTML5 semantic structures", "CSS3 Flexbox, Grid & Animations", "Javascript (ES6+) Foundations", "React.js architecture, hooks & routing", "API Integration with Axios"]
            }
          ]
        },
        {
          id: "mern-fs",
          title: "MERN Full Stack Development",
          duration: "3 Months (120 Hours)",
          mode: "Online Live Batch",
          cert: "Skill Horizon Verified Digital Credential",
          prereq: "HTML/CSS basics or logical thinking capability.",
          tools: ["MongoDB", "Express.js", "React.js", "Node.js", "TypeScript", "Redux Toolkit", "REST APIs"],
          outcomes: ["MERN Stack Engineer", "React Developer", "Javascript Specialist", "Node.js Backend Developer"],
          syllabus: [
            {
              title: "Module 1: Advanced Frontend with React",
              topics: ["ES6+ concepts (destructuring, arrow functions, promises)", "React Component Lifecycle & Hooks (useState, useEffect, useContext)", "State management with Redux Toolkit", "Responsive layout systems & tailwindcss basics"]
            },
            {
              title: "Module 2: Server-Side with Node & Express",
              topics: ["Node.js event loop & file systems", "Creating HTTP servers with Express.js", "Middleware architectures", "Form validation & Error handling frameworks"]
            },
            {
              title: "Module 3: NoSQL Database - MongoDB",
              topics: ["Document database fundamentals", "Mongoose schemas & validations", "Aggregation pipelines", "CRUD operations & Indexing algorithms"]
            },
            {
              title: "Module 4: Deployment & DevOps Fundamentals",
              topics: ["JSON Web Tokens (JWT) authentication", "Git repository collaborations", "Hosting on Vercel, Netlify & AWS EC2", "CI/CD automated pipeline basics"]
            }
          ]
        }
      ]
    },
    python: {
      title: "Python & Data Science",
      description: "Dive deep into statistical data analysis, machine learning algorithms, artificial intelligence, and prompt engineering.",
      courses: [
        {
          id: "python-ml",
          title: "Python, AI & Machine Learning",
          duration: "3 Months (120 Hours)",
          mode: "Online + Offline (Vijayawada & Vizag)",
          cert: "Skill Horizon + Industry Partner Joint Certificate",
          prereq: "Familiarity with high school mathematics and logical reasoning.",
          tools: ["Python", "NumPy", "Pandas", "Scikit-Learn", "TensorFlow", "Power BI", "SQL"],
          outcomes: ["Machine Learning Engineer", "Data Analyst", "Python Developer", "AI Developer"],
          syllabus: [
            {
              title: "Module 1: Professional Python Programming",
              topics: ["Python variables, structures, and keywords", "Functions, modules, and package management", "Object-Oriented Programming in Python", "File handling & API integrations"]
            },
            {
              title: "Module 2: Mathematical Foundations & Data Analysis",
              topics: ["Linear algebra & statistics basics", "Data manipulation using NumPy and Pandas", "Data visualization with Matplotlib and Seaborn", "Feature engineering & cleaning techniques"]
            },
            {
              title: "Module 3: Applied Machine Learning",
              topics: ["Supervised learning (Regression, Classification)", "Unsupervised learning (K-Means Clustering, PCA)", "Model evaluation using metrics & cross-validation", "Hyperparameter tuning techniques"]
            },
            {
              title: "Module 4: Deep Learning & Generative AI",
              topics: ["Neural Network fundamentals & perceptrons", "Convolutional Neural Networks (CNN) for image models", "Large Language Models & API prompting basics", "Building a custom chatbot model"]
            }
          ]
        }
      ]
    },
    cloud: {
      title: "Cloud & DevOps",
      description: "Master cloud environments, continuous integrations, deployments, scaling, and automation workflows.",
      courses: [
        {
          id: "devops-cloud",
          title: "DevOps & Cloud Engineering",
          duration: "2 Months (80 Hours)",
          mode: "Online Live Batch",
          cert: "Skill Horizon Verified Digital Credential",
          prereq: "Basic operating system knowledge (Linux familiarity is a plus).",
          tools: ["AWS", "Linux", "Docker", "Kubernetes", "Jenkins", "Ansible", "Terraform"],
          outcomes: ["DevOps Engineer", "Cloud Solutions Architect", "Site Reliability Engineer", "SysAdmin"],
          syllabus: [
            {
              title: "Module 1: Linux Administration & Bash Shell Scripting",
              topics: ["Linux filesystem layout & terminal commands", "Permissions, users, and networking configurations", "Writing functional Bash scripts for log automations", "Cron schedules & process managements"]
            },
            {
              title: "Module 2: Cloud Computing with Amazon Web Services (AWS)",
              topics: ["AWS EC2 Instances & Elastic Load Balancers", "Virtual Private Clouds (VPCs) & subnets", "S3 Storage buckets & IAM credentials", "RDS Databases & Route 53 DNS mappings"]
            },
            {
              title: "Module 3: Containerization & Orchestration",
              topics: ["Docker architecture & container hubs", "Writing Dockerfiles & multi-stage builds", "Kubernetes clusters, nodes, pods & services", "Deploying scalable applications in Kubernetes"]
            },
            {
              title: "Module 4: Continuous Integration & Infrastructure as Code",
              topics: ["Jenkins pipeline creation & triggers", "Ansible playbooks for server configurations", "Infrastructure provisioning using Terraform", "Monitoring tools (Prometheus & Grafana)"]
            }
          ]
        }
      ]
    },
    testing: {
      title: "Software Testing",
      description: "Acquire the skills to systematically test web applications, write automated scripts, and assure software quality.",
      courses: [
        {
          id: "selenium-testing",
          title: "Automation Testing with Selenium & Java",
          duration: "2 Months (80 Hours)",
          mode: "Online + Offline",
          cert: "Skill Horizon Verified Digital Credential",
          prereq: "Basic computer familiarity.",
          tools: ["Java", "Selenium WebDriver", "TestNG", "Maven", "Cucumber (BDD)", "SQL", "Jenkins"],
          outcomes: ["QA Automation Engineer", "Manual Tester", "SDET", "Quality Assurance Analyst"],
          syllabus: [
            {
              title: "Module 1: Core Java for Automated Testing",
              topics: ["OOPs principles tailored for QA", "Exception handling in test scripts", "Collections framework usage in test assertions"]
            },
            {
              title: "Module 2: Manual Testing Principles",
              topics: ["Software Development Life Cycle (SDLC)", "Software Testing Life Cycle (STLC)", "Test Case Design Techniques", "Bug Lifecycle & Defect tracking metrics"]
            },
            {
              title: "Module 3: Selenium WebDriver Automations",
              topics: ["Locators (XPath, CSS selectors, ID)", "Handling browser windows, alerts, and drop-downs", "Implicit, Explicit, and Fluent Waits", "Data-driven testing using Apache POI"]
            },
            {
              title: "Module 4: Testing Frameworks & Jenkins Integration",
              topics: ["TestNG annotations, XML files, and reporting", "Page Object Model (POM) design pattern", "Behavior Driven Development (BDD) with Cucumber", "Running testing suites inside Jenkins pipelines"]
            }
          ]
        }
      ]
    }
  };

  const handleEnquireNow = (courseTitle) => {
    // Dispatch custom event to trigger sliding Enquiry Drawer
    const event = new CustomEvent('open-enquiry', {
      detail: { course: courseTitle }
    });
    window.dispatchEvent(event);
  };

  const toggleSyllabusModule = (index) => {
    setExpandedSyllabusModule(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="courses-page-wrapper">
      {/* Hero section */}
      <section className="courses-hero">
        <div className="courses-hero-glow"></div>
        <div className="courses-hero-container">
          <span className="courses-hero-tag">🎓 Industry-Aligned Curriculum</span>
          <h1 className="courses-hero-title">Browse Our Professional Training Courses</h1>
          <p className="courses-hero-subtitle">
            Equipping Andhra Pradesh engineering and IT students with 100% placement-oriented coaching, expert trainers, and real-time capstone projects.
          </p>
        </div>
      </section>

      {/* Main content split layout */}
      <section className="courses-content-container section-container">
        {/* Stream Tabs Selector */}
        <div className="courses-stream-tabs">
          {Object.keys(courseStreams).map((key) => (
            <button
              key={key}
              className={`stream-tab-btn ${activeTab === key ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(key);
                setExpandedCourse(null);
                setExpandedSyllabusModule({});
              }}
            >
              {courseStreams[key].title}
            </button>
          ))}
        </div>

        {/* Selected Stream Details */}
        <div className="stream-detail-header">
          <h2>{courseStreams[activeTab].title} Courses</h2>
          <p>{courseStreams[activeTab].description}</p>
        </div>

        {/* Courses list */}
        <div className="courses-list-grid">
          {courseStreams[activeTab].courses.map((course) => {
            const isCourseOpen = expandedCourse === course.id;
            return (
              <div 
                key={course.id} 
                className={`course-detail-card glass-panel ${isCourseOpen ? 'expanded' : ''}`}
              >
                <div className="course-card-header-row" onClick={() => setExpandedCourse(isCourseOpen ? null : course.id)}>
                  <div className="course-card-meta">
                    <h3>{course.title}</h3>
                    <div className="card-badge-row">
                      <span className="card-badge duration">⏱ {course.duration}</span>
                      <span className="card-badge mode">💻 {course.mode}</span>
                    </div>
                  </div>
                  <button className="expand-card-indicator">
                    {isCourseOpen ? 'Hide Syllabus ↑' : 'Explore Course & Syllabus ↗'}
                  </button>
                </div>

                {/* Expanded Details section */}
                {isCourseOpen && (
                  <div className="course-card-expanded-content animate-fadeIn">
                    <hr className="content-separator" />
                    
                    <div className="course-specifications-grid">
                      <div className="spec-item">
                        <h4>📜 Certification</h4>
                        <p>{course.cert}</p>
                      </div>
                      <div className="spec-item">
                        <h4>🔑 Prerequisites</h4>
                        <p>{course.prereq}</p>
                      </div>
                      <div className="spec-item outcomes-spec">
                        <h4>💼 Career Pathways</h4>
                        <div className="outcomes-badges">
                          {course.outcomes.map((job, idx) => (
                            <span key={idx} className="outcome-badge">{job}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="course-tools-section">
                      <h4>🛠 Technologies & Tools Covered</h4>
                      <div className="tools-badges-list">
                        {course.tools.map((tool, idx) => (
                          <span key={idx} className="tool-badge-item">{tool}</span>
                        ))}
                      </div>
                    </div>

                    {/* Syllabus Accordion */}
                    <div className="course-syllabus-section">
                      <h4>📖 Detailed Training Syllabus</h4>
                      <div className="syllabus-accordion">
                        {course.syllabus.map((mod, modIdx) => {
                          const isModuleExpanded = expandedSyllabusModule[modIdx] || false;
                          return (
                            <div key={modIdx} className="syllabus-module-item">
                              <button 
                                className="syllabus-module-trigger"
                                onClick={() => toggleSyllabusModule(modIdx)}
                              >
                                <span>{mod.title}</span>
                                <span>{isModuleExpanded ? '−' : '+'}</span>
                              </button>
                              
                              {isModuleExpanded && (
                                <div className="syllabus-module-body animate-fadeIn">
                                  <ul className="syllabus-topics-list">
                                    {mod.topics.map((topic, topicIdx) => (
                                      <li key={topicIdx}>{topic}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="course-expanded-actions">
                      <button 
                        className="btn-apply-course"
                        onClick={() => handleEnquireNow(course.title)}
                      >
                        Enquire for this Course 💬
                      </button>
                      <button 
                        className="btn-syllabus-download"
                        onClick={() => {
                          alert(`Mock PDF download initiated: Skill_Horizon_${course.title.replace(/\s+/g, '_')}_Syllabus.pdf`);
                        }}
                      >
                        Download Syllabus PDF 📥
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Curriculum Quality Banner */}
      <section className="curriculum-features-strip">
        <div className="section-container grid-cards" style={{ border: 'none' }}>
          <div className="feature-item-card glass-panel" style={{ padding: '24px' }}>
            <span className="feature-icon">🛡️</span>
            <h4>100% Industry Aligned</h4>
            <p>Syllabus designed under expert guidance to match actual recruitment demands in software houses.</p>
          </div>
          <div className="feature-item-card glass-panel" style={{ padding: '24px' }}>
            <span className="feature-icon">📁</span>
            <h4>5+ Live Projects</h4>
            <p>Not just theories—each training track includes coding and deployment of full-featured final year projects.</p>
          </div>
          <div className="feature-item-card glass-panel" style={{ padding: '24px' }}>
            <span className="feature-icon">📢</span>
            <h4>Placement Preparation</h4>
            <p>Includes weekly mock technical exams, aptitude crash courses, and resume building workshops.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
