import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "../base/ListGroup";
import { ListGroupItem } from "../base/ListGroupItem";

export const MutlipleChoiceOptions = (props) => {
  const [active, setActive] = React.useState("");

  const handleClick = (option, i) => {
    setActive(i);
    props.onSelect(option);
  };

  return (
    <ListGroup>
      {props.options &&
        props.options.map((option, i) => (
          <ListGroupItem
            active={i === active}
            onClick={() => {
              handleClick(option, i);
            }}
          >
            {option}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};

MutlipleChoiceOptions.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func,
};
