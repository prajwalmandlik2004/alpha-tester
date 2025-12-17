'use client';

import Link from 'next/link';

export default function CrossSectorUseCasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Cross-Sector Use Cases</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 19</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Universal Application Across Contexts</h2>
            <p className="text-base leading-7 mb-4">
              INDX applies across contexts without sectoral limitation.
            </p>
            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7">
                INDX does not prescribe uses. It provides an observation and analysis framework for previously hard-to-measure phenomena.
              </p>
            </div>
          </article>

          <div className="space-y-6">
            
            <article className="bg-gray-50 border border-gray-300 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Education and Research</h3>
              <p className="text-base leading-7">
                In education and research, it clarifies reasoning structuring with AI. INDX helps understand how students and researchers organize their thinking when working with AI systems, providing insights into cognitive development and learning patterns.
              </p>
            </article>

            <article className="bg-gray-50 border border-gray-300 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Organizations</h3>
              <p className="text-base leading-7">
                In organizations, it analyzes collective dynamics and maturity gaps. INDX reveals how teams coordinate their cognitive efforts, identifies areas for development, and helps optimize collaboration between humans and AI systems.
              </p>
            </article>

            <article className="bg-gray-50 border border-gray-300 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Public Institutions</h3>
              <p className="text-base leading-7">
                In public institutions, it reads human capacities within AI-assisted decisions. INDX provides critical insight into how decision-makers navigate complex policy choices with AI support, ensuring accountability and transparency.
              </p>
            </article>

          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/ethics-limits" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/integration-systems" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
