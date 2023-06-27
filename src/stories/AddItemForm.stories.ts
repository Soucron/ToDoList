import type {Meta, StoryObj} from '@storybook/react';

import {AddItemForm} from '../Components/AddItemForm';
import {action} from '@storybook/addon-actions'


const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        callBack: {
            action: 'Button send this text'
        },
    },
};
export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        callBack: action('Button send this text')
    }

};



