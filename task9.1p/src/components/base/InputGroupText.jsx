import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const InputGroupText = (props) => {
  return (
    <span className={C(props.className, "input-group-text")}>
      {props.children}
    </span>
  );
};
InputGroupText.propTypes = {
  className: PropTypes.string,
};
