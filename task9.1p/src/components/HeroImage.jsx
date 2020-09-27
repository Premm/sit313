import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const HeroImage = (props) => {
  return (
    <div
      className={C(
        "hero-image",
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "overflow-hidden"
      )}
    >
      <img src={props.uri} alt={props.alt} />
    </div>
  );
};
HeroImage.propTypes = {
  className: PropTypes.string,
  uri: PropTypes.string,
  alt: PropTypes.string,
};
export default HeroImage;
