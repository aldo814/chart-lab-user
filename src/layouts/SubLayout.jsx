import { Outlet, useLocation, Link } from "react-router-dom";
import { HouseIcon } from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";
import FixedContact from "../components/FixedContact";
import Footer from "./Footer";

const MENU_DATA = {
  about: {
    title: "COMPANY",
    breadcrumb: "회사소개",
    desc: "국내외 금융기관이 선택한 차트 기술 \n 안정성과 확장성을 기반으로 최적의 솔루션을 제공합니다",
    seoTitle: "회사소개 | 차트연구소",
    keywords: "차트, 금융솔루션, 회사소개",
    sub: [
      { name: "사업 소개", path: "/about/business" },
      { name: "연혁", path: "/about/history" },
      { name: "오시는 길", path: "/about/location" },
    ],
  },
  product: {
    title: "PRODUCT",
    breadcrumb: "제품소개",
    desc: "차트연구소의 혁신적인 제품을 소개합니다. \n 최상의 성능과 사용자 경험을 제공합니다",
    seoTitle: "제품소개 | 차트연구소",
    keywords: "HTS, MTS, 금융프로그램",
    sub: [
      { name: "파워차트", path: "/product/powerchart" },
      { name: "파워그래픽스", path: "/product/powergraphics" },
    ],
  },
  portfolio: {
    title: "PORTFOLIO",
    breadcrumb: "포트폴리오",
    desc: "금융 시장의 성공 파트너, \n 차트연구소의 다양한 프로젝트와 파트너사를 확인하세요",
    seoTitle: "포트폴리오 | 차트연구소",
    keywords: "프로젝트, 고객사, 파트너",
    sub: [{ name: "프로젝트 사례", path: "/portfolio/project" }],
  },
  notice: {
    title: "NOTICE",
    breadcrumb: "공지사항",
    desc: "차트연구소의 새로운 소식과 \n 주요 업데이트 내용을 확인하실 수 있습니다",
    seoTitle: "공지사항 | 차트연구소",
    keywords: "공지사항, 뉴스, 업데이트",
    sub: [],
  },
  contact: {
    title: "CONTACT",
    breadcrumb: "상담문의",
    desc: "금융 솔루션 도입 및 파트너십 문의 등 \n 궁금하신 점을 남겨주시면 정성껏 답변해 드립니다",
    seoTitle: "상담문의 | 차트연구소",
    keywords: "상담문의, 고객센터, 제휴문의",
    sub: [],
  },
};

function SubLayout() {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean);
  const depth1 = paths[0];

  const currentCategory = MENU_DATA[depth1];
  const tabs = currentCategory?.sub || [];

  const breadcrumbs =
    depth1 === "notice"
      ? [
          {
            name: currentCategory?.breadcrumb,
            path: "/notice",
          },
        ]
      : paths.map((p, i) => {
          let name = p;

          if (i === 0) name = currentCategory?.breadcrumb || p;

          if (i === 1) {
            name =
              currentCategory?.sub.find((s) => s.path.includes(p))?.name || p;
          }

          return {
            name,
            path: "/" + paths.slice(0, i + 1).join("/"),
          };
        });

  if (!currentCategory) return <Outlet />;

  return (
    <>
      <div className="wrapper">
        <div className={`sub-wrapper sub-wrapper--${depth1}`}>
          <Helmet>
            <title>{currentCategory.seoTitle}</title>
            <meta
              name="description"
              content={currentCategory.desc.replace(/\n/g, " ")}
            />
            <meta name="keywords" content={currentCategory.keywords} />
          </Helmet>

          <section className={`sub-hero sub-hero--${depth1}`}>
            <div className="sub-hero__inner inner">
              <div className="sub-hero__content">
                <h2 className="sub-hero__title">{currentCategory.title}</h2>
                <p
                  className="sub-hero__desc"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {currentCategory.desc}
                </p>
              </div>

              <ul className="sub-hero__breadcrumb">
                <li className="sub-hero__home-icon">
                  <Link to="/">
                    <i>
                      <HouseIcon size={18} weight="fill" />
                    </i>
                  </Link>
                </li>
                {breadcrumbs.map((bc) => (
                  <li key={bc.path} className="sub-hero__bc-item">
                    <Link to={bc.path}>{bc.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {tabs.length > 0 && (
            <nav className="sub-tab">
              <div className="sub-tab__inner inner">
                <ul className="sub-tab__list">
                  {tabs.map((tab) => (
                    <li
                      key={tab.path}
                      className={`sub-tab__item ${
                        pathname === tab.path ? "is-active" : ""
                      }`}
                    >
                      <Link to={tab.path} className="sub-tab__link">
                        {tab.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}

          <main className="sub-container">
            <Outlet />
          </main>
        </div>
      </div>
      <FixedContact />
      <Footer />
    </>
  );
}

export default SubLayout;
