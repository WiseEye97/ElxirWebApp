import React  from 'react';
import { Button,Form,Content, Level,Heading } from 'react-bulma-components';

export interface IUserProfileProps{
    nick : string
    isSelf : boolean
}

const RenderButtons = (props : {isSelf : boolean}) =>  {
    if(props.isSelf){
        return (
            <>
                <Button className="is-success is-outlined">Edytuj</Button>
            </>
        )
    }else{
        return (
            <>
                <Button>Dodaj do znajomych</Button>
            </>
        )
    }
}

export const UserProfile : React.FC<IUserProfileProps> = (props : IUserProfileProps) => {
    return (
        <>
            <Level renderAs="nav">
                <Level.Side align="left">
                    <Level.Item>
                        <Heading size={3} subtitle>
                            <strong>{props.nick}</strong>
                        </Heading>
                    </Level.Item>
                </Level.Side>
                <Level.Side align="right">
                    <Level.Item>
                        <RenderButtons isSelf={true}></RenderButtons>
                    </Level.Item>
                </Level.Side>
            </Level>
            <Form.Control>
                <Form.Label>
                    Nick :
                </Form.Label>
                <Content>
                    {props.nick}
                </Content>
            </Form.Control>
        </>
    )
};

