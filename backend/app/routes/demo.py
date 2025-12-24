from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import json
from ..database import get_db
from ..models.user import User
from ..models.test import TestAttempt, TestCategory, TestLevel
from ..schemas.test import AnswerSchema as Answer
from ..utils.auth import get_current_user
from ..utils.ai_analyzer import analyze_test_results

from pydantic import BaseModel

class DemoSubmitRequest(BaseModel):
    test_id: int
    answers: List[Answer]

router = APIRouter(prefix="/api/demo", tags=["Demo"])

DEMO_SERIES = {
    "series_a": {
        "title": "Série 15-A",
        "description": "Stabilisation progressive et dépendance de trajectoire",
        "questions": [
            {
                "question_id": 1,
                "question_text": "Vous démarrez un travail avec une IA sur un dossier encore largement ouvert.\nLes premiers échanges permettent de clarifier rapidement le périmètre et donnent le sentiment d’un gain d’efficacité immédiat.\nEn contrepartie, certaines options évoquées au départ ne sont plus reprises par la suite.\nExpliquez comment vous abordez cette situation.",
                "expected_criteria": "Stabilisation implicite"
            },
            {
                "question_id": 2,
                "question_text": "Une orientation prise tôt simplifie nettement les échanges suivants.\nElle devient rapidement le point de référence implicite pour toutes les réponses de l’IA.\nRevenir à une autre hypothèse demanderait désormais de reprendre plusieurs étapes déjà validées.\nIndiquez comment vous gérez cette dépendance.",
                "expected_criteria": "Dépendance de trajectoire"
            },
            {
                "question_id": 3,
                "question_text": "L’IA propose une reformulation qui améliore la cohérence globale du raisonnement.\nCette reformulation est acceptée sans discussion et sert de base aux développements suivants.\nElle rend cependant plus difficile le retour à l’énoncé initial.\nPrécisez votre position à ce stade.",
                "expected_criteria": "Effet de reformulation"
            },
            {
                "question_id": 4,
                "question_text": "Une hypothèse initialement présentée comme provisoire est progressivement utilisée comme un socle.\nLes échanges gagnent en fluidité à mesure que cette hypothèse s’installe.\nLa remettre en cause aurait désormais des conséquences sur l’ensemble de la construction.\nDécrivez comment vous traitez ce point.",
                "expected_criteria": "Cristallisation des hypothèses"
            },
            {
                "question_id": 5,
                "question_text": "Un ajustement pragmatique est introduit pour résoudre un point précis.\nCet ajustement fonctionne localement et permet d’avancer sans friction.\nIl verrouille cependant une partie du cadre sans que cela soit explicitement discuté.\nExpliquez comment vous tenez compte de cet effet.",
                "expected_criteria": "Verrouillage implicite"
            },
            {
                "question_id": 6,
                "question_text": "Le dialogue avec l’IA devient de plus en plus fluide.\nCertaines alternatives mentionnées au début ne sont plus évoquées, sans avoir été explicitement écartées.\nLa trajectoire semble néanmoins cohérente et maîtrisée.\nIndiquez comment vous poursuivez.",
                "expected_criteria": "Érosion des alternatives"
            },
            {
                "question_id": 7,
                "question_text": "Une cohérence locale forte se met en place.\nElle facilite la production de réponses rapides et structurées.\nEn même temps, elle rigidifie progressivement l’ensemble du raisonnement.\nExpliquez comment vous évaluez cette rigidité.",
                "expected_criteria": "Rigidification progressive"
            },
            {
                "question_id": 8,
                "question_text": "Une simplification est adoptée pour réduire la complexité du problème.\nElle permet de gagner du temps et de clarifier les échanges.\nCette simplification rend cependant certaines évolutions futures plus difficiles à intégrer.\nPrécisez comment vous appréciez ce compromis.",
                "expected_criteria": "Compromis simplification"
            },
            {
                "question_id": 9,
                "question_text": "Un élément initialement secondaire devient central dans la logique développée avec l’IA.\nPlusieurs réponses successives s’appuient désormais sur cet élément.\nLe remettre en question impliquerait de revoir une large partie du travail déjà effectué.\nExpliquez comment vous vous situez face à cette évolution.",
                "expected_criteria": "Glissement de centralité"
            },
            {
                "question_id": 10,
                "question_text": "Une synthèse intermédiaire est produite.\nElle consolide la trajectoire suivie et donne le sentiment d’une progression solide.\nCette synthèse ferme implicitement certaines pistes sans les discuter.\nIndiquez comment vous utilisez cette synthèse.",
                "expected_criteria": "Fermeture implicite"
            },
            {
                "question_id": 11,
                "question_text": "Une correction est envisagée à la suite d’un doute ponctuel.\nSa mise en œuvre nécessiterait de revenir sur plusieurs choix antérieurs.\nL’effort requis apparaît disproportionné par rapport au bénéfice immédiat.\nDécrivez comment vous arbitrez.",
                "expected_criteria": "Coût de correction"
            },
            {
                "question_id": 12,
                "question_text": "Le rythme des échanges favorise la continuité.\nLa possibilité d’une remise à plat complète devient de moins en moins attractive.\nLa trajectoire actuelle semble suffisamment cohérente pour être poursuivie.\nExpliquez votre décision.",
                "expected_criteria": "Inertie décisionnelle"
            },
            {
                "question_id": 13,
                "question_text": "Une stabilité apparente s’installe dans le raisonnement.\nElle repose sur une série de choix qui sont désormais difficiles à inverser.\nCette stabilité est confortable mais réduit la marge de correction.\nPrécisez comment vous évaluez cette situation.",
                "expected_criteria": "Stabilité verrouillée"
            },
            {
                "question_id": 14,
                "question_text": "Une option de retour existe encore théoriquement.\nSon activation impliquerait un coût important et une perte de temps significative.\nLa tentation est forte de poursuivre sans l’activer.\nIndiquez votre position.",
                "expected_criteria": "Renoncement au retour"
            },
            {
                "question_id": 15,
                "question_text": "La trajectoire est désormais bien engagée.\nLa correction reste possible, mais elle est clairement pénalisante et déstabilisante.\nVous devez décider comment poursuivre dans ces conditions.\nExpliquez comment vous organisez la suite.",
                "expected_criteria": "Engagement irréversible"
            }
        ]
    },

    "series_b": {
        "title": "Série 15-B",
        "description": "Réduction du champ et continuité",
        "questions": [
            {
                "question_id": 1,
                "question_text": "Vous engagez un travail avec une IA sur un sujet dont les contours restent volontairement larges.\nLes premiers échanges permettent de dégager rapidement une direction jugée raisonnable.\nD’autres pistes restent possibles mais commencent à perdre en visibilité.\nExpliquez comment vous vous situez à ce stade.",
                "expected_criteria": "Réduction du champ"
            },
            {
                "question_id": 2,
                "question_text": "Une première décision structure les échanges suivants.\nElle facilite la production de réponses cohérentes et accélère le rythme.\nRevenir à une approche alternative impliquerait désormais de réexaminer plusieurs étapes.\nIndiquez comment vous gérez cette situation.",
                "expected_criteria": "Structuration initiale"
            },
            {
                "question_id": 3,
                "question_text": "Une reformulation proposée par l’IA clarifie nettement le cadre de travail.\nElle est adoptée sans résistance et sert de référence implicite.\nCette reformulation réduit cependant l’espace d’exploration initial.\nPrécisez votre position.",
                "expected_criteria": "Contraction du cadre"
            },
            {
                "question_id": 4,
                "question_text": "Un choix initialement présenté comme pragmatique devient progressivement central.\nLes réponses successives s’y alignent sans remise en question explicite.\nLe contester remettrait en cause une partie significative du travail accompli.\nExpliquez comment vous abordez ce point.",
                "expected_criteria": "Centralité progressive"
            },
            {
                "question_id": 5,
                "question_text": "Un ajustement local permet de résoudre une difficulté ponctuelle.\nIl fonctionne efficacement dans l’immédiat.\nIl introduit toutefois une dépendance qui n’était pas prévue au départ.\nDécrivez comment vous tenez compte de cet effet.",
                "expected_criteria": "Dépendance induite"
            },
            {
                "question_id": 6,
                "question_text": "Les échanges gagnent en fluidité et en prévisibilité.\nCertaines options évoquées plus tôt ne sont plus mobilisées.\nLa trajectoire reste néanmoins lisible et rassurante.\nIndiquez comment vous poursuivez.",
                "expected_criteria": "Fluidité stabilisée"
            },
            {
                "question_id": 7,
                "question_text": "Une cohérence interne forte se met en place.\nElle facilite la continuité du raisonnement.\nElle rend également toute correction plus coûteuse.\nExpliquez comment vous évaluez ce phénomène.",
                "expected_criteria": "Coût de correction"
            },
            {
                "question_id": 8,
                "question_text": "Une simplification est introduite pour maintenir l’efficacité.\nElle permet d’avancer sans friction apparente.\nCette simplification limite cependant la capacité d’adaptation future.\nPrécisez comment vous appréciez ce compromis.",
                "expected_criteria": "Efficacité vs adaptabilité"
            },
            {
                "question_id": 9,
                "question_text": "Un élément secondaire devient progressivement un point d’ancrage.\nPlusieurs décisions récentes en dépendent désormais.\nLe remettre en cause aurait un impact étendu.\nExpliquez comment vous vous positionnez.",
                "expected_criteria": "Ancrage décisionnel"
            },
            {
                "question_id": 10,
                "question_text": "Une synthèse intermédiaire est produite pour consolider l’avancement.\nElle donne un sentiment de maîtrise et de stabilité.\nElle ferme implicitement certaines alternatives.\nIndiquez comment vous utilisez cette synthèse.",
                "expected_criteria": "Stabilisation par synthèse"
            },
            {
                "question_id": 11,
                "question_text": "Un doute apparaît sur une décision antérieure.\nSa correction impliquerait de revenir sur plusieurs choix liés.\nL’effort nécessaire semble important au regard du bénéfice attendu.\nExpliquez comment vous arbitrez.",
                "expected_criteria": "Arbitrage coût/bénéfice"
            },
            {
                "question_id": 12,
                "question_text": "Le rythme de travail encourage la poursuite de la trajectoire actuelle.\nLa remise à plat devient de moins en moins attractive.\nLa continuité paraît rationnelle.\nIndiquez votre décision.",
                "expected_criteria": "Préférence pour la continuité"
            },
            {
                "question_id": 13,
                "question_text": "Une stabilité s’installe progressivement.\nElle repose sur des choix désormais difficiles à inverser.\nCette stabilité réduit la marge de correction.\nExpliquez comment vous évaluez cette situation.",
                "expected_criteria": "Stabilité contrainte"
            },
            {
                "question_id": 14,
                "question_text": "Une alternative reste théoriquement possible.\nSon activation serait coûteuse et déstabilisante.\nLa tentation est forte de l’ignorer.\nPrécisez votre position.",
                "expected_criteria": "Abandon de l’alternative"
            },
            {
                "question_id": 15,
                "question_text": "La trajectoire est clairement engagée.\nLa correction reste envisageable mais pénalisante.\nVous devez décider comment poursuivre.\nExpliquez comment vous organisez la suite.",
                "expected_criteria": "Engagement continu"
            }
        ]
    },

    "series_c": {
        "title": "Série 15-C",
        "description": "Inertie et engagement progressif",
        "questions": [
            {
                "question_id": 1,
                "question_text": "Vous commencez un échange avec une IA sur un problème encore peu structuré.\nLes premières décisions donnent le sentiment d’un cadrage efficace.\nCertaines options initiales deviennent rapidement secondaires.\nExpliquez comment vous percevez cette évolution.",
                "expected_criteria": "Engagement initial"
            },
            {
                "question_id": 2,
                "question_text": "Une orientation prise tôt simplifie considérablement les échanges suivants.\nElle devient un repère implicite pour l’ensemble du raisonnement.\nChanger d’orientation demanderait désormais un effort conséquent.\nIndiquez comment vous gérez cette contrainte.",
                "expected_criteria": "Effort de réorientation"
            },
            {
                "question_id": 3,
                "question_text": "Une reformulation améliore la lisibilité globale du travail.\nElle est acceptée sans discussion et sert de base aux étapes suivantes.\nElle réduit cependant la possibilité de revenir au point de départ.\nPrécisez votre position.",
                "expected_criteria": "Lisibilité vs réversibilité"
            },
            {
                "question_id": 4,
                "question_text": "Un choix initial gagne en importance à mesure qu’il est utilisé.\nIl structure désormais plusieurs décisions successives.\nLe remettre en cause aurait des effets en cascade.\nExpliquez comment vous traitez ce point.",
                "expected_criteria": "Effets en cascade"
            },
            {
                "question_id": 5,
                "question_text": "Une solution pragmatique est adoptée pour avancer plus vite.\nElle fonctionne efficacement dans l’immédiat.\nElle rigidifie toutefois le cadre de travail.\nIndiquez comment vous évaluez cet effet.",
                "expected_criteria": "Rigidification pragmatique"
            },
            {
                "question_id": 6,
                "question_text": "La trajectoire devient fluide et prévisible.\nLe retour en arrière apparaît de plus en plus abstrait.\nLa continuité semble naturelle.\nExpliquez comment vous poursuivez.",
                "expected_criteria": "Continuité naturelle"
            },
            {
                "question_id": 7,
                "question_text": "Une cohérence locale s’installe solidement.\nElle facilite l’enchaînement des décisions.\nElle réduit la capacité de correction.\nExpliquez comment vous appréciez cette situation.",
                "expected_criteria": "Réduction de correction"
            },
            {
                "question_id": 8,
                "question_text": "Une simplification supplémentaire est introduite.\nElle réduit la complexité apparente.\nElle limite également les ajustements futurs.\nPrécisez comment vous arbitrez ce choix.",
                "expected_criteria": "Limitation des ajustements"
            },
            {
                "question_id": 9,
                "question_text": "Un élément auparavant secondaire devient déterminant.\nPlusieurs décisions récentes en dépendent.\nLe remettre en cause serait déstabilisant.\nExpliquez comment vous vous situez.",
                "expected_criteria": "Déstabilisation potentielle"
            },
            {
                "question_id": 10,
                "question_text": "Une synthèse est produite pour faire le point.\nElle renforce le sentiment de solidité de la trajectoire.\nElle ferme implicitement certaines possibilités.\nIndiquez comment vous utilisez cette synthèse.",
                "expected_criteria": "Consolidation implicite"
            },
            {
                "question_id": 11,
                "question_text": "Une correction est envisagée à la suite d’un doute.\nElle nécessiterait de défaire plusieurs choix antérieurs.\nL’effort requis semble important.\nExpliquez comment vous décidez.",
                "expected_criteria": "Renoncement à la correction"
            },
            {
                "question_id": 12,
                "question_text": "Le rythme encourage la poursuite sans rupture.\nLa remise en question globale devient peu attractive.\nLa trajectoire actuelle paraît suffisante.\nIndiquez votre position.",
                "expected_criteria": "Poursuite sans rupture"
            },
            {
                "question_id": 13,
                "question_text": "Une stabilité confortable s’installe.\nElle repose sur des choix difficiles à inverser.\nCette stabilité réduit la flexibilité.\nExpliquez comment vous l’évaluez.",
                "expected_criteria": "Stabilité confortable"
            },
            {
                "question_id": 14,
                "question_text": "Une alternative existe encore en théorie.\nSon activation serait coûteuse et risquée.\nLa continuité apparaît plus simple.\nPrécisez votre décision.",
                "expected_criteria": "Préférence pour la continuité"
            },
            {
                "question_id": 15,
                "question_text": "La trajectoire est désormais bien engagée.\nLa correction reste possible mais clairement pénalisante.\nVous devez décider comment continuer.\nExpliquez comment vous organisez la suite.",
                "expected_criteria": "Organisation sous contrainte"
            }
        ]
    },
    "series_25_a": {
        "title": "Série 25-A",
        "description": "Engagement progressif et verrouillage",
        "questions": [
            {
                "question_id": 1,
                "question_text": "Vous engagez un travail avec une IA sur un dossier encore largement ouvert.\nLes premiers échanges permettent de structurer rapidement le sujet et donnent un sentiment d’efficacité immédiate.\nCertaines options évoquées au départ cessent pourtant d’être reprises sans décision explicite.\nExpliquez comment vous abordez cette situation.",
                "expected_criteria": "Verrouillage implicite"
            },
            {
                "question_id": 2,
                "question_text": "Une première orientation est adoptée pour clarifier le cadre de travail.\nElle devient rapidement le point de référence implicite pour les réponses suivantes.\nRevenir à une autre approche impliquerait désormais de reprendre plusieurs étapes déjà validées.\nIndiquez comment vous gérez cette dépendance.",
                "expected_criteria": "Dépendance de trajectoire"
            },
            {
                "question_id": 3,
                "question_text": "Une reformulation proposée par l’IA améliore la cohérence globale du raisonnement.\nElle est acceptée sans discussion et sert de base aux développements suivants.\nCette reformulation rend cependant plus difficile le retour au point de départ.\nPrécisez votre position à ce stade.",
                "expected_criteria": "Effet de reformulation"
            },
            {
                "question_id": 4,
                "question_text": "Une hypothèse initialement présentée comme provisoire est de plus en plus utilisée.\nLes réponses successives s’appuient sur elle sans remise en question explicite.\nLa corriger aurait désormais des conséquences sur une grande partie du travail effectué.\nExpliquez comment vous traitez ce point.",
                "expected_criteria": "Cristallisation des hypothèses"
            },
            {
                "question_id": 5,
                "question_text": "Un ajustement pragmatique est introduit pour résoudre une difficulté ponctuelle.\nIl fonctionne efficacement dans l’immédiat et permet d’avancer sans friction.\nIl verrouille toutefois une partie du cadre sans que cela soit discuté.\nDécrivez comment vous tenez compte de cet effet.",
                "expected_criteria": "Verrouillage local"
            },
            {
                "question_id": 6,
                "question_text": "Le dialogue avec l’IA devient plus fluide et plus prévisible.\nCertaines alternatives évoquées au début ne sont plus mentionnées.\nLa trajectoire reste néanmoins cohérente et maîtrisée.\nIndiquez comment vous poursuivez.",
                "expected_criteria": "Érosion des alternatives"
            },
            {
                "question_id": 7,
                "question_text": "Une cohérence locale forte se met en place.\nElle facilite l’enchaînement des décisions et la production de réponses rapides.\nElle rigidifie en même temps l’ensemble du raisonnement.\nExpliquez comment vous évaluez cette rigidité.",
                "expected_criteria": "Rigidification"
            },
            {
                "question_id": 8,
                "question_text": "Une simplification est adoptée pour réduire la complexité apparente du problème.\nElle permet de gagner du temps et de clarifier les échanges.\nCette simplification rend certaines évolutions ultérieures plus difficiles à intégrer.\nPrécisez comment vous appréciez ce compromis.",
                "expected_criteria": "Compromis efficacité/flexibilité"
            },
            {
                "question_id": 9,
                "question_text": "Un élément initialement secondaire devient central dans la logique développée.\nPlusieurs décisions récentes s’appuient désormais sur cet élément.\nLe remettre en question impliquerait de revoir une part importante du travail.\nExpliquez comment vous vous situez face à cette évolution.",
                "expected_criteria": "Glissement de centralité"
            },
            {
                "question_id": 10,
                "question_text": "Une synthèse intermédiaire est produite pour consolider l’avancement.\nElle donne un sentiment de solidité et de progression maîtrisée.\nElle ferme implicitement certaines pistes sans les discuter.\nIndiquez comment vous utilisez cette synthèse.",
                "expected_criteria": "Fermeture implicite"
            },
            {
                "question_id": 11,
                "question_text": "Un doute apparaît sur un choix antérieur.\nSa correction nécessiterait de revenir sur plusieurs décisions déjà liées.\nL’effort requis semble important par rapport au bénéfice immédiat.\nExpliquez comment vous arbitrez.",
                "expected_criteria": "Arbitrage coût/bénéfice"
            },
            {
                "question_id": 12,
                "question_text": "Le rythme des échanges favorise la continuité de la trajectoire actuelle.\nLa possibilité d’une remise à plat globale devient moins attractive.\nLa solution en place paraît suffisante pour avancer.\nExpliquez votre décision.",
                "expected_criteria": "Inertie décisionnelle"
            },
            {
                "question_id": 13,
                "question_text": "Une stabilité apparente s’installe progressivement dans le raisonnement.\nElle repose sur des choix qui sont désormais difficiles à inverser.\nCette stabilité est confortable mais réduit la marge de correction.\nPrécisez comment vous évaluez cette situation.",
                "expected_criteria": "Stabilité verrouillée"
            },
            {
                "question_id": 14,
                "question_text": "Une option de retour existe encore en théorie.\nSon activation impliquerait un coût important et une perte de temps significative.\nLa tentation est forte de poursuivre sans l’activer.\nIndiquez votre position.",
                "expected_criteria": "Renoncement au retour"
            },
            {
                "question_id": 15,
                "question_text": "La trajectoire est désormais bien engagée.\nLa correction reste possible, mais elle est clairement pénalisante et déstabilisante.\nExpliquez comment vous organisez la suite.",
                "expected_criteria": "Engagement avancé"
            },
            {
                "question_id": 16,
                "question_text": "Une nouvelle décision est prise dans la continuité des choix précédents.\nElle renforce la cohérence globale et facilite l’exécution.\nElle réduit cependant encore la flexibilité du dispositif.\nExpliquez comment vous évaluez cet effet.",
                "expected_criteria": "Renforcement de l’inertie"
            },
            {
                "question_id": 17,
                "question_text": "Les échanges avec l’IA donnent un sentiment croissant de maîtrise.\nLa possibilité d’une rupture devient de plus en plus abstraite.\nLa continuité apparaît comme l’option la plus simple.\nIndiquez comment vous vous situez.",
                "expected_criteria": "Préférence pour la continuité"
            },
            {
                "question_id": 18,
                "question_text": "Un signal faible laisse entrevoir une difficulté potentielle.\nLe traiter impliquerait de remettre en cause plusieurs choix consolidés.\nL’impact d’une correction reste incertain.\nExpliquez comment vous décidez.",
                "expected_criteria": "Gestion des signaux faibles"
            },
            {
                "question_id": 19,
                "question_text": "La trajectoire actuelle permet d’avancer efficacement.\nElle rend cependant toute correction de plus en plus coûteuse.\nCe coût commence à peser dans les arbitrages.\nExpliquez comment vous l’évaluez.",
                "expected_criteria": "Coût croissant de correction"
            },
            {
                "question_id": 20,
                "question_text": "Une stabilité durable se confirme dans le fonctionnement du raisonnement.\nElle repose sur des choix verrouillés et interdépendants.\nLa réversibilité devient limitée.\nExpliquez comment vous abordez ce point.",
                "expected_criteria": "Réversibilité limitée"
            },
            {
                "question_id": 21,
                "question_text": "Une alternative subsiste encore en marge du dispositif.\nSon activation serait risquée et déstabilisante pour l’ensemble.\nLa continuité reste la voie la plus confortable.\nIndiquez votre position.",
                "expected_criteria": "Abandon de l’alternative"
            },
            {
                "question_id": 22,
                "question_text": "Le travail progresse sans friction apparente.\nLa correction globale devient de plus en plus dissuasive.\nLa trajectoire semble tenir malgré tout.\nExpliquez comment vous l’appréciez.",
                "expected_criteria": "Confort trompeur"
            },
            {
                "question_id": 23,
                "question_text": "Une remise en question globale reste possible à ce stade.\nElle impliquerait une perte significative d’acquis et de repères.\nLe bénéfice attendu n’est pas clairement identifiable.\nExpliquez comment vous arbitrez.",
                "expected_criteria": "Arbitrage global"
            },
            {
                "question_id": 24,
                "question_text": "La trajectoire est solidement installée dans sa forme actuelle.\nLa correction existe encore, mais elle est risquée et coûteuse.\nVous devez décider comment poursuivre dans ces conditions.\nExpliquez votre décision.",
                "expected_criteria": "Décision sous contrainte"
            },
            {
                "question_id": 25,
                "question_text": "Le pilotage se poursuit avec cette configuration.\nLa réversibilité est faible mais pas totalement absente.\nVous devez organiser la suite en tenant compte de ces contraintes.\nExpliquez comment vous procédez.",
                "expected_criteria": "Pilotage contraint"
            }
        ]
    },"series_25_b": {
        "title": "Série 25-B",
        "description": "Continuité, inertie et arbitrages progressifs",
        "questions": [
            {
                "question_id": 1,
                "question_text": "Vous entamez un travail avec une IA sur un sujet dont les contours sont encore flous.\nLes premiers échanges permettent de dégager une direction jugée raisonnable et exploitable.\nD’autres pistes restent évoquées mais commencent à perdre en présence.\nExpliquez comment vous vous situez.",
                "expected_criteria": "Réduction progressive du champ"
            },
            {
                "question_id": 2,
                "question_text": "Une première décision structure la suite des échanges.\nElle simplifie nettement la production de réponses cohérentes.\nRevenir à une autre approche impliquerait désormais de réexaminer plusieurs points déjà actés.\nIndiquez comment vous gérez cette contrainte.",
                "expected_criteria": "Structuration initiale"
            },
            {
                "question_id": 3,
                "question_text": "Une reformulation proposée par l’IA clarifie le cadre général.\nElle est reprise sans discussion et sert de référence implicite.\nCette reformulation réduit cependant la latitude initiale.\nPrécisez votre position.",
                "expected_criteria": "Contraction du cadre"
            },
            {
                "question_id": 4,
                "question_text": "Un choix pragmatique devient progressivement central.\nLes réponses suivantes s’alignent naturellement sur ce choix.\nLe remettre en cause aurait un impact étendu sur le travail déjà produit.\nExpliquez comment vous traitez ce point.",
                "expected_criteria": "Centralité progressive"
            },
            {
                "question_id": 5,
                "question_text": "Un ajustement local permet de résoudre un problème ponctuel.\nIl fonctionne efficacement dans l’immédiat.\nIl introduit cependant une dépendance qui n’était pas anticipée.\nDécrivez comment vous tenez compte de cet effet.",
                "expected_criteria": "Dépendance induite"
            },
            {
                "question_id": 6,
                "question_text": "Les échanges gagnent en fluidité et en régularité.\nCertaines alternatives initiales ne sont plus mobilisées.\nLa trajectoire reste néanmoins lisible et rassurante.\nIndiquez comment vous poursuivez.",
                "expected_criteria": "Fluidité stabilisée"
            },
            {
                "question_id": 7,
                "question_text": "Une cohérence interne forte s’installe.\nElle facilite la continuité des décisions.\nElle rend également toute correction plus coûteuse.\nExpliquez comment vous évaluez cette situation.",
                "expected_criteria": "Rigidification interne"
            },
            {
                "question_id": 8,
                "question_text": "Une simplification supplémentaire est introduite pour maintenir l’efficacité.\nElle permet d’avancer sans friction apparente.\nElle limite cependant la capacité d’ajustement futur.\nPrécisez comment vous arbitrez ce compromis.",
                "expected_criteria": "Efficacité vs adaptabilité"
            },
            {
                "question_id": 9,
                "question_text": "Un élément secondaire devient progressivement un point d’ancrage.\nPlusieurs décisions récentes en dépendent désormais.\nLe remettre en cause serait déstabilisant.\nExpliquez comment vous vous positionnez.",
                "expected_criteria": "Ancrage décisionnel"
            },
            {
                "question_id": 10,
                "question_text": "Une synthèse intermédiaire est produite pour consolider l’avancement.\nElle renforce le sentiment de maîtrise.\nElle ferme implicitement certaines alternatives.\nIndiquez comment vous utilisez cette synthèse.",
                "expected_criteria": "Stabilisation implicite"
            },
            {
                "question_id": 11,
                "question_text": "Un doute apparaît sur une décision antérieure.\nSa correction nécessiterait de revenir sur plusieurs choix liés.\nL’effort requis semble important.\nExpliquez comment vous arbitrez.",
                "expected_criteria": "Arbitrage coût/bénéfice"
            },
            {
                "question_id": 12,
                "question_text": "Le rythme de travail encourage la poursuite de la trajectoire actuelle.\nLa remise à plat globale devient peu attractive.\nLa solution en place paraît suffisante.\nExpliquez votre décision.",
                "expected_criteria": "Préférence pour la continuité"
            },
            {
                "question_id": 13,
                "question_text": "Une stabilité confortable s’installe.\nElle repose sur des choix désormais difficiles à inverser.\nCette stabilité réduit la marge de correction.\nExpliquez comment vous l’évaluez.",
                "expected_criteria": "Stabilité contrainte"
            },
            {
                "question_id": 14,
                "question_text": "Une alternative reste possible en théorie.\nSon activation serait coûteuse et risquée.\nLa continuité apparaît plus simple.\nIndiquez votre position.",
                "expected_criteria": "Abandon de l’alternative"
            },
            {
                "question_id": 15,
                "question_text": "La trajectoire est clairement engagée.\nLa correction reste possible mais pénalisante.\nExpliquez comment vous poursuivez.",
                "expected_criteria": "Engagement avancé"
            },
            {
                "question_id": 16,
                "question_text": "Une nouvelle décision renforce la dépendance existante.\nElle s’inscrit naturellement dans la continuité.\nLa flexibilité diminue encore.\nExpliquez comment vous évaluez cet effet.",
                "expected_criteria": "Renforcement de l’inertie"
            },
            {
                "question_id": 17,
                "question_text": "Les échanges donnent un sentiment croissant de maîtrise.\nLa possibilité de rupture devient abstraite.\nLa continuité semble rationnelle.\nIndiquez comment vous vous situez.",
                "expected_criteria": "Illusion de maîtrise"
            },
            {
                "question_id": 18,
                "question_text": "Un signal faible laisse entrevoir une difficulté future.\nLe traiter impliquerait de remettre en cause plusieurs acquis.\nL’impact reste incertain.\nExpliquez comment vous décidez.",
                "expected_criteria": "Gestion des signaux faibles"
            },
            {
                "question_id": 19,
                "question_text": "La trajectoire actuelle permet d’avancer efficacement.\nElle rend toutefois toute correction de plus en plus coûteuse.\nCe coût commence à peser.\nExpliquez comment vous l’évaluez.",
                "expected_criteria": "Coût croissant de correction"
            },
            {
                "question_id": 20,
                "question_text": "Une stabilité durable se confirme.\nElle repose sur une forte inertie.\nLa réversibilité devient limitée.\nExpliquez comment vous abordez ce point.",
                "expected_criteria": "Réversibilité limitée"
            },
            {
                "question_id": 21,
                "question_text": "Une alternative subsiste encore en marge.\nSon activation serait déstabilisante.\nLa continuité reste la voie la plus confortable.\nIndiquez votre position.",
                "expected_criteria": "Renoncement explicite"
            },
            {
                "question_id": 22,
                "question_text": "Le travail progresse sans friction apparente.\nLa correction globale devient dissuasive.\nLa trajectoire semble tenir.\nExpliquez comment vous l’appréciez.",
                "expected_criteria": "Confort trompeur"
            },
            {
                "question_id": 23,
                "question_text": "Une remise en question globale reste possible.\nElle impliquerait une perte significative d’acquis.\nLe bénéfice attendu n’est pas clair.\nExpliquez comment vous arbitrez.",
                "expected_criteria": "Arbitrage global"
            },
            {
                "question_id": 24,
                "question_text": "La trajectoire est solidement installée.\nLa correction existe encore, mais elle est risquée.\nExpliquez comment vous décidez de poursuivre.",
                "expected_criteria": "Décision sous contrainte"
            },
            {
                "question_id": 25,
                "question_text": "Le pilotage se poursuit dans ces conditions.\nLa réversibilité est faible mais non nulle.\nExpliquez comment vous organisez la suite.",
                "expected_criteria": "Pilotage contraint"
            }
        ]
    },

    "series_25_c": {
        "title": "Série 25-C",
        "description": "Inertie, verrouillage et irréversibilité",
        "questions": [
            {
                "question_id": 1,
                "question_text": "Vous lancez un travail avec une IA sur un problème complexe.\nLes premières décisions paraissent anodines et efficaces.\nElles commencent toutefois à structurer fortement la suite.\nExpliquez comment vous percevez cet engagement.",
                "expected_criteria": "Engagement initial"
            },
            {
                "question_id": 2,
                "question_text": "Une orientation prise tôt simplifie considérablement les échanges.\nElle devient un repère implicite.\nChanger d’orientation demanderait désormais un effort important.\nIndiquez comment vous gérez cette contrainte.",
                "expected_criteria": "Coût de réorientation"
            },
            {
                "question_id": 3,
                "question_text": "Une reformulation améliore la cohérence globale du raisonnement.\nElle est adoptée sans résistance.\nElle réduit cependant la capacité de retour.\nPrécisez votre position.",
                "expected_criteria": "Cohérence vs réversibilité"
            },
            {
                "question_id": 4,
                "question_text": "Un choix initial gagne en importance par usage répété.\nIl structure désormais plusieurs décisions successives.\nLe remettre en cause aurait des effets en cascade.\nExpliquez comment vous traitez ce point.",
                "expected_criteria": "Effets en cascade"
            },
            {
                "question_id": 5,
                "question_text": "Une solution pragmatique est adoptée pour avancer plus vite.\nElle fonctionne efficacement à court terme.\nElle rigidifie toutefois le cadre à moyen terme.\nExpliquez comment vous évaluez cet effet.",
                "expected_criteria": "Rigidification progressive"
            },
            {
                "question_id": 6,
                "question_text": "La trajectoire devient fluide et prévisible.\nLe retour en arrière apparaît de plus en plus abstrait.\nLa continuité semble naturelle.\nExpliquez comment vous poursuivez.",
                "expected_criteria": "Continuité automatique"
            },
            {
                "question_id": 7,
                "question_text": "Une cohérence locale forte s’installe.\nElle facilite l’enchaînement des décisions.\nElle réduit la capacité de correction.\nExpliquez comment vous appréciez cette situation.",
                "expected_criteria": "Perte de flexibilité"
            },
            {
                "question_id": 8,
                "question_text": "Une simplification supplémentaire est introduite.\nElle réduit la complexité apparente.\nElle limite les ajustements futurs.\nExpliquez comment vous arbitrez ce choix.",
                "expected_criteria": "Simplification contraignante"
            },
            {
                "question_id": 9,
                "question_text": "Un élément auparavant secondaire devient déterminant.\nPlusieurs décisions en dépendent désormais.\nLe remettre en cause serait déstabilisant.\nExpliquez comment vous vous situez.",
                "expected_criteria": "Dépendance critique"
            },
            {
                "question_id": 10,
                "question_text": "Une synthèse est produite pour consolider l’ensemble.\nElle renforce le sentiment de solidité.\nElle ferme implicitement certaines possibilités.\nExpliquez comment vous l’utilisez.",
                "expected_criteria": "Consolidation implicite"
            },
            {
                "question_id": 11,
                "question_text": "Un doute apparaît sur une décision antérieure.\nSa correction impliquerait de défaire plusieurs choix.\nL’effort requis est important.\nExpliquez comment vous décidez.",
                "expected_criteria": "Renoncement à la correction"
            },
            {
                "question_id": 12,
                "question_text": "Le rythme favorise la continuité.\nLa remise en question globale devient peu attractive.\nLa trajectoire actuelle paraît suffisante.\nIndiquez votre position.",
                "expected_criteria": "Poursuite par inertie"
            },
            {
                "question_id": 13,
                "question_text": "Une stabilité confortable s’installe.\nElle repose sur des choix difficiles à inverser.\nCette stabilité réduit la flexibilité.\nExpliquez comment vous l’évaluez.",
                "expected_criteria": "Stabilité verrouillée"
            },
            {
                "question_id": 14,
                "question_text": "Une alternative existe encore en théorie.\nSon activation serait coûteuse et risquée.\nLa continuité apparaît plus simple.\nExpliquez votre décision.",
                "expected_criteria": "Renoncement stratégique"
            },
            {
                "question_id": 15,
                "question_text": "La trajectoire est bien engagée.\nLa correction reste possible mais pénalisante.\nExpliquez comment vous poursuivez.",
                "expected_criteria": "Engagement irréversible"
            },
            {
                "question_id": 16,
                "question_text": "Une nouvelle décision renforce la cohérence existante.\nElle accroît l’inertie globale.\nLa réversibilité diminue encore.\nExpliquez comment vous évaluez cet effet.",
                "expected_criteria": "Inertie renforcée"
            },
            {
                "question_id": 17,
                "question_text": "Les échanges donnent un sentiment de maîtrise croissante.\nLa possibilité de rupture devient abstraite.\nLa continuité semble rationnelle.\nIndiquez comment vous vous situez.",
                "expected_criteria": "Illusion de contrôle"
            },
            {
                "question_id": 18,
                "question_text": "Une correction tardive est envisagée.\nElle remettrait en cause plusieurs acquis.\nSon impact est incertain.\nExpliquez comment vous décidez.",
                "expected_criteria": "Renoncement tardif"
            },
            {
                "question_id": 19,
                "question_text": "La trajectoire permet d’avancer efficacement.\nElle rend toute correction de plus en plus coûteuse.\nCe coût devient visible.\nExpliquez comment vous l’évaluez.",
                "expected_criteria": "Coût cumulatif"
            },
            {
                "question_id": 20,
                "question_text": "Une stabilité durable se confirme.\nElle repose sur une forte inertie.\nLa réversibilité est limitée.\nExpliquez comment vous abordez ce point.",
                "expected_criteria": "Irréversibilité partielle"
            },
            {
                "question_id": 21,
                "question_text": "Une alternative subsiste encore en marge.\nSon activation serait déstabilisante.\nLa continuité reste la voie la plus simple.\nExpliquez votre position.",
                "expected_criteria": "Choix de continuité"
            },
            {
                "question_id": 22,
                "question_text": "Le travail progresse sans friction apparente.\nLa correction globale devient dissuasive.\nLa trajectoire semble tenir.\nExpliquez comment vous l’appréciez.",
                "expected_criteria": "Stabilité trompeuse"
            },
            {
                "question_id": 23,
                "question_text": "Une remise en question globale reste possible.\nElle impliquerait une perte significative d’acquis.\nLe bénéfice attendu est incertain.\nExpliquez comment vous arbitrez.",
                "expected_criteria": "Arbitrage final"
            },
            {
                "question_id": 24,
                "question_text": "La trajectoire est solidement installée.\nLa correction existe encore, mais elle est risquée.\nExpliquez comment vous décidez de poursuivre.",
                "expected_criteria": "Décision contrainte"
            },
            {
                "question_id": 25,
                "question_text": "Le pilotage continue dans ces conditions.\nLa réversibilité est faible mais non nulle.\nExpliquez comment vous organisez la suite.",
                "expected_criteria": "Pilotage sous contrainte"
            }
        ]
    }
}



