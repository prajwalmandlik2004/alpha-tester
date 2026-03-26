'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { seriesTestAPI } from '@/src/lib/api';
import toast from 'react-hot-toast';

export default function SeriesSequentialAnalysisPage() {
  const router = useRouter();
  const params = useParams();
  const testId = parseInt(params.id as string);

  const [result, setResult] = useState<any>(null);
  const [testData, setTestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [resultRes, answersRes] = await Promise.all([
          seriesTestAPI.getResult(testId),
          seriesTestAPI.getAnswers(testId),
        ]);
        setResult(resultRes.data);
        setTestData(answersRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load sequential analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#050E3C]"></div>
      </div>
    );
  }

  if (!result || !testData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No data available.</p>
      </div>
    );
  }

  const questions = testData.questions || [];
  const answers = testData.answers || [];
  const modelName = 'gpt4o';
  const questionFeedback = result?.analyses?.[modelName]?.question_feedback || [];

  // Build a lookup for answers by question_id
  const answerMap: Record<number, string> = {};
  answers.forEach((a: any) => {
    answerMap[a.question_id] = a.answer_text;
  });

  return (
    <div className="min-h-screen px-4 py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#050E3C] mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white p-6 mb-6 shadow">
          <h1 className="text-2xl font-bold text-[#050E3C]">Sequential Analysis</h1>
          <p className="text-gray-600 mt-1">{testData.series_type} — {questions.length} questions</p>
        </div>

        {/* Question Cards */}
        <div className="space-y-6">
          {questions.map((q: any, index: number) => {
            const answer = answerMap[q.question_id] || 'No answer';
            const fb = questionFeedback.find((f: any) => f.question_number === index + 1) || questionFeedback[index];
            const analysis = fb?.feedback || 'No analysis available';

            return (
              <div key={index} className="bg-white shadow-md">
                {/* Sequence Number */}
                <div className="bg-gray-50 px-6 py-3 border-b flex items-center space-x-3">
                  <span className="font-bold bg-[#050E3C] w-8 h-8 text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-500 text-sm">Question {index + 1} of {questions.length}</span>
                </div>

                <div className="p-6 space-y-5">
                  {/* Question */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Question :</h4>
                    <p className="text-gray-800 leading-relaxed">{q.question_text}</p>
                  </div>

                  {/* Answer */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Réponse :</h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{answer}</p>
                  </div>

                  {/* Analysis */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Analyse :</h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{analysis}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
