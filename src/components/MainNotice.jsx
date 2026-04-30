import { useEffect, useState, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { client } from "../api/sanity";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import "swiper/css";
import "swiper/css/navigation";

function MainNotice() {
  const [list, setList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [total, setTotal] = useState(0);
  const swiperRef = useRef(null);

  const ptComponents = {
    types: {
      image: () => null,
    },
  };

  useEffect(() => {
    const fetchNotices = async () => {
      const pinned = await client.fetch(`
        *[_type == "notice" && isPinned == true]
        | order(createdAt desc)[0..2] {
          _id, title, content, createdAt, isPinned,
          "slug": slug.current
        }
      `);

      const pinnedIds = pinned.map((p) => p._id);
      const normalCount = 6 - pinned.length;

      const normal = await client.fetch(
        `*[_type == "notice" && isPinned != true && !(_id in $ids)]
        | order(createdAt desc)[0..$count] {
          _id, title, content, createdAt, isPinned,
          "slug": slug.current
        }`,
        { ids: pinnedIds, count: normalCount - 1 }
      );

      const merged = [...pinned, ...normal];
      setList(merged);
      setTotal(merged.length);
    };

    fetchNotices();
  }, []);

  return (
    <div className="notice-swiper">
      <div className="notice-swiper__header">
        <button className="notice-prev notice-button" aria-label="이전">
          <CaretLeftIcon size={16} />
        </button>
        <div className="notice-swiper__counter">
          <span className="notice-swiper__current">
            {String(activeIndex).padStart(2, "0")}
          </span>
          <span className="notice-swiper__sep"> / </span>
          <span className="notice-swiper__total">
            {String(total).padStart(2, "0")}
          </span>
        </div>
        <button className="notice-next notice-button" aria-label="다음">
          <CaretRightIcon size={16} />
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".notice-next",
          prevEl: ".notice-prev",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex + 1);
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
      >
        {list.map((item) => (
          <SwiperSlide key={item._id}>
            {({ isActive }) => (
              <Link
                to={`/notice/${item.slug ?? item._id}`}
                className={`notice-card ${isActive ? "notice-card--active" : ""}`}
              >
                <span className="notice-card__badge">
                  {item.isPinned ? "공지" : "news"}
                </span>

                <h3 className="notice-card__title">{item.title}</h3>

                <div className="notice-card__desc">
                  {item.content ? (
                    <PortableText
                      value={item.content}
                      components={ptComponents}
                    />
                  ) : (
                    "내용 준비중입니다."
                  )}
                </div>

                <time className="notice-card__date">
                  {item.createdAt?.slice(0, 10)}
                </time>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainNotice;
