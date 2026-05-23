import Hero from '../../../components/Hero';
import FAQAccordion from '../../../components/FAQAccordion';
import SchemaMarkup from '../../../components/SchemaMarkup';

export const metadata = {
  title: "Upskilling Courses for Engineering Students Andhra Pradesh | Skill Horizon Academy",
  description: "Future-proof your career with Skill Horizon Academy's upskilling certificate programmes in AP — Full Stack, Data Science, AI/ML, DevOps & more. Industry-recognised certificates, live projects, placement support.",
  keywords: "upskilling courses students AP, full stack development course AP, data science training AP, AI ML course Vijayawada, certificate courses engineering students",
};

export default function Upskilling() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Upskilling Certificate Programmes",
    "description": "Industry-Aligned Upskilling Certificate Programmes for Andhra Pradesh Students",
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
        "name": "Are Skill Horizon Academy's upskilling certificates recognised by companies in Andhra Pradesh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Skill Horizon Academy's certificates are recognised by IT companies and MSMEs in AP's tech hubs including Vijayawada, Visakhapatnam, and Amaravati. Certificates are issued with a verifiable QR code and are LinkedIn-shareable, making them credible to recruiters."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Are Skill Horizon Academy's upskilling certificates recognised by companies in Andhra Pradesh?",
      answer: "Yes. Skill Horizon Academy's certificates are recognised by IT companies and MSMEs in AP's tech hubs including Vijayawada, Visakhapatnam, and Amaravati. Certificates are issued with a verifiable QR code and are LinkedIn-shareable, making them credible to recruiters."
    }
  ];

  return (
    <>
      <SchemaMarkup schemaData={schemaData} />
      <SchemaMarkup schemaData={faqSchemaData} />
      
      <Hero 
        headline="Industry-Aligned Upskilling Certificate Programmes for Andhra Pradesh Students"
        subheadline="Future-proof your career with Skill Horizon Academy's upskilling certificate programmes in AP — Full Stack, Data Science, AI/ML, DevOps & more."
        primaryCta="Browse Courses"
        primaryLink="#courses"
      />

      <section className="section-container">
        <h2 className="section-title">Available Courses</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--primary)' }}>
                <th style={{ padding: '12px' }}>Programme</th>
                <th style={{ padding: '12px' }}>Duration</th>
                <th style={{ padding: '12px' }}>Mode</th>
                <th style={{ padding: '12px' }}>Certificate</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '12px' }}>Full Stack Web Development</td>
                <td style={{ padding: '12px' }}>3 Months</td>
                <td style={{ padding: '12px' }}>Online + Offline</td>
                <td style={{ padding: '12px' }}>Skill Horizon + NASSCOM Aligned</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '12px' }}>Data Science & Analytics</td>
                <td style={{ padding: '12px' }}>2 Months</td>
                <td style={{ padding: '12px' }}>Online</td>
                <td style={{ padding: '12px' }}>Skill Horizon Certified</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '12px' }}>Artificial Intelligence & ML</td>
                <td style={{ padding: '12px' }}>3 Months</td>
                <td style={{ padding: '12px' }}>Online + Offline</td>
                <td style={{ padding: '12px' }}>Skill Horizon + Industry Partner</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '12px' }}>DevOps & Cloud Engineering</td>
                <td style={{ padding: '12px' }}>2 Months</td>
                <td style={{ padding: '12px' }}>Online</td>
                <td style={{ padding: '12px' }}>Skill Horizon Certified</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container glass-panel" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', width: '100%' }}>Frequently Asked Questions</h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </>
  );
}
