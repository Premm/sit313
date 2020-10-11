import React from "react";
import PropTypes from "prop-types";

export const ListGroup = (props) => {
  return <ul class="list-group">{props.children}</ul>;
};

ListGroup.propTypes = {};
