import React, { Component , PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Table from 'react-bootstrap/lib/Table';

class UserList extends Component {

    render() {
        const { users, user} = this.props;
        const currentUserKay = user.get('key');

        const styleCurrentUser = {
            backgroundColor: "#5F9EA0"
        };

        return (
            <div>
                <h2>Users</h2>

                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>wins</th>
                            <th>Available</th>
                            <th>Rol</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                style={user.get('key') === currentUserKay ? styleCurrentUser : {}}
                            >
                                <td>{user.get('username')}</td>
                                <td>{user.get('wins')}</td>
                                <td>{user.get('available') ? 'true' : 'false'}</td>
                                <td>{user.get('rol')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

UserList.propTypes = {
    users: ImmutablePropTypes.list.isRequired,
    user: ImmutablePropTypes.map.isRequired
};
export default UserList;
