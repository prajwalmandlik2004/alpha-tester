import asyncio
import json
from typing import List, Dict
from openai import OpenAI
from anthropic import Anthropic
import httpx
from ..config import settings

# Initialize clients
openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
anthropic_client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
# groq_client = OpenAI(
#     api_key=settings.GROQ_API_KEY,
#     base_url="https://api.groq.com/openai/v1"
# )


def extract_json(text: str) -> str:
    """Extract JSON from markdown code blocks"""
    text = text.strip()
    if text.startswith("```json"):
        text = text[7:] 
    elif text.startswith("```"):
        text = text[3:] 
    if text.endswith("```"):
        text = text[:-3]  
    return text.strip()







async def analyze_with_openai(session_payload: Dict, role_prompt: str) -> str:
    """Analyze with GPT-4o"""
    try:
        question_feedback = []
        
        for q in session_payload["questions"]:
            answer = next((a for a in session_payload["answers"] if a["question_id"] == q["question_id"]), None)
            
            isolated_prompt = f"""{role_prompt}

Question: {q["question_text"]}
Expected Criteria: {q.get("expected_criteria", "N/A")}
User Answer: {answer["answer_text"] if answer else "No answer provided"}

Provide analysis in JSON format with ONLY these fields:
{{
  "question_number": {q["question_id"]},
  "score": <number between 0-100>,
  "feedback": "<brief feedback about THIS answer only>"
}}"""

            response = openai_client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are an independent question evaluator. Return ONLY valid JSON, no markdown."},
                    {"role": "user", "content": isolated_prompt}
                ],
                temperature=0.3,
                max_tokens=500
            )
            
            content = extract_json(response.choices[0].message.content)
            question_feedback.append(json.loads(content))
        
        total_score = sum(item.get("score", 0) for item in question_feedback)
        overall_score = total_score / len(question_feedback) if question_feedback else 0
        
        aggregated_prompt = f"""{role_prompt}

Based on these aggregated scores, provide overall analysis.

Session Summary:
- Total questions: {len(session_payload["questions"])}
- Average score: {overall_score:.1f}%

Provide analysis in JSON format:
{{
  "overall_score": {overall_score},
  "detailed_analysis": "<2-3 sentences about overall performance>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<area 1>", "<area 2>"],
  "recommendations": "<personalized recommendation>"
}}"""

        response = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an educational assessor. Return ONLY valid JSON, no markdown."},
                {"role": "user", "content": aggregated_prompt}
            ],
            temperature=0.5,
            max_tokens=1000
        )
        
        content = extract_json(response.choices[0].message.content)
        aggregated_analysis = json.loads(content)
        
        return json.dumps({
            "overall_score": overall_score * 10,
            "detailed_analysis": aggregated_analysis.get("detailed_analysis", ""),
            "question_feedback": question_feedback,
            "strengths": aggregated_analysis.get("strengths", []),
            "improvements": aggregated_analysis.get("improvements", []),
            "recommendations": [aggregated_analysis.get("recommendations", "")]
        })
    except Exception as e:
        print(f"OpenAI error: {e}")
        return json.dumps({"error": str(e)})
    






