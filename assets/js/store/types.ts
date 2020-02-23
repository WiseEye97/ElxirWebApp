import { combineReducers,createAction } from '@reduxjs/toolkit'
import {Action} from 'redux'

export const PUT_TOKEN = 'PUT_TOKEN'
export const DELETE_TOKEN = 'DELETE_TOKEN'

type Token = string

export interface IPutAuthToken{
    token : Token
}

export interface IDeleteAuthToken{}

export type ActionTypes = IPutAuthToken | IDeleteAuthToken 

export const putToken = createAction<IPutAuthToken>(PUT_TOKEN);
export const deleteToken = createAction<IDeleteAuthToken>(DELETE_TOKEN);