import React from "react";

export const SectionHeading = (props) => {
  return (
    <div className={"d-flex justify-content-center py-4"}>
      <h2>{props.children}</h2>
    </div>
  );
};
