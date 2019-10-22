import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {LoginComponent,ILoginProps} from '../components/Login'

const Login: React.FC<RouteComponentProps & ILoginProps> = (prp : ILoginProps) => <LoginComponent onLogin={prp.onLogin}></LoginComponent>

export default Login