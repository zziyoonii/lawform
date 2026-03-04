const { callGemini } = require('../lib/gemini');
const { jsonrepair } = require('jsonrepair');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST만 지원합니다' });
    return;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch {
    res.status(400).json({ error: 'JSON 형식이 올바르지 않습니다' });
    return;
  }

  const { tosText, ppText, plan } = body;
  if (!plan) {
    res.status(400).json({ error: '기획안이 없습니다' });
    return;
  }

  try {
    const raw = await callGemini(tosText || '', ppText || '', plan);

    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('JSON 파싱 실패. 응답: ' + cleaned.substring(0, 200));

    let jsonStr = match[0]
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/,(\s*[}\]])/g, '$1');

    let result;
    try {
      result = JSON.parse(jsonStr);
    } catch {
      try {
        jsonStr = jsonrepair(jsonStr);
        result = JSON.parse(jsonStr);
      } catch (e2) {
        throw new Error('JSON 파싱 실패. AI 응답 형식 오류: ' + e2.message);
      }
    }
    res.status(200).json({ success: true, result });
  } catch (e) {
    console.error('[분석 오류]', e.message);
    res.status(500).json({ error: e.message });
  }
};
