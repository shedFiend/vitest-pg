import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  backgroundColor = null,
  size,
  label,
  ...props
}) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  console.log("COMPONENT ### 1) LOG");
  console.warn("COMPONENT ### 2) WARN");
  console.error("COMPONENT ### 3) ERROR");
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size || 'medium'}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
