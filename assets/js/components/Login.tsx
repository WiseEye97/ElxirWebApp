import * as React from 'react'

import '../../css/app.css'

interface ILoginState {
    isToggleOn: boolean
    login: string
    password : string
}

export default class LoginComponent extends React.Component<any,ILoginState> {

    constructor(props : any) {
        super(props);
        this.state = {isToggleOn: true,login : "",password : ""};
    
        // Poniższe wiązanie jest niezbędne do prawidłowego przekazania `this` przy wywołaniu funkcji
        this.handleClick = this.handleClick.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    handleClick() {
        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
    }

    changeState(event : React.ChangeEvent<HTMLInputElement>){
        let target = event.target;
        switch(target.name){
            case "username" : 
                this.setState(function(state,props){
                    return {login: target.value}
                });
                break;
            case "password":
                this.setState(function(state,props){
                    return {password: target.value}
                });
                break;
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.login}</h1>
                <h1>{this.state.password}</h1>
                <h1></h1>
                <form className="login-form">
                    <div className="header">
                        <h1>Login Form</h1>
                    </div>
                    <div className="content">
                        <input name="username" type="text" className="input username" placeholder="Username" onChange={this.changeState} />
                        <input name="password" type="password" className="input password" placeholder="Password" onChange={this.changeState} />
                    </div>
                    <div className="footer">
                        <input type="submit" name="submit" value="Login" className="button" onClick={this.handleClick} />
                        <input type="submit" name="submit" value="Register" className="register" />
		            </div>
                </form>
            </div>
        );
    }
}