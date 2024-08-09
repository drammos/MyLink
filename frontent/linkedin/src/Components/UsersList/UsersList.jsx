import React from "react"
import PropTypes from 'prop-types';

import './UsersList.css'

const UsersList = ({ items }) => {

    return (
        <div className="glass-container-UsersList">
            <h1>Scrollable List Example</h1>
            <ul className="list">
                {items.map((item, index) => (
                    <li key={index} className="list-item">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

UsersList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default UsersList;