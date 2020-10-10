import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const CardFooter = (props) => {
  return (
    <div className={C("card-footer", props.className)}>{props.children}</div>
  );
};

CardFooter.propTypes = {
  className: PropTypes.string,
};
