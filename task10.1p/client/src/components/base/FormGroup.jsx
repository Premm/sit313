import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const FormGroup = (props) => {
  return (
    <div className={C("form-group", props.className)}>{props.children}</div>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
};
