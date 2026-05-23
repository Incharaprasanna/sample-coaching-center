import Hero from '../../../../components/Hero';
import SchemaMarkup from '../../../../components/SchemaMarkup';

export async function generateMetadata({ params }) {
  const paramsResolved = await params;
  const districtStr = paramsResolved.district || '';
  const districtName = districtStr.charAt(0).toUpperCase() + districtStr.slice(1).replace('-', ' ');

  return {
    title: `Skill Horizon Academy ${districtName} | Student Training & Internships`,
    description: `Join Skill Horizon Academy in ${districtName}. We offer academic projects, paid internships, upskilling courses, and technology workshops for college students in ${districtName}, AP.`,
    keywords: `student training ${districtName}, internship ${districtName}, project guidance ${districtName}, coaching students ${districtName}`,
  };
}

export default async function DistrictPage({ params }) {
  const paramsResolved = await params;
  const districtStr = paramsResolved.district || '';
  const districtName = districtStr.charAt(0).toUpperCase() + districtStr.slice(1).replace('-', ' ');

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Skill Horizon Technologies Academy - ${districtName}`,
    "areaServed": districtName,
    "parentOrganization": {
      "@type": "EducationalOrganization",
      "name": "Skill Horizon Technologies Academy"
    }
  };

  return (
    <>
      <SchemaMarkup schemaData={schemaData} />
      
      <Hero 
        headline={`Student Training & Internships in ${districtName}`}
        subheadline={`Skill Horizon Technologies Academy brings industry-aligned academic projects, structured internships, and hands-on workshops directly to students in ${districtName}.`}
        primaryCta="View Programmes"
        primaryLink="/"
      />

      <section className="section-container">
        <h2 className="section-title">Programmes Available in {districtName}</h2>
        <p className="section-subtitle">
          Whether you are looking for local offline batches or live-online mentoring, our dedicated mentors for {districtName} are here to help.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="btn btn-secondary">Academic Projects</span>
          <span className="btn btn-secondary">Internships</span>
          <span className="btn btn-secondary">Workshops</span>
          <span className="btn btn-secondary">Upskilling</span>
          <span className="btn btn-secondary">Summer Coaching</span>
        </div>
      </section>
    </>
  );
}
