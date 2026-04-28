import React from "react";
import SectionTitle from "../../components/SectionTitle";
import DotList from "../../components/DotList";
import ceoImg from "../../assets/images/sub/img_ceo.png";

/* ================= DATA ================= */
const ceoData = {
  title: "차트 솔루션의 새로운 기준을 <br><strong>만들어가고 있습니다.</strong>",
  desc: `차트연구소는 2011년에 설립된 그래픽 솔루션 전문 개발 업체로, 한 분야에서 최고를 목표로 설립되었습니다.<br>
  국내 주요 증권사, 선물사, 은행에 차트 시스템을 성공적으로 납품하며 업계에서 입지를
  다져왔습니다.<br>
  치트연구소는 납품이 끝이 아니라 고객과 소통하며 같이 성장해 가는 것을 지향하고
  있습니다.<br>
  현재도 납품했던 업체들과 긴밀한 관계를 유지하며 유지보수를 성실히 수행하면서
  소통하고 있습니다.<br>
  차트연구소는 끊임없이 연구개발하여 국내뿐 아니라 세계에서도 인정받는 그래픽 전문
  업체가 되는 게 목표입니다.<br><br>
  주요 제품으로 윈도우용 파워차트, 모바일용 파워그래픽스 차트 제품이 있습니다.<br>
  차트연구소는 앞으로도 최고의 그래픽 솔루션을 제공하는 기업으로 성장해 나가겠습니다.
  감사합니다.`,
  name: "박진우",
  img: ceoImg,
};

const bridgeText = "데이터로 만들어온 <br><strong>성장의 흐름</strong>";

export const historyData = [
  {
    year: "2025",
    list: [
      "LS증권 대체 거래소 납품"],
  },
  {
    year: "2024",
    list: [
      "IBK기업은행 외환거래 시스템 IBK FXON 차트 납품",
      "유진투자선물 미국주식옵션 시세제공 차트개발",
    ],
  },
  {
    year: "2022",
    list: [
      "싱가폴 투자 및 자산관리 법인 SNC TechnologyPTE.Ltd 파워차트 납품",
      "(주)피비씨미디어 일본 해외선물 옵션 시스템 차트 납품",
    ],
  },
  {
    year: "2021",
    list: ["SK증권 해외선물 파워차트 2.5버전 납품"],
  },
  {
    year: "2020",
    list: [
      "NH투자선물 서핑보드 HTS 차트 납품",
      "신한금융투자 신한알파 HTS 차트 납품",
    ],
  },
  {
    year: "2019",
    list: [
      "이베스트증권 파워차트 VOC 개선 작업 계약",
      "유안타증권 차트클릭주문 계약",
    ],
  },
  {
    year: "2018",
    list: [
      "가상화폐차트 납품",
      "신한금융투자 VS2010 차트 업그레이드",
      "이베스트증권 가물치차트 납품",
    ],
  },
  {
    year: "2017",
    list: [
      "마곡지구 두산더랜드파크 서울 강서지점 개설",
      "유진투자선물 HTS 차트 납품",
      "케이프투자증권 VS2010 차트 업그레이드",
      "마곡지구 프라이빗타워 2차 사무실 이전",
      "유안타증권 티레이더 해외선물옵션 HTS 차트 납품`",
    ],
  },
  {
    year: "2016",
    list: [
      "유안타증권 미국주식 HTS 차트 납품",
      "파워차트 2.5 제품 출시 (C-2016-010933)",
    ],
  },
  {
    year: "2015",
    list: [
     "유안타 증권 마이티레이더 2.0 서비스 신호 개편",
     "유안타증권 미니선물 시장 개발",
     "신한금융투자 GX시스템 차트 공급",
     "(주)오름스톡 모바일 차트 공급",
     "이베스트증권 VS 2010 차트업그레이드"
    ],
  },
];

const History = () => {
  return (
    <div className="sub-history">
      {/* CEO 섹션: 이미지와 텍스트 비율 적용 */}
      <section className="sub-history__ceo">
        <div className="sub-history__ceo-inner inner">
          <div className="sub-history__ceo-text">
            {/* dangerouslySetInnerHTML 적용으로 태그 및 줄바꿈 활성화 */}
            <h3 className="sub-history__ceo-title" dangerouslySetInnerHTML={{ __html: ceoData.title }} />
            <p className="sub-history__ceo-desc" dangerouslySetInnerHTML={{ __html: ceoData.desc }} />
            <div className="sub-history__ceo-name">
            차트연구소 대표이사
              <strong>{ceoData.name}</strong></div>
          </div>
          <div className="sub-history__ceo-image">
            <img src={ceoData.img} alt="CEO" />
          </div>
        </div>
      </section>

      {/* 브릿지 섹션 */}
      <section className="sub-history__bridge">
        <div className="sub-history__bridge-inner inner">
          <p className="sub-history__bridge-text" dangerouslySetInnerHTML={{ __html: bridgeText }} />
        </div>
      </section>

      {/* 연혁 섹션 */}
      <section className="sub-history__timeline">
        <div className="sub-history__timeline-inner inner">
          <SectionTitle variant="sub" en="HISTORY" title="연혁" />
          <div className="sub-history__list">
          {historyData.map((item) => (
              <div key={item.year} className="sub-history__item">

                {/* YEAR */}
                <div className="sub-history__year">
                  {item.year}
                </div>

                <ul className="sub-history__list">
                  {item.list.map((txt, idx)=> (
                    <li key={idx} className="sub-history__list-item">
                      {txt}
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;