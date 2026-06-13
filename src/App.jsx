import { useState } from "react";
import "./App.css";

/* -------------------------
   OPTIONS (UI)
-------------------------- */
const OPTIONS = [
  "공 중 파",
  "하 한 가",
  "리 딩 방",
  "차 트",
  "거 래 량",
  "지 인",
  "뇌 동 매",
  "검 색 순",
  "신 고 가",
  "급 등 주",
  "물 타 기",
  "개 입",
];

/* -------------------------
   KEY MAP
-------------------------- */
const imageKeyMap = {
  "검 색 순": "rank",
  "뇌 동 매": "blood",
  "차 트": "rank",
  "급 등 주": "bull",
  "지 인": "rank",
  "공 중 파": "rank",
  "신 고 가": "bull",
  "거 래 량": "bull",
  "리 딩 방": "blood",
  "하 한 가": "blood",
  "물 타 기": "rank",
  "개 입": "bull",
};

/* -------------------------
   IMAGE POOL
-------------------------- */
const imagePool = {
  rank: [
    import.meta.env.BASE_URL + "emotion/rank.webp",
    import.meta.env.BASE_URL + "emotion/rank1.webp",
    import.meta.env.BASE_URL + "emotion/rank2.webp",
    import.meta.env.BASE_URL + "emotion/rank3.webp",
    import.meta.env.BASE_URL + "emotion/rank4.webp",
    import.meta.env.BASE_URL + "emotion/rank5.webp",
    import.meta.env.BASE_URL + "emotion/rank6.webp",
    import.meta.env.BASE_URL + "emotion/rank7.webp",
    import.meta.env.BASE_URL + "emotion/rank8.webp",
    import.meta.env.BASE_URL + "emotion/rank9.webp",
  ],
  blood: [
    import.meta.env.BASE_URL + "emotion/blood.webp",
    import.meta.env.BASE_URL + "emotion/blood1.webp",
    import.meta.env.BASE_URL + "emotion/blood2.webp",
    import.meta.env.BASE_URL + "emotion/blood3.webp",
    import.meta.env.BASE_URL + "emotion/blood4.webp",
    import.meta.env.BASE_URL + "emotion/blood5.webp",
    import.meta.env.BASE_URL + "emotion/blood6.webp",
    import.meta.env.BASE_URL + "emotion/blood7.webp",
    import.meta.env.BASE_URL + "emotion/blood8.webp",
    import.meta.env.BASE_URL + "emotion/blood9.webp",
  ],
  bull: [
    import.meta.env.BASE_URL + "emotion/bull.webp",
    import.meta.env.BASE_URL + "emotion/bull1.webp",
    import.meta.env.BASE_URL + "emotion/bull2.webp",
    import.meta.env.BASE_URL + "emotion/bull3.webp",
    import.meta.env.BASE_URL + "emotion/bull4.webp",
    import.meta.env.BASE_URL + "emotion/bull5.webp",
    import.meta.env.BASE_URL + "emotion/bull6.webp",
    import.meta.env.BASE_URL + "emotion/bull7.webp",
    import.meta.env.BASE_URL + "emotion/bull8.webp",
    import.meta.env.BASE_URL + "emotion/bull9.webp",
  ],
};

/* -------------------------
   MARKET TEXT
-------------------------- */
const marketPool = {
  "검 색 순": "지금봤다",
  "뇌 동 매": "머리는 죄없다",
  "차 트": "보이는 척",
  "급 등 주": "늦었다",
  "지 인": "고민 했는데",
  "공 중 파": "뉴스봄",
  "신 고 가": "부럽다",
  "거 래 량": "시끌시끌",
  "리 딩 방": "믿을까?",
  "하 한 가": "살려줘",
  "물 타 기": "이건 몰랐지?",
  "개 입": "신경 끈어",
};

