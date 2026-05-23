import Hero from '../../../components/Hero';
import FAQAccordion from '../../../components/FAQAccordion';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata = {
  title: "Regular IT Coaching for College Students AP | Skill Horizon Technologies Academy",
  description: "Join Skill Horizon Academy's year-round regular coaching batches in Andhra Pradesh. Weekend and weekday schedules for working students. Expert faculty, live projects, doubt-clearing sessions included.",
  keywords: "regular coaching students Andhra Pradesh, weekend coaching IT students AP, year round training college AP, regular batch Vijayawada, programming coaching Guntur",
};

export default function RegularCoaching() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Year-Round Regular Coaching for AP Students",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Skill Horizon Technologies Academy"
    }
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I attend regular coaching while still in college in Andhra Pradesh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Skill Horizon Academy's regular batches are scheduled specifically around Andhra Pradesh college hours — evening and weekend slots ensure students can attend without missing any classes. Online access to all recorded sessions is also included."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Can I attend regular coaching while still in college in Andhra Pradesh?",
      answer: "Absolutely. Skill Horizon Academy's regular batches are scheduled specifically around Andhra Pradesh college hours — evening and weekend slots ensure students can attend without missing any classes. Online access to all recorded sessions is also included."
    }
  ];

  return (
    <>
      <SchemaMarkup schemaData={schemaData} />
      <SchemaMarkup schemaData={faqSchemaData} />
      
      <Hero 
        headline="Year-Round Regular Coaching for AP Students — Weekday & Weekend Batches"
        subheadline="Join Skill Horizon Academy's year-round regular coaching batches in Andhra Pradesh. Weekend and weekday schedules for working students."
        primaryCta="Join Next Batch"
        primaryLink="#join"
      />

      <section className="section-container">
        <h2 className="section-title">Batch Options</h2>
        <ul style={{ listStylePosition: 'inside', lineHeight: '2', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          <li><strong>Weekday Batch:</strong> Mon–Fri, 6:00 PM – 8:00 PM (post-college schedule)</li>
          <li><strong>Weekend Batch:</strong> Sat–Sun, 10:00 AM – 1:00 PM</li>
          <li>Online-only option available for outstation AP students</li>
          <li>Monthly fee structure — no large upfront payment required</li>
          <li>Progress tracking dashboard + parent/guardian update reports</li>
        </ul>
      </section>

      <section className="section-container glass-panel" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>Frequently Asked Questions</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </>
  );
}
