import React from "react";

import C from "classnames";

export const FeaturedUserContainer = (props) => {
  return (
    <div className={C("d-flex flex-row flex-wrap py-2", props.className)}>
      {props.children}
    </div>
  );
};

export default FeaturedUserContainer;
