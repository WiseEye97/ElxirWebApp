import * as React from 'react'
import { BrowserRouter, Route, Switch,Redirect, RouteComponentProps,withRouter } from 'react-router-dom'
import { LoginPage } from './components/Login'
import UserPage from './components/UserPage'
import RegisterComp from './components/Register'
import { some, none, fromNullable, mapNullable,Option, getOrElse,isSome  } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'


const RootFn : React.FC = props => {

  return (
    <BrowserRouter>
        <div id="Navigation"></div>
        <div id="PageBody">
          <Switch>
            <Route exact path="/">
              <LoginPage></LoginPage>
            </Route>
            <Route path="/register">
              <RegisterComp></RegisterComp>
            </Route>
            <Route path="/userpage">
              <UserPage/>         
            </Route>
          </Switch>
        </div>
      </BrowserRouter> 
  )
}

export default RootFn;
