import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const variantMapper = {
  light: "thead-light",
  dark: "thead-dark",
};

export const TableHeader = (props) => {
  return (
    <thead
      className={C(
        props.className,
        props.variant && variantMapper[props.variant]
      )}
    >
      <tr>{props.children}</tr>
    </thead>
  );
};

TableHeader.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
};
