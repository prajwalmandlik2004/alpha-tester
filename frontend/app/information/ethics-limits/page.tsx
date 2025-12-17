'use client';

import Link from 'next/link';

export default function EthicsLimitsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Ethics, Limits, and Scope</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 18</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">INDX is an Evaluation Tool, Not a Normative Judgment</h2>

            <p className="text-base leading-7 mb-4">
              INDX is an evaluation tool, not a normative judgment instrument. It does not predict future behavior nor assess intrinsic value of individuals or groups.
            </p>

            <p className="text-base leading-7 mb-4">
              Results must be interpreted within a specific context and time, alongside other analytical elements. INDX provides targeted insight into a single dimension: cognitive steering of intelligent systems.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                Results must be interpreted within a specific context and time, alongside other analytical elements. INDX provides targeted insight into a single dimension: cognitive steering of intelligent systems.
              </p>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ethical Principles</h2>

            <p className="text-base leading-7 mb-4">
              These serve as safeguards for responsible use:
            </p>

            <div className="space-y-4">
              <div className="border border-gray-300 p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Methodological Transparency</h3>
                <p className="text-base leading-7">
                  Clear documentation of methods, processes, and evaluation criteria ensures accountability and understanding.
                </p>
              </div>

              <div className="border border-gray-300 p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Proportionality of Use</h3>
                <p className="text-base leading-7">
                  INDX results should be applied appropriately to the context and should not exceed their intended purpose.
                </p>
              </div>

              <div className="border border-gray-300 p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Refusal of Automated or Decontextualized Interpretations</h3>
                <p className="text-base leading-7">
                  Results require human judgment and contextual understanding. Automated decision-making based solely on INDX is inappropriate.
                </p>
              </div>
            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/scientific-foundations" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/cross-sector-use-cases" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}