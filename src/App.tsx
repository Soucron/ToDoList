import React, {useReducer, useState} from 'react';
import './App.css';
import {FilterType, TaskPropsType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import ButtonAppBar from './Components/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TodoListsType} from './AppWithReducers';



export type TasksType = {
    [key: string] : Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function App() {

    let todolistID1 = v1();

    let [todolist, setTodolist] = useState<TodoListsType[]>([
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'What to buy', filter: 'All'}
    ])


    const [tasks, setTasks] = useState<TasksType>({
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false}
            ]})



    const [filter, setFilter] = useState<FilterType>('All')


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }


    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }


    const updateTaskTitle = (todolistId: string, taskId: string, updateTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: updateTitle} : el)
        })
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {

        setTodolist(todolist.map(e => e.id === todolistId ? {...e, filter: filter} : e))

    }

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1();
        const newTodolist: TodoListsType = {id: newTodolistId, title: newTitle, filter: 'All'}
        setTodolist([newTodolist, ...todolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        setTodolist(todolist.map(el => el.id === todolistId ? {...el, title: updateTitle} : el))
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

export default App;
