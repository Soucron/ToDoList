import React, {useState} from 'react';
import './App.css';
import {FilterType, TaskPropsType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './Components/AddItemForm';


type  TodoListsType = { id: string, title: string, filter: FilterType }
type TodoListTaskType = {
    [key: string]: TaskPropsType []
}


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodoListsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'}
    ])


    const [tasks, setTasks] = useState<TodoListTaskType>({
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

    // const [filter, setFilter] = useState<FilterType>('All')
    const changeFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(e => e.id === todolistId ? {...e, filter: filter} : e))

    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
        // const fiteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(fiteredTasks)
    }


    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

        // let newTasks = [task, ...tasks]
        // setTasks(newTasks)
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1();
        const newTodolist: TodoListsType = {id: newTodolistId, title: newTitle, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks,[newTodolistId]:[]})


    }


    return (<>
            <AddItemForm callback={addTodolist}/>
            {todolists.map(el => {
                let fullFilteredTasks = tasks[el.id]
                if (el.filter === 'Active') {
                    fullFilteredTasks = tasks[el.id].filter(t => !t.isDone)
                }
                if (el.filter === 'Completed') {
                    fullFilteredTasks = tasks[el.id].filter(t => t.isDone)
                }

                return <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={fullFilteredTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </>

    );
}

export default App;
