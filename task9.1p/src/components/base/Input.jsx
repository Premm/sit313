import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const Input = (props) => {
  return props.switch ? (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className={C("custom-control-input", props.className)}
        checked={props.value}
      ></input>
      <label
        id={props.id}
        onClick={props.onChange}
        className="custom-control-label"
        htmlFor="customSwitch1"
      >
        {props.label}
      </label>
    </div>
  ) : (
    <input
      className={C(props.className, "form-control")}
      name={props.name}
      id={props.id}
      value={props.value}
      type={props.type || "text"}
      onChange={props.onChange}
    ></input>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  switch: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};
