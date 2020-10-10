import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const variantMapper = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  danger: "btn-danger",
};

const sizeMapper = {
  sm: "btn-sm",
  lg: "btn-lg",
};

export const Button = (props) => {
  return (
    <button
      className={C(
        "btn",
        props.variant && variantMapper[props.variant],
        props.size && sizeMapper[props.size],
        props.className,
        props.active && "active"
      )}
      onClick={props.onClick}
      type={props.submit ? "submit" : "button"}
    >
      {props.children}
    </button>
  );
};
Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
};
