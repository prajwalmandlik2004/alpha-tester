'use client';

import Link from 'next/link';

export default function ScopeOfMeasurementPage() {
  const measuredCapacities = [
    'Explicit structuring of an intention exploitable by an intelligent system',
    'Formulation and adjustment of relevant constraints',
    'Management of uncertainty and ambiguity',
    'Logical coherence of interactions over time',
    'Ability to analyze, correct, and redirect a cognitive trajectory',
  ];

  const excludedElements = [
    'Execution speed',
    'Stylistic or expressive creativity',
    'Technical mastery of a specific language or tool',
    'Knowledge of a specific domain',
    'Conformity to an expected result',
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-50 border-b border-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/information" className="text-blue-800 hover:underline mb-4 inline-block">
            ← Back to Information
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Scope of Measurement and Exclusions</h1>
          {/* <p className="text-sm text-gray-600 mt-1">Page 3</p> */}
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <article className="border border-gray-300 p-6">
            <p className="text-base leading-7">
              INDX measures transversal cognitive capacities, independent of professional domains, academic 
              levels, or job functions. The framework is designed to evaluate universal human abilities that 
              apply across all contexts of AI interaction.
            </p>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What INDX Measures</h2>
            
            <p className="text-base leading-7 mb-4">
              These capacities include in particular:
            </p>
            
            <ul className="space-y-3">
              {measuredCapacities.map((capacity, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-base leading-7">{capacity}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-gray-300 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">What INDX Does NOT Measure</h2>
            
            <p className="text-base leading-7 mb-4">
              Conversely, INDX deliberately excludes:
            </p>
            
            <ul className="space-y-3">
              {excludedElements.map((element, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-base leading-7">{element}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-gray-50 border border-gray-300 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Important Distinction</h3>
            <p className="text-base leading-7">
              These excluded elements may have operational value, but they do not constitute the core of 
              cognitive steering. INDX focuses exclusively on the structure of human–AI interaction.
            </p>
          </article>

          <article className="border border-gray-300 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Core Focus of INDX</h3>
            <p className="text-base leading-7">
              The framework evaluates how effectively an individual can structure, guide, and maintain 
              coherent interaction with non-deterministic AI systems—capabilities that transcend domain 
              expertise and technical knowledge.
            </p>
          </article>

          <div className="flex justify-between items-center pt-6 border-t border-gray-300">
            <Link href="/information/origin-and-necessity" className="text-blue-800 hover:underline">
              ← Back
            </Link>
            <Link href="/information/methodological-principles" className="text-blue-800 hover:underline">
              Next →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}