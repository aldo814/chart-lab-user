import React from "react";

function SectionTitle({
  en,
  title,
  desc,
  centerTop,
  variant = "default",
}) {
  return (
    <div className={`section-title section-title--${variant}`}>

      {/*  center 전용 */}
      {variant === "center" && centerTop && (
        <p className="section-title__center-top">
          {centerTop}
        </p>
      )}

      {/*  only 아닐 때만 en 노출 */}
      {variant !== "only" && en && (
        <h3 className="section-title__en">
          {en}
        </h3>
      )}

      {/*  공통 title */}
      {title && (
        <h2
          className="section-title__title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      {/*  desc */}
      {desc && (
        <p
          className="section-title__desc"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      )}

    </div>
  );
}

export default SectionTitle;