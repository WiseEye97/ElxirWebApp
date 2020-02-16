import * as React from 'react'
import { RouteComponentProps,Redirect,withRouter } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button,Form } from 'react-bulma-components';

import axios from 'axios';
import store from '../store/store';

import { putToken,deleteToken } from '../store/types'
import {Action} from 'redux'
import { combineReducers,createAction } from '@reduxjs/toolkit'
import '../../css/app.css'

interface ILoginState {
    isToggleOn: boolean
    login: string
    password : string
    isLogging : boolean
}

interface ILoginResponse {
    status : string
    token : string
}

type ClickEvent = React.MouseEvent<HTMLInputElement, MouseEvent>;

const LoginComponent  = (props : RouteComponentProps) => {
    const [state,setState] = React.useState<ILoginState>({isToggleOn: true,login : "",password : "",isLogging : false})

    const changeState = (event : React.ChangeEvent<HTMLInputElement>) => {
        let target = event.target;
        let newState : any = new Object();
        newState[target.name] = target.value;
        setState(oldState  => {
            let newState : any = {...oldState};
            newState[target.name] = target.value;
            return newState;
        });
    }

    const handleLoginClick = (event : ClickEvent) => {

        event.preventDefault();

        axios.post("/api/login",{
            login : state.login,
            password : state.password
        })
        .then(response => {
            let status = response.data as ILoginResponse;
            if(status.status === 'ok'){
                const putTokenMsg = putToken({token : status.token});
                store.dispatch(putTokenMsg);
                localStorage.setItem('token',status.token);
                props.history.push('/userpage');
            }
        })
        .catch(reason => console.error(reason));

        setState(state => {
            let newState = {...state};
            newState.isToggleOn = !state.isToggleOn;
            return newState;
        });
    }

    const registerClick = (event : ClickEvent) => {
        //event.preventDefault();
        props.history.push('/register');
    }

    return (
        <div>
            <Form.Field>
                <Form.Label>Login</Form.Label>
                <Form.Control>
                    <Form.Input onChange={changeState} name="login" type="text" placeholder="Username" value={state.login} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Password</Form.Label>
                <Form.Control>
                    <Form.Input onChange={changeState} name="password" type="password" value={state.password} />
                </Form.Control>
            </Form.Field>
            <div className="footer">
                    <Button loading={state.isLogging} onClick={handleLoginClick}>Login</Button>
                    <Button onClick={registerClick}>Register</Button>
            </div>
        </div>
    );
} 

export const LoginPage = withRouter(LoginComponent);