import * as React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button,Menu } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface IUserMenuProps{
    urlPath : string
}

type Profile = 1
type Inventory = 2
type Shop = 3

const Profile : Profile = 1;
const Inventory : Inventory = 2;
const Shop : Shop = 3;

type ActiveLink = 
    | Profile 
    | Inventory
    | Shop

interface IListItemProps {
    linkType : ActiveLink
    url : string
    text : string
}


export const UserMenu : React.FC<IUserMenuProps> = props => {

    const [activeLink,setactiveLink] = React.useState<ActiveLink>(Profile);

    const isActive : (a : ActiveLink) => boolean = arg => arg === activeLink;
    const genClassName : (a : ActiveLink) => string = arg => isActive(arg) ? "is-active" : "";

    const ListItem : React.FC<IListItemProps> = props => (
        <li>
            <Link onClick={_ => setactiveLink(props.linkType)} className={genClassName(props.linkType)} to={props.url} style={{ textDecoration: 'none' }}>
                Profil
            </Link> 
        </li> 
    );
    
    return (
        <Menu className="column is-2">
            <Menu.List title="General">
                <ListItem text="Profil" linkType={Profile} url={`${props.urlPath}/userProfile`}></ListItem>
                <ListItem text="Ekwipunek" linkType={Inventory} url={`${props.urlPath}/inventory`}></ListItem>
                <ListItem text="Sklep" linkType={Shop} url={`${props.urlPath}/shop`}></ListItem>            
            </Menu.List>
        </Menu>
    )
}
