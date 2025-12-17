'use client';

import Link from 'next/link';

export default function IntegrationSystemsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Integration into Existing Systems</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 20</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Seamless Integration Without Disruption</h2>

            <p className="text-base leading-7 mb-4">
              INDX is designed to integrate into existing institutional environments without organizational disruption. It can function autonomously or as a complementary component.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4">
              <p className="text-base leading-7">
                INDX thus coexists with academic evaluations, certifications, competency management, and public governance frameworks.
              </p>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Integration Foundations</h2>

            <p className="text-base leading-7 mb-4">
              This integration relies on:
            </p>

            <div className="space-y-4">
              <div className="border border-gray-300 p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Technological Neutrality</h3>
                <p className="text-base leading-7">
                  INDX works independently of specific platforms, tools, or vendors, ensuring compatibility across diverse technological ecosystems.
                </p>
              </div>

              <div className="border border-gray-300 p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Modular Evaluation Modalities</h3>
                <p className="text-base leading-7">
                  Flexible assessment approaches allow organizations to implement INDX in ways that fit their specific needs and contexts.
                </p>
              </div>

              <div className="border border-gray-300 p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Clarity of Produced Results</h3>
                <p className="text-base leading-7">
                  Clear, interpretable outputs ensure that stakeholders can understand and act on INDX insights without specialized training.
                </p>
              </div>
            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/cross-sector-use-cases" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/deployment-scenarios" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}