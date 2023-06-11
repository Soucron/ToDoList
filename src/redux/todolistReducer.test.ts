import {addTodolistAC, changeFilterAC, todolistReducer, updateTodolistTitleAC} from './todolistReducer'
import { v1 } from 'uuid'
import {FilterType} from '../Todolist';

import {TodoListsType} from '../AppWithReducers';

test('correct todolist should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', payload: {todolistId: todolistID1}} )



    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})
test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()




    const startState: Array<TodoListsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'}
    ]
    const action = addTodolistAC( 'New Todolist')
    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
    expect(endState[2].filter).toBe('All');
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]


    const endState = todolistReducer(startState, updateTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterType = 'Completed'

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]


    const endState = todolistReducer(startState, changeFilterAC(todolistId2, newFilter) )

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})




