import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

export const ListGroupItem = (props) => {
  return (
    <li
      key={props.id}
      class={C("list-group-item", props.active && "active")}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
};

ListGroupItem.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
