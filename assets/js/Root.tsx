import * as React from 'react'
import { BrowserRouter, Route, Switch,Redirect, RouteComponentProps,withRouter } from 'react-router-dom'
import { LoginPage } from './components/Login'
import UserPage from './components/UserPage'
import RegisterComp from './components/Register'
import DashBoard from './components/DashBoard'
import { Button,Section,Container } from 'react-bulma-components';
import { some, none, fromNullable, mapNullable,Option, getOrElse,isSome  } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import {connect} from 'react-redux';
import {IAppStore} from './reducers/rootReducer';


const RootFn : React.FC = props => {

  return (
    <BrowserRouter>
        <div className="dashboard" id="Navigation">
          <DashBoard ></DashBoard>
        </div>
        <Section className="columns">
          <Switch>
            <Route exact path="/">
              <LoginPage></LoginPage>
            </Route>
            <Route path="/register">
              <RegisterComp></RegisterComp>
            </Route>
            <Route path="/userpage" render={props => <UserPage {...props}/>}/>                
          </Switch>
        </Section>
      </BrowserRouter> 
  )
}

export default RootFn;
