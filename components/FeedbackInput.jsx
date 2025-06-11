'use client';

import React, { useState } from 'react';
import { gptFeedbackAction } from '../app/scripts/gptFeedbackAction';

const FeedbackInput = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResultText('');
    try {
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
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-left">피드백 분석</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="팀원에게 피드백할 때 평소 사용하는 문장을 적어보세요."
          className="w-full p-4 text-base leading-relaxed rounded border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
        />
        <button
          type="submit"
          className="w-full py-4 text-base font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-700"
          disabled={isLoading}
        >
          {isLoading ? '분석 중...' : '분석하기'}
        </button>
      </form>
      {isLoading ? (
        <p className="text-center mt-4 text-gray-400">로딩 중...</p>
      ) : (
        resultText && (
          <div className="mt-4 p-4 rounded bg-gray-900 text-gray-200 whitespace-pre-line">
            {resultText}
          </div>
        )
      )}
    </div>
  );
};

export default FeedbackInput;
