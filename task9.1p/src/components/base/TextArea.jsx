import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const TextArea = (props) => {
  return (
    <textarea
      className={C(props.className, "form-control")}
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
    ></textarea>
  );
};
TextArea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
