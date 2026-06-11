import { useState } from "react";
import "./App.css";

const STATUS = {
  IDLE: "idle",
  RESULT: "result",
};

const OPTIONS = [
  "공중파",
  "하한가",
  "리딩방",
  "차트분석",
  "거래량",
  "지인추천",
  "뇌동매매",
  "검색순위",
  "신고가",
  "급등주",
  "안개",
  "개입",
];

// 🔥 UI → 내부 키 변환
const imageKeyMap = {
  "검색순위": "rank",
  "뇌동매매": "blood",
  "차트분석": "rank",
  "급등주": "bull",
  "지인추천": "rank",
  "공중파": "rank",
  "신고가": "bull",
  "거래량": "bull",
  "리딩방": "blood",
  "하한가": "blood",

  "안개": "rank",
  "개입": "bull",
};

// 🎯 이미지 풀
const imagePool = {
  rank: [
    "/emotion/rank.webp",
    "/emotion/rank1.webp",
    "/emotion/rank2.webp",
    "/emotion/rank3.webp",
    "/emotion/rank4.webp",
    "/emotion/rank5.webp",
    "/emotion/rank6.webp",
    "/emotion/rank7.webp",
    "/emotion/rank8.webp",
    "/emotion/rank9.webp",
  ],
  blood: [
    "/emotion/blood.webp",
    "/emotion/blood1.webp",
    "/emotion/blood2.webp",
    "/emotion/blood3.webp",
    "/emotion/blood4.webp",
    "/emotion/blood5.webp",
    "/emotion/blood6.webp",
    "/emotion/blood7.webp",
    "/emotion/blood8.webp",
    "/emotion/blood9.webp",
  ],
  bull: [
    "/emotion/bull.webp",
    "/emotion/bull1.webp",
    "/emotion/bull2.webp",
    "/emotion/bull3.webp",
    "/emotion/bull4.webp",
    "/emotion/bull5.webp",
    "/emotion/bull6.webp",
    "/emotion/bull7.webp",
    "/emotion/bull8.webp",
    "/emotion/bull9.webp",
    
  ],
};
 function getWorld() {
  const hour = new Date().getHours();

  if (hour < 6) return "world1";
  if (hour < 12) return "world2";
  if (hour < 18) return "world3";

  return "world4";
}
 const worldModifier = {
  world1: 0,
  world2: 2,
  world3: 4,
  world4: 6,
};
// 📊 시장 텍스트
const marketPool = {
  "검색순위": "지금봤다",
  "뇌동매매": "머리는 죄없다",
  "차트분석": "보이는 척",
  "급등주": "늦었다",
  "지인추천": "고민 했는데",
  "공중파": "뉴스봄",
  "신고가": "부럽다",
  "거래량": "시끌시끌",
  "리딩방": "믿을까?",
  "하한가": "살려줘",

  "안개": "이건 몰랐지?",
  "개입": "신경 끈어",
};

// 💬 결과 텍스트
const finalPool = {
  "검색순위": [
    "이미 늦었을 수 있다",
    "개미는 항상 늦게 반응한다",
    "오늘은 소고기 먹자",
    "탐욕은 손실로 나에게 온다",
  ],
  "뇌동매매": [
    "군중은 항상 늦게 반응한다",
    "먼저가 난 이미 글렀어",
    "뇌는 문제없어 손가락이 ㅅㅂ",
    "라면 먹고싶다",
    "현금 비중을 늘려야돼",
    "평단은 심리를 구하지 못한다",
    "물타기 하다 대주주 될판",
    "기다리다 파도 타고 올라가자",
    "오늘 잘~하면 탈출하겠다",
    "물 들어온다",
  ],
  "차트분석": [
    "차트는 미래를 보장하지 않아",
    "오늘은 수익보다 관망이다",
    "이번달 목표가 달성한다",
    "차트도 나를 속이는구나",
  ],
  "하한가": [
  "칼날은 잡는 게 아니다",
  "바닥 밑에 지하실이 있다",
  "오늘도 존버 테스트",
  "어제 물 탔는데 또 타?",
  "난 저놈들 정말 싫어",
  "손절도 실력이다",
  "파도 타고 승천해 보자",
],
  "급등주": [
  "마감 직전이 가장 위험하다",
  "차트보다 느낌이 더 강하다",
  "버티는 사람이 승자래 올인이다",
  
  "탐욕은 꼭대기에서 폭발한다",
  "올라가라 올라가 쭉쭉",
  "오늘이 바로 그날이구나",
  "대박! 3% 먹었다",
],
  "지인추천": ["정보가 퍼졌을 가능성이 높다",
    "누군가는 이미 팔고있었다",
    "남의 확신은 가장 위험하다",
    "정보가 퍼졌을 가능성이 높다",
    "매수 하라고 한건 아닌데",
    "남의 확신은 가장 위험하다",
  ],
  "공중파": [
    "뉴스는 결과 후에 도착한다",
    "이유가 있을텐데  ㅈㄷ다",
    "구독해서 덕좀보자",
    "옆장은 파티하는데 ㅠㅠㅠ",
  ],
  "신고가": [
    "환호 뒤엔 흔들림이 온다",
    "너무 높다 정신차리자",
    "오늘은 내가 세력이다",
    "날아가는 개미는 극소수다",
  ],
  "거래량": [
    "거래량은 욕망의 흔적이다",
    "원금만 돌려 주세요",
    "오늘 정상에서 만납시다",
    "종가 맛 좋다",
    "개미탐욕이 세력 먹여 살린다",
  ],
  "리딩방": [
    "남의 확신은 나의 손실이 된다",
    "개미들의 회의가 시작됐다",
    "그 방장 어디갔어?",
    "바닥을 아는 개미는 없다",
  ],
  
    "안개": [
  "결국 시장은 아무도 모른다",
  "내가 사니까 안개가 걷친다",
  "희망회로 효과있어?",
  "안개속에 세력도 보인다",
  "나의 순수함이 통했나?",
  "여름 휴가는 물건너 갔다",
],

"개입": [
  "운명이 버튼을 눌렀다",
  "개연성이 삭제되었다",
  "운세 아니고 세력이 움직였다",
  "개미들의 회의가 시작됐다",
  "이건 분석이 아니라 개입이다",
  "I C 8 자마자 오르냐",
],
};

