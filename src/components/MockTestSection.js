'use client';

import { useState } from 'react';
import './MockTestSection.css';

const testCategories = [
  {
    icon: '🧮',
    title: 'Aptitude & Reasoning',
    topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'],
    color: '#6366F1',
    links: [
      { type: 'website', name: 'IndiaBix', url: 'https://www.indiabix.com/' },
      { type: 'website', name: 'Freshersworld Aptitude', url: 'https://www.freshersworld.com/aptitude-test-questions-and-answers' },
      { type: 'website', name: 'GeeksforGeeks Aptitude', url: 'https://www.geeksforgeeks.org/aptitude-questions-and-answers/' },
      { type: 'youtube', name: 'Feel Free To Learn', url: 'https://www.youtube.com/c/FeelFreetoLearn' },
      { type: 'youtube', name: 'TalentSprint', url: 'https://www.youtube.com/user/talentsprint' }
    ]
  },
  {
    icon: '💻',
    title: 'Technical MCQs',
    topics: ['Core Java / Python / C++', 'Data Structures & Algorithms', 'DBMS & SQL', 'OS & Networking'],
    color: '#8B5CF6',
    links: [
      { type: 'website', name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/' },
      { type: 'website', name: 'HackerRank', url: 'https://www.hackerrank.com/' },
      { type: 'website', name: 'LeetCode', url: 'https://leetcode.com/' },
      { type: 'website', name: 'TutorialsPoint', url: 'https://www.tutorialspoint.com/' },
      { type: 'website', name: 'IntQues', url: 'https://www.intques.com/' },
      { type: 'youtube', name: 'CodeWithHarry', url: 'https://www.youtube.com/c/CodeWithHarry' },
      { type: 'youtube', name: 'Apna College', url: 'https://www.youtube.com/c/ApnaCollegeOfficial' },
      { type: 'youtube', name: 'Telusko', url: 'https://www.youtube.com/c/Telusko' },
      { type: 'youtube', name: 'Programming with Mosh', url: 'https://www.youtube.com/c/programmingwithmosh' }
    ]
  },
  {
    icon: '🧑‍💼',
    title: 'HR & Soft Skills',
    topics: ['Group Discussion Topics', 'Common HR Questions', 'Communication Skills', 'Resume Building'],
    color: '#EC4899',
    links: [
      { type: 'website', name: 'InterviewBit HR Questions', url: 'https://www.interviewbit.com/hr-interview-questions/' },
      { type: 'website', name: 'The Muse', url: 'https://www.themuse.com/advice/interview-questions-and-answers' },
      { type: 'website', name: 'Resume.io', url: 'https://resume.io/' },
      { type: 'website', name: 'Career Quest', url: 'https://careerquest.com/' },
      { type: 'youtube', name: 'Self Made Millennial', url: 'https://www.youtube.com/c/SelfMadeMillennial' },
      { type: 'youtube', name: 'Skillopedia', url: 'https://www.youtube.com/c/Skillopedia' }
    ]
  },
  {
    icon: '📄',
    title: 'Previous Year Papers',
    topics: ['TCS NQT', 'Infosys InfyTQ', 'Wipro NLTH', 'Cognizant GenC'],
    color: '#10B981',
    links: [
      { type: 'website', name: 'PrepInsta', url: 'https://prepinsta.com/' },
      { type: 'website', name: 'FacePrep', url: 'https://www.faceprep.in/' },
      { type: 'website', name: 'QuestPond', url: 'https://www.questpond.com/' },
      { type: 'youtube', name: 'PrepInsta YouTube', url: 'https://www.youtube.com/c/PrepInsta' },
      { type: 'youtube', name: 'FacePrep YouTube', url: 'https://www.youtube.com/c/FACEPrep' }
    ]
  },
];

const features = [
  { icon: '⏱️', label: 'Timed Mock Tests' },
  { icon: '📊', label: 'Instant Score Reports' },
  { icon: '🔁', label: 'Unlimited Attempts' },
  { icon: '📱', label: 'Mobile Friendly' },
  { icon: '🧑‍🏫', label: 'Expert Analysis' },
  { icon: '🎯', label: 'Company-wise Tests' },
];

const pythonInterviewCategories = [
  {
    category: '🐍 Python Basics',
    color: '#3B82F6',
    questions: [
      'What is Python?',
      'What are the features of Python?',
      'Why is Python called interpreted language?',
      'What are Python applications?',
      'Difference between compiler and interpreter?',
      'Difference between Python 2 and Python 3?',
      'What is PEP 8?',
    ],
  },
  {
    category: '📦 Variables & Data Types',
    color: '#F59E0B',
    questions: [
      'What are variables in Python?',
      'What are data types in Python?',
      'Difference between list and tuple?',
      'Difference between list and set?',
      'Difference between tuple and dictionary?',
      'What is mutable and immutable?',
      'What is type casting?',
    ],
  },
  {
    category: '🔧 Control Flow & Operators',
    color: '#10B981',
    questions: [
      'What are Python operators?',
      'What is indentation in Python?',
      'What are keywords in Python?',
      'What is input() function?',
      'Difference between break and continue?',
      'What is pass statement?',
      'What is slicing in Python?',
      'What is list comprehension?',
      'What is dictionary comprehension?',
    ],
  },
  {
    category: '⚙️ Functions',
    color: '#8B5CF6',
    questions: [
      'What are functions in Python?',
      'Difference between parameter and argument?',
      'What is recursion?',
      'What is lambda function?',
      'What is map() function?',
      'What is filter() function?',
      'What is reduce() function?',
      'What is *args and **kwargs?',
      'What is decorators in Python?',
    ],
  },
  {
    category: '📁 Modules & Packages',
    color: '#6366F1',
    questions: [
      'What are modules in Python?',
      'What are packages in Python?',
      'Difference between local and global variable?',
      'What is virtual environment?',
      'What is pip in Python?',
      'What is __name__ == "__main__"?',
    ],
  },
  {
    category: '🧱 OOP in Python',
    color: '#EC4899',
    questions: [
      'What is object-oriented programming in Python?',
      'What is a class?',
      'What is an object?',
      'What is constructor in Python?',
      'What is inheritance?',
      'What is polymorphism?',
      'What is encapsulation?',
      'What is abstraction?',
      'Difference between method overloading and overriding?',
      'What is super() function?',
      'What is self keyword?',
      'What is __init__ method?',
    ],
  },
  {
    category: '⚠️ Exception Handling',
    color: '#EF4444',
    questions: [
      'What is exception handling?',
      'What is try-except block?',
      'What is finally block?',
      'What is raise keyword?',
      'Difference between syntax error and exception?',
    ],
  },
  {
    category: '📂 File Handling & Advanced',
    color: '#0EA5E9',
    questions: [
      'What is file handling?',
      'Modes in file handling?',
      'Difference between read(), readline(), and readlines()?',
      'What is multithreading in Python?',
      'What is multiprocessing?',
      'Difference between deep copy and shallow copy?',
      'What is iterator?',
      'What is generator?',
      'Difference between iterator and generator?',
    ],
  },
  {
    category: '📚 Python Libraries',
    color: '#F59E0B',
    questions: [
      'What are Python libraries?',
      'What is NumPy?',
      'What is Pandas?',
      'What is Matplotlib?',
      'What is SQLAlchemy?',
    ],
  },
  {
    category: '🌐 Web & APIs',
    color: '#10B981',
    questions: [
      'What is Django?',
      'What is Flask?',
      'Difference between Django and Flask?',
      'What is API?',
      'What is REST API?',
      'What is JSON?',
    ],
  },
  {
    category: '🤖 ML & Data Science',
    color: '#6366F1',
    questions: [
      'What is machine learning?',
      'What is TensorFlow?',
      'What is PyTorch?',
      'What is data science?',
      'Explain your Python project.',
    ],
  },
];

const dataScienceInterviewCategories = [
  {
    category: '📊 Data Science Fundamentals',
    color: '#6366F1',
    questions: [
      'What is Data Science?',
      'Difference between Data Science and Data Analytics?',
      'What is exploratory data analysis (EDA)?',
      'What is data visualization?',
      'What is Data Cleaning?',
      'What is Data Preprocessing?',
      'What is feature engineering?',
      'What is feature selection?',
    ],
  },
  {
    category: '🤖 Machine Learning Basics',
    color: '#8B5CF6',
    questions: [
      'What is Machine Learning?',
      'Types of Machine Learning?',
      'What is Supervised Learning?',
      'What is Unsupervised Learning?',
      'What is Reinforcement Learning?',
      'What is Artificial Intelligence?',
      'What is Deep Learning?',
    ],
  },
  {
    category: '📈 Regression & Classification',
    color: '#10B981',
    questions: [
      'What is regression?',
      'What is classification?',
      'Difference between regression and classification?',
      'What is linear regression?',
      'What is logistic regression?',
      'What is decision tree?',
      'What is random forest?',
    ],
  },
  {
    category: '🔬 Algorithms & Clustering',
    color: '#F59E0B',
    questions: [
      'What is clustering?',
      'What is K-Means algorithm?',
      'What is Naive Bayes algorithm?',
      'What is Support Vector Machine (SVM)?',
      'What is neural network?',
    ],
  },
  {
    category: '🎯 Model Evaluation',
    color: '#EF4444',
    questions: [
      'What is confusion matrix?',
      'What is accuracy in machine learning?',
      'What is precision and recall?',
      'What is F1-score?',
      'What is overfitting?',
      'What is underfitting?',
      'What is bias and variance?',
      'Difference between training data and test data?',
      'What is cross-validation?',
    ],
  },
  {
    category: '🧹 Data Preparation',
    color: '#3B82F6',
    questions: [
      'What is normalization?',
      'What is standardization?',
      'What is outlier?',
      'What is missing data?',
      'How do you handle missing values?',
    ],
  },
  {
    category: '📊 Statistics & Probability',
    color: '#EC4899',
    questions: [
      'What is hypothesis testing?',
      'What is correlation?',
      'Difference between covariance and correlation?',
      'What is probability distribution?',
      'What is mean, median, and mode?',
      'What is standard deviation?',
    ],
  },
  {
    category: '🛠️ Tools & Libraries',
    color: '#0EA5E9',
    questions: [
      'What is Pandas?',
      'What is NumPy?',
      'What is Matplotlib?',
      'What is Seaborn?',
      'What is Tableau?',
      'What is Power BI?',
      'What is SQL?',
      'Difference between SQL and NoSQL?',
      'What is TensorFlow?',
    ],
  },
  {
    category: '☁️ Big Data & Projects',
    color: '#10B981',
    questions: [
      'What is big data?',
      'What is Hadoop?',
      'What is Spark?',
      'Explain your Data Science project.',
    ],
  },
];

const uiuxInterviewCategories = [
  {
    category: '🎨 UI/UX Fundamentals',
    color: '#EC4899',
    questions: [
      'What is UI design?',
      'What is UX design?',
      'Difference between UI and UX?',
      'What is user-centered design?',
      'What is interaction design?',
      'What is design thinking?',
      'What is empathy in UX?',
      'What is usability?',
    ],
  },
  {
    category: '🧠 Design Process & Strategy',
    color: '#8B5CF6',
    questions: [
      'What is user research?',
      'What is user persona?',
      'What is user journey?',
      'What is information architecture?',
      'What is onboarding flow?',
      'What is landing page design?',
      'What is dashboard design?',
    ],
  },
  {
    category: '✨ Visual Design Principles',
    color: '#10B981',
    questions: [
      'What is visual hierarchy?',
      'What is typography?',
      'What is color theory?',
      'What is white space in design?',
      'What are design principles?',
      'What is consistency in design?',
      'What is grid system?',
      'What is iconography?',
      'What is responsive typography?',
      'How do you choose colors for a project?',
    ],
  },
  {
    category: '🛠️ Prototyping & Tools',
    color: '#3B82F6',
    questions: [
      'What is wireframe?',
      'What is prototype?',
      'Difference between wireframe and prototype?',
      'What is low-fidelity design?',
      'What is high-fidelity design?',
      'What is clickable prototype?',
      'What is Figma?',
      'What is Adobe XD?',
      'What is Sketch tool?',
      'What are components in Figma?',
      'What is auto layout in Figma?',
    ],
  },
  {
    category: '📱 Responsive & Advanced UI',
    color: '#F59E0B',
    questions: [
      'What is responsive design?',
      'What is mobile-first design?',
      'Difference between adaptive and responsive design?',
      'What is dark mode design?',
      'What is micro interaction?',
      'What is animation in UI?',
      'What is card design?',
      'What is glassmorphism?',
      'What is neumorphism?',
    ],
  },
  {
    category: '📊 Evaluation & Systems',
    color: '#6366F1',
    questions: [
      'What is usability testing?',
      'What is accessibility in UI/UX?',
      'What is heuristic evaluation?',
      'What is design system?',
      'What is style guide?',
      'What is CTA in design?',
      'What is A/B testing?',
      'What are UX metrics?',
      'What are common UX mistakes?',
      'How do you improve user experience?',
    ],
  },
  {
    category: '🧑‍💼 Portfolio & Experience',
    color: '#0EA5E9',
    questions: [
      'What is portfolio in UI/UX?',
      'Explain your UI/UX project.',
      'What challenges did you face in your design?',
      'How do you handle client feedback?',
      'Why do you want to become UI/UX designer?',
    ],
  },
];

const interviewCategories = [
  {
    category: '☕ Java Basics',
    color: '#6366F1',
    questions: [
      'What is Java?',
      'Why is Java platform independent?',
      'What is JVM?',
      'What is JRE?',
      'What is JDK?',
      'Difference between JDK, JRE, and JVM?',
      'What are the features of Java?',
    ],
  },
  {
    category: '🧱 OOP Concepts',
    color: '#8B5CF6',
    questions: [
      'What is OOP?',
      'What are the principles of OOP?',
      'What is encapsulation?',
      'What is inheritance?',
      'What is polymorphism?',
      'What is abstraction?',
      'Difference between class and object?',
    ],
  },
  {
    category: '🔧 Core Java',
    color: '#EC4899',
    questions: [
      'What is a constructor?',
      'Types of constructors in Java?',
      'What is method overloading?',
      'What is method overriding?',
      'Difference between overloading and overriding?',
      'What is static keyword?',
      'What is final keyword?',
      'What is this keyword?',
      'What is super keyword?',
      'What is a package in Java?',
    ],
  },
  {
    category: '🔗 Interfaces & Abstract Classes',
    color: '#F59E0B',
    questions: [
      'What is an interface?',
      'Difference between abstract class and interface?',
      'Can we create object for abstract class?',
      'What is multiple inheritance?',
      'How Java achieves multiple inheritance?',
    ],
  },
  {
    category: '📝 Strings',
    color: '#10B981',
    questions: [
      'What is a String?',
      'Why String is immutable?',
      'Difference between String, StringBuilder, and StringBuffer?',
      'Difference between == and equals()?',
    ],
  },
  {
    category: '⚠️ Exception Handling',
    color: '#EF4444',
    questions: [
      'What is exception handling?',
      'Difference between checked and unchecked exceptions?',
      'What is try-catch block?',
      'What is finally block?',
      'What is throw keyword?',
      'What is throws keyword?',
    ],
  },
  {
    category: '🔀 Multithreading',
    color: '#3B82F6',
    questions: [
      'What is multithreading?',
      'What is a thread?',
      'How to create thread in Java?',
      'Difference between process and thread?',
      'What is synchronization?',
    ],
  },
  {
    category: '📦 Collections Framework',
    color: '#8B5CF6',
    questions: [
      'What is collection framework?',
      'Difference between Array and ArrayList?',
      'Difference between ArrayList and LinkedList?',
      'Difference between List and Set?',
      'What is HashMap?',
      'Difference between HashMap and Hashtable?',
      'What is HashSet?',
      'What is Iterator?',
    ],
  },
  {
    category: '🗄️ JDBC & SQL',
    color: '#6366F1',
    questions: [
      'What is JDBC?',
      'Steps to connect Java with database?',
      'What is SQL?',
      'Difference between DELETE and TRUNCATE?',
      'What is JOIN in SQL?',
      'What is normalization?',
    ],
  },
  {
    category: '🌱 Spring & Hibernate',
    color: '#10B981',
    questions: [
      'What is Spring Framework?',
      'What is Spring Boot?',
      'What is dependency injection?',
      'What is REST API?',
      'What is Hibernate?',
      'Difference between Hibernate and JDBC?',
      'What is Maven?',
      'What is Git?',
      'What is API?',
      'What is microservice architecture?',
    ],
  },
  {
    category: '🧑‍💼 HR & Personal Questions',
    color: '#EC4899',
    questions: [
      'Explain your project.',
      'Tell me about yourself.',
      'Why should we hire you?',
      'What are your strengths and weaknesses?',
      'What is your role in the project?',
      'What challenges did you face in your project?',
      'Why do you want to become Java developer?',
    ],
  },
];

function InterviewAccordion({ categories }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="interview-accordion">
      {categories.map((cat, i) => (
        <div
          key={i}
          className={`interview-group ${openIndex === i ? 'open' : ''}`}
          style={{ '--cat-color': cat.color }}
        >
          <button
            className="interview-group-header"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="interview-group-title">{cat.category}</span>
            <span className="interview-group-meta">{cat.questions.length} Questions</span>
            <span className="interview-group-arrow">{openIndex === i ? '▲' : '▼'}</span>
          </button>
          {openIndex === i && (
            <ul className="interview-questions-list">
              {cat.questions.map((q, j) => (
                <li key={j} className="interview-question-item">
                  <span className="interview-q-num">Q{j + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MockTestSection() {
  const [showInterview, setShowInterview] = useState(false);
  const [activeTab, setActiveTab] = useState('java');
  const [expandedLinks, setExpandedLinks] = useState({});

  const toggleLinks = (index) => {
    setExpandedLinks(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="mock-tests" className="mock-test-section">
      <div className="section-container">

        {/* Header */}
        <div className="section-header-center">
          <span className="mock-badge">🎯 Placement Ready</span>
          <h2 className="section-title">Mock Test Preparation</h2>
          <p className="section-subtitle">
            Practice with real company-pattern tests and get placement-ready. Sharpen your aptitude,
            technical skills, and interview confidence before the big day.
          </p>
        </div>

        {/* Feature pills */}
        <div className="mock-features">
          {features.map((f, i) => (
            <div key={i} className="mock-feature-pill">
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Test category cards */}
        <div className="mock-categories">
          {testCategories.map((cat, i) => (
            <div key={i} className="mock-card" style={{ '--accent': cat.color }}>
              <div className="mock-card-icon">{cat.icon}</div>
              <h3 className="mock-card-title">{cat.title}</h3>
              <ul className="mock-card-topics">
                {cat.topics.map((t, j) => (
                  <li key={j}>
                    <span className="mock-check">✓</span> {t}
                  </li>
                ))}
              </ul>
              {cat.links && (
                <div className="mock-card-links-container">
                  <button 
                    className="btn-toggle-links" 
                    onClick={() => toggleLinks(i)}
                  >
                    {expandedLinks[i] ? 'Hide Resources ▲' : 'View Resources ▼'}
                  </button>
                  {expandedLinks[i] && (
                    <div className="mock-card-links">
                      {cat.links.filter(l => l.type === 'website').length > 0 && (
                        <div className="link-group">
                          <strong className="link-group-title">Website Links</strong>
                          <ul>
                            {cat.links.filter(l => l.type === 'website').map((l, j) => (
                              <li key={`web-${j}`}><a href={l.url} target="_blank" rel="noreferrer">🌐 {l.name}</a></li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {cat.links.filter(l => l.type === 'youtube').length > 0 && (
                        <div className="link-group">
                          <strong className="link-group-title">YouTube Links</strong>
                          <ul>
                            {cat.links.filter(l => l.type === 'youtube').map((l, j) => (
                              <li key={`yt-${j}`}><a href={l.url} target="_blank" rel="noreferrer">📺 {l.name}</a></li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA toggle */}
        <div className="mock-cta">
          <p className="mock-cta-text">
            Our mentors conduct <strong>live mock interviews</strong> and provide personalised feedback
            to every student before placements.
          </p>
          <button
            className="btn-primary mock-cta-toggle-btn"
            onClick={() => setShowInterview(prev => !prev)}
            aria-expanded={showInterview}
          >
            {showInterview ? '✕ Close Questions' : 'Start Preparing Now'}
          </button>
        </div>

        {/* Interview Questions panel — revealed on CTA click */}
        {showInterview && (
          <div className="interview-section">

            {/* Tab switcher */}
            <div className="interview-tabs">
              <button
                className={`interview-tab ${activeTab === 'java' ? 'active' : ''}`}
                onClick={() => setActiveTab('java')}
              >
                ☕ Java  <span className="tab-count">75 Q</span>
              </button>
              <button
                className={`interview-tab ${activeTab === 'python' ? 'active' : ''}`}
                onClick={() => setActiveTab('python')}
              >
                🐍 Python  <span className="tab-count">80 Q</span>
              </button>
              <button
                className={`interview-tab ${activeTab === 'datascience' ? 'active' : ''}`}
                onClick={() => setActiveTab('datascience')}
              >
                📊 Data Science  <span className="tab-count">60 Q</span>
              </button>
              <button
                className={`interview-tab ${activeTab === 'uiux' ? 'active' : ''}`}
                onClick={() => setActiveTab('uiux')}
              >
                🎨 UI/UX Design  <span className="tab-count">60 Q</span>
              </button>
            </div>

            {/* Tab content */}
            {activeTab === 'java' && (
              <>
                <p className="interview-tab-desc">
                  75 most-asked Java questions — from core basics to Spring Boot. Click any category to expand.
                </p>
                <InterviewAccordion key="java" categories={interviewCategories} />
              </>
            )}

            {activeTab === 'python' && (
              <>
                <p className="interview-tab-desc">
                  80 most-asked Python questions — from basics to ML & frameworks. Click any category to expand.
                </p>
                <InterviewAccordion key="python" categories={pythonInterviewCategories} />
              </>
            )}

            {activeTab === 'datascience' && (
              <>
                <p className="interview-tab-desc">
                  60 most-asked Data Science questions — from ML basics to big data tools. Click any category to expand.
                </p>
                <InterviewAccordion key="datascience" categories={dataScienceInterviewCategories} />
              </>
            )}

            {activeTab === 'uiux' && (
              <>
                <p className="interview-tab-desc">
                  60 most-asked UI/UX Design questions — from UX research to Figma components. Click any category to expand.
                </p>
                <InterviewAccordion key="uiux" categories={uiuxInterviewCategories} />
              </>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
