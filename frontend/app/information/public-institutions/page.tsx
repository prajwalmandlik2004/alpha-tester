'use client';

import Link from 'next/link';

export default function PublicInstitutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Public & Complex Organizations</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 12-14</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">INDX and Public Institutions</h2>

            <p className="text-base leading-7 mb-4">
              Public institutions increasingly integrate AI systems into sensitive domains: decision support, data analysis, 
              policy orientation, complex service management.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <p className="text-base leading-7">
                In these contexts, risks are not only technological. They largely depend on how systems are steered, 
                interpreted, and integrated into human decision processes.
              </p>
            </div>

            <p className="text-base leading-7 mb-4">
              INDX provides an analytical framework to evaluate the cognitive capacities of actors involved in these uses. 
              It helps identify maturity gaps that may have systemic consequences, regardless of tool quality.
            </p>

            <div className="border border-gray-300 p-4 bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-3">For institutions, INDX may constitute:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>an instrument for reading cognitive risks;</li>
                <li>support for structuring responsibilities;</li>
                <li>a basis for reflection on AI governance.</li>
              </ul>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">INDX and Complex Organizations</h2>

            <p className="text-base leading-7 mb-4">
              In large organizations, AI adoption is not merely a tool issue. It concerns coordination among multiple actors 
              with heterogeneous maturity levels interacting with shared systems.
            </p>

            <div className="border border-gray-300 p-4 bg-white mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">INDX enables analysis of these dynamics by highlighting:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>asymmetries in cognitive steering;</li>
                <li>zones of organizational fragility;</li>
                <li>risks of incoherent decisions arising from poor collective interpretation of systems.</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                In this context, INDX becomes an organizational analysis tool beyond individual evaluation.
              </p>
            </div>
          </article>

          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">INDX and Experienced Professionals</h2>

            <p className="text-base leading-7 mb-4">
              For professionals with deep domain expertise, AI does not negate the value of knowledge but modifies conditions 
              of its exercise.
            </p>

            <p className="text-base leading-7 mb-4">
              INDX observes how expertise articulates with systems capable of producing analyses, syntheses, or recommendations. 
              It highlights the ability to maintain intellectual control and avoid excessive delegation or cognitive dependency.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4">
              <p className="text-base leading-7">
                Here, INDX serves as a structuring and reading tool, not a sanction mechanism.
              </p>
            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/educational-institutions" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/scientific-foundations" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}