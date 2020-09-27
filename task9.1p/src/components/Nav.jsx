import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const bgMapper = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  light: "bg-light",
  dark: "bg-dark",
};

const Nav = (props) => {
  return (
    <div className={C(props.bg && bgMapper[props.bg])}>
      <nav
        className={C(
          "nav d-flex justify-content-between container",
          props.className
        )}
      >
        {props.children}
      </nav>
    </div>
  );
};

Nav.propTypes = {
  className: PropTypes.string,
  bg: PropTypes.string,
};

export default Nav;
