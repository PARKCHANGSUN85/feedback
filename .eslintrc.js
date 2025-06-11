module.exports = {
    extends: [
      'next',
      'next/core-web-vitals',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      // 'plugin:tailwindcss/recommended', // tailwindcss v4는 주의
    ],
    rules: {
      'no-undef': 'error', // 정의되지 않은 변수/함수 사용 금지
      // 필요시 추가 규칙
    },
  };