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

const UserPage : React.FC = props => {
    return (
        <div>
            <UserMenu></UserMenu>
        </div>
    )
}

export default UserPage;