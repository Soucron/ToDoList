import type { Meta, StoryObj } from '@storybook/react';

import {action} from '@storybook/addon-actions'

import {EditableSpan} from '../Components/EditableSpan';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/Task',
    component: EditableSpan,
    tags: ['autodocs'],

};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
        args: {
            oldTitle: 'some text',
            callBack: action( 'Title changed')
        }

};