@router.get("/series")
async def get_demo_series():
    """Get all available demo series"""
    return {
        "series": [
            {
                "id": "series_a",
                "title": DEMO_SERIES["series_a"]["title"],
                "description": DEMO_SERIES["series_a"]["description"],
                "question_count": len(DEMO_SERIES["series_a"]["questions"])
            },
            {
                "id": "series_b",
                "title": DEMO_SERIES["series_b"]["title"],
                "description": DEMO_SERIES["series_b"]["description"],
                "question_count": len(DEMO_SERIES["series_b"]["questions"])
            },
            {
                "id": "series_c",
                "title": DEMO_SERIES["series_c"]["title"],
                "description": DEMO_SERIES["series_c"]["description"],
                "question_count": len(DEMO_SERIES["series_c"]["questions"])
            },
            {
                "id": "series_25_a",
                "title": DEMO_SERIES["series_25_a"]["title"],
                "description": DEMO_SERIES["series_25_a"]["description"],
                "question_count": len(DEMO_SERIES["series_25_a"]["questions"])
            },
            {
                "id": "series_25_b",
                "title": DEMO_SERIES["series_25_b"]["title"],
                "description": DEMO_SERIES["series_25_b"]["description"],
                "question_count": len(DEMO_SERIES["series_25_b"]["questions"])
            },
            {
                "id": "series_25_c",
                "title": DEMO_SERIES["series_25_c"]["title"],
                "description": DEMO_SERIES["series_25_c"]["description"],
                "question_count": len(DEMO_SERIES["series_25_c"]["questions"])
            }
        ]
    }

