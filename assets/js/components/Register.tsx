import React,{useState} from 'react'
import { RouteComponentProps } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button,Form, Footer } from 'react-bulma-components';
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

const RegisterComp : React.FC = props => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const [nick,setNick] = useState('');

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        switch (e.target.name) {
            case "email": 
                setEmail(val);
                break;
            case "nick" : 
                setNick(val);
                break;
            case "pswd":
                setPassword(val);
                break;
            case "pswd2":
                setPassword2(val);
                break;
            default:
                break;
        }
    };

    const onRegisterClick = (event : React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        axios.post<IRegisterRequest,IRegisterResponse>("/api/register",{
            email,
            password,
            nick
        }).then(response => {
            console.log(response);
        })
        .catch(errorReason => {
            console.error(errorReason);
        });
    }

    return (
        <>
            <Form.Field>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control>
                    <Form.Input onChange={handleChange} name="email" type="email" value={email} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Nick</Form.Label>
                <Form.Control>
                    <Form.Input onChange={handleChange} name="nick" type="text" value={nick} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Password</Form.Label>
                <Form.Control>
                    <Form.Input onChange={handleChange} name="pswd" type="password" value={password} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>ConfirmPassword</Form.Label>
                <Form.Control>
                    <Form.Input onChange={handleChange} name="pswd2" type="password" value={password2} />
                </Form.Control>
            </Form.Field>
            <Footer>
                <Button onClick={onRegisterClick}>Register</Button>
            </Footer>
        </>
    )
}

export default RegisterComp;