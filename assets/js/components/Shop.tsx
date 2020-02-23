import React, { useEffect, useState } from 'react';
import {Card,Media,Image,Heading,Content} from 'react-bulma-components';
import axios, { AxiosResponse } from 'axios';
import {toArray,fromArray} from 'fp-ts/lib/ReadonlyArray';

interface IShopItem{
    name : string
    imageUrl : string
    cost : number
}

interface IShopItemProps {
    item : IShopItem
}

const ShopItem : React.FC<IShopItemProps> = props => {
    return (
        <Card>
            <Card.Image size="4by3" src={props.item.imageUrl} />
            <Card.Content>
                <Media>
                <Media.Item>
                    <Heading size={4}>{props.item.name}</Heading>
                    <Heading subtitle size={6}>@johnsmith</Heading>
                </Media.Item>
                </Media>
                <Content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#1">#css</a> <a href="#2">#responsive</a>
                <br />
                <p>{props.item.cost}</p>
                </Content>
            </Card.Content>
        </Card>
    )
}



interface IShopState{
    items : ReadonlyArray<IShopItem>
}


interface IShopItemsResponse{
    items : Array<IShopItem>
}

const initial : IShopState = {
    items : fromArray([])
};

export const Shop : React.FC = props => {

    const [state,setState] = useState<IShopState>(initial);

    useEffect(() => {
        axios
            .get("/api/shop/items")
            .then((response : AxiosResponse<IShopItemsResponse>) => response.data)
            .then(response => {
                setState({
                    ...state,
                    items : fromArray(response.items)
                });
            })
    });

    return (
        <>
            {state.items.map(v => <ShopItem key={v.name} item={v}/>)}
        </>
    )
}