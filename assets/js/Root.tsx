import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages'
import LoginComponent from './pages/login'

export default class Root extends React.Component {
    public render(): JSX.Element {
      return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginComponent} />
                </Switch>
            </BrowserRouter>
        </>
      )
    }
  }