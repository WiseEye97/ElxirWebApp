import * as React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button,Menu } from 'react-bulma-components';
import axios from 'axios';

interface Test{
    x : number
}

export class UserMenu extends React.Component {
    constructor(props : any){
        super(props);
    }

    public render() : JSX.Element {
        return (
            <div>
                <Menu className="">
                    <Menu.List title="General">
                        <Menu.List.Item>
                            Profile
                        </Menu.List.Item>
                        <Menu.List.Item>
                            Ekwipunek
                        </Menu.List.Item>
                    </Menu.List>
                </Menu>
            </div>
        )
    }
}