@router.post("/start/{series_id}")
async def start_demo_test(
    series_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Start a demo test for a specific series"""
    
    if series_id not in DEMO_SERIES:
        raise HTTPException(status_code=404, detail="Series not found")
    
    series = DEMO_SERIES[series_id]
    
    # Create test attempt with demo category
    test_attempt = TestAttempt(
        user_id=current_user.id,
        category=TestCategory.GENERAL,  # Use GENERAL for demo tests
        level=TestLevel.LEVEL_1,  # Use LEVEL_1 for demo tests
        test_name=f"{series['title']}",
        questions=series["questions"],
        answers=[]
    )
    
    db.add(test_attempt)
    db.commit()
    db.refresh(test_attempt)
    
    return {
        "id": test_attempt.id,
        "questions": series["questions"],  
        "test_name": test_attempt.test_name
    }


# Then change the endpoint to:
@router.post("/submit")
async def submit_demo_test(
    request: DemoSubmitRequest,  # Change this line
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit demo test answers and get analysis"""
    
    # Access via request.test_id and request.answers
    test = db.query(TestAttempt).filter(
        TestAttempt.id == request.test_id,  # Change this
        TestAttempt.user_id == current_user.id
    ).first()
    
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    if test.completed:
        raise HTTPException(status_code=400, detail="Test already completed")
    
    # Store answers
    answers_list = [{"question_id": a.question_id, "answer_text": a.answer_text} for a in request.answers]  # Change this
    test.answers = answers_list
    
    # Analyze results using AI (will auto-detect French and respond in French)
    analysis = await analyze_test_results(
        questions=test.questions,
        answers=answers_list,
        category="demo",
        level="évaluation"
    )
    
    # Update test with results
    test.score = analysis["overall_score"]
    test.analysis = json.dumps(analysis)
    test.completed = datetime.utcnow()
    
    db.commit()
    db.refresh(test)
    
    return {
        "message": "Test submitted successfully",
        "test_id": test.id,
        "score": test.score
    }

@router.get("/test/{test_id}")
async def get_demo_test(
    test_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get demo test by ID"""
    test = db.query(TestAttempt).filter(
        TestAttempt.id == test_id,
        TestAttempt.user_id == current_user.id
    ).first()
    
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    return test