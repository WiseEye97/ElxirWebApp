import * as React from 'react'
import * as JQuery from 'jquery'
import MySocket from '../socket'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import {UserMenu} from './Menu';
import {List} from 'immutable';

interface Game{
    roomName : string
    roomSize : number
    playersInRoom : number
}

interface UserPageModel {
    games : List<Game>
}

export interface IUserProps{
    token : string
} 

export class UserPage extends React.Component {
    constructor(props : IUserProps){
        super(props);
        MySocket(props.token);
    }

    public render(){
        return (
            <div>
                <UserMenu></UserMenu>
            </div>
        )
    }
}