import React, {useState} from 'react';
import './App.css';
import {FilterType, TaskPropsType, Todolist} from './Todolist';
import {v1} from 'uuid';

function App() {


    const [tasks, setTasks] = useState<TaskPropsType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    const removeTask = (id: string) => {
        const fiteredTasks = tasks.filter(t => t.id !== id);
        setTasks(fiteredTasks)
    }

    let fullFilteredTasks = tasks
       if (filter === 'active') {
           fullFilteredTasks = tasks.filter(t => t.isDone === false)
       }
       if (filter === 'completed') {
           fullFilteredTasks = tasks.filter(t => t.isDone === true)
       }

    const addTask = (title: string) => {
           let task = {id: v1(), title: title, isDone: false }
           let newTasks = [task, ...tasks]
            setTasks(newTasks)
    }

    return (<>
            <Todolist
                title={'What to learn'}
                tasks={fullFilteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </>

    );
}

export default App;
