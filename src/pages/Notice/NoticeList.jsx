import { useEffect, useState } from "react";
import { client } from "../../api/sanity";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

function NoticeList() {
  const [list, setList] = useState([]);

  const [searchType, setSearchType] = useState("title");
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    client
      .fetch(`
        *[_type == "notice"] 
        | order(isPinned desc, createdAt desc) {
          _id,
          title,
          createdAt,
          isPinned,
          content,
          "authorName": author->name
        }
      `)
      .then(setList);
  }, []);

  //  고정글 (최대 3개)
  const pinnedList = list
    .filter((item) => item.isPinned)
    .slice(0, 3);

  //  일반글
  const normalList = list.filter((item) => !item.isPinned);

  // 신규 게시물
  const isNew = (date) => {
    if (!date) return false;
  
    const created = new Date(date);
    const now = new Date();
  
    const diff = now - created;
    const diffDays = diff / (1000 * 60 * 60 * 24);
  
    return diffDays <= 14;
  };

  //  검색 적용 (버튼 기준 keyword)
  const filteredNormal = normalList.filter((item) => {
    if (!keyword) return true;

    if (searchType === "title") {
      return item.title?.toLowerCase().includes(keyword.toLowerCase());
    }

    if (searchType === "content") {
      return JSON.stringify(item.content || "")
        .toLowerCase()
        .includes(keyword.toLowerCase());
    }

    return true;
  });

  //  페이징
  const total = list.length; // 전체 글 기준
  const totalPages = Math.ceil(filteredNormal.length / perPage);

  const start = (page - 1) * perPage;
  const currentNormalList = filteredNormal.slice(start, start + perPage);

  const pageGroup = Math.floor((page - 1) / 5);
  const startPage = pageGroup * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div className="notice inner">

      {/*  타이틀 */}
      <SectionTitle variant="only" title="공지사항" />

      <div className="notice__inner">

        {/*  검색 */}
        <div className="notice__search">

          <select
            className="notice__select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">제목</option>
            <option value="content">내용</option>
          </select>

          <input
            type="text"
            className="notice__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="검색어를 입력해주세요"
          />

          <button
            className="notice__search-btn"
            onClick={() => {
              setKeyword(input);
              setPage(1);
            }}
          >
            검색
          </button>

        </div>

        {/*  총 건수 */}
        <div className="notice__total">
          전체 <strong>{total}</strong>건
        </div>

        {/*  리스트 */}
        <div className="notice__list">

          {/*  고정글 */}
          {pinnedList.map((item) => (
            <Link
              to={`/notice/${item._id}`}
              className="notice notice__item notice__item--pinned"
              key={`pinned-${item._id}`}
            >
              <span className="notice__num">
                <em className="notice__badge">공지</em>
              </span>

              <span className="notice__title">{item.title}
              {isNew(item.createdAt) && (
              <em className="notice__badge notice__badge--new">
              NEW
              </em>
              )}
              </span>

              <span className="notice__author">
                {item.authorName || "관리자"}
              </span>

              <span className="notice__date">
                {item.createdAt?.slice(0, 10).replaceAll("-", ".")}
              </span>
            </Link>
          ))}

          {/*  일반글 */}
          {currentNormalList.map((item, idx) => (
            <Link
              to={`/notice/${item._id}`}
              className="notice__item"
              key={item._id}
            >
              <span className="notice__num">
                {filteredNormal.length - (start + idx)}
              </span>

              <span className="notice__title">{item.title}</span>

              <span className="notice__author">
                {item.authorName || "관리자"}
              </span>

              <span className="notice__date">
                {item.createdAt?.slice(0, 10).replaceAll("-", ".")}
              </span>
            </Link>
          ))}

        </div>

        {/*  페이징 */}
     {/* 페이징 */}
<div className="notice__pagination">
      <button className="notice__page-btn-arrow notice__page-btn--first" onClick={() => setPage(1)}>처음</button>
      <button className="notice__page-btn-arrow  notice__page-btn--prev" onClick={() => setPage((p) => Math.max(p - 1, 1))}>이전</button>
  <ul className="notice__page-list">
    {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      const p = startPage + i;
      return (
        <li key={p} className="notice__page-item">
          <button
            className={`notice__page-btn notice__page-num ${p === page ? "notice__page-btn--active" : ""}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        </li>
      );
    })}

  </ul>
      <button className="notice__page-btn-arrow  notice__page-btn--next" onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>다음</button>
      <button className="notice__page-btn-arrow  notice__page-btn--end" onClick={() => setPage(totalPages)}>마지막</button>
</div>

      </div>
    </div>
  );
}

export default NoticeList;