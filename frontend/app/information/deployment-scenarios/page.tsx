'use client';

import Link from 'next/link';

export default function DeploymentScenariosPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Deployment and Usage Scenarios</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 21</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Flexible Deployment Modalities</h2>
            <p className="text-base leading-7 mb-4">
              Deployment modalities vary according to objectives and contexts: experimental, progressive, or generalized.
            </p>
            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7">
                This flexibility is key for international deployment across diverse cultural and regulatory contexts.
              </p>
            </div>
          </article>

          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Usage Scenarios</h2>
            <p className="text-base leading-7 mb-4">
              INDX may be used:
            </p>

            <div className="space-y-6">
              
              <div className="bg-gray-50 border border-gray-300 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Individual Use</h3>
                <p className="text-base leading-7 mb-3">
                  For positioning or analysis of personal cognitive steering capabilities.
                </p>
                <div className="border-l-4 border-gray-400 pl-4">
                  <p className="text-sm">
                    <span className="font-semibold">Example:</span> A researcher assessing their own ability to structure complex AI-assisted research projects.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-300 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Collective Use</h3>
                <p className="text-base leading-7 mb-3">
                  To observe team dynamics and collaborative cognitive patterns.
                </p>
                <div className="border-l-4 border-gray-400 pl-4">
                  <p className="text-sm">
                    <span className="font-semibold">Example:</span> A design team evaluating how they coordinate their thinking when using AI tools for creative problem-solving.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-300 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Organizational or Institutional Use</h3>
                <p className="text-base leading-7 mb-3">
                  For strategic purposes and organizational development.
                </p>
                <div className="border-l-4 border-gray-400 pl-4">
                  <p className="text-sm">
                    <span className="font-semibold">Example:</span> A government agency assessing cognitive maturity across departments to inform AI adoption strategies.
                  </p>
                </div>
              </div>

            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/integration-systems" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/reading-results" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}