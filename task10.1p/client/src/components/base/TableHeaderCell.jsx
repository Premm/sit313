import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const TableHeaderCell = (props) => {
  return (
    <th scope={props.scope || "col"} className={C(props.className)}>
      {props.children}
    </th>
  );
};

TableHeaderCell.propTypes = {
  className: PropTypes.string,
  scope: PropTypes.string,
};
