import {FilterType} from '../Todolist';
import {TodoListsType} from '../AppWithReducers';
import {v1} from 'uuid';

export type ActionsType = ChangeFilterType | RemoveTodolistType | UpdateTodolistTitleType | AddTodolistType

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

const initialState: TodoListsType[] = []



export const todolistReducer = (state: TodoListsType[] = initialState, action: ActionsType): TodoListsType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(todolist => todolist.id === action.payload.todolistId ?
                {...todolist, filter: action.payload.filter} : todolist)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        }
        case 'UPDATE-TODOLIST-TITLE' : {
            return state.map(todolist => todolist.id === action.payload.todolistId ?
                {...todolist, title: action.payload.updateTitle} : todolist)
        }
        case 'ADD-TODOLIST' : {
            const newTodoList: TodoListsType = {
                id: action.payload.newTodolistId, title: action.payload.newTitle, filter: 'All'
            };
            return [newTodoList, ...state]
        }
        default:
            return state
    }
}



export const changeFilterAC = (todolistId: string, filter: FilterType) => {
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

