import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import img01 from "../../assets/images/sub/img_hts01.png";

const PowerGraphics = () => {

  const mainItem = {
    img: img01,
    features: [
      {
        title: "HTS급 분석 수식 DB",
        desc: "지표 250종, 신호 160종, 구간 70종, 패턴 120종, 채움 50종",
      },
      {
        title: "17종의 차트 유형 및 40여종의 추세선",
        desc: "",
      },
      {
        title: "추세선 매매",
        desc: "돌파 감지 후 알림·주문창 연동",
      },
      {
        title: "분할 차트",
        desc: "최대 4개 분할 및 동기화",
      },
      {
        title: "비교 차트, 폼차트·폼그래프(약 30여종)",
        desc: "",
      },
      {
        title: "HTS ↔ MTS 차트 설정 연동",
        desc: "",
      },
    ],
  };

  const subItem = {
    img: img01,
    features: [
      {
        title: "다년간 차트 개발 경험이 집약된 모바일 전용 엔진",
      },
      {
        title: "업계 최초 HTS ↔ MTS DB 및 속성 호환 — Android ↔ iOS 속성까지 호환",
      },
      {
        title: "App 내 다크 모드 완전 지원 — 시스템 설정과 독립적으로 동작",
      },
      {
        title: "세로·가로 모드 전용 UI 분리 설계",
      },
      {
        title: "Android 5.0 / iOS 13.0 이상 지원",
      },
    ],
  };

  return (
    <div className="product">

      <SectionTitle
        variant="center"
        centerTop="HTS의 분석력, 모바일의 경험으로"
        title="파워그래픽스 - MTS"
        desc="파워그래픽스 3.0은 다년간 쌓아온 차트 개발 역량을 모바일 환경에 맞게 재설계한 분석 솔루션입니다. <br>HTS의 수식 DB와 사용자 설정을 그대로 이어받을 수 있는 업계 최초의 HTS<br>↔ MTS 연동 구조를 바탕으로, Android와 iOS에서 일관된 분석 경험을 제공합니다."
      />

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

      <div className="product__extra">

        <div className="product__inner inner">

          <SectionTitle
            variant="sub"
            en="more FEATURE"
            title="핵심 강점"
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

      <div className="product__cta">
        <div className="product__inner inner">

          <p className="product__cta-text">
            지금 바로 MTS 솔루션을 <br></br>
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

export default PowerGraphics;