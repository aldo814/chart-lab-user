import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import SectionTitle from "../../components/SectionTitle";
import icoForm from "../../assets/images/sub/ico_form.svg";

const Contact = () => {
  const recaptchaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hpValue, setHpValue] = useState("");
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    tel: "",
    subject: "",
    message: "",
    agree: false,
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = "";
  };

  const handleFileRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + "B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + "KB";
    return (bytes / (1024 * 1024)).toFixed(1) + "MB";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hpValue) return;
    if (!formData.agree) return alert("개인정보 처리방침에 동의해주세요.");
    if (!captchaValue) return alert("로봇 검사를 완료해주세요.");
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzlgBajtWFIkfUfVVYZXsPZ5L0F-IdGtI1kZLwOq5ru6aLQSs7V1ya-oqrziZjY3AyLjw/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(formData),
        }
      );

      alert("문의가 성공적으로 접수되었습니다.");
      setFormData({
        company: "",
        name: "",
        email: "",
        tel: "",
        subject: "",
        message: "",
        agree: false,
      });
      setFiles([]);
      setCaptchaValue(null);
      if (recaptchaRef.current) recaptchaRef.current.reset();
    } catch (error) {
      alert("서버 통신 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="inner">
        <SectionTitle
          variant="only"
          title="문의하기"
          desc="아래 양식을 작성하시면 영업일 기준 1일 이내 회신드립니다."
        />

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="hp_field"
            style={{ display: "none" }}
            value={hpValue}
            onChange={(e) => setHpValue(e.target.value)}
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="contact-form__section">
            <h4 className="contact-form__subtitle">작성자 정보</h4>
            <div className="contact-form__body">
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="company" className="contact-form__label">
                    기업명 / 부서
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    placeholder="예 ) (주)ㅇㅇㅇ / 개발팀"
                    onChange={handleChange}
                    className="contact-form__input"
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="name" className="contact-form__label">
                    성함
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    placeholder="담당자 성함"
                    onChange={handleChange}
                    className="contact-form__input"
                    required
                  />
                </div>
              </div>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="email" className="contact-form__label">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="example@company.com"
                    onChange={handleChange}
                    className="contact-form__input"
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="tel" className="contact-form__label">
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={formData.tel}
                    placeholder="010-0000-0000"
                    onChange={handleChange}
                    className="contact-form__input"
                    required
                  />
                </div>
              </div>
              <p className="contact-form-alert">
                <img src={icoForm} alt="" />
                답변 받으실 이메일/연락처를 정확히 입력해 주세요
              </p>
            </div>
          </div>

          <div className="contact-form__section">
            <h4 className="contact-form__subtitle">문의 내용</h4>
            <div className="contact-form__body">
              <div className="contact-form__row">
                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="subject" className="contact-form__label">
                    제목
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    placeholder="문의 제목을 입력해주세요"
                    onChange={handleChange}
                    className="contact-form__input"
                    required
                  />
                </div>
              </div>
              <div className="contact-form__row">
                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="message" className="contact-form__label">
                    내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    placeholder="문의 내용을 상세히 적어주세요"
                    onChange={handleChange}
                    className="contact-form__textarea"
                    required
                  />
                </div>
              </div>
              <div className="contact-form__row">
                <div className="contact-form__field contact-form__field--full">
                  <label className="contact-form__label">첨부파일</label>
                  <div className="contact-form__upload">
                    <div
                      className="contact-form__upload-area"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="contact-form__upload-input"
                        multiple
                      />
                      <span className="contact-form__upload-text">
                        파일을 선택하거나 이곳에 끌어다 놓으세요
                      </span>
                      <span className="contact-form__upload-btn">
                        파일 선택
                      </span>
                    </div>
                    {files.length > 0 && (
                      <ul className="contact-form__file-list">
                        {files.map((file, index) => (
                          <li key={index} className="contact-form__file-item">
                            <span className="contact-form__file-name">
                              {file.name}
                            </span>
                            <span className="contact-form__file-size">
                              {formatFileSize(file.size)}
                            </span>
                            <button
                              type="button"
                              className="contact-form__file-remove"
                              onClick={() => handleFileRemove(index)}
                            >
                              삭제
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form__section">
            <h4 className="contact-form__subtitle">개인정보 처리방침 동의</h4>
            <div className="contact-form__body">
              <div className="contact-form__row">
                <div className="contact-form__field contact-form__field--full">
                  <div className="contact-form__policy-head">
                    <label
                      htmlFor="agree"
                      className="contact-form__policy-text"
                    >
                      개인정보 수집 및 이용에 동의합니다.
                    </label>
                    <label
                      htmlFor="agree"
                      className="contact-form__checkbox-wrap"
                    >
                      <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="contact-form__checkbox"
                      />
                      <span className="contact-form__checkbox-text">
                        동의합니다
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="contact-form__row">
                <div className="contact-form__field contact-form__field--full">
                  <div className="contact-form__policy-viewer">
                    <p>
                      <strong>
                        회사는 문의 접수 및 답변을 위해 아래와 같이 개인정보를
                        수집·이용합니다.
                      </strong>
                    </p>
                    <br></br>
                    <ul className="dot-list">
                      <li>수집 항목: 이름, 이메일, 연락처</li>
                      <li>수집 목적: 문의사항 확인 및 답변 제공</li>
                      <li>
                        보유 및 이용 기간: 문의 처리 완료 후 1년간 보관 후 파기
                      </li>
                    </ul>
                    <br></br>
                    <p>
                      이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가
                      있으며, 동의 거부 시 문의 접수가 제한될 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form__section contact-form__section--captcha">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LdKTtEsAAAAABEiLvli2jfiJy2MGUVqpUsb4sjY"
              onChange={(val) => setCaptchaValue(val)}
            />
          </div>

          <div className="contact-form__actions">
            <button
              type="submit"
              className={`contact-form__submit-btn ${
                isSubmitting ? "is-loading" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "전송 중..." : "문의 접수하기"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
