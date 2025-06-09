"use client";

import React, { useState } from 'react';

const FeedbackInput = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResultText(''); // 이전 결과 초기화

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // 여기에 본인의 API KEY 넣기
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // 또는 'gpt-3.5-turbo'
          messages: [
            {
              role: 'user',
              content: `너는 조직문화/리더십 커뮤니케이션 전문가다.
아래 문장을 "명확성", "공감성", "긍정성", "피드백 적절성" 네 가지 항목으로 평가해라.
특히 비꼬는 표현이나 가스라이팅이 될 수 있는 표현들의 분석을 유의해라.
또한 명확하게 전달하면서도 다음 행동이나 요구사항이 정확히 무엇인지 파악되는지 확인해라.

- 각 항목은 100점 만점으로 점수를 주고
- 각 점수에 대한 평가 이유를 1~2문장으로 설명해라.
- 마지막에 "종합 피드백" 한 줄을 추가로 제공해라.

반드시 아래 형식으로 답변할 것 (형식 엄수):

명확성: XX점 - (설명)  
공감성: XX점 - (설명)  
긍정성: XX점 - (설명)  
피드백 적절성: XX점 - (설명)  

종합 피드백: (한 줄)

평가할 문장: """{feedbackText}"""
 문장: "${feedbackText}"`,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        setResultText(data.choices[0].message.content);
      } else {
        setResultText('응답을 받지 못했습니다.');
      }
    } catch (error) {
      console.error('GPT API 호출 오류:', error);
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
