import * as React from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import { ILoginProps,LoginPage } from './components/Login'
import {UserPage,IUserProps} from './components/UserPage'
import RegisterComp from './components/Register'
import { some, none, fromNullable, mapNullable,Option, getOrElse  } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

enum Page{
  LoginPage,
  UserPage,
  RegisterPage
}


interface IAppState {
  needRedirect : boolean
  isLogged: boolean
  token : Option<string>
  page : Page
}

type RouterPath = string

export default class Root extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {token : none, isLogged: false, page : Page.LoginPage,needRedirect : false };
  }

  private renderUserPage(): JSX.Element {
    const token = pipe(
      this.state.token,
      getOrElse<string>(() => {throw "Token was missing!"})
    );
    const userProps : IUserProps = {
      token : token
    };

    return <UserPage {...userProps}/>;
  }

  private renderLoginPage(): JSX.Element{
    const loginProps: ILoginProps = {
      onLogin: token => {
        this.setState(function (_a, _) {
          return {token: some(token), isLogged: true,page : Page.UserPage,needRedirect : true };
        });
        console.log('Zalogowano')
      },
      onLoginFailed : () => console.log('login failed'),
      redirectToRegister : () => {
        this.setState({isLogged: false,page : Page.RegisterPage,needRedirect : true });
      }
    };
    return <LoginPage {...loginProps}/>;
  }

  private getPath() : RouterPath {
    switch (this.state.page) {
      case Page.UserPage:
        return "/userpage";  
      case Page.LoginPage:
        return "/";
      case Page.RegisterPage:
        return "/register";
      default:
        throw "Wrong Type of Page";
    }
  }

  public render(): JSX.Element {

    if(this.state.needRedirect){
      this.setState({needRedirect : false});
      const path = this.getPath();
      return <Redirect to={path}></Redirect>
    }
    
    return (
      <BrowserRouter>
        <div id="Navigation"></div>
        <div id="PageBody">
          <Switch>
            <Route path="/">
              {this.renderLoginPage()}
            </Route>
            <Route path="/register">
              <RegisterComp></RegisterComp>
            </Route>
            <Route path="/userpage">
              {this.renderUserPage()}
            </Route>
          </Switch>
        </div>
      </BrowserRouter> 
    )
  }
}