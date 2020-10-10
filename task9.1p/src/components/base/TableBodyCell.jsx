import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const TableBodyCell = (props) => {
  return (
    <td
      colspan={props.colspan}
      rowspan={props.rowspan}
      className={C(props.className)}
    >
      {props.children}
    </td>
  );
};

TableBodyCell.propTypes = {
  className: PropTypes.string,
  scope: PropTypes.string,
  colspan: PropTypes.number,
  rowspan: PropTypes.number,
};
