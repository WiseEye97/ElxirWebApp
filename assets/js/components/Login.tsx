import * as React from 'react'
import * as JQuery from 'jquery'

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

    handleClick(event : React.MouseEvent<HTMLInputElement, MouseEvent>) {

        event.preventDefault();

        JQuery.post("/api/login",{
            login : this.state.login,
            password : this.state.password
        }, function( data ) {
            console.log('From first function' + data);
        })
        .done(function(x){
            
            console.log('From second function' + x);
        });

        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
    }

    changeState(event : React.ChangeEvent<HTMLInputElement>){
        let target = event.target;

        let updatedObj : any = new Object();
        updatedObj[target.name] = target.value;
        this.setState(function(_state,_props){
            return updatedObj;
        });

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
                        <input name="login" type="text" className="input username" placeholder="Username" onChange={this.changeState} />
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