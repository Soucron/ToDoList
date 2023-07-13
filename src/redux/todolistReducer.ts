import {v1} from 'uuid';
import {todolistAPI, TodolistResponseType} from '../api/todolist-api';
import {Dispatch} from 'react';

export type ActionsType = ChangeFilterType | RemoveTodolistType | UpdateTodolistTitleType | AddTodolistType | SetTodolistsType

export type ChangeFilterType = ReturnType<typeof changeFilterAC>

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>

export type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitleAC>

export type AddTodolistType =  {
    type: 'ADD-TODOLIST',
    payload: {
        newTitle: string,
        newTodolistId: string
    }
}


export type SetTodolistsType = {
    type: 'SET-TODOLISTS',
    payload: {
        todolists: TodolistFullType[]
    }
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistFullType = TodolistResponseType & {
    filter: FilterValuesType
}
const initialState: TodolistFullType[] = []

export const fetchTodolistsThunk = (dispatch: Dispatch<any>) => {
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}


export const todolistReducer = (state: TodolistFullType[] = initialState, action: ActionsType): TodolistFullType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.payload.newTodolistId,
                title: action.payload.newTitle,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'UPDATE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.payload.todolistId);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.payload.updateTitle;
            }
            return [...state]
        }
        case 'CHANGE-FILTER': {
            const todolist = state.find(tl => tl.id === action.payload.todolistId);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.payload.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({
                ...tl, filter: 'all'
            }))
        }
        default:
            return state;
    }
}




export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const updateTodolistTitleAC = (todolistId: string, updateTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistId,
            updateTitle
        }
    } as const
}

export const addTodolistAC = ( newTitle: string): AddTodolistType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistId: v1(),
            newTitle
        }
    } as const
}

export const setTodolistsAC = (todolists: TodolistResponseType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}

