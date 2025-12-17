'use client';

import Link from 'next/link';

export default function ReadingResultsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Reading and Interpreting Results</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 22</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rigor and Discernment Required</h2>

            <p className="text-base leading-7 mb-4">
              INDX results must be read with rigor and discernment. They are neither academic grades, rankings, nor definitive verdicts.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4">
              <p className="text-base leading-7">
                This approach avoids reductionism and promotes qualitative, responsible interpretation.
              </p>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What INDX Results Represent</h2>

            <div className="border border-gray-300 p-4 bg-white mb-4">
              <p className="text-base leading-7 mb-3">
                An INDX result describes an <span className="font-bold">observed cognitive configuration</span> at a given time and context. It may evolve with practice, experience, and conditions.
              </p>
              <div className="bg-gray-50 border border-gray-300 p-3">
                <p className="text-base leading-7">
                  <span className="font-semibold">Dynamic Nature:</span> Results are not static measurements but snapshots that reflect current capabilities which can develop and change over time.
                </p>
              </div>
            </div>
          </article>

          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What INDX Results Are NOT</h2>

            <div className="space-y-4">
              
              <div className="bg-gray-50 border border-gray-300 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Not Academic Grades</h3>
                <p className="text-base leading-7">
                  INDX does not evaluate knowledge acquisition or academic performance in traditional subjects.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-300 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Not Rankings</h3>
                <p className="text-base leading-7">
                  Results should not be used to create hierarchies or compare individuals in competitive contexts.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-300 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Not Definitive Verdicts</h3>
                <p className="text-base leading-7">
                  INDX provides insights, not final judgments about capability or potential. Context and evolution matter.
                </p>
              </div>

            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/deployment-scenarios" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/general-questions" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}