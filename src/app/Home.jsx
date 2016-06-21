import React, {Component, PropTypes} from "react";
import ImmutablePropTypes from 'react-immutable-proptypes';


export default class Home extends Component {

    onStartGame = () => {
        const {user, appSetLead} = this.props;

        appSetLead(user.get('key'));
    };

    onRol = () => {
        const {user, userRol, app} = this.props;
        const dices = app.get('dices') || 1;
        let value = 0;

        for (let i = 0; i <= dices; i++) {
            value += Math.floor(Math.random() * (6 - 1) + 1);
        }

        userRol(user.get('key'), value);
    };

    appSetDices = (event) => {
        this.props.appSetDices(parseInt(event.target.value));
    };

    render() {
        const {waitTime, users, user, isGameActive, app} = this.props;
        const firstUserKey = users.getIn([0, 'key']);

        const isAdmin = user.get('key') === firstUserKey;

        return (
            <div>
                <div>Wait time {waitTime}</div>
                { isGameActive ? (
                    <button onClick={this.onRol}>Rol</button>
                ) : (
                    <button
                        disabled={users.size <= 1 || waitTime !== 0 || !isAdmin}
                        onClick={this.onStartGame}
                    >
                        { isAdmin ? "Start game" : "Waiting for new game" }
                    </button>
                ) }

                { isAdmin ? (
                    <select disabled={isGameActive} onChange={this.appSetDices} value={app.get('dices')}>
                        {[1, 2, 3, 4].map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                ) : null }
            </div>
        )
    }
}

Home.propTypes = {
    waitTime: PropTypes.number,
    user: ImmutablePropTypes.map,
    users: ImmutablePropTypes.list,
    isGameActive: PropTypes.bool,
    app: ImmutablePropTypes.map,

    /* Actions */
    appSetLead: PropTypes.func,
    userRol: PropTypes.func,
    appSetDices: PropTypes.func
};

