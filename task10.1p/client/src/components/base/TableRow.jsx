import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const TableRow = (props) => {
  return <tr className={C(props.className)}>{props.children}</tr>;
};

TableRow.propTypes = {
  className: PropTypes.string,
  scope: PropTypes.string,
};
