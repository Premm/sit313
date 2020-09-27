import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const Input = (props) => {
  return (
    <input
      className={C(props.className, "form-control")}
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};
Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export default Input;
