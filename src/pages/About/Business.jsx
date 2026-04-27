import React from "react";
import SectionTitle from "../../components/SectionTitle";
import DotList from "../../components/DotList";

import imgBusiness01 from "../../assets/images/sub/img_business01.png";
import imgBusiness02 from "../../assets/images/sub/img_business02.png";

/* ================= DATA ================= */
const businessData = [
  {
    id: 1,
    badge: "차트 솔루션",
    title: "HTS 차트 솔루션",
    intro:"증권사·선물사·은행을 위한 데스크톱 기반 종합 차트 시스템을 구축합니다.",
    desc: [
      "다년간 차트·그래픽 개발 경험을 보유한 전문 인력의 엔진 설계",
      "LS증권·신한투자증권·유안타증권·IBK기업은행 등 국내 주요 금융기관 납품 실적",
      "FastLight Drawing 기법 기반의 고성능 렌더링 및 선물 만기 틱차트 대응력",
      "분석 지표 230종, 시스템 트레이딩, 실시간 이벤트 감시까지 아우르는 통합 분석 환경"
    ],
    img: imgBusiness01,
  },
  {
    id: 2,
    badge: "차트 솔루션",
    title: "MTS 차트 솔루션",
    intro:"iOS·Android 환경에 최적화된 모바일 차트 솔루션을 공급합니다.",
    desc: [
      "HTS·MTS·FX·해외선물·폼차트를 하나의 엔진으로 구현하는 통합 아키텍처",
      "HTS 차트 설정과 수식 DB를 모바일에서 그대로 이어받는 연동 구조",
      "Android·iOS 속성 호환 설계로 크로스 플랫폼 일관성 확보",
      "LS증권 파워그래픽스 3.0 납품을 포함한 모바일 차트 솔루션 공급 실적",
    ],
    img: imgBusiness02,
  },
];

const Business = () => {
  return (
    <div className="sub-business">
      <div className="inner">
      <div className="sub-business__intro">
        <h3 className="business__title">차트연구소는 금융 차트 <strong className="sub-business__highlight">솔루션 전문 기업</strong>입니다.</h3>
        <p className="sub-business__desc">2011년 설립 이래, 차트연구소는 국내 주요 증권사·선물사·은행의 HTS·MTS 차트 시스템을 만들어왔습니다. <br></br>
차트 엔진 설계부터 분석 수식 DB, 사용자 인터페이스 구현, 납품 이후의 유지보수에 이르기까지 —  <br></br>
금융 차트에 필요한 모든 영역을 자체 기술력으로 설계하고 운영합니다.</p>
      </div>
      <SectionTitle
        en="Business Areas"
        title="사업 소개"
      />

      <div className="sub-business__list">

        {businessData.map((item) => (
          <div className="sub-business__item" key={item.id}>

            {/* IMAGE */}
            <div className="sub-business__img">
              <img src={item.img} alt={item.title} />
            </div>

            {/* CONTENT */}
            <div className="sub-business__content">

              <div className="sub-business__head">
                <span className="sub-business__badge">
                  {item.badge}
                </span>

                <h3 className="sub-business__title">
                  <span className="sub-business__num">0{item.id}</span>
                  {item.title}
                </h3>

                <span className="sub-business__desc">
                  {item.intro}
                </span>
              </div>

              {/* DOT LIST COMPONENT */}
              <DotList items={item.desc} />

            </div>

          </div>
        ))}

      </div>
      </div>
      <div className="sub-business__outro">
        <div className="inner">
      <p className="sub-business__outro-text">
      제품 납품을 넘어, 고객과 함께 성장하는 <br></br>
<strong>기술 파트너를 지향합니다.</strong>
      </p></div>
    </div>
    </div>
  );
};

export default Business;