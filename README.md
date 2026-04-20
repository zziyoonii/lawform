# LawForm - AI 법적 준수 검토 도구

서비스 기획서와 약관을 분석하여 한국 법령 준수 여부를 자동으로 검토하는 AI 도구입니다.

## 주요 기능

- **약관 분석**: 서비스 이용약관 및 개인정보 처리방침을 URL 또는 직접 입력으로 분석
- **기획서 검토**: 새로운 서비스 기능 기획서를 업로드하여 법적 준수 여부 확인
- **법령 자동 반영**: 개인정보보호법, 정보통신망법, 전자상거래법 등 최신 한국 법령 자동 로드
- **상세 리포트**: 위반 항목, 심각도, 필요 고지 기간(7일/30일), 약관 수정 초안 제공

## 기술 스택

- **Backend**: Node.js (v18+), 내장 HTTP/HTTPS 모듈
- **AI**: Google Gemini Flash API
- **Frontend**: Vanilla JS, PDF.js, Pretendard 폰트
- **배포**: Vercel

## 시작하기

### 사전 요구사항

- Node.js v18 이상
- Google Gemini API 키

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정
export GEMINI_API_KEY=your_api_key_here

# 서버 실행
node server.js
```

서버가 실행되면 `http://localhost:3000` 에서 접속할 수 있습니다.

### 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini API 키 | 필수 |
| `GA_ID` | Google Analytics 4 측정 ID | 선택 |
| `ADSENSE_ID` | Google AdSense 게시자 ID | 선택 |
| `PORT` | 서버 포트 (기본값: 3000) | 선택 |

## API

### POST /analyze

서비스 기획서와 약관을 분석합니다.

**Request Body**
```json
{
  "tosText": "이용약관 내용",
  "privacyText": "개인정보 처리방침 내용",
  "planText": "서비스 기획서 내용"
}
```

**Response**
```json
{
  "verdict": "pass | partial | fail",
  "issues": [...],
  "statistics": {...},
  "noticeRequirements": {...}
}
```

### GET /fetch?url=

외부 URL에서 약관 텍스트를 크롤링합니다. 결과는 1시간 캐시됩니다.

## 라이선스

MIT
