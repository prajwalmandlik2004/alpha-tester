'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { USER_TYPE_KEY } from '@/src/components/SiteLocker';

export default function BetaPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is a beta user
    const userType = sessionStorage.getItem(USER_TYPE_KEY);
    const unlocked = sessionStorage.getItem('site_unlocked');

    // If not unlocked or not beta user, redirect
    if (unlocked !== 'true') {
      router.push('/');
      return;
    }

    // If normal user tries to access beta page, redirect to home
    if (userType !== 'beta') {
      router.push('/');
    }
  }, [router]);

  const handleStartM1 = () => {
    // Redirect to series platform with M1 (mono) test pre-selected
    router.push('/series-platform?startTest=mono');
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Main Content */}
        <div className="space-y-4">
          {/* INDX Header */}
          <div>
            <h1 className="text-4xl font-bold text-black mb-4">INDX</h1>

            <p className="text-gray-800 mb-4">
              INDX est l'activité de SIMG dédiée à la gestion et à la structuration de la donnée ainsi qu'à l'analyse décisionnelle.
            </p>

            <p className="text-gray-800 mb-4">
              SIMG est une structure indépendante organisée autour de plusieurs pôles complémentaires :
            </p>

            <ul className="list-disc list-inside mb-6 text-gray-800 space-y-1 ml-4">
              <li>Mobiforce, conseil RH en environnement industriel</li>
              <li>Paul Harmen, recrutement spécialisé Industrie</li>
              <li>Harmen & Botts, recrutement spécialisé Finance</li>
            </ul>

            <p className="text-gray-800 mb-4">
              La formation en business intelligence constitue l'activité historique de SIMG et a structuré son positionnement initial autour de la donnée et des environnements techniques.
            </p>

            <p className="text-gray-800 mb-4">
              Dans ce cadre, INDX développe des dispositifs d'analyse de la stabilité décisionnelle lorsque les choix s'appuient sur des systèmes artificiels non déterministes (I.A.).
            </p>

            <p className="text-gray-800 mb-4">
              Il ne s'agit ni d'un outil sectoriel ni d'une évaluation de connaissances.
              <br />
              INDX observe la manière dont une décision est structurée, maintenue et ajustée dans la durée lorsque l'analyse est médiée par un système artificiel.
            </p>

            <p className="text-gray-800 mb-4">
              Ces systèmes s'intègrent désormais dans les processus de décision.
              <br />
              Le sujet n'est plus seulement leur performance, mais la manière dont la décision est conduite face à eux.
            </p>

            <p className="text-gray-800 mb-0">
              Leurs analyses peuvent sembler solides sans pour autant mener au choix le plus pertinent.
              <br />
              INDX1000 analyse la capacité à reconnaître ces limites et à ajuster la décision.
            </p>
          </div>

          {/* Divider */}
          <hr className="border-gray-300" />

          {/* Module M1 Section */}
          <div className="">
            <h2 className="text-2xl font-bold text-black mb-4">
              Module M1 — Cohorte pilote
            </h2>

            <p className="text-gray-800 mb-2">
              Le module M1 comprend 28 séquences factuelles.
              <br />
              Durée indicative : 30 à 45 minutes.
            </p>

            <p className="text-gray-800 mb-6">
              Il permet d'obtenir un indice personnel de stabilité décisionnelle.
              <br />
              Les modalités détaillées seront présentées avant le lancement de la session.
            </p>

            {/* Access Button */}
            <button
              onClick={handleStartM1}
              className="text-black font-semibold hover:text-black underline transition-colors text-lg"
            >
              Accéder au module M1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
