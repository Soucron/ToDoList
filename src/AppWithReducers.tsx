import React, {useReducer} from 'react';
import './App.css';
import {FilterType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './Components/AddItemForm';
import ButtonAppBar from './Components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from './redux/tasksReducer';
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistReducer,
    updateTodolistTitleAC
} from './redux/todolistReducer';


export type  TodoListsType = { id: string, title: string, filter: FilterType }


export function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, todolistDispatch] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'}
    ])



    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}
            ]
        }
    )





    const removeTask = (todolistId: string, taskId: string) => {
        tasksDispatch(removeTaskAC(todolistId, taskId))

    }


    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        tasksDispatch(changeTaskStatusAC(todolistId, taskId, isDone,))
    }

    const addTask = (todolistId: string, title: string) => {
        tasksDispatch(addTaskAC(todolistId, title))

    }


    const updateTaskTitle = (todolistId: string, taskId: string, updateTitle: string) => {
        tasksDispatch(updateTaskTitleAC(todolistId, taskId, updateTitle))
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {
        todolistDispatch(changeFilterAC(todolistId, filter))

    }

    const removeTodolist = (todolistId: string) => {
        todolistDispatch(removeTodolistAC(todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        todolistDispatch(action)
        tasksDispatch(action)


    }

    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        todolistDispatch(updateTodolistTitleAC(todolistId, updateTitle))
    }


    return (<>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm callBack={addTodolist}/>

                </Grid>
                <Grid container spacing={3}>
                    {
                        todolist.map(el => {
                            let fullFilteredTasks = tasks[el.id]
                            if (el.filter === 'Active') {
                                fullFilteredTasks = tasks[el.id].filter(t => !t.isDone)
                            }
                            if (el.filter === 'Completed') {
                                fullFilteredTasks = tasks[el.id].filter(t => t.isDone)
                            }

                            return <Grid item key={el.id}>
                                <Paper elevation={5} style={{padding: '10px'}}>
                                    <Todolist
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={fullFilteredTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTaskTitle}
                                        updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>


        </>

    );
}


