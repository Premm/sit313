import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const NavItem = (props) => {
  return <div className={C("nav-item", props.className)}>{props.children}</div>;
};

NavItem.propTypes = {
  className: PropTypes.string,
};
