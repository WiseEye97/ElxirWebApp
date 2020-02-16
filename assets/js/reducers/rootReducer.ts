import { Action } from 'redux'
import { ActionTypes,PUT_TOKEN,DELETE_TOKEN,IPutAuthToken } from '../store/types'
import { Option,none,some } from 'fp-ts/lib/Option'
import { combineReducers,createAction,createReducer } from '@reduxjs/toolkit'
import { putToken } from '../store/types'

type Token = string

export interface IAppStore  {
    token : Option<Token>
}

const initial : IAppStore = {
    token : none
};

export const reducer = 
    createReducer(initial,builder => {
        builder.addCase(putToken,(state : IAppStore,action) => {

        })
    })
