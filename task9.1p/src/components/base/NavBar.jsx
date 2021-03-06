import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const NavBar = (props) => {
  return <div className={C("navbar")}>{props.children}</div>;
};

NavBar.propTypes = {
  className: PropTypes.string,
};
