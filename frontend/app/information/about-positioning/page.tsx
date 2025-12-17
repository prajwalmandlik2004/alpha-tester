'use client';

import Link from 'next/link';

export default function AboutPositioningPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">About INDX and General Positioning</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 24</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Origins and Foundation</h2>
            <p className="text-base leading-7 mb-4">
              INDX results from extensive work on the limits of existing evaluation frameworks in the AI era and the necessity to consider human cognitive steering as a subject of analysis in its own right.
            </p>
            <div className="bg-gray-50 border border-gray-300 p-4">
              <p className="text-base leading-7">
                This framework emerged from recognizing that traditional evaluation methods were insufficient for understanding how humans interact with and guide AI systems. INDX fills a critical gap in our ability to assess cognitive capabilities in the AI age.
              </p>
            </div>
          </article>

          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ambition and Approach</h2>
            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <p className="text-base leading-7 mb-3">
                Its ambition is not to impose a de facto standard, but to offer a robust, rigorous, and open framework suitable for discussion, testing, and adoption across contexts.
              </p>
              <div className="border-l-4 border-gray-400 pl-4">
                <p className="text-sm">
                  <span className="font-semibold">Open Framework:</span> INDX invites collaboration, critique, and refinement from diverse stakeholders, ensuring continuous improvement and relevance.
                </p>
              </div>
            </div>
          </article>

          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Strategic Positioning</h2>
            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <p className="text-base leading-7 mb-4">
                INDX positions itself as a structuring reference at the intersection of cognitive, technological, and institutional challenges raised by artificial intelligence.
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-gray-400 pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Cognitive</h3>
                  <p className="text-sm text-gray-600">Understanding human reasoning and decision-making</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Technological</h3>
                  <p className="text-sm text-gray-600">Navigating AI systems and tools</p>
                </div>
                <div className="border-l-4 border-gray-400 pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Institutional</h3>
                  <p className="text-sm text-gray-600">Addressing governance and policy needs</p>
                </div>
              </div>
            </div>
          </article>

          <article className="bg-gray-100 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">The Future of Cognitive Evaluation</h2>
            <p className="text-base leading-7 mb-3">
              As artificial intelligence continues to transform how we work, learn, and make decisions, INDX provides the framework needed to understand and enhance human cognitive steering capabilities.
            </p>
            <p className="text-base leading-7">
              This is not just about measurement—it's about empowering individuals, organizations, and institutions to navigate the AI era with clarity, confidence, and competence.
            </p>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/general-questions" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}