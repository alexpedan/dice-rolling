import React, {Component} from "react";

import UserList from '../user/UserList.jsx';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userFetchAll, userCreate, userRol, userRemove, setWinner} from '../user/UserActions';
import {appSetLead, appAddListener, appSetDices} from './AppActions';

class App extends Component {
    state = {
        waitTime: 0,
        isGameActive: false
    };

    componentWillMount() {
        this.props.userFetchAll();
        this.props.appAddListener();

        if (this.props.user.isEmpty()) {
            const userName = prompt('Enter your name', '');
            this.props.userCreate(userName);
        }

        window.addEventListener("beforeunload", this.remove)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.app.get('startDate') !== nextProps.app.get('startDate') && this.props.app.get('leadKey') !== undefined) {
            setTimeout(this.startRole, 0);
        }
    }

    startRole = () => {
        const {user, app} = this.props;

        this._interval = setInterval(this.waitRol, 1000);
        this.setState({
            waitTime: 5,
            isGameActive: true
        });
    };

    waitRol = () => {
        const {userRol, user, app} = this.props;
        const {isGameActive} = this.state;
        const waitTime = this.state.waitTime - 1;

        this.setState({waitTime});

        // TODO: Implement this functionality for finding winner on the server side!
        if (waitTime < 1) {
            clearInterval(this._interval);
            isGameActive && userRol(user.get('key'), 0);
            this.setState({
                textStatus: isGameActive ? "You are lose" : "",
                isGameActive: false
            });

            if(user.get('key') === app.get('leadKey')) {
                this.findWinner();
            }
        }
    };

    findWinner = () => {
        const {users} = this.props;

        const winnerUser = users.maxBy((user) => user.get('rol'));
        this.props.setWinner(
            winnerUser.get('key'),
            winnerUser.get('wins') + 1,
            winnerUser.get('username')
        );
    };

    remove = () => {
        this.props.userRemove(this.props.user.get('key'));
    };

    userRol = (...args) => {
        this.setState({
            textStatus: "",
            isGameActive: false
        });
        this.props.userRol(...args);
    };

    render() {
        const {user, appSetLead, app, users, appSetDices} = this.props;
        const {waitTime, isGameActive} = this.state;

        return (
            <Row>
                <Col md={8}>
                    <UserList
                        users={this.props.users}
                        user={this.props.user}
                    />
                </Col>


                <Col md={4}>
                    {React.cloneElement(this.props.children, {
                        app,
                        appSetDices,
                        isGameActive,
                        waitTime,
                        user,
                        users,
                        appSetLead,
                        userRol: this.userRol
                    })}
                    <div>Winner: {app.get('winner')}</div>
                </Col>
            </Row>
        )
    }
}

App = connect(
    ({user, app}) => ({
        users: user.get('list'),
        user: user.get('record'),
        app
    }),
    (dispatch) => ({
        userFetchAll: bindActionCreators(userFetchAll, dispatch),
        userCreate: bindActionCreators(userCreate, dispatch),
        appSetLead: bindActionCreators(appSetLead, dispatch),
        appAddListener: bindActionCreators(appAddListener, dispatch),
        userRol: bindActionCreators(userRol, dispatch),
        userRemove: bindActionCreators(userRemove, dispatch),
        setWinner: bindActionCreators(setWinner, dispatch),
        appSetDices: bindActionCreators(appSetDices, dispatch)
    })
)(App);

export default App;
