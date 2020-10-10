import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const InputGroupAppend = (props) => {
  return (
    <div className={C(props.className, "input-group-append")}>
      {props.children}
    </div>
  );
};
InputGroupAppend.propTypes = {
  className: PropTypes.string,
};
