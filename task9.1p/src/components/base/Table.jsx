import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const variantMapper = {
  light: "table-light",
  dark: "table-dark",
};

export const Table = (props) => {
  return (
    <table
      className={C(
        "table",
        props.striped && "table-striped",
        props.varaint && variantMapper[props.variant],
        props.className
      )}
    >
      {props.children}
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  striped: PropTypes.bool,
  variant: PropTypes.string,
};
