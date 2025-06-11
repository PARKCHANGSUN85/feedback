'use client';

import React, { useState } from 'react';
import { gptFeedbackAction } from '../app/scripts/gptFeedbackAction';

const FeedbackInput = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called'); // 디버그용 추가

    setIsLoading(true);
    setResultText('');
try{
    const data = await gptFeedbackAction(feedbackText);
      if (data.result) {
        setResultText(data.result);
      } else {
        setResultText('응답을 받지 못했습니다.');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      setResultText('오류가 발생했습니다.');
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border border-gray-200 rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">피드백 분석</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="팀원에게 피드백할 때 평소 사용하는 문장을 적어보세요."
          className="resize-none p-3 text-base leading-relaxed rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[120px]"
        />
        <button
          type="submit"
          className="py-3 px-6 text-base font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? '분석 중...' : '분석하기'}
        </button>
      </form>
      {isLoading ? (
        <p className="text-center mt-6 italic text-gray-500">로딩 중...</p>
      ) : (
        resultText && <div className="mt-8 p-4 border border-gray-100 bg-gray-50 rounded text-gray-800 whitespace-pre-line">{resultText}</div>
      )}
    </div>
  );
};

export default FeedbackInput; // 반드시 필요!
