import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {FilterValuesType} from "../reducers/TodoListsReducer";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    name?: string,
    filter?: FilterValuesType
    value?: string,
    red?: boolean
}


const UniButton:React.FC<ButtonPropsType> = (
    {
      red,
        ...restProps

    }) => {

    return (
       <button  {...restProps}></button>
    )
}

export default UniButton