async def analyze_with_claude(session_payload: Dict, role_prompt: str) -> str:
    """Analyze with Claude"""
    try:
        question_feedback = []
        
        for q in session_payload["questions"]:
            answer = next((a for a in session_payload["answers"] if a["question_id"] == q["question_id"]), None)
            
            isolated_prompt = f"""{role_prompt}

Question: {q["question_text"]}
Expected Criteria: {q.get("expected_criteria", "N/A")}
User Answer: {answer["answer_text"] if answer else "No answer provided"}

Provide analysis in JSON format with ONLY these fields:
{{
  "question_number": {q["question_id"]},
  "score": <number between 0-100>,
  "feedback": "<brief feedback about THIS answer only>"
}}"""

            message = anthropic_client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=500,
                temperature=0.3,
                messages=[
                    {"role": "user", "content": isolated_prompt}
                ]
            )
            
            content = extract_json(message.content[0].text)
            question_feedback.append(json.loads(content))
        
        total_score = sum(item.get("score", 0) for item in question_feedback)
        overall_score = total_score / len(question_feedback) if question_feedback else 0
        
        aggregated_prompt = f"""{role_prompt}

Based on these aggregated scores, provide overall analysis.

Session Summary:
- Total questions: {len(session_payload["questions"])}
- Average score: {overall_score:.1f}%

Provide analysis in JSON format:
{{
  "overall_score": {overall_score},
  "detailed_analysis": "<2-3 sentences>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<area 1>", "<area 2>"],
  "recommendations": "<recommendation>"
}}"""

        message = anthropic_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            temperature=0.5,
            messages=[
                {"role": "user", "content": aggregated_prompt}
            ]
        )
        
        content = extract_json(message.content[0].text)
        aggregated_analysis = json.loads(content)
        
        return json.dumps({
            "overall_score": overall_score * 10,
            "detailed_analysis": aggregated_analysis.get("detailed_analysis", ""),
            "question_feedback": question_feedback,
            "strengths": aggregated_analysis.get("strengths", []),
            "improvements": aggregated_analysis.get("improvements", []),
            "recommendations": [aggregated_analysis.get("recommendations", "")]
        })
    except Exception as e:
        print(f"Claude error: {e}")
        return json.dumps({"error": str(e)})
    


    

async def analyze_with_groq(session_payload: Dict, role_prompt: str) -> str:
    """Analyze with Groq (LLaMA 3.1)"""
    try:
        question_feedback = []

        for q in session_payload["questions"]:
            answer = next(
                (a for a in session_payload["answers"] if a["question_id"] == q["question_id"]),
                None
            )

            isolated_prompt = f"""{role_prompt}

Question: {q["question_text"]}
Expected Criteria: {q.get("expected_criteria", "N/A")}
User Answer: {answer["answer_text"] if answer else "No answer provided"}

Provide analysis in JSON format with ONLY these fields:
{{
  "question_number": {q["question_id"]},
  "score": <number between 0-100>,
  "feedback": "<brief feedback>"
}}"""

            response = groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": "Return ONLY valid JSON, no markdown."},
                    {"role": "user", "content": isolated_prompt}
                ],
                temperature=0.3,
                max_tokens=500
            )

            content = extract_json(response.choices[0].message.content)
            question_feedback.append(json.loads(content))

        total_score = sum(item.get("score", 0) for item in question_feedback)
        overall_score = total_score / len(question_feedback) if question_feedback else 0

        aggregated_prompt = f"""{role_prompt}

Session Summary:
- Total questions: {len(session_payload["questions"])}
- Average score: {overall_score:.1f}%

Provide analysis in JSON format:
{{
  "overall_score": {overall_score},
  "detailed_analysis": "<2-3 sentences>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<area 1>", "<area 2>"],
  "recommendations": "<recommendation>"
}}"""

        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "Return ONLY valid JSON, no markdown."},
                {"role": "user", "content": aggregated_prompt}
            ],
            temperature=0.5,
            max_tokens=1000
        )

        content = extract_json(response.choices[0].message.content)
        aggregated_analysis = json.loads(content)

        return json.dumps({
            "overall_score": overall_score * 10,
            "detailed_analysis": aggregated_analysis.get("detailed_analysis", ""),
            "question_feedback": question_feedback,
            "strengths": aggregated_analysis.get("strengths", []),
            "improvements": aggregated_analysis.get("improvements", []),
            "recommendations": [aggregated_analysis.get("recommendations", "")]
        })

    except Exception as e:
        print(f"Groq error: {e}")
        return json.dumps({"error": str(e)})









