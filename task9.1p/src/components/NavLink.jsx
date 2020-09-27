import React from "react";
import PropTypes from "prop-types";
import C from "classnames";
import { Link } from "react-router-dom";

const NavLink = (props) => {
  return (
    <Link className={C("nav-link", props.className)} to={props.to}>
      {props.children}
    </Link>
  );
};

NavLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
};
export default NavLink;
