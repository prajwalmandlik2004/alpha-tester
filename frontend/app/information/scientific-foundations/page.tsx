'use client';

import Link from 'next/link';

export default function ScientificFoundationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Scientific Foundations & Governance</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 15-17</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cognitive and Scientific Foundations</h2>

            <p className="text-base leading-7 mb-4">
              INDX is grounded in interdisciplinary research on human reasoning, decision-making in complex environments, 
              and interaction between heterogeneous cognitive agents. It lies at the intersection of cognitive sciences, 
              reasoning psychology, cognitive ergonomics, and socio-technical systems studies.
            </p>

            <p className="text-base leading-7 mb-4">
              Unlike approaches focused on observable performance or technical conformity, INDX examines the structure of 
              cognitive steering: how objectives are formulated, information organized, uncertainty managed, and coherence 
              maintained in the presence of systems producing elaborate but non-guaranteed responses.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <p className="text-base leading-7">
                INDX does not propose a unified model of human cognition. It relies on a deliberately limited set of cognitive 
                dimensions considered fundamental because they are observable, transversal, and relatively invariant.
              </p>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                Its positioning is pragmatic: it does not seek to explain cognition, but to evaluate certain operational 
                properties in a specific context — interaction with AI systems.
              </p>
            </div>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Independence, Neutrality, and Governance</h2>

            <p className="text-base leading-7 mb-4">
              The independence of INDX is a structuring principle. It conditions institutional credibility, international 
              portability, and adoption by actors with divergent interests.
            </p>

            <div className="border border-gray-300 p-4 bg-white mb-4">
              <p className="text-base leading-7 mb-4">
                INDX is affiliated with no technology vendor, AI model, or specific industrial actor. This neutrality ensures 
                evaluations are not biased by implementation choices or commercial strategies.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Governance is designed to preserve this independence over time, through clear separation between:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>conceptual and methodological framework,</li>
                <li>diffusion and implementation modalities,</li>
                <li>institutional or operational uses.</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                This separation enables INDX to function as a common reference in environments with multiple technologies and doctrines.
              </p>
            </div>
          </article>

          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Durability and Technological Invariance</h2>

            <p className="text-base leading-7 mb-4">
              A core objective of INDX is long-term relevance despite rapid AI evolution. This requirement guided all 
              conceptual choices.
            </p>

            <p className="text-base leading-7 mb-4">
              INDX relies on no specific algorithms, interfaces, or interaction modes. It focuses exclusively on human 
              cognitive dimensions considered stable over time.
            </p>

            <div className="bg-gray-50 border border-gray-300 p-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">This invariance enables:</h3>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>comparability over time,</li>
                <li>international portability,</li>
                <li>independence from technological cycles.</li>
              </ul>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4">
              <p className="text-base leading-7 font-medium">
                INDX positions itself as a durable reference capable of accompanying future AI transformations without 
                conceptual overhaul.
              </p>
            </div>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/public-institutions" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/ethics-limits" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}