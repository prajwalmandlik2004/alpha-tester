'use client';

import Link from 'next/link';

export default function OrganizationalApplicationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Organizational Applications</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 8-9</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">INDX and Companies / Organizations</h2>

            <p className="text-base leading-7 mb-4">
              Organizations face growing heterogeneity in artificial intelligence usage. Gaps in cognitive maturity between 
              individuals and teams represent an often underestimated risk factor.
            </p>

            <p className="text-base leading-7 mb-4">
              INDX makes it possible to objectify these gaps, identify effective steering capacities, and structure hybrid 
              human–AI work environments on solid foundations.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4">
              <p className="text-base leading-7">
                It is neither a human resources management tool nor a control instrument. INDX provides a strategic reading 
                of cognitive capacities mobilized in interaction with AI.
              </p>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">INDX and Recruitment / Talent Evaluation</h2>

            <p className="text-base leading-7 mb-4">
              Traditional talent evaluation systems rely on degrees, declared experience, technical tests, and interviews. 
              While still useful, these instruments struggle to capture a now decisive dimension: the ability of an individual 
              to interact effectively with non-deterministic AI systems.
            </p>

            <p className="text-base leading-7 mb-4">
              As AI intervenes earlier in analysis, selection, recommendation, and decision processes, the value of a profile 
              no longer lies solely in knowledge or technical skills, but in the capacity to structure a cognitive dialogue 
              with these systems, interpret their outputs, identify their limits, and correct their trajectories.
            </p>

            <div className="border border-gray-300 p-4 bg-white mb-4">
              <p className="text-base leading-7 mb-4">
                INDX introduces a transversal evaluation framework, independent of academic and professional backgrounds, 
                allowing this capacity to be objectified. Unlike technical tests or job simulations, INDX does not seek 
                to measure specific performance, but a stable cognitive posture toward AI.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">This framework makes it possible in particular to:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>identify profiles capable of mediating between humans and intelligent systems;</li>
                <li>distinguish superficial tool mastery from genuine cognitive steering capacity;</li>
                <li>reduce biases linked to self-presentation and declarative discourse.</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                INDX does not replace existing tools. It provides a complementary reading of a strategic factor previously absent.
              </p>
            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/evaluation-logic" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/educational-institutions" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}