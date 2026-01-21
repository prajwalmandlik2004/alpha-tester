'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="overflow-hidden">
      {/* Privacy Policy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            Pages légales
          </h1>

          {/* 1. Mentions légales */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              1. Mentions légales
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Le site ind-x.fr est édité par :
              </p>

              <div className="pl-6">
                <p className="mb-4">
                  <strong>Éditeur</strong><br />
                  Barthélémy Gilles<br />
                  France
                </p>

                <p className="mb-4">
                  <strong>Responsable de la publication</strong><br />
                  Barthélémy Gilles
                </p>

                <p>
                  <strong>Hébergement</strong><br />
                  Hostinger, Render, Vercel<br />
                  France
                </p>
              </div>

              <p>
                Le site ind-x.fr est un site institutionnel dédié à la présentation de cadres conceptuels, de travaux analytiques et de dispositifs intellectuels développés par son éditeur.
              </p>

              <p>
                L'accès au site implique l'acceptation pleine et entière des présentes mentions légales.
              </p>
            </div>
          </div>

          {/* 2. Propriété intellectuelle et exclusivité */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              2. Propriété intellectuelle et exclusivité
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                L'ensemble des contenus présents sur le site ind-x.fr, incluant notamment, sans limitation :
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>les cadres conceptuels,</li>
                <li>les structures méthodologiques,</li>
                <li>les terminologies,</li>
                <li>les dispositifs analytiques,</li>
                <li>les architectures de tests,</li>
                <li>les documents, textes, graphismes,</li>
                <li>les mises en forme, séquences et agencements,</li>
              </ul>

              <p>
                constitue des œuvres originales protégées par le droit de la propriété intellectuelle.
              </p>

              <p>
                Ces éléments sont la propriété exclusive de leur auteur.
              </p>

              <p>
                Toute reproduction, représentation, adaptation, extraction, diffusion ou exploitation, totale ou partielle, par quelque procédé que ce soit, sans autorisation écrite préalable, est strictement interdite.
              </p>

              <p>
                L'accès au site n'emporte aucune concession de licence, explicite ou implicite, sur les éléments qu'il contient.
              </p>
            </div>
          </div>

          {/* 3. Protection des données personnelles */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              3. Protection des données personnelles
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Le site ind-x.fr peut collecter des données strictement nécessaires à son fonctionnement technique et à l'analyse de son usage, notamment :
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>données de navigation,</li>
                <li>journaux techniques (logs),</li>
                <li>informations transmises volontairement par l'utilisateur.</li>
              </ul>

              <p>
                Les données collectées ne font l'objet d'aucune exploitation commerciale, publicitaire ou de revente.
              </p>

              <p>
                Elles peuvent être utilisées à des fins internes d'analyse, de recherche ou d'amélioration des dispositifs présentés, y compris sous forme anonymisée ou agrégée.
              </p>

              <p>
                Conformément à la réglementation applicable, l'utilisateur dispose d'un droit d'accès, de rectification et de suppression des données le concernant, exercé selon les modalités prévues par le site.
              </p>
            </div>
          </div>

          {/* 4. Conditions d'accès et d'utilisation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              4. Conditions d'accès et d'utilisation
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Le site ind-x.fr est mis à disposition à titre institutionnel.
              </p>

              <p>
                Les contenus et dispositifs présentés sont fournis en l'état, sans engagement de résultat, sans garantie et sans finalité opérationnelle déclarée.
              </p>

              <p>
                L'éditeur se réserve le droit de modifier, suspendre ou interrompre tout ou partie du site, à tout moment et sans préavis.
              </p>

              <p>
                Toute utilisation du site ou de ses contenus en dehors de leur simple consultation relève de la seule responsabilité de l'utilisateur.
              </p>
            </div>
          </div>

          {/* 5. Limitation de responsabilité */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              5. Limitation de responsabilité
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                L'éditeur ne saurait être tenu responsable de toute interprétation, utilisation ou conséquence directe ou indirecte résultant de l'accès au site ou de la consultation de ses contenus.
              </p>
            </div>
          </div>

          {/* 6. Droit applicable */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              6. Droit applicable
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Le site ind-x.fr et les présentes dispositions sont régis par le droit français.
              </p>

              <p>
                Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des juridictions françaises.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}