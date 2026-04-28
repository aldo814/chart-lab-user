import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'arrow-white', to, onClick, onMouseEnter, onMouseLeave ,className = "" }) => {
  const classMap = {
    'arrow-white': 'arrow-btn arrow-btn--white',
    'arrow-blue': 'arrow-btn arrow-btn--blue',
    'arrow-black': 'arrow-btn arrow-btn--black',
    'arrow-white-green': 'arrow-btn arrow--white-green'
  };

  const commonProps = {
    // variant가 없거나 잘못 들어오면 기본으로 'arrow-white' 적용
    className: classMap[variant] || classMap['arrow-black'],
    onMouseEnter,
    onMouseLeave,
    onClick
  };

  if (to) {
    return <Link to={to} {...commonProps}>{children}</Link>;
  }

  return <button type="button" {...commonProps}>{children}</button>;
};

export default Button;