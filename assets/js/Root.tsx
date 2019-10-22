import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages'
import LoginComponent from './pages/login'
import {ILoginProps} from './components/Login'

export default class Root extends React.Component {
    public render(): JSX.Element {

      let xd : ILoginProps = {onLogin : () => console.log('Zalogowano')};

      return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" render={(routerProps) => <LoginComponent {...routerProps} onLogin={xd.onLogin} ></LoginComponent>} />
                </Switch>
            </BrowserRouter>
        </>
      )
    }
  }