import React from "react";
import { Link } from "react-router-dom";
import icoContact from "../assets/images/common/ico_contact.svg";

const FixedContact = () => {
  return (
    <div className="fixed-contact">
      <Link to="/contact" className="fixed-contact__link">
        <div className="fixed-contact__icon-box">
          <img src={icoContact} alt="" />
        </div>
        <span className="fixed-contact__text">문의하기</span>
      </Link>
    </div>
  );
};

export default FixedContact;
