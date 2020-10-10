import React from 'react';
import PropTypes from 'prop-types';
import C from "classnames";

export const Card = (props) => {
    return (
        <div className={C("card", props.className)}>
            {props.children}
        </div>
    );
}

Card.propTypes = {
    className: PropTypes.string,
};
