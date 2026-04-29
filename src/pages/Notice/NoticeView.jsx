// NoticeView.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { client } from "../../api/sanity";
import SectionTitle from "../../components/SectionTitle";
import icoDown from "../../assets/images/sub/ico_down.svg";
import icoNavPrev from "../../assets/images/sub/ico_nav_prev.svg";
import icoNavNext from "../../assets/images/sub/ico_nav_next.svg";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="notice-view__content-image">
          <img
            src={urlFor(value).fit("max").auto("format").url()}
            alt={value.alt || ""}
          />
          {value.caption && (
            <figcaption className="notice-view__content-caption">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    "strike-through": ({ children }) => <s>{children}</s>,
  },
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

function NoticeView() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loadingNav, setLoadingNav] = useState(true);

  useEffect(() => {
    setLoadingNav(true);

    client
      .fetch(
        `*[_type == "notice" && slug.current == $slug][0]{
          _id,
          title,
          createdAt,
          isPinned,
          content[]{
            ...,
            _type == "image" => {
              ...,
              asset->
            }
          },
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

        if (!current?.createdAt) {
          setLoadingNav(false);
          return;
        }

        const prev = await client.fetch(
          `*[_type == "notice" && createdAt < $createdAt && !isPinned]
           | order(createdAt desc)[0] { _id, title, "slug": slug.current }`,
          { createdAt: current.createdAt }
        );

        const next = await client.fetch(
          `*[_type == "notice" && createdAt > $createdAt && !isPinned]
           | order(createdAt asc)[0] { _id, title, "slug": slug.current }`,
          { createdAt: current.createdAt }
        );

        setPrevPost(prev);
        setNextPost(next);
        setLoadingNav(false);
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
        <div className="inner">
          <div className="notice-view__head">
            <div
              className="skeleton-box"
              style={{ height: 28, width: "60%", marginBottom: 16 }}
            />
            <div className="notice-view__meta">
              <div
                className="skeleton-box"
                style={{ height: 16, width: 100 }}
              />
              <div
                className="skeleton-box"
                style={{ height: 16, width: 100 }}
              />
            </div>
          </div>
          <div className="notice-view__desc">
            <div
              className="skeleton-box"
              style={{ height: 16, width: "100%", marginBottom: 8 }}
            />
            <div
              className="skeleton-box"
              style={{ height: 16, width: "90%", marginBottom: 8 }}
            />
            <div
              className="skeleton-box"
              style={{ height: 16, width: "80%" }}
            />
          </div>
        </div>
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
            <PortableText
              value={post.content}
              components={portableTextComponents}
            />
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
          <div className="notice-view__nav-item notice-view__nav-item--prev">
            {loadingNav ? (
              <div className="notice-view__nav-link--skeleton">
                <div className="skeleton-box notice-view__nav-ico--skeleton" />
                <div className="notice-view__nav-text--skeleton">
                  <div
                    className="skeleton-box"
                    style={{ width: 60, height: 14 }}
                  />
                  <div
                    className="skeleton-box"
                    style={{ width: 160, height: 14 }}
                  />
                </div>
              </div>
            ) : prevPost ? (
              <Link
                to={`/notice/${prevPost.slug}`}
                className="notice-view__nav-link"
              >
                <span className="notice-view__nav-ico">
                  <img src={icoNavPrev} alt="" />
                </span>
                <span className="notice-view__nav-text">
                  <span className="notice-view__nav-label">이전글</span>
                  <span className="notice-view__nav-title">
                    {prevPost.title}
                  </span>
                </span>
              </Link>
            ) : (
              <div className="notice-view__nav-link">
                <span className="notice-view__nav-ico">
                  <img src={icoNavPrev} alt="" />
                </span>
                <span className="notice-view__nav-text">
                  <span className="notice-view__nav-label">이전글</span>
                  <span className="notice-view__nav-none">
                    이전 글이 없습니다.
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="notice-view__nav-item notice-view__nav-item--next">
            {loadingNav ? (
              <div className="notice-view__nav-link">
                <div
                  className="skeleton-box"
                  style={{ width: 24, height: 24 }}
                />
                <div>
                  <div
                    className="skeleton-box"
                    style={{ width: 60, height: 14, marginBottom: 6 }}
                  />
                  <div
                    className="skeleton-box"
                    style={{ width: 160, height: 14 }}
                  />
                </div>
              </div>
            ) : nextPost ? (
              <Link
                to={`/notice/${nextPost.slug}`}
                className="notice-view__nav-link"
              >
                <span className="notice-view__nav-ico">
                  <img src={icoNavNext} alt="" />
                </span>
                <span className="notice-view__nav-text">
                  <span className="notice-view__nav-label">다음글</span>
                  <span className="notice-view__nav-title">
                    {nextPost.title}
                  </span>
                </span>
              </Link>
            ) : (
              <div className="notice-view__nav-link">
                <span className="notice-view__nav-ico">
                  <img src={icoNavNext} alt="" />
                </span>
                <span className="notice-view__nav-text">
                  <span className="notice-view__nav-label">다음글</span>
                  <span className="notice-view__nav-none">
                    다음 글이 없습니다.
                  </span>
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
