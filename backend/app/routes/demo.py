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
        "title": "Série - A",
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
        "title": "Série - B",
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
        "title": "Série - C",
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