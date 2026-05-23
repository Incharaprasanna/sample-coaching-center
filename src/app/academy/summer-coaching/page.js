import Hero from '../../../components/Hero';
import FAQAccordion from '../../../components/FAQAccordion';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata = {
  title: "Summer Coaching for College Students Andhra Pradesh 2026 | Skill Horizon Academy",
  description: "Make your summer count. Skill Horizon Academy's Summer 2026 coaching programme for AP students covers internship projects, technical skills & placement prep. Limited seats — register today.",
  keywords: "summer coaching Andhra Pradesh, summer internship students AP 2026, summer tech camp AP, summer coding bootcamp Vijayawada, holiday coaching AP college students",
};

export default function SummerCoaching() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Summer 2026 Student Coaching & Bootcamp",
    "startDate": "2026-04-10",
    "endDate": "2026-06-20",
    "location": {
      "@type": "Place",
      "name": "Skill Horizon Technologies Academy",
      "address": "Andhra Pradesh"
    }
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best summer programme for engineering students in Andhra Pradesh in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Skill Horizon Technologies Academy's Summer 2026 programme is one of the most comprehensive options for AP engineering students, combining live technical coaching, real project development, internship experience, and placement preparation — all within a single 10-week structured bootcamp available online and at AP campuses."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "What is the best summer programme for engineering students in Andhra Pradesh in 2026?",
      answer: "Skill Horizon Technologies Academy's Summer 2026 programme is one of the most comprehensive options for AP engineering students, combining live technical coaching, real project development, internship experience, and placement preparation — all within a single 10-week structured bootcamp available online and at AP campuses."
    }
  ];

  return (
    <>
      <SchemaMarkup schemaData={schemaData} />
      <SchemaMarkup schemaData={faqSchemaData} />
      
      <Hero 
        headline="Summer 2026 Student Coaching & Bootcamp — Across Andhra Pradesh"
        subheadline="Make your summer count. Skill Horizon Academy's Summer 2026 coaching programme for AP students covers internship projects, technical skills & placement prep."
        primaryCta="Register Now"
        primaryLink="#register"
      />

      <section className="section-container">
        <h2 className="section-title">Summer Programme Details</h2>
        <ul style={{ listStylePosition: 'inside', lineHeight: '2', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          <li><strong>Duration:</strong> April 10 — June 20, 2026 (10 Weeks)</li>
          <li><strong>Tracks:</strong> Beginner | Intermediate | Advanced</li>
          <li><strong>Daily schedule:</strong> 3-hour live sessions (morning / evening batches)</li>
          <li>Weekend project workshops with industry mentors</li>
          <li>Concludes with a project showcase & certificate ceremony</li>
          <li>Early-bird discount available until March 31, 2026</li>
        </ul>
      </section>

      <section className="section-container glass-panel" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>Frequently Asked Questions</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </>
  );
}
