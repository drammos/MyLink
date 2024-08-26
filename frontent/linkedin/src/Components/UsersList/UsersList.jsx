import PropTypes from 'prop-types';

import './UsersList.css'

const UsersList = ({ items }) => {

    return (
        <div className="usersListsContainer">
            <div className="usersList">
                <h1>MyLink Users
                    <span className ="numOfUsers">(Num / Num Admins)</span>
                </h1>
                <ul className="list">
                    {items.map((item, index) => (
                        <li key={index} className="list-item">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

UsersList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default UsersList;