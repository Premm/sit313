import React from 'react';
import PropTypes from 'prop-types';
import C from "classnames";

export const CardHeaderTabs = (props) => {
    return (
        <ul className={C("nav", "nav-tabs", "card-header-tabs", props.className)}>
            {props.children}
        </ul>
    );
}

CardHeaderTabs.propTypes = {
    className: PropTypes.string,
};
