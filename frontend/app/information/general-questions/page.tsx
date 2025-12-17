'use client';

import Link from 'next/link';

export default function GeneralQuestionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">General Questions</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 23</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Does INDX measure artificial intelligence?</h2>

            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <p className="text-base leading-7 mb-3">
                <span className="font-bold">No.</span> INDX measures the human capacity to steer artificial intelligence.
              </p>
              <p className="text-base leading-7">
                The focus is on human cognitive capabilities when working with AI, not on evaluating the AI systems themselves.
              </p>
            </div>
          </article>

          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Does INDX replace diplomas or certifications?</h2>

            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <p className="text-base leading-7 mb-3">
                <span className="font-bold">No.</span> It is complementary.
              </p>
              <p className="text-base leading-7">
                INDX works alongside traditional credentials and certifications, providing additional insights into cognitive steering capabilities that existing frameworks do not capture.
              </p>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Is INDX dependent on a specific technology or vendor?</h2>

            <div className="border border-gray-300 p-4 bg-white mb-4">
              <p className="text-base leading-7 mb-3">
                <span className="font-bold">No.</span> The framework is deliberately independent.
              </p>
              <p className="text-base leading-7">
                INDX maintains neutrality from any specific AI platform, vendor, or technology, ensuring it remains relevant across diverse technological ecosystems and over time.
              </p>
            </div>
          </article>

          <div className="bg-blue-50 border border-gray-300 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Have more questions?</h3>
            <p className="text-base leading-7 mb-4">
              These are just a few of the most common questions. For more detailed information, please explore the other sections or contact us directly.
            </p>
            <Link href="/information" className="text-blue-800 hover:underline font-medium">
              Explore more topics →
            </Link>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/reading-results" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/about-positioning" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}