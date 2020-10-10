import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const CardTitle = (props) => {
  return <h5 className={C("card-title", props.className)}>{props.children}</h5>;
};

CardTitle.propTypes = {
  className: PropTypes.string,
};
