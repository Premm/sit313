import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const TableBody = (props) => {
  return <tbody className={C(props.className)}>{props.children}</tbody>;
};

TableBody.propTypes = {
  className: PropTypes.string,
};
