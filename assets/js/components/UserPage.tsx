import * as React from 'react'
import * as JQuery from 'jquery'
import MySocket from '../socket'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button,Section,Container } from 'react-bulma-components';
import {UserMenu} from './Menu';
import {MainTinder} from './MainTinder';
import {Shop} from './Shop';
import {List} from 'immutable';
import { Switch,Route, Router,RouteComponentProps } from 'react-router-dom';
import {UserProfile} from './UserProfile';


interface Game{
    roomName : string
    roomSize : number
    playersInRoom : number
}

interface UserPageModel {
    games : List<Game>
}

const UserPage : React.FC<RouteComponentProps> = props => {
    return (
        <Section className="main-content columns is-fullheight column is-full">
            <UserMenu urlPath={props.match.url}></UserMenu>
            <Container className="column is-10">
                <Route path={`${props.match.path}/mainTinder`}>
                    <MainTinder></MainTinder>
                </Route>
                <Route path={`${props.match.path}/shop`}>
                    <Shop></Shop>
                </Route>
                <Route path={`${props.match.path}/userProfile`} render={(props) => <UserProfile {...props} nick="Wise" isSelf={true}></UserProfile>} />
            </Container>              
        </Section>
    )
}

export default UserPage;