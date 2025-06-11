'use server';

export async function gptFeedbackAction(feedbackText) {
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `너는 조직문화/리더십 커뮤니케이션 전문가다.
아래 문장을 \"명확성\", \"공감성\", \"긍정성\", \"피드백 적절성\" 네 가지 항목으로 평가해라.
단 아래 조건을 준수할 것
1. 장난스럽거나 너무 짧은 문장에 대해서는 추가적인 정보를 요청하는 문구를 도출할 것
2. 맥락이나 정보가 더 필요한 경우에는 추가적인 맥락 정보를 요청할 것
3. 비속어나 인간이 이해하기에 비꼬기, 가스라이팅 등 부정적인 정보가 있다면 명확한 표현이라고 해도 낮은 점수를 부여하고, 왜 그런지 설명할 것
4. 명확성의 경우 전달 정보의 논리성과 6하원칙이 준수되었는지가 핵심
5. 공감성의 경우 피드백 받는 사람의 감정을 고려해서 평가할 것
6. 긍정성의 경우 피드백 받는 사람의 감정을 고려해서 평가할 것
7. 피드백 적절성의 경우 피드백 받는 사람의 감정을 고려해서 평가할 것
8. 최종적으로 더 좋은 문장의 예시를 도출할 것

- 각 항목은 100점 만점으로 점수를 주고
- 각 점수에 대한 평가 이유를 1~2문장으로 설명해라.
- 마지막에 \"종합 피드백\"과 \"더 좋은 문장 예시\"를 추가로 제공해라.

반드시 아래 형식으로 답변할 것 (형식 엄수):

명확성: XX점 - (설명)  
공감성: XX점 - (설명)  
긍정성: XX점 - (설명)  
피드백 적절성: XX점 - (설명)  

종합 피드백: (한 줄)
더 좋은 문장 예시 : (문장으로 도출)

평가할 문장: \"\"\"${feedbackText}\"\"\"`
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }
    return { result: data.choices[0].message.content };
  } catch (error) {
    console.error('GPT API 호출 오류:', error);
    return { error: '서버 오류 발생' };
  }
} 