/* -------------------------
   FINAL TEXT
-------------------------- */
const finalPool = {
  "검 색 순": [
    "이미 늦었을 수 있다",
    "개미는 항상 늦게 반응한다",
    "오늘은 소고기 먹자",
    "탐욕은 손실로 나에게 온다",
  ],
  "뇌 동 매": [
    "군중은 항상 늦게 반응한다",
    "먼저가 난 이미 글렀어",
    "뇌는 문제없어 손가락이 ㅅㅂ",
    "라면 먹고싶다",
  ],
  "차 트": [
    "차트는 미래를 보장하지 않아",
    "오늘은 수익보다 관망이다",
    "차트도 나를 속이는구나",
  ],
  "하 한 가": [
    "바닥 밑에 지하실이 있다",
    "손절도 실력이다",
    "존버 테스트",
  ],
  "급 등 주": [
    "탐욕은 꼭대기에서 폭발한다",
    "오늘이 바로 그날",
    "대박!",
  ],
  "지 인": [
    "남의 확신은 위험하다",
    "이미 팔았을 수도",
  ],
  "공 중 파": [
    "뉴스는 항상 늦는다",
    "이미 끝났을 수도",
  ],
  "신 고 가": [
    "환호 뒤엔 흔들림",
    "너무 높다",
  ],
  "거 래 량": [
    "욕망의 흔적",
    "개미가 만든 파도",
  ],
  "리 딩 방": [
    "확신은 위험하다",
    "이미 늦었다",
  ],
  "물 타 기": [
    "결국 아무도 모른다",
    "흘러내린다",
  ],
  "개 입": [
    "운명이 개입했다",
    "분석이 아니다",
  ],
};

/* -------------------------
   WORLD SYSTEM
-------------------------- */
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

/* -------------------------
   APP
-------------------------- */
export default function App() {
  const [selected, setSelected] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [marketText, setMarketText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [resultImage, setResultImage] = useState("/emotion/rank.webp");

  const [lastImage, setLastImage] = useState(null);
  const [lastText, setLastText] = useState("");

  const INTERVENE = "개 입";

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

    // 단독 금지
    const hasIntervene = selected.includes(INTERVENE);

    if (selected.length === 1 && hasIntervene) {
      alert("단독 사용 불가");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      try {
        /* -------------------------
           SCORE
        -------------------------- */
        const score = {};
        selected.forEach((item) => {
          score[item] = (score[item] || 0) + 1;
        });

        const weightedPick = (scoreObj) => {
          const entries = Object.entries(scoreObj);
          const total = entries.reduce((s, [, w]) => s + w, 0);

          let r = Math.random() * total;

          for (const [key, weight] of entries) {
            r -= weight;
            if (r <= 0) return key;
          }

          return entries[0]?.[0] || "검 색 순";
        };

        const main = weightedPick(score);

        let poolKey = main;

        if (selected.includes("개 입")) {
          poolKey = "개 입";
        }

        /* -------------------------
           IMAGE
        -------------------------- */
        const key = imageKeyMap[poolKey] || "rank";
        const list = imagePool[key] || ["/emotion/rank.webp"];

        const world = getWorld();
        const offset = worldModifier[world] || 0;

        const randomIndex = Math.floor(Math.random() * list.length);
        let finalIndex = (randomIndex + offset) % list.length;

        let finalImage = list[finalIndex];

        if (list.length > 1 && finalImage === lastImage) {
          finalIndex = (finalIndex + 1) % list.length;
          finalImage = list[finalIndex];
        }

        setLastImage(finalImage);
        setResultImage(finalImage);

        /* -------------------------
           MARKET TEXT
        -------------------------- */
        setMarketText(marketPool[main] || "시장 흐름 분석");

        /* -------------------------
           FINAL TEXT
        -------------------------- */
        let combined = [];

        selected.forEach((item) => {
          const pool = finalPool[item];
          if (pool) combined.push(...pool);
        });

        if (combined.length === 0) combined = ["결과 없음"];

        let final =
          combined[Math.floor(Math.random() * combined.length)];

        while (final === lastText && combined.length > 1) {
          final =
            combined[Math.floor(Math.random() * combined.length)];
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
        {isAnalyzing ? "공인목수 분석중..." : "공인목수"}
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