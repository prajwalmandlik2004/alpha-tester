'use client';

import Link from 'next/link';

export default function EvaluationLogicPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Evaluation Logic & Distribution</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 6-7</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Evaluation Logic and Nature of Tests</h2>

            <p className="text-base leading-7 mb-4">
              INDX evaluations do not take the form of traditional exams, standardized questionnaires, or knowledge tests. 
              They rely on interactive situations designed to observe cognitive behaviors over time.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Tests aim to analyze:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>how an interaction is initiated,</li>
                <li>how results are interpreted,</li>
                <li>successive adjustments made,</li>
                <li>overall coherence of the approach.</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                There is no correct or incorrect answer. Evaluation focuses on the structure and stability of cognitive steering.
              </p>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Distribution Modalities and Supports</h2>

            <p className="text-base leading-7 mb-4">
              INDX can be deployed through various supports: digital platforms, dedicated applications, controlled evaluation 
              environments. These supports do not constitute the core of the system.
            </p>

            <div className="border border-gray-300 p-4 bg-white">
              <p className="text-base leading-7">
                The platform is designed as a neutral vector. It serves the method without altering its principles. 
                This separation guarantees the independence and durability of the AIS framework.
              </p>
            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/methodological-principles" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/organizational-applications" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}