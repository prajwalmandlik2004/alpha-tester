'use client';

import Link from 'next/link';

export default function EducationalInstitutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Educational Institutions</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 10-11</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">INDX and Universities / Higher Education</h2>

            <p className="text-base leading-7 mb-4">
              Universities and higher education institutions face a structural transformation of evaluation modalities. 
              Widespread access to AI challenges the relevance of many traditional systems based on restitution, individual 
              production, or closed problem solving.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <p className="text-base leading-7">
                In this context, the primary risk is not fraud, but the inability to measure what now constitutes intellectual 
                differentiation: the ability to structure reasoning in interaction with systems capable of producing elaborate, 
                but non-guaranteed, responses.
              </p>
            </div>

            <p className="text-base leading-7 mb-4">
              INDX provides a complementary framework to degrees and curricula for evaluating specific cognitive maturity toward AI. 
              This maturity is distinct from academic level or disciplinary specialization. It refers to the ability to maintain 
              intellectual coherence, manage uncertainty, and exercise critical judgment in an AI-assisted environment.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">For academic institutions, INDX may serve as:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>a transversal positioning tool at end of cycle;</li>
                <li>a reference within programs structurally integrating AI;</li>
                <li>a basis for reflection on evolving criteria of academic excellence.</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                INDX is not intended to replace academic evaluations. It illuminates a dimension they do not cover.
              </p>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">INDX and Certification Bodies</h2>

            <p className="text-base leading-7 mb-4">
              Certification bodies face rapid obsolescence of many competency frameworks. Tools, languages, and practices 
              evolve faster than evaluation frameworks.
            </p>

            <p className="text-base leading-7 mb-4">
              INDX stands out through its independence from taught content and used technologies. It does not certify an 
              operational skill, but a transversal cognitive capacity, applicable across contexts and durable over time.
            </p>

            <div className="border border-gray-300 p-4 mb-4 bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Within certification systems, INDX may be used:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>as a complementary indicator of cognitive maturity;</li>
                <li>as a differentiation tool between advanced levels;</li>
                <li>as a coherence element among heterogeneous certifications.</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7">
                Its conceptual stability allows long-term integration without technological dependency.
              </p>
            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/organizational-applications" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/public-institutions" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}