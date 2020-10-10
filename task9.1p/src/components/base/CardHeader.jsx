import React from 'react';
import PropTypes from 'prop-types';
import C from "classnames";

export const CardHeader = (props) => {
    return (
        <div className={C("card-header", props.className)}>
            {props.children}
        </div>
    );
}

CardHeader.propTypes = {
    className: PropTypes.string,
};
