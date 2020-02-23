import React from 'react';
import { Navbar, Button } from 'react-bulma-components';
import { connect } from 'react-redux';
import { IAppStore } from '../reducers/rootReducer';
import { some, none, fromNullable, mapNullable, Option, getOrElse, isSome } from 'fp-ts/lib/Option'
import { putToken,deleteToken,IDeleteAuthToken } from '../store/types';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';

type Dispatch = (agr0:IDeleteAuthToken) => void

interface IDashBoardProps {
    isLogged: boolean;
    deleteToken: Dispatch
}

interface ISignCompProps {
    isLogged: boolean
    logOut : Dispatch
}


const SignComp: React.FC<ISignCompProps> = props => {
    
    if (props.isLogged) {
        return (
            <Navbar.Item renderAs="div">
                <Link className="navbar-item" to="/" onClick={() => props.logOut({})}>
                    Sign Out
                </Link>
            </Navbar.Item>
        );
    } else {
        return (
            <Navbar.Item renderAs="div">
                <div className="buttons"> 
                    <Link className="navbar-item button is-outlined" to="/">
                        Sign In
                    </Link>
                    <Link className="navbar-item button is-outlined" to="/register">
                        Sign Up
                    </Link>
                </div>
            </Navbar.Item>
        );
    }

}

const DashBoard: React.FC<IDashBoardProps> = (props: IDashBoardProps) => {
    return (
        <Navbar>
            <Navbar.Brand>
                <Navbar.Item renderAs="a">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                </Navbar.Item>
                <Navbar.Burger />
            </Navbar.Brand>
            <Navbar.Menu >
                <Navbar.Container>
                    <Navbar.Item>
                        First
                    </Navbar.Item>
                    <Navbar.Item >
                        Second
                    </Navbar.Item>
                </Navbar.Container>
                <Navbar.Container position="end">
                    <SignComp isLogged={props.isLogged} logOut={props.deleteToken}></SignComp>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    )
}



export default connect((state: IAppStore) => {
    return {
        isLogged: isSome(state.token)
    }
}, dispatch => {
    const bounded = bindActionCreators({ deleteToken }, dispatch);
    return bounded;
})(DashBoard) 