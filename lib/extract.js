const KEYWORDS = [
  '개인정보', '수집', '이용', '제공', '위탁', '파기', '보유', '처리',
  '동의', '권리', '의무', '제한', '금지', '책임', '손해', '위반',
  '제3자', '광고', '마케팅', '위치', '결제', '환불', '계정', '해지',
  '쿠키', '로그', '행태', '분석', '연동', '소셜', '로그인',
];

function extractRelevantSections(text, maxLength = 6000) {
  if (text.length <= maxLength) return text;
  const sentences = text.split(/(?<=[.。\n])\s+/);
  const topPart = sentences.slice(0, 20).join(' ');
  const relevant = sentences
    .map(s => ({ s, score: KEYWORDS.reduce((acc, kw) => acc + (s.includes(kw) ? 1 : 0), 0) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 80)
    .map(x => x.s)
    .join(' ');
  return (topPart + '\n\n[핵심 조항 발췌]\n' + relevant).substring(0, maxLength);
}

module.exports = { extractRelevantSections };
