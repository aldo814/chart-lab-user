import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import img01 from "../../assets/images/sub/img_hts01.png";

const PowerChart = () => {

  // 주요 기능
  const mainItem = {
    img: img01,
    features: [
      {
        title: "업계 최다 수준의 분석 수식 DB",
        desc: "지표 230종, 시그널 160종, 구간 70종, 패턴 70종, 추세선 60종, 매매전략 50종",
      },
      {
        title: "사용자 수식 제작 환경",
        desc: "수식관리자 · 데이터 위자드",
      },
      {
        title: "국내 최초 분할 이벤트 감시",
        desc: "한 차트에서 최대 12종목 실시간 모니터링",
      },
      {
        title: "시스템 트레이딩 및 최적화 전략",
        desc: "가상매매 시뮬레이션 및 리포트 제공",
      },
      {
        title: "FormDev 연동 폼차트·폼그래프",
        desc: "Script 기반 개발로 공수 절감",
      },
      {
        title: "특수차트",
        desc: "매매복기, MarketProfile, 언론차트, MarketMap 등",
      },
      {
        title: "유연한 데이터 연동",
        desc: "Excel, Image, HTML, PDF 등 다양한 포맷 지원",
      },
    ],
  };

  // 추가 특징 
  const subItem = {
    img: img01,
    features: [
      {
        title: "FastLight Drawing 기법 기반의 고성능 렌더링"
      },
      {
        title: "선물 만기 틱차트 환경에서도 안정적인 퍼포먼스",
      },
      {
        title: "강력한 분할 프레임 및 차트 간 동기화",
      },
      {
        title: "초급자·고급자 모드 분리로 폭넓은 사용자층 수용",
      },
      {
        title: "국내 주요 금융기관 다수 납품으로 검증된 안정성",
      },
    ],
  };

  return (
    <div className="product">

      <SectionTitle
        variant="center"
        centerTop="금융 현장에서 완성된 통합 차트 솔루션"
        title="파워차트 - HTS"
        desc="파워차트 2.5는 국내 주요 증권사·선물사·은행의 실무 환경에서 검증된 HTS 차트 시스템입니다. <br>230여 종에 이르는 분석 지표, 실시간 이벤트 감시, 시스템 트레이딩 기능을<br> 하나의 엔진 위에 구현해 전문 트레이더의 고도화된 분석 니즈에 응답합니다."
      />

      {/* ===== 주요 기능 ===== */}
      <div className="product__inner inner">

        <SectionTitle
          variant="sub"
          en="CORE FEATURE"
          title="주요 기능"
        />

        <div className="product__item">

          <div className="product__img">
            <img src={mainItem.img} alt="" />
          </div>

          <ul className="product__feature-list">
            {mainItem.features.map((item, idx) => (
              <li className="product__feature" key={idx}>
                <span className="product__num">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="product__text">
                  <h4 className="product__title">{item.title}</h4>
                  <p className="product__desc">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>

      {/* ===== 추가 특징 ===== */}
      <div className="product__extra">

        <div className="product__inner inner">

          <SectionTitle
            variant="sub"
            en="more FEATURE"
            title="추가 특징"
          />

          <div className="product__item">

            <div className="product__img">
              <img src={subItem.img} alt="" />
            </div>

            <ul className="product__feature-list product__feature-list--extra">
              {subItem.features.map((item, idx) => (
                <li className="product__feature" key={idx}>
                  <span className="product__num">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="product__text">
                    <h4 className="product__title">{item.title}</h4>
                    <p className="product__desc">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </div>

    {/* ===== 문의하기 CTA ===== */}
<div className="product__cta">
  <div className="product__inner inner">

    <p className="product__cta-text">
      지금 바로 HTS 솔루션을 <br></br>
      <strong>경험해보세요</strong>
    </p>

    <Button
      variant="arrow-white-green"
      to="/contact"
      className="product__cta-btn"
    >
      문의하기
    </Button>

  </div>
</div>

    </div>
  );
};

export default PowerChart;