import type { Meta, StoryObj } from '@storybook/react';

import {action} from '@storybook/addon-actions'
import {Task, TaskPropsType} from '../Task';

import {FC, useState} from 'react';


const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],

    args: {
        removeTask: action( 'removeTask'),
        updateTask: action('updateTaskTitle'),
        changeTaskStatus: action( 'changeTaskStatus'),
        task: {id: 'sdaoda', title: 'HTML', isDone: false}
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {


};

export const TaskIsNotDoneStory: Story = {
    args: {
        task:  {id: 'sdaoda', title: 'JS', isDone: true}
    }
};

const TaskWithHook: FC<TaskPropsType> = (args) => {
    const [task, setTask] = useState(args.task)
    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }
    const updateTask = (id: string, title: string) => {
        setTask( {...task, title:  title})
    }

    return <Task task={task} removeTask={args.removeTask} changeTaskStatus={changeTaskStatus} updateTask={updateTask} />
}

export const TaskWithHookStory: Story = {
    render: (args => <TaskWithHook task={args.task} removeTask={args.removeTask} updateTask={args.updateTask} changeTaskStatus={args.changeTaskStatus}/>)
}


