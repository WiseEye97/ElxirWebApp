import React,{useState} from 'react'
import { RouteComponentProps } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button,Form, Footer,Container } from 'react-bulma-components';
import axios from 'axios';
import '../../css/app.css';
import { Option, some, none } from 'fp-ts/lib/Option';

type ReisterStatus = "Success" | "Error"

interface IRegisterResponse {
    status : ReisterStatus
}

interface IRegisterRequest {
    email : string,
    password : string,
    nick : string
}

interface IRegisterState{
    email : string,
    password : string,
    password2 : string,
    nick : string
}

const initial : IRegisterState = {
    email : "",
    password : "",
    password2 : "",
    nick : ""
};

const RegisterComp : React.FC = props => {
    const [state,setState] = useState<IRegisterState>(initial);
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        
        switch (e.target.name) {
            case "email":
                setState({
                    ...state,
                    email : val
                }); 
                break;
            case "nick" :
                setState({
                    ...state,
                    nick : val
                }); 
                break;
            case "pswd":
                setState({
                    ...state,
                    password : val
                });
                break;
            case "pswd2":
                setState({
                    ...state,
                    password2 : val
                });
                break;
            default:
                break;
        }
    };

    const onRegisterClick = (event : React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        axios.post<IRegisterRequest,IRegisterResponse>("/api/register",{
            email : state.email,
            password : state.password,
            nick : state.nick
        }).then(response => {
            console.log(response);
        })
        .catch(errorReason => {
            console.error(errorReason);
        });
    }

    return (
        <Container className="is-two-thirds">
            <Form.Field>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control>
                    <Form.Input onChange={handleChange} name="email" type="email" value={state.email} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Nick</Form.Label>
                <Form.Control>
                    <Form.Input onChange={handleChange} name="nick" type="text" value={state.nick} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Password</Form.Label>
                <Form.Control>
                    <Form.Input onChange={handleChange} name="pswd" type="password" value={state.password} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>ConfirmPassword</Form.Label>
                <Form.Control>
                    <Form.Input onChange={handleChange} name="pswd2" type="password" value={state.password2} />
                </Form.Control>
            </Form.Field>
            <Footer>
                <Button className="is-link is-outlined" onClick={onRegisterClick}>Register</Button>
            </Footer>
        </Container>
    )
}

export default RegisterComp;