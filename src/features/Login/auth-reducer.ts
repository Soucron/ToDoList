import { Dispatch } from 'redux'
import {
    SetAppErrorActionType,
    setAppInitializedAC,
    SetAppInitializedType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {authAPI, LoginType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {

    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0 ) {
            dispatch(setIsLoggedInAC(true))
        } else  {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        const error = e as {message: string}
        handleServerNetworkError(error, dispatch)
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {

    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0 ) {
            dispatch(setIsLoggedInAC(false))
        } else  {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        const error = e as {message: string}
        handleServerNetworkError(error, dispatch)
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}




export const meTC = () => async (dispatch: Dispatch<ActionsType>)=> {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.me()
        if (res.data.resultCode === 0 ) {
            dispatch(setIsLoggedInAC(true))
        } else  {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        const error = e as {message: string}
        handleServerNetworkError(error, dispatch)
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppInitializedAC(true))
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType  | SetAppInitializedType
