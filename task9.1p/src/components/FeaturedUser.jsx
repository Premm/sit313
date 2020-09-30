import React from "react";
import PropTypes from "prop-types";
import C from "classnames";

const FeaturedUser = (props) => {
  return (
    <div className={C("d-flex", "col-6", "col-lg-3", "col-md-4")}>
      <div className={C("card", "mb-2")}>
        <div className={C("card-image")}>
          <img src={props.imageUri} width="100%" alt={props.alt} />
        </div>
        <div className={C("card-body")}>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

FeaturedUser.propTypes = {
  className: PropTypes.string,
  imageUri: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

export default FeaturedUser;
