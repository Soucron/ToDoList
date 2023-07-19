

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'

export type ErrorStatusType = string | null

export type AppSetStatusType = {
    type: 'APP/SET-STATUS',
    status: RequestStatusType
}

export type AppSetErrorType = {
    type: 'APP/SET-ERROR',
    error: ErrorStatusType
}

type ActionsType = AppSetStatusType | AppSetErrorType



type InitialStateType = typeof initialState

const initialState = {
    status: 'failed' as RequestStatusType,
    error: null as string | null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) : InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return  {...state, status: action.status}
        case 'APP/SET-ERROR' :
            return {...state, error: action.error}
        default:
            return state
    }
}


export const appSetStatusAC = (status: RequestStatusType) : AppSetStatusType => {
    return {type: 'APP/SET-STATUS', status}
}

export const appSetErrorAC = (error: ErrorStatusType) : AppSetErrorType => {
    return {type: 'APP/SET-ERROR', error}
}
