import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const CardBody = (props) => {
  return (
    <div className={C("card-body", props.className)}>{props.children}</div>
  );
};

CardBody.propTypes = {
  className: PropTypes.string,
};
