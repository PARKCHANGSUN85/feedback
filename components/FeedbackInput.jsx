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
    <div className="input-container">
      <h2 className="text-3xl font-bold mb-8 text-center">피드백 분석</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="팀원에게 피드백할 때 평소 사용하는 문장을 적어보세요."
          className="feedback-input min-h-[120px] resize-none"
        />
        <button
          type="submit"
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? '분석 중...' : '분석하기'}
        </button>
      </form>
      {isLoading ? (
        <p className="text-center mt-6 text-gray-400">로딩 중...</p>
      ) : (
        resultText && (
          <div className="result-container whitespace-pre-line">
            {resultText}
          </div>
        )
      )}
    </div>
  );
};

export default FeedbackInput;
