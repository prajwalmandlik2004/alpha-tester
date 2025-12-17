'use client';

import Link from 'next/link';

export default function MethodologicalPrinciplesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Methodological Principles & Framework</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 4-5</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fundamental Methodological Principles</h2>
            
            <p className="text-base leading-7 mb-6">
              The INDX framework is based on a set of strict methodological principles ensuring its robustness and durability.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-300 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Explicit recognition of non-determinism</h3>
                <p className="text-base leading-7">
                  Evaluated systems produce variable responses. Any evaluation based on a single response is invalid by construction.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-300 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Primacy of the cognitive process</h3>
                <p className="text-base leading-7">
                  The value of interaction lies in the intellectual trajectory, not in a single outcome.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-300 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Technological independence</h3>
                <p className="text-base leading-7">
                  The INDX framework is designed to remain valid regardless of the models, architectures, or interfaces used.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-300 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Cognitive invariance</h3>
                <p className="text-base leading-7">
                  The evaluated axes are considered fundamental and non-substitutable. They do not depend on profession or sectoral context.
                </p>
              </div>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">The INDX Framework (Conceptual Level)</h2>

            <p className="text-base leading-7 mb-4">
              INDX relies on a deliberately limited number of fundamental cognitive axes. This choice reflects a requirement 
              for non-redundancy and completeness. Each axis describes an essential dimension of cognitive steering.
            </p>

            <div className="border border-gray-300 p-4 bg-white mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">These axes include in particular:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>ability to explicate a structured intention,</li>
                <li>mastery of logical continuity between iterations,</li>
                <li>aptitude to integrate unforeseen feedback,</li>
                <li>ability to correct without cognitive rupture,</li>
                <li>maintenance of a stable intellectual orientation.</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                The ensemble forms a closed framework. No axis can be removed or replaced without compromising 
                the overall validity of the system.
              </p>
            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/scope-of-measurement" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/evaluation-logic" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}