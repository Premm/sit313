import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const NavBar = (props) => {
  return <div className={C("navbar")}>{props.children}</div>;
};

NavBar.propTypes = {
  className: PropTypes.string,
};

export default NavBar;
