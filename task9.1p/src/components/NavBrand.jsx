import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const NavBrand = (props) => {
  return <div className={C("flex-1", props.className)}>{props.children}</div>;
};

NavBrand.propTypes = {
  className: PropTypes.string,
};

export default NavBrand;
