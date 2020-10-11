import React from "react";
import PropTypes from "prop-types";
import { Button } from "../base/Button";
import { ButtonGroup } from "../base/ButtonGroup";

export const TrueOrFalse = (props) => {
  const [active, setActive] = React.useState("");

  const handleClick = (choice) => {
    setActive(choice);
    props.onSelect(choice);
  };

  return (
    <ButtonGroup className="w-100">
      <Button
        onClick={() => handleClick("yes")}
        active={active === "yes"}
        variant={"primary"}
      >
        Yes
      </Button>
      <Button
        onClick={() => handleClick("no")}
        active={active === "no"}
        variant={"primary"}
      >
        No
      </Button>
    </ButtonGroup>
  );
};

TrueOrFalse.propTypes = {
  onSelect: PropTypes.func,
};
