import {tasksReducer} from './tasksReducer';
import {todolistReducer} from './todolistReducer';
import {combineReducers, legacy_createStore} from 'redux';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistReducer
})

export const  store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

