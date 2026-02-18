'use client';

import Link from 'next/link';
import { BookOpen, Brain, Trophy, Users, ArrowRight, CheckCircle, Zap, Target } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Get detailed feedback and insights powered by GPT-4o for comprehensive learning.',
    },
    {
      icon: Target,
      title: 'Multiple Categories',
      description: 'Tests for schools, professionals, technical skills, and corporate assessments.',
    },
    {
      icon: Trophy,
      title: 'Progressive Levels',
      description: 'Five difficulty levels to challenge and track your improvement over time.',
    },
    {
      icon: Users,
      title: 'For Everyone',
      description: 'Perfect for students, professionals, and organizations of all sizes.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Tests Completed' },
    { number: '5K+', label: 'Active Users' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Available' },
  ];

  return (
    <div className="overflow-hidden">

      {/* Hero Section - Compact with Contained Image */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-7">

               <div className="space-y-2 mt-5">
                <h3 className="text-3xl sm:text-3xl lg:text-3xl font-bold leading-tight">
                  INDX
                </h3>

                <p className="text-lg font-semibold">
                  Analyse de la trajectoire intercognitive
                </p>

                <p className="text-md text-gray-600">
                  Cadre méthodologique versionné pour l'analyse des interactions humain–IA (INDX-Core v1.0)
                </p>

              </div>

              <div className="text-[#00008B text-2xl font-bold">
                Vue générale
              </div>

              <div className="mt-[-15] space-y-3 text-gray-600 text-base">
                <p>
                  L'intégration croissante des systèmes d'intelligence artificielle dans les environnements institutionnels, académiques et organisationnels transforme les conditions de production intellectuelle et de décision.
                </p>
                <p>
                  L'interaction avec ces systèmes n'est plus ponctuelle. Elle devient prolongée, structurante, parfois déterminante. Les décisions humaines s'inscrivent désormais dans des dynamiques où la formulation, l'interprétation et l'ajustement successif des échanges jouent un rôle central.
                </p>
                <p>
                  Dans ce contexte, la question ne porte plus exclusivement sur la performance technique des systèmes, mais sur la capacité humaine à structurer et stabiliser l'interaction.
                </p>
                <p className="text-gray-900">
                  INDX constitue un cadre analytique destiné à observer et qualifier cette capacité.
                </p>
              </div>
            </div>


            {/* Right Column - Table of Contents */}
            <div className="block lg:hidden mt-[-25]">
              <div className="bg-white p-8 rounded-lg sticky">
                <ul className="space-y-2 text-gray-700">
                  <li>
                    -
                    <a href="#vue-generale" className="hover:text-[#00008B] transition-colors underline ms-2">
                      Vue générale
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#intercognition" className="hover:text-[#00008B] transition-colors underline ms-2">
                      Intercognition : cadre conceptuel
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#origine-necessite" className="hover:text-[#00008B] transition-colors underline ms-2">
                      Origine et nécessité
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#bases-scientifiques" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Bases scientifiques
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#principes-methodologiques" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Principes méthodologiques
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#architecture-evaluation" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Architecture d'évaluation
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#champ-mesure" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Champ de mesure
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#transversalite" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Transversalité
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#applications-institutionnelles" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Applications institutionnelles et académiques
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#gouvernance" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Gouvernance, périmètre et cadre d'usage
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#perimetre-analyse" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Périmètre d'analyse
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#delegation-cognitive" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Délégation cognitive implicite
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#clarifications-methodologiques" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Clarifications méthodologiques
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#ethique-limites" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Éthique et limites
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* University Building Image */}
            <div className="relative h-[300px] lg:h-[360px] overflow-hidden shadow-xl">
              <img
                src="/home_four.jpg"
                alt="University Campus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intercognition : cadre conceptuel */}
      <section className="py-3 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <div id="intercognition" className="mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-12 bg-[#00008B] flex-shrink-0"></div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Intercognition : cadre conceptuel
                  </h2>
                </div>
              </div>

              <div className="space-y-3 text-gray-700 text-base leading-relaxed">
                <p>
                  L'usage prolongé des environnements IA fait émerger un espace spécifique d'interaction entre cognition humaine et systèmes non déterministes.
                </p>
                <p>
                  Cet espace peut être défini comme un champ structuré dans lequel se combinent :
                </p>
                <ul className="list-none space-y-2 pl-6">
                  <li>• l'intention humaine,</li>
                  <li>• sa formalisation en instruction exploitable,</li>
                  <li>• la production algorithmique,</li>
                  <li>• l'interprétation des retours,</li>
                  <li>• l'ajustement progressif de la trajectoire.</li>
                </ul>
                <p>
                  Cet espace n'est ni purement humain ni purement technique. Il constitue une zone dynamique de co-régulation.
                </p>
                <p className="text-gray-900">
                  L'intercognition désigne ce champ.
                </p>
                <p>
                  INDX formalise et rend mesurable l'une de ses dimensions centrales : la trajectoire construite par un acteur humain dans l'interaction prolongée avec un système d'IA.
                </p>
              </div>
            </div>

            {/* Right Column - Table of Contents */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white p-3 rounded-lg sticky top-8">
                <ul className="space-y-2 text-gray-700">
                  <li>
                    -
                    <a href="#vue-generale" className="hover:text-[#00008B] transition-colors underline ms-2">
                      Vue générale
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#intercognition" className="hover:text-[#00008B] transition-colors underline ms-2">
                      Intercognition : cadre conceptuel
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#origine-necessite" className="hover:text-[#00008B] transition-colors underline ms-2">
                      Origine et nécessité
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#bases-scientifiques" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Bases scientifiques
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#principes-methodologiques" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Principes méthodologiques
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#architecture-evaluation" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Architecture d'évaluation
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#champ-mesure" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Champ de mesure
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#transversalite" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Transversalité
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#applications-institutionnelles" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Applications institutionnelles et académiques
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#gouvernance" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Gouvernance, périmètre et cadre d'usage
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#perimetre-analyse" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Périmètre d'analyse
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#delegation-cognitive" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Délégation cognitive implicite
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#clarifications-methodologiques" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Clarifications méthodologiques
                    </a>
                  </li>
                  <li>
                    -
                    <a href="#ethique-limites" className="hover:text-[#00008B] transition-colors cursor-pointer underline ms-2">
                      Éthique et limites
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origine et nécessité */}
      <section id="origine-necessite" className="py-4 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-12 bg-[#8B0000] flex-shrink-0"></div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Origine et nécessité
              </h2>
            </div>
          </div>

          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>
              Les dispositifs d'évaluation traditionnels mesurent principalement :
            </p>
            <ul className="list-none space-y-2 pl-6">
              <li>• des connaissances déclaratives,</li>
              <li>• des performances techniques,</li>
              <li>• des usages ponctuels.</li>
            </ul>
            <p>
              Ils rendent imparfaitement compte d'une dimension devenue structurante : la capacité à maintenir une cohérence cognitive dans un environnement non déterministe, marqué par des rétroactions successives.
            </p>
            <p>
              À mesure que la confiance accordée aux systèmes d'IA augmente, la qualité de la trajectoire devient un enjeu central.
            </p>
            <p className="text-gray-900">
              INDX a été conçu pour répondre à cette évolution.
            </p>
          </div>
        </div>
      </section>

      {/* Bases scientifiques & Principes méthodologiques */}
      <section id="bases-scientifiques" className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Bases scientifiques
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>
              Le cadre mobilise des apports issus :
            </p>
            <ul className="list-none space-y-2 pl-6">
              <li>• des sciences cognitives (régulation attentionnelle, formulation d'intention, adaptation),</li>
              <li>• de l'épistémologie (conditions de production et de validation des connaissances),</li>
              <li>• de la théorie des systèmes (dynamique non linéaire, boucles de rétroaction),</li>
              <li>• de l'analyse décisionnelle (gestion de l'incertitude).</li>
            </ul>
            <p>
              L'interaction avec l'IA est appréhendée comme un processus dynamique structuré dans le temps.
            </p>
            <p className="text-gray-900">
              L'objet d'analyse n'est pas une réponse isolée, mais une trajectoire.
            </p>
          </div>
        </div>
      </section>

      {/* Principes méthodologiques */}
      <section id="principes-methodologiques" className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Principes méthodologiques
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>
              INDX repose sur plusieurs principes structurants :
            </p>
            <ul className="list-none space-y-2 pl-6">
              <li>• primauté de la dynamique sur l'instantané,</li>
              <li>• distinction entre résultat obtenu et qualité du processus,</li>
              <li>• contextualisation explicite des situations,</li>
              <li>• indépendance vis-à-vis des technologies et fournisseurs.</li>
            </ul>
            <p className="text-gray-900">
              Ces principes garantissent la robustesse analytique du cadre dans des environnements évolutifs.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture d'évaluation */}
      <section id="architecture-evaluation" className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Architecture d'évaluation
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>
              INDX s'appuie sur un protocole séquentiel structuré permettant d'observer :
            </p>
            <ul className="list-none space-y-2 pl-6">
              <li>• la construction initiale de la trajectoire,</li>
              <li>• la gestion de la variation introduite,</li>
              <li>• la stabilisation ou la dérive progressive.</li>
            </ul>
            <p>
              Les sessions sont traitées via une architecture de scoring versionnée : <span className="font-bold">INDX-Core v1.0</span>.
            </p>
            <p>
              Le moteur applique des invariants méthodologiques garantissant :
            </p>
            <ul className="list-none space-y-2 pl-6">
              <li>• la comparabilité intra-version,</li>
              <li>• la reproductibilité des lectures,</li>
              <li>• la traçabilité analytique.</li>
            </ul>
            <p>
              Les situations peuvent varier.
            </p>
            <p className="text-gray-900">
              Le protocole et la logique d'évaluation demeurent strictement identiques au sein d'une même version.
            </p>
          </div>
        </div>
      </section>

      {/* Champ de mesure */}
      <section id="champ-mesure" className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Champ de mesure
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>
              INDX observe des dimensions mobilisées dans la construction d'une trajectoire intercognitive, notamment :
            </p>
            <ul className="list-none space-y-2 pl-6">
              <li>• formulation d'intention exploitable,</li>
              <li>• structuration hiérarchique des objectifs,</li>
              <li>• gestion de l'ambiguïté contextuelle,</li>
              <li>• ajustement adaptatif,</li>
              <li>• stabilisation d'une direction.</li>
            </ul>
            <p>
              Le cadre ne prétend pas constituer une théorie générale de la cognition. Il propose une formalisation opérationnelle d'une dimension spécifique.
            </p>
          </div>
        </div>
      </section>

      {/* Transversalité */}
      <section id="transversalite" className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Transversalité
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>
              INDX a été conçu pour être indépendant :
            </p>
            <ul className="list-none space-y-2 pl-6">
              <li>• des secteurs d'activité,</li>
              <li>• des disciplines académiques,</li>
              <li>• des architectures techniques.</li>
            </ul>
            <p className="text-gray-900">
              Cette transversalité permet l'usage d'INDX dans des environnements hétérogènes sans dépendance aux cycles technologiques.
            </p>
          </div>
        </div>
      </section>

      {/* Applications institutionnelles et académiques */}
      <section id="applications-institutionnelles" className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Applications institutionnelles et académiques
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>
              INDX peut être mobilisé dans :
            </p>
            <ul className="list-none space-y-2 pl-6">
              <li>• des dispositifs de gouvernance publique impliquant l'IA,</li>
              <li>• l'enseignement supérieur confronté à l'évolution des critères d'excellence,</li>
              <li>• des environnements organisationnels exposés à des usages analytiques prolongés de systèmes non déterministes.</li>
            </ul>
            <p className="text-gray-900">
              Il introduit une lecture structurée complémentaire aux dispositifs existants.
            </p>
          </div>
        </div>
      </section>

      {/* Gouvernance, périmètre et cadre d'usage */}
      <section id="gouvernance" className="py-3 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Gouvernance, périmètre et cadre d'usage
            </h2>
            <div className="space-y-3 text-gray-700 text-base leading-relaxed">
              <p>
                INDX repose sur une architecture stabilisée et versionnée : <span className="font-bold">INDX-Core v1.0</span>.
              </p>
              <p>
                Ce moteur constitue un référentiel méthodologique destiné à garantir la comparabilité des trajectoires analysées au sein d'une même version. Toute évolution du protocole fait l'objet d'une nouvelle version explicitement identifiée, assurant la traçabilité des analyses et la continuité du cadre.
              </p>
              <p>
                L'architecture est conçue pour permettre un usage récurrent dans des environnements exposés à un recours prolongé aux systèmes d'intelligence artificielle, où la qualité de la trajectoire construite conditionne directement la qualité des décisions prises.
              </p>
            </div>
          </div>

          {/* Périmètre d'analyse */}
          <div id="perimetre-analyse" className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Périmètre d'analyse
            </h2>
            <div className="space-y-3 text-gray-700 text-base leading-relaxed">
              <p>
                INDX analyse le niveau de structuration, de cohérence et de maîtrise d'une trajectoire intercognitive construite par un acteur humain dans l'interaction séquentielle avec un système d'intelligence artificielle.
              </p>
              <p>
                L'analyse porte sur :
              </p>
              <ul className="list-none space-y-2 pl-6">
                <li>• la formulation initiale d'une intention exploitable,</li>
                <li>• la capacité à maintenir une direction intelligible dans la durée,</li>
                <li>• la gestion des variations introduites par un système non déterministe,</li>
                <li>• la stabilisation ou la dérive progressive de la trajectoire.</li>
              </ul>
              <p className="text-gray-900">
                L'objet du cadre est la qualité de la trajectoire construite.
              </p>
              <p>
                À mesure que l'usage prolongé des systèmes d'intelligence artificielle devient structurel dans les environnements académiques et professionnels, ce niveau influe directement sur la robustesse décisionnelle.
              </p>
            </div>
          </div>

          {/* Délégation cognitive implicite */}
          <div id="delegation-cognitive" className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Délégation cognitive implicite
            </h2>
            <div className="space-y-3 text-gray-700 text-base leading-relaxed">
              <p>
                Dans les interactions prolongées avec des systèmes performants, un phénomène récurrent peut apparaître : la délégation cognitive implicite.
              </p>
              <p>
                Il s'agit du déplacement progressif de la responsabilité de structuration, d'interprétation ou de décision vers le système, sans que ce déplacement soit explicitement formulé.
              </p>
              <p>
                Ce phénomène ne résulte pas nécessairement d'une intention consciente. Il peut émerger de la fluidité des échanges et de la performance apparente des réponses produites.
              </p>
              <p>
                INDX permet d'observer les signes d'une stabilisation maîtrisée ou, au contraire, d'une dérive vers une dépendance structurelle.
              </p>
              <p className="text-gray-900">
                La distinction entre assistance instrumentale et délégation implicite constitue un enjeu central dans les environnements où les décisions ont une portée stratégique.
              </p>
            </div>
          </div>

          {/* Clarifications méthodologiques */}
          <div id="clarifications-methodologiques" className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Clarifications méthodologiques
            </h2>
            <div className="space-y-3 text-gray-700 text-base leading-relaxed">
              <p>
                INDX n'évalue pas la performance intrinsèque des systèmes d'intelligence artificielle mobilisés.
              </p>
              <p>
                Il ne constitue ni un audit technologique, ni une mesure de connaissances déclaratives, ni un dispositif d'évaluation psychologique.
              </p>
              <p className="text-gray-900">
                Le cadre porte exclusivement sur la dynamique construite dans l'interaction.
              </p>
              <p>
                La qualité apparente d'un résultat ponctuel ne constitue pas en soi un indicateur de qualité de trajectoire. Une production satisfaisante peut coexister avec une trajectoire instable ou implicitement déléguée.
              </p>
            </div>
          </div>

          {/* Éthique et limites */}
          <div id="ethique-limites">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Éthique et limites
            </h2>
            <div className="space-y-3 text-gray-700 text-base leading-relaxed">
              <p>
                INDX observe une trajectoire située dans un protocole défini.
              </p>
              <p>
                Les analyses produites doivent être interprétées :
              </p>
              <ul className="list-none space-y-2 pl-6">
                <li>• dans un contexte déterminé,</li>
                <li>• à un moment donné,</li>
                <li>• en complément d'autres éléments d'analyse.</li>
              </ul>
              <p className="text-gray-900">
                Le cadre exclut toute automatisation du jugement et toute réduction simplificatrice d'une trajectoire à un indicateur isolé.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}