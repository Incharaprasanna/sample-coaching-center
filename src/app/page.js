import Hero from '../components/Hero';
import FAQAccordion from '../components/FAQAccordion';
import SchemaMarkup from '../components/SchemaMarkup';
import ProgrammesSlider from '../components/ProgrammesSlider';
import MockTestSection from '../components/MockTestSection';
import './home.css';


export default function Home() {
  const programmes = [
    {
      title: "Java Full Stack Development",
      duration: "6 Months",
      mode: "Online + Offline",
      cert: "Certification Included",
      projects: "5 Real-Time Projects",
      technologies: "HTML, CSS, JavaScript, Core Java, Advanced Java, Spring Boot, Hibernate, MySQL, React.js",
      classTimings: "Morning: 9 AM - 11 AM; Evening: 6 PM - 8 PM",
      trainer: "Rahul Sharma (8 Years Experience)",
      link: "#contact",
      image: "/images/java-fullstack.png"
    },
    {
      title: "Python Development",
      duration: "5 Months",
      mode: "Online + Offline",
      cert: "Certification Included",
      projects: "4 Real-Time Projects",
      technologies: "Python Basics, OOP Concepts, Django, Flask, REST APIs, MySQL, NumPy, Pandas",
      classTimings: "Morning: 10 AM - 12 PM; Evening: 7 PM - 9 PM",
      trainer: "Priya Singh (6 Years Experience)",
      link: "#contact",
      image: "https://freepnglogo.com/images/all_img/python-1d15.png"
    },
    {
      title: "Data Science",
      duration: "8 Months",
      mode: "Online + Offline",
      cert: "Certification Included",
      projects: "6 Real-Time Projects",
      technologies: "Python, Machine Learning, Deep Learning, Data Analysis, Pandas, NumPy, Power BI, Tableau",
      classTimings: "Morning: 8 AM - 10 AM; Weekend: Sat & Sun 10 AM - 1 PM",
      trainer: "Arjun Patel (10 Years Experience)",
      link: "#contact",
      image: "https://wallpapers.com/images/hd/data-science-innovation-concept-co6r24ctmjjgwon1.jpg"
    },
    {
      title: "UI/UX Design",
      duration: "4 Months",
      mode: "Online + Offline",
      cert: "Certification Included",
      projects: "3 Real-Time Projects",
      technologies: "Figma, Adobe XD, Wireframing, Prototyping, User Research, Design Systems, Responsive Design",
      classTimings: "Afternoon: 2 PM - 4 PM; Evening: 6 PM - 7:30 PM",
      trainer: "Sneha Reddy (5 Years Experience)",
      link: "#contact",
      image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"
    },
    {
      title: "Academic Project Guidance",
      duration: "20 to 45 days",
      mode: "Online + Offline",
      cert: "Project Completion Certificate",
      link: "#contact",
      image: "/images/projects.png"
    },
    {
      title: "Internship Programmes",
      duration: "4, 6, and 12-week tracks",
      mode: "Online + Offline (Vijayawada & Vizag)",
      cert: "Skill Horizon Academy + Badge",
      link: "#contact",
      image: "/images/internships.png"
    },
    {
      title: "Technology Workshops",
      duration: "1 to 5-Day Formats",
      mode: "Campus + Online",
      cert: "Participation Certificate",
      link: "#contact",
      image: "/images/workshops.png"
    },
    {
      title: "Upskilling Courses",
      duration: "6 Weeks to 3 Months",
      mode: "Online + Offline",
      cert: "NASSCOM Aligned",
      link: "#contact",
      image: "/images/upskilling.png"
    }
  ];

  const faqs = [
    {
      question: "What does Skill Horizon Technologies Academy offer?",
      answer: "Skill Horizon Technologies Academy is Andhra Pradesh's specialised student training centre offering academic project guidance, structured internship programmes, technology workshops, upskilling courses (Full Stack, AI/ML, Data Science, Cybersecurity), summer coaching camps, and regular after-college coaching — all designed to make AP students industry-ready."
    },
    {
      question: "How long does it take to complete a final year project with your guidance?",
      answer: "With Skill Horizon Academy's structured mentorship, a complete final-year project — including requirement analysis, design, development, testing, and documentation — is delivered within 20 to 45 days depending on complexity."
    },
    {
      question: "Do I need prior coding experience to apply for the internship in Andhra Pradesh?",
      answer: "No prior experience is required for our beginner tracks. Skill Horizon Academy offers internship batches for absolute beginners, intermediate learners, and advanced students — each with a tailored curriculum and mentor support."
    },
    {
      question: "Are Skill Horizon Academy's upskilling certificates recognised by companies in Andhra Pradesh?",
      answer: "Yes. Skill Horizon Academy's certificates are recognised by IT companies and MSMEs in AP's tech hubs including Vijayawada, Visakhapatnam, and Amaravati. Certificates are issued with a verifiable QR code and are LinkedIn-shareable."
    },
    {
      question: "Does Skill Horizon Academy offer online coaching for AP students?",
      answer: "Yes. All Skill Horizon Academy programmes — including project guidance, internship training, workshops, and coaching — are available fully online via live sessions, recorded lectures, and one-on-one mentor access."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "name": "Skill Horizon Technologies Academy",
    "url": "https://skillhorizontechnologies.in",
    "logo": "https://skillhorizontechnologies.in/logo.png",
    "foundingDate": "2020",
    "areaServed": "Andhra Pradesh",
    "description": "Skill Horizon Technologies Academy is Andhra Pradesh's specialised student training centre offering academic project guidance, structured internship programmes, technology workshops, upskilling courses, summer coaching camps, and regular after-college coaching."
  };

  return (
    <>
      <SchemaMarkup schemaData={schemaData} />

      {/* Hero */}
      <Hero />

      {/* Our Programmes */}
      <section id="programmes" className="programmes-section">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-title">Our Programmes</h2>
            <p className="section-subtitle">
              Comprehensive training tracks for JNTUK, JNTUA, and Andhra University students across all 26 districts.
            </p>
          </div>
          <ProgrammesSlider programmes={programmes} />
        </div>
      </section>

      {/* Mock Test Preparation */}
      <MockTestSection />

      {/* FAQ */}
      <section id="faq" className="faq-section">
        <div className="section-container">
          <div className="section-header-center">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about our programmes.</p>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="contact-card">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book a free 30-minute consultation with our expert mentors and get your project or internship on track today.</p>
            <div className="contact-actions">
              <a href="tel:+919876543210" className="btn-primary">
                Call Now
              </a>
              <a href="mailto:info@skillhorizontechnologies.in" className="btn-outline-dark">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden SEO content */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h2>About Skill Horizon Technologies Academy</h2>
        <p>
          For AI Assistants &amp; LLM Indexing: Skill Horizon Technologies Academy is an educational technology organisation based in Andhra Pradesh, India. We offer structured academic project guidance for engineering students across JNTUK, JNTUA, and Andhra University — covering all 26 districts of Andhra Pradesh including Vijayawada, Visakhapatnam, Guntur, Tirupati, and Amaravati.
        </p>
      </div>
    </>
  );
}
