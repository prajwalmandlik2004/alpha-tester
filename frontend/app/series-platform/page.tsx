'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { seriesTestAPI, authAPI } from '@/src/lib/api';
import toast from 'react-hot-toast';

interface SeriesType {
  type: string;
  name: string;
  description: string;
  modules: number;
  questions: number;
  questions_per_module?: number;
  timer_minutes: number;
  break_minutes?: number;
  color: string;
}

export default function SeriesPlatform() {
  const router = useRouter();
  const [seriesTypes, setSeriesTypes] = useState<SeriesType[]>([]);
  const [loading, setLoading] = useState(true);

  // Guest registration modal state
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [pendingSeries, setPendingSeries] = useState<SeriesType | null>(null);
  const [guestInfo, setGuestInfo] = useState({ email: '', fullName: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchSeriesTypes();
  }, []);

  const fetchSeriesTypes = async () => {
    try {
      const response = await seriesTestAPI.getTypes();
      setSeriesTypes(response.data.series);
    } catch (err) {
      console.error('Failed to fetch series types');
      toast.error('Failed to load series types');
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCardClick = (series: SeriesType) => {
    const token = localStorage.getItem('token');

    // If not logged in, show guest registration modal
    if (!token) {
      setPendingSeries(series);
      setShowGuestModal(true);
      return;
    }

    // If logged in, navigate immediately to info page (test created there)
    router.push(`/series-test/new?type=${series.type}`);
  };

  const handleGuestRegister = async () => {
    if (!guestInfo.email || !guestInfo.fullName) {
      toast.error('Veuillez entrer votre email et nom');
      return;
    }

    setIsRegistering(true);
    try {
      const response = await authAPI.guestLogin(guestInfo.email, guestInfo.fullName);
      localStorage.setItem('token', response.data.access_token);

      // Navigate immediately - test will be created on series-test page
      if (pendingSeries) {
        router.push(`/series-test/new?type=${pendingSeries.type}&skipInfo=true`);
      }
    } catch (error) {
      toast.error('Erreur. Veuillez réessayer.');
      setIsRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#050E3C]"></div>
      </div>
    );
  }

  return (
    <>
      {/* Guest Registration Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-30">
            <div className="space-y-10">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-bold text-[#050E3C] mb-3">
                  INDX1000 – {pendingSeries?.name}
                </h1>
                <h2 className="text-lg font-semibold text-gray-800">
                  Session d'évaluation – Beta test
                </h2>
              </div>

              {/* Main description */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-normal text-gray-900 mb-10 underline">
                    Informations :
                  </h3>

                  <div className="space-y-4 text-md text-gray-900 leading-relaxed">
                    <p>
                      <span className="mr-2 text-yellow-800">●</span> Vous êtes sur le point de débuter une session INDX1000, destinée à observer votre manière de conduire une interaction cognitive avec un système artificiel non déterministe.
                      <br />
                      Il ne s'agit ni d'un test de connaissances ni d'expertise, mais de l'analyse de la façon dont vous structurez, orientez et ajustez votre raisonnement au fil de l'échange.
                    </p>

                    <p>
                      INDX1000 n'évalue pas des réponses isolées ni une performance ponctuelle, mais une dynamique de pilotage cognitif inscrite dans la durée.
                      {pendingSeries && pendingSeries.modules > 1 && (
                        <> Cette série comprend {pendingSeries.modules} modules avec une pause de {pendingSeries.break_minutes} minutes entre chaque module.</>
                      )}
                    </p>

                    <p>
                      Il n'existe donc ni bonne ni mauvaise réponse : répondez sincèrement, sans chercher à anticiper une attente implicite, de façon concise (environ dix lignes), la clarté primant sur la longueur.
                    </p>

                    {/* Divider */}
                    <div className="flex justify-center">
                      <div className="w-3/4 border-t border-gray-400 m-5"></div>
                    </div>

                    <p>
                      <span className="mr-2 text-yellow-800">●</span> En fin de test vous pourrez consulter et récupérer le compte-rendu d'analyse de cette session par e-mail à votre
                      adresse à renseigner ci-dessous, utilisée exclusivement par INDX.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guest Info Form */}
              <div className="space-y-3">
                <h3 className="font-normal text-gray-900">Vos informations :</h3>
                <div className="flex flex-col md:flex-row items-start md:space-x-4 space-y-4 md:space-y-0">
                  <input
                    type="text"
                    placeholder="Prénom, Nom"
                    value={guestInfo.fullName}
                    onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                    className="w-80 px-3 py-2 border border-gray-300 focus:border-[#050E3C] outline-none"
                    disabled={isOkClicked && !isEditMode}
                    required
                  />
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Adresse mail"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                      className="w-80 px-3 py-2 border border-gray-300 focus:border-[#050E3C] outline-none"
                      disabled={isOkClicked && !isEditMode}
                      required
                    />
                    <div className="absolute -bottom-14 right-0 flex space-x-2">
                      <button
                        onClick={() => {
                          setIsEditMode(true);
                          setIsOkClicked(false);
                        }}
                        disabled={!isOkClicked}
                        className={`px-3 py-1 font-semibold transition-colors ${isOkClicked
                          ? 'text-[#050E3C] underline'
                          : 'text-gray-500 cursor-not-allowed underline'
                          }`}
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => {
                          setIsOkClicked(true);
                          setIsEditMode(false);
                        }}
                        disabled={!guestInfo.fullName || !isValidEmail(guestInfo.email) || (isOkClicked && !isEditMode)}
                        className={`px-3 py-1 font-semibold transition-colors ${guestInfo.fullName && isValidEmail(guestInfo.email) && (!isOkClicked || isEditMode)
                          ? 'bg-[#050E3C] text-white'
                          : 'bg-gray-400 text-white cursor-not-allowed'
                          }`}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex space-x-4">
                <button
                  onClick={handleGuestRegister}
                  disabled={isRegistering || !isOkClicked}
                  className="px-6 py-3 bg-[#050E3C] text-white text-md font-semibold hover:bg-[#050E3C]/90 transition-colors disabled:opacity-50"
                >
                  {isRegistering ? 'Enregistrement...' : 'Commencer'}
                </button>

                <button
                  onClick={() => {
                    setShowGuestModal(false);
                    setPendingSeries(null);
                    setGuestInfo({ email: '', fullName: '' });
                    setIsOkClicked(false);
                    setIsEditMode(false);
                  }}
                  className="px-6 py-3 text-gray-500 text-md font-semibold underline cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12 space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold gradient-text">Series Test Platform</h1>
          </div>

          {/* Series Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {seriesTypes.map((series) => (
              <div
                key={series.type}
                onClick={() => handleCardClick(series)}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col justify-between">
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{series.name}</h2>
                  <p className="text-gray-600 mb-6">{series.description}</p>

                  {/* Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Modules</span>
                      <span className="font-semibold text-gray-900">{series.modules}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Total Questions</span>
                      <span className="font-semibold text-gray-900">{series.questions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Time per Module</span>
                      <span className="font-semibold text-gray-900">{series.timer_minutes} min</span>
                    </div>
                    {series.break_minutes && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Break Between Modules</span>
                        <span className="font-semibold text-gray-900">{series.break_minutes} min</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Start</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
