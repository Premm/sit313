import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const TableBodyCell = (props) => {
  return (
    <td
      colSpan={props.colSpan}
      rowSpan={props.rowSpan}
      className={C(props.className)}
    >
      {props.children}
    </td>
  );
};

TableBodyCell.propTypes = {
  className: PropTypes.string,
  scope: PropTypes.string,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
};
