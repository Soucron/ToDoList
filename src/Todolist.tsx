import React from 'react';

export type TaskPropsType = {
    id: number,
    title: string,
    isDone: boolean
}

export type TodoPropsType = {
    title: string
    tasks: TaskPropsType[]
    removeTask: (id: number) => void
    changeFilter: (filter: FilterType) => void
}

export type FilterType = 'all' | 'active' | 'completed'










export const Todolist = (props: TodoPropsType): any => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                        return (
                            <li>
                                <input type={'checkbox'} checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>props.removeTask(t.id)}>X</button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
