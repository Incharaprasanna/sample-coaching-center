import Hero from '../../../components/Hero';
import FAQAccordion from '../../../components/FAQAccordion';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata = {
  title: "Student Internship Programme Andhra Pradesh | Skill Horizon Technologies Academy",
  description: "Gain real-world industry experience with Skill Horizon Academy's internship programmes in Andhra Pradesh. Earn a recognised certificate, build your portfolio, and kickstart your career. Apply for Summer 2026 batch.",
  keywords: "internship Andhra Pradesh, student internship Vijayawada, summer internship 2026 AP, paid internship college students, internship certificate Visakhapatnam",
};

export default function Internships() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "Industry Internship Programmes for AP College Students",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Skill Horizon Technologies Academy",
      "sameAs": "https://skillhorizontechnologies.in"
    },
    "timeToComplete": "P12W"
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need prior coding experience to apply for the internship in Andhra Pradesh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No prior experience is required for our beginner tracks. Skill Horizon Academy offers internship batches for absolute beginners, intermediate learners, and advanced students — each with a tailored curriculum and mentor support."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Do I need prior coding experience to apply for the internship in Andhra Pradesh?",
      answer: "No prior experience is required for our beginner tracks. Skill Horizon Academy offers internship batches for absolute beginners, intermediate learners, and advanced students — each with a tailored curriculum and mentor support."
    }
  ];

  return (
    <>
      <SchemaMarkup schemaData={schemaData} />
      <SchemaMarkup schemaData={faqSchemaData} />
      
      <Hero 
        headline="Industry Internship Programmes for AP College Students — Summer & Year-Round Batches"
        subheadline="Gain real-world industry experience with Skill Horizon Academy's internship programmes in Andhra Pradesh. Earn a recognised certificate, build your portfolio, and kickstart your career."
        primaryCta="Apply for Summer 2026"
        primaryLink="#apply"
      />

      <section className="section-container">
        <h2 className="section-title">Programme Highlights</h2>
        <ul style={{ listStylePosition: 'inside', lineHeight: '2', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          <li><strong>Duration:</strong> 4-week, 6-week, and 12-week tracks</li>
          <li><strong>Domains:</strong> Full Stack Web Dev, AI/ML, Data Analytics, Cybersecurity, UI/UX Design</li>
          <li><strong>Mode:</strong> Online + In-Person centres in Vijayawada & Visakhapatnam</li>
          <li><strong>Certificate:</strong> Skill Horizon Academy Certificate + LinkedIn-shareable digital badge</li>
          <li><strong>Eligibility:</strong> 1st to 4th year students of any AP engineering or science college</li>
        </ul>
      </section>

      <section className="section-container glass-panel" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>Frequently Asked Questions</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </>
  );
}
