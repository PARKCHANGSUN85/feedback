"use client";

import React, { useState } from 'react';

const FeedbackInput = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setResultText('');

  try {
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedbackText }),
    });

    const data = await response.json();

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
    <div style={styles.container}>
      <h1 style={styles.title}>피드백 문장 분석하기</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          style={styles.textarea}
          placeholder="팀원에게 피드백할 때 평소 사용하는 문장을 적어보세요."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          rows={6}
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? '분석 중...' : '분석하기'}
        </button>
      </form>

      {resultText && (
        <div style={styles.result}>
          <h3>분석 결과</h3>
          <p>{resultText}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    resize: 'none',
    padding: '10px',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '30px',
    padding: '15px',
    border: '1px solid #eee',
    backgroundColor: '#fafafa',
    borderRadius: '4px',
  },
};

export default FeedbackInput;
