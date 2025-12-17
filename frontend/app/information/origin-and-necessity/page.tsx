'use client';

import Link from 'next/link';

export default function OriginAndNecessityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/information"
            className="text-blue-800 hover:underline mb-4 inline-block"
          >
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Origin and Necessity of AIS</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 2</p> */}
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="text-gray-800">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900">The Evolution of Evaluation</h2>
              <p className="text-base leading-7 mb-4">
                Existing evaluation methods are historically based on assumptions that have become obsolete: 
                stability of responses, transparency of reasoning, and a clear separation between tool and user. 
                These assumptions no longer withstand the reality of current systems.
              </p>

              <div className="bg-gray-50 border border-gray-300 p-6 my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Critical Observation
                </h3>
                <p className="text-base leading-7">
                  When responses become non-deterministic, when internal reasoning is partially opaque, and 
                  when produced value depends on human interpretation, evaluation can no longer focus solely 
                  on observable results.
                </p>
              </div>

              <h3 className="text-lg font-bold mb-4 text-gray-900">The Birth of INDX</h3>
              <p className="text-base leading-7 mb-4">
                INDX was born from this observation: in a non-deterministic environment, the critical variable 
                is no longer system performance, but the human capacity to ensure cognitive steering. This 
                capacity conditions the relevance of results, the robustness of decisions, and the long-term 
                stability of usage.
              </p>

              <p className="text-base leading-7 mb-4">
                INDX thus addresses a methodological gap: the absence of a rigorous framework to evaluate 
                human cognitive maturity in the face of artificial intelligence.
              </p>
            </div>

            {/* Obsolete Assumptions */}
            <div className="bg-gray-50 border border-gray-300 p-6 mb-8">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Obsolete Assumptions</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-gray-400 pl-4">
                  <h4 className="font-bold text-gray-900 mb-1">Stability of Responses</h4>
                  <p className="text-sm text-gray-600">Same input no longer guarantees same output</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-4">
                  <h4 className="font-bold text-gray-900 mb-1">Transparency of Reasoning</h4>
                  <p className="text-sm text-gray-600">Internal processes are often opaque</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-4">
                  <h4 className="font-bold text-gray-900 mb-1">Tool-User Separation</h4>
                  <p className="text-sm text-gray-600">Boundaries have become blurred</p>
                </div>
              </div>
            </div>

            {/* What INDX Addresses */}
            <div className="bg-gray-50 border border-gray-300 p-6 mb-8">
              <h3 className="text-lg font-bold mb-4 text-gray-900">What INDX Addresses</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>Measures human capacity for cognitive steering</li>
                <li>Evaluates relevance of results through human lens</li>
                <li>Assesses robustness of human-AI decisions</li>
                <li>Ensures long-term stability of AI usage patterns</li>
              </ul>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-300">
              <Link
                href="/information/general-overview"
                className="text-blue-800 hover:underline"
              >
                ← Back
              </Link>
              <Link
                href="/information/scope-of-measurement"
                className="text-blue-800 hover:underline"
              >
                Next →
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}