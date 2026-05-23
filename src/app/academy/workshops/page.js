import Hero from '../../../components/Hero';
import FAQAccordion from '../../../components/FAQAccordion';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata = {
  title: "Technology Workshops for Students in Andhra Pradesh | Skill Horizon Academy",
  description: "Join Skill Horizon Academy's hands-on technology workshops across AP — Python, AI, Web Dev, Cloud & more. 1-day and weekend formats available for college students in Vijayawada, Vizag, Guntur and 20+ AP cities.",
  keywords: "technology workshops Andhra Pradesh, Python workshop students AP, AI workshop Vijayawada, weekend workshop college students, technical workshop Visakhapatnam 2026",
};

export default function Workshops() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Hands-On Technology Workshops for AP College Students",
    "startDate": "2026-05-01",
    "location": {
      "@type": "Place",
      "name": "Skill Horizon Technologies Academy",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Andhra Pradesh",
        "addressCountry": "IN"
      }
    }
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where are Skill Horizon Academy's workshops conducted in Andhra Pradesh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Skill Horizon Academy conducts workshops at campus locations across AP including Vijayawada, Visakhapatnam, Guntur, Tirupati, Kakinada, Rajahmundry, Nellore, Ongole, and Kurnool — as well as live-online sessions accessible to students across all 26 AP districts."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Where are Skill Horizon Academy's workshops conducted in Andhra Pradesh?",
      answer: "Skill Horizon Academy conducts workshops at campus locations across AP including Vijayawada, Visakhapatnam, Guntur, Tirupati, Kakinada, Rajahmundry, Nellore, Ongole, and Kurnool — as well as live-online sessions accessible to students across all 26 AP districts."
    }
  ];

  return (
    <>
      <SchemaMarkup schemaData={schemaData} />
      <SchemaMarkup schemaData={faqSchemaData} />
      
      <Hero 
        headline="Hands-On Technology Workshops for AP College Students — 1-Day to 5-Day Formats"
        subheadline="Join Skill Horizon Academy's hands-on technology workshops across AP — Python, AI, Web Dev, Cloud & more."
        primaryCta="View Workshop Schedule"
        primaryLink="#schedule"
      />

      <section className="section-container">
        <h2 className="section-title">Workshop Portfolio</h2>
        <ul style={{ listStylePosition: 'inside', lineHeight: '2', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          <li>Python for Beginners (1-Day Bootcamp)</li>
          <li>Generative AI & Prompt Engineering (2-Day)</li>
          <li>Full Stack Web Development Sprint (5-Day)</li>
          <li>Data Science with Python & Power BI (3-Day)</li>
          <li>Cloud Computing Fundamentals — AWS / Azure (2-Day)</li>
          <li>UI/UX Design Fundamentals with Figma (2-Day)</li>
          <li>Cybersecurity Essentials (1-Day Awareness Workshop)</li>
        </ul>
      </section>

      <section className="section-container glass-panel" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>Frequently Asked Questions</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </>
  );
}