export default function App() {
  const [selected, setSelected] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [marketText, setMarketText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [resultImage, setResultImage] = useState("/emotion/rank.webp");

  const [lastImage, setLastImage] = useState(null);
  const [lastText, setLastText] = useState("");
  const handleSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((v) => v !== item));
      return;
    }
    if (selected.length >= 3) return;
    setSelected([...selected, item]);
  };

  const handleStart = () => {
    if (selected.length === 0) return;
  // 먼저 룰 체크
const hasFog = selected.includes("안개");
const hasIntervene = selected.includes("개입");

// 단독 금지
if (selected.length === 1 && (hasFog || hasIntervene)) {
  alert("단독 사용 불가");
  return;
}

// 동시 금지
if (hasFog && hasIntervene) {
  alert("동시 사용 불가");
  return;
}

// 👉 여기서부터 실행 시작
setIsAnalyzing(true);
  
    setTimeout(() => {
      try {
        // 1️⃣ score 생성
        const score = {};

selected.forEach((item) => {
  score[item] = (score[item] || 0) + 1;
});

        // 🎯 가중 랜덤 함수
const weightedPick = (scoreObj) => {
  const entries = Object.entries(scoreObj);

  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);

  let r = Math.random() * totalWeight;

  for (const [key, weight] of entries) {
    r -= weight;
    if (r <= 0) return key;
  }

  return entries[0]?.[0] || "검색순위";
};

// 👉 main 결정 (우선순위 제거됨)
const main = weightedPick(score);

// 여기 추가
let poolKey = main;

// 개입 먼저 (우선순위 1)
if (selected.includes("개입")) {
  poolKey = "개입";
}

// 안개 (그 외 조건)
else if (selected.includes("안개")) {
  poolKey = "안개";
}

        // 3️⃣ 이미지
        const key = imageKeyMap[poolKey] || "rank";
const list = imagePool[key] || ["/emotion/rank.webp"];



const world = getWorld();

const offset =
  worldModifier[world] || 0;

const randomIndex =
  Math.floor(Math.random() * list.length);

let finalIndex =
  (randomIndex + offset) % list.length;

let finalImage = list[finalIndex];

// 최근 1개 제외 로직
if (list.length > 1 && finalImage === lastImage) {
  finalIndex = (finalIndex + 1) % list.length;
  finalImage = list[finalIndex];
}

setLastImage(finalImage);
setResultImage(finalImage);

        // 4️⃣ 시장 텍스트
        setMarketText(marketPool[main] || "");

        // 5️⃣ 결과 텍스트
        let combinedPool = [];

// 선택된 모든 옵션의 문구 합치기
selected.forEach((item) => {
  const pool = finalPool[item];

  if (pool && Array.isArray(pool)) {
    combinedPool.push(...pool);
  }
});

// fallback
if (combinedPool.length === 0) {
  combinedPool = ["결과 없음"];
}

// 랜덤 1개
let final =
  combinedPool[Math.floor(Math.random() * combinedPool.length)];

if (combinedPool.length > 1) {
  while (final === lastText) {
    final =
      combinedPool[Math.floor(Math.random() * combinedPool.length)];
  }
}

setLastText(final);
setFinalText(final);
      } catch (e) {
        console.error(e);
        setResultImage("/emotion/rank.webp");
      } finally {
        setIsAnalyzing(false);
        setSelected([]);
      }
    }, 2500);
  };

  return (
    <div className="container">
      <h1>조작된 운명</h1>

      <div className="optionsGrid">
        {OPTIONS.map((item) => (
          <div
            key={item}
            className={`option ${
  selected.includes(item) ? "active" : ""
} ${
  item === "개입" ? "warning" : ""
}`}
            onClick={() => handleSelect(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="resultBox">
        <div className="overlayTop">
          {marketText || "시장 흐름 분석"}
        </div>

        <div className="imageArea">
          <img src={resultImage} className="resultImage" />
        </div>

        <div className="overlayBottom">
          {finalText || "시장은 항상 늦게 알려준다"}
        </div>
      </div>

      <div className={`maker ${isAnalyzing ? "analyzing" : ""}`}>
        {isAnalyzing ? "공인목수 콤푸 돌아가는중..." : "공인목수"}
      </div>

      <div className="buttonArea">
        <button
          onClick={handleStart}
          disabled={selected.length === 0 || isAnalyzing}
        >
          START
        </button>
      </div>
    </div>
  );
}