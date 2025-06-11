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
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `너는 조직문화/리더십 커뮤니케이션 전문가다.

아래 문장을 "명확성", "공감성", "긍정성", "피드백 적절성" 네 가지 항목으로 평가해라.

아래 조건을 반드시 지켜라:
1. 장난스럽거나 너무 짧은 문장, 맥락이 부족한 문장, 정보가 부족한 문장에는 반드시 추가 정보나 맥락을 요청하는 문구를 포함할 것.
2. 비속어, 비꼬기, 가스라이팅, 놀림, 공격적/부정적 뉘앙스가 포함된 경우 반드시 낮은 점수를 주고, 그 이유를 구체적으로 설명할 것.
3. 명확성은 논리적 구조와 6하원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)이 잘 드러나는지 평가할 것.
4. 공감성, 긍정성, 피드백 적절성은 피드백 받는 사람의 감정과 상황을 반드시 고려할 것.
5. 각 항목은 100점 만점으로 점수를 주고, 점수에 대한 이유를 1~2문장으로 설명할 것.
6. 마지막에 "종합 피드백"과 "더 좋은 문장 예시"를 반드시 포함할 것.

아래와 같은 예시를 참고하라:
예시1: "야, 너 진짜 일 못한다."
→ 명확성: 60점 - 문장은 명확하지만, 비꼬는 뉘앙스가 있음
→ 공감성: 10점 - 상대방 감정을 고려하지 않음
→ 긍정성: 5점 - 긍정적 요소 없음
→ 피드백 적절성: 10점 - 개선점 제시 없음
→ 종합 피드백: 비꼬는 표현과 부정적 언어는 피해야 함
→ 더 좋은 문장 예시: "이번 업무에서 어려움을 겪은 부분이 있다면 함께 이야기해보고 싶어요."

예시2: "수고했어."
→ 명확성: 40점 - 구체적 내용이 없음
→ 공감성: 80점 - 상대방을 배려함
→ 긍정성: 80점 - 긍정적임
→ 피드백 적절성: 30점 - 구체적 피드백이 없음
→ 종합 피드백: 구체적인 칭찬이나 개선점을 함께 제시하면 더 좋음
→ 더 좋은 문장 예시: "이번 프로젝트에서 꼼꼼하게 자료를 정리해줘서 고마워!"

반드시 아래 형식으로 답변할 것 (형식 엄수):

명확성: XX점 - (설명)  
공감성: XX점 - (설명)  
긍정성: XX점 - (설명)  
피드백 적절성: XX점 - (설명)  

종합 피드백: (한 줄)
더 좋은 문장 예시: (문장으로 도출)

평가할 문장: """${feedbackText}"""`
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