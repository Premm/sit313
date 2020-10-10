import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const Card = (props) => {
  return (
    <div className={C("card", props.className)} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
