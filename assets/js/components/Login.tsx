import * as React from 'react'
import { RouteComponentProps,Redirect } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
//import { Field, Control, Label, Input, Textarea, Select, Checkbox, Radio, Help, InputFile } from 'react-bulma-components/lib/components/form';
import { Button,Form } from 'react-bulma-components';

import axios from 'axios';

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

export interface ILoginProps{
    onLogin : (arg0:string) => void
    onLoginFailed : () => void
    redirectToRegister : () => void
}


export class LoginComponent extends React.Component<ILoginProps,ILoginState> {

    constructor(props : ILoginProps) {
        super(props);

        this.state = {isToggleOn: true,login : "",password : "",isLogging : false};
    
        // Poniższe wiązanie jest niezbędne do prawidłowego przekazania `this` przy wywołaniu funkcji
        this.handleClick = this.handleClick.bind(this);
        this.changeState = this.changeState.bind(this);

    }

    handleClick(event : React.MouseEvent<HTMLInputElement, MouseEvent>) {

        event.preventDefault();

        axios.post("/api/login",{
            login : this.state.login,
            password : this.state.password
        })
        .then(response => {
            let status = response.data as ILoginResponse;
            this.props.onLogin(status.token);
        })
        .catch(reason => console.error(reason));

        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
    }

    changeState(event : React.ChangeEvent<HTMLInputElement>){
        let target = event.target;
        let newState : any = new Object();
        newState[target.name] = target.value;
        this.setState(_  => newState);
    }

    render() {
        return (
            <div>
                <Form.Field>
                    <Form.Label>Login</Form.Label>
                    <Form.Control>
                        <Form.Input onChange={this.changeState} name="login" type="text" placeholder="Username" value={this.state.login} />
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Password</Form.Label>
                    <Form.Control>
                        <Form.Input onChange={this.changeState} name="password" type="password" value={this.state.password} />
                    </Form.Control>
                </Form.Field>
                <div className="footer">
                        <Button loading={this.state.isLogging} onClick={this.handleClick}>Login</Button>
                        <Button onClick={this.props.redirectToRegister}>Register</Button>
                </div>
            </div>
        );
    }
}

export const LoginPage = LoginComponent;