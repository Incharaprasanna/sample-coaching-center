import Hero from '../../../components/Hero';
import FAQAccordion from '../../../components/FAQAccordion';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata = {
  title: "Academic Project Guidance for Engineering Students | Skill Horizon Academy AP",
  description: "Struggling with your final year project? Skill Horizon Academy provides expert BTech/BE/MCA project guidance across Andhra Pradesh — domain selection, coding, documentation & viva prep. 500+ projects delivered.",
  keywords: "final year project Andhra Pradesh, BTech project guidance Vijayawada, academic projects help AP, BE project support Visakhapatnam, MCA project guidance Guntur",
};

export default function AcademicProjects() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Academic Project Guidance",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Skill Horizon Technologies Academy"
    },
    "areaServed": "Andhra Pradesh",
    "description": "Expert BTech/BE/MCA project guidance across Andhra Pradesh — domain selection, coding, documentation & viva prep."
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to complete a final year project with your guidance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With Skill Horizon Academy's structured mentorship, a complete final-year project — including requirement analysis, design, development, testing, and documentation — is delivered within 20 to 45 days depending on complexity."
        }
      },
      {
        "@type": "Question",
        "name": "What domains does Skill Horizon Academy cover for BTech projects in Andhra Pradesh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major BTech project domains including Artificial Intelligence & ML, IoT, Web Development, Cybersecurity, Data Science, Cloud Computing, Blockchain, and Embedded Systems — all aligned with the syllabi of JNTUK, JNTUA, and Andhra University."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "How long does it take to complete a final year project with your guidance?",
      answer: "With Skill Horizon Academy's structured mentorship, a complete final-year project — including requirement analysis, design, development, testing, and documentation — is delivered within 20 to 45 days depending on complexity."
    },
    {
      question: "What domains does Skill Horizon Academy cover for BTech projects in Andhra Pradesh?",
      answer: "We cover all major BTech project domains including Artificial Intelligence & ML, IoT, Web Development, Cybersecurity, Data Science, Cloud Computing, Blockchain, and Embedded Systems — all aligned with the syllabi of JNTUK, JNTUA, and Andhra University."
    }
  ];

  return (
    <>
      <SchemaMarkup schemaData={schemaData} />
      <SchemaMarkup schemaData={faqSchemaData} />
      
      <Hero 
        headline="Final Year & Academic Project Guidance Across Andhra Pradesh"
        subheadline="Whether you are a BTech, BE, MCA, or BSc student in Vijayawada, Visakhapatnam, Guntur, Tirupati, Kakinada, or any other AP district, Skill Horizon Academy's project mentors guide you from domain selection through to final submission — ensuring you understand every line of your project and ace your viva."
        primaryCta="Get Project Help Now"
        primaryLink="#contact"
      />

      <section className="section-container glass-panel" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>Frequently Asked Questions</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </>
  );
}
