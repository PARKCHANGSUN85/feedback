export async function POST(req) {
  console.log('✅ API /api/gpt POST called');
  const { feedbackText } = await req.json();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Vercel에 OPENAI_API_KEY 설정 필요
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // 또는 gpt-4o
        messages: [
          {
            role: 'user',
            content: `너는 조직문화/리더십 커뮤니케이션 전문가다.
아래 문장을 "명확성", "공감성", "긍정성", "피드백 적절성" 네 가지 항목으로 평가해라.

- 각 항목은 100점 만점으로 점수를 주고
- 각 점수에 대한 평가 이유를 1~2문장으로 설명해라.
- 마지막에 "종합 피드백" 한 줄을 추가로 제공해라.
- 특히 비꼬기나 과도한 농담 등 인간 언어의 특수성을 고려해라
- 또한 적절한 다른 방식의 답변을 직접 작성해서 추천해라.

반드시 아래 형식으로 답변할 것 (형식 엄수):

명확성: XX점 - (설명)  
공감성: XX점 - (설명)  
긍정성: XX점 - (설명)  
피드백 적절성: XX점 - (설명)  

종합 피드백: (한 줄)

평가할 문장: """${feedbackText}"""
`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify({ result: data.choices[0].message.content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GPT API 호출 오류:', error);
    return new Response(JSON.stringify({ error: '서버 오류 발생' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
