import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const InputGroup = (props) => {
  return (
    <div className={C(props.className, "input-group")}>{props.children}</div>
  );
};
InputGroup.propTypes = {
  className: PropTypes.string,
};