async def analyze_with_mistral(session_payload: Dict, role_prompt: str) -> str:
    """Analyze with Mistral"""
    try:
        async with httpx.AsyncClient() as client:
            question_feedback = []
            
            for q in session_payload["questions"]:
                answer = next((a for a in session_payload["answers"] if a["question_id"] == q["question_id"]), None)
                
                isolated_prompt = f"""{role_prompt}

Question: {q["question_text"]}
Expected Criteria: {q.get("expected_criteria", "N/A")}
User Answer: {answer["answer_text"] if answer else "No answer provided"}

Provide analysis in JSON format with ONLY these fields:
{{
  "question_number": {q["question_id"]},
  "score": <number between 0-100>,
  "feedback": "<brief feedback>"
}}"""

                response = await client.post(
                    "https://api.mistral.ai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {settings.MISTRAL_API_KEY}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "mistral-large-latest",
                        "messages": [
                            {"role": "system", "content": "Return ONLY valid JSON, no markdown."},
                            {"role": "user", "content": isolated_prompt}
                        ],
                        "temperature": 0.3,
                        "max_tokens": 500
                    },
                    timeout=30.0
                )
                
                result = response.json()
                content = extract_json(result["choices"][0]["message"]["content"])
                question_feedback.append(json.loads(content))
            
            total_score = sum(item.get("score", 0) for item in question_feedback)
            overall_score = total_score / len(question_feedback) if question_feedback else 0
            
            aggregated_prompt = f"""{role_prompt}

Session Summary:
- Total questions: {len(session_payload["questions"])}
- Average score: {overall_score:.1f}%

Provide analysis in JSON format:
{{
  "overall_score": {overall_score},
  "detailed_analysis": "<2-3 sentences>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<area 1>", "<area 2>"],
  "recommendations": "<recommendation>"
}}"""

            response = await client.post(
                "https://api.mistral.ai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.MISTRAL_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "mistral-large-latest",
                    "messages": [
                        {"role": "user", "content": aggregated_prompt}
                    ],
                    "temperature": 0.5,
                    "max_tokens": 1000
                },
                timeout=30.0
            )
            
            result = response.json()
            content = extract_json(result["choices"][0]["message"]["content"])
            aggregated_analysis = json.loads(content)
            
            return json.dumps({
                "overall_score": overall_score * 10,
                "detailed_analysis": aggregated_analysis.get("detailed_analysis", ""),
                "question_feedback": question_feedback,
                "strengths": aggregated_analysis.get("strengths", []),
                "improvements": aggregated_analysis.get("improvements", []),
                "recommendations": [aggregated_analysis.get("recommendations", "")]
            })
    except Exception as e:
        print(f"Mistral error: {e}")
        return json.dumps({"error": str(e)})
    






async def orchestrate_analysis(questions: List[Dict], answers: List[Dict], category: str, level: str) -> Dict:
    """Orchestrate analysis across all 4 AI engines"""
    
    # Create frozen session payload
    session_payload = {
        "session_id": f"{category}_{level}",
        "questions": questions,
        "answers": answers,
        "metadata": {
            "category": category,
            "level": level
        }
    }
    
    # Define role-specific prompts
    role_prompts = {
        "gpt4o": "You are a technical evaluator analyzing cognitive framing abilities. Analyze each question independently.",
        "claude": "You are a pedagogical expert evaluating reasoning patterns. Analyze each question independently.",
        # "groq": "You are a critical thinking assessor evaluating decision-making.",
        "mistral": "You are an AI interaction specialist evaluating meta-cognitive awareness. Analyze each question independently."
    }
    
    # Run all analyses in parallel
    results = await asyncio.gather(
        analyze_with_openai(session_payload, role_prompts["gpt4o"]),
        analyze_with_claude(session_payload, role_prompts["claude"]),
        # analyze_with_groq(session_payload, role_prompts["groq"]),  # Changed from grok
        analyze_with_mistral(session_payload, role_prompts["mistral"]),
        return_exceptions=True
    )
    
    # Structure the output
    return {
        "session_id": session_payload["session_id"],
        "analyses": {
            "gpt4o": results[0],
            "claude": results[1],
            # "groq": results[2],
            "mistral": results[2]
        }
    }