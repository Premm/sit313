import React from 'react';
import PropTypes from 'prop-types';
import C from "classnames";

export const ButtonGroup = (props) => {
    
    return (
        <div className={C("btn-group", props.className)}>
            {props.children}
        </div>
    );
}

ButtonGroup.propTypes = {
    className: PropTypes.string,
};
