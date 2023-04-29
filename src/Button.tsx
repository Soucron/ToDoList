import React from 'react';


export type ButtonPropsType = {
    callback: () => void,
    name: string
}
export const Button = (props:ButtonPropsType) => {
    const buttonOnClickHandler = () => {
        props.callback()
    }

    return (
        <button onClick={buttonOnClickHandler}>{props.name}</button>
    );
};

