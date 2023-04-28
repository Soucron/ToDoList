import React, {useState} from 'react';
import './App.css';
import {FilterType, TaskPropsType, Todolist} from './Todolist';

function App() {


    const [tasks, setTasks] = useState<TaskPropsType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    const removeTask = (id: number) => {
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


    return (<>
            <Todolist
                title={'What to learn'}
                tasks={fullFilteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </>

    );
}

export default App;
