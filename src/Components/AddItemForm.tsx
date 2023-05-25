import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';
import {v1} from 'uuid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    callBack: ( title: string) => void,
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        let newTitle = title.trim();
        if (title.trim() !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }

    }

    const muiStyles = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '40px',
        minHeight: '40  px',
        backgroundColor: 'black'
    }


    return (
        <div>
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyUp={onKeyPressHandler}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}

            <TextField
                error={!!error}
                size='small'
                id='outlined-basic'
                variant='outlined'
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                value={title}
                label={error ? 'Title is required': 'Type  something'}

            />

            <Button variant="contained"
                    style={muiStyles}
                    onClick={addItem}>+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

export default AddItemForm;