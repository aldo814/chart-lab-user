import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { client } from "../../api/sanity";
import SectionTitle from "../../components/SectionTitle";
import icoDown from "../../assets/images/sub/ico_down.svg";
import icoNavPrev from "../../assets/images/sub/ico_nav_prev.svg";
import icoNavNext from "../../assets/images/sub/ico_nav_next.svg";
import Loading from "../../components/Loading";

function NoticeView() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "notice" && slug.current == $slug][0]{
          _id,
          title,
          createdAt,
          isPinned,
          content,
          "authorName": author->name,
          "files": attachment[].asset->{
            url,
            originalFilename,
            size
          }
        }`,
        { slug }
      )
      .then(async (current) => {
        setPost(current);

        if (!current?.createdAt) return;

        const prev = await client.fetch(
          `*[_type == "notice" && createdAt < $createdAt && !isPinned]
           | order(createdAt desc)[0] { _id, title, "slug": slug.current }`,
          { createdAt: current.createdAt }
        );
        setPrevPost(prev);

        const next = await client.fetch(
          `*[_type == "notice" && createdAt > $createdAt && !isPinned]
           | order(createdAt asc)[0] { _id, title, "slug": slug.current }`,
          { createdAt: current.createdAt }
        );
        setNextPost(next);
      });
  }, [slug]);

  const truncateFilename = (filename, maxLength = 10) => {
    if (!filename) return "";
    const dotIdx = filename.lastIndexOf(".");
    const ext = dotIdx !== -1 ? filename.slice(dotIdx) : "";
    const name = dotIdx !== -1 ? filename.slice(0, dotIdx) : filename;
    if (name.length <= maxLength) return filename;
    return name.slice(0, maxLength) + "..." + ext;
  };

  if (!post) {
    return (
      <div className="notice-view">
        <Loading />
      </div>
    );
  }

  return (
    <div className="notice-view">
      <div className="inner">
        <SectionTitle variant="only" title="공지사항" />

        <div className="notice-view__head">
          <h3 className="notice-view__title">{post.title}</h3>
          <div className="notice-view__meta">
            <div className="notice-view__meta-item">
              <span className="notice-view__meta-label">작성자</span>
              <strong className="notice-view__meta-value">
                {post.authorName || "관리자"}
              </strong>
            </div>
            <div className="notice-view__meta-item">
              <span className="notice-view__meta-label">등록일</span>
              <strong className="notice-view__meta-value">
                {post.createdAt?.slice(0, 10).replaceAll("-", ".")}
              </strong>
            </div>
          </div>
        </div>

        <div className="notice-view__desc">
          {post.content ? (
            post.content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))
          ) : (
            <p>내용이 없습니다.</p>
          )}
        </div>

        {Array.isArray(post.files) && post.files.length > 0 && (
          <div className="notice-view__attach">
            <p className="notice-view__attach-title">첨부파일</p>
            <ul className="notice-view__attach-list">
              {post.files.map((file, idx) => (
                <li className="notice-view__attach-item" key={idx}>
                  <a
                    className="notice-view__attach-link"
                    href={file.url}
                    download={file.originalFilename}
                    target="_blank"
                    rel="noreferrer"
                    title={file.originalFilename}
                  >
                    <span className="notice-view__attach-name">
                      {truncateFilename(file.originalFilename)}
                    </span>
                    <span className="notice-view__attach-icon">
                      <img src={icoDown} alt="다운로드" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="notice-view__nav">
          <div className={`notice-view__nav-item notice-view__nav-item--prev${!prevPost ? " notice-view__nav-item--disabled" : ""}`}>
            {prevPost ? (
              <Link to={`/notice/${prevPost.slug}`} className="notice-view__nav-link">
                <span className="notice-view__nav-ico">
                  <img src={icoNavPrev} alt="" />
                </span>
                <span className="notice-view__nav-text">
                  <span className="notice-view__nav-label">이전글</span>
                  <span className="notice-view__nav-title">{prevPost.title}</span>
                </span>
              </Link>
            ) : (
              <div className="notice-view__nav-link">
                <span className="notice-view__nav-ico">
                  <img src={icoNavPrev} alt="" />
                </span>
                <span className="notice-view__nav-text">
                  <span className="notice-view__nav-label">이전글</span>
                  <span className="notice-view__nav-none">이전 글이 없습니다.</span>
                </span>
              </div>
            )}
          </div>

          <div className={`notice-view__nav-item notice-view__nav-item--next${!nextPost ? " notice-view__nav-item--disabled" : ""}`}>
            {nextPost ? (
              <Link to={`/notice/${nextPost.slug}`} className="notice-view__nav-link">
                <span className="notice-view__nav-ico">
                  <img src={icoNavNext} alt="" />
                </span>
                <span className="notice-view__nav-text">
                  <span className="notice-view__nav-label">다음글</span>
                  <span className="notice-view__nav-title">{nextPost.title}</span>
                </span>
              </Link>
            ) : (
              <div className="notice-view__nav-link">
                <span className="notice-view__nav-ico">
                  <img src={icoNavNext} alt="" />
                </span>
                <span className="notice-view__nav-text">
                  <span className="notice-view__nav-label">다음글</span>
                  <span className="notice-view__nav-none">다음 글이 없습니다.</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="notice-view__actions">
          <button
            className="notice-view__btn notice-view__btn--list"
            onClick={() => navigate("/notice")}
          >
            목록
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeView;