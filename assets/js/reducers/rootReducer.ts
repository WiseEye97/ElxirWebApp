import { Action } from 'redux'
import { ActionTypes,PUT_TOKEN,DELETE_TOKEN,IPutAuthToken,IDeleteAuthToken } from '../store/types'
import { Option,none,some } from 'fp-ts/lib/Option'
import { combineReducers,createAction,createReducer, PayloadAction } from '@reduxjs/toolkit'
import { putToken , deleteToken} from '../store/types'

type Token = string

export interface IAppStore  {
    token : Option<Token>
}

const initial : IAppStore = {
    token : none
};

export const reducer = 
    createReducer(initial,{
        [putToken.type] : (state : IAppStore,action : PayloadAction<IPutAuthToken>) => {
            return {
                ...state,
                token : some(action.payload.token)
            }
        },
        [deleteToken.type] : (state : IAppStore,_ : PayloadAction<IDeleteAuthToken>) => {
            return {
                ...state,
                token : none
            }
        }
    })
