import React, {ButtonHTMLAttributes, MouseEvent, DetailedHTMLProps} from 'react';
import {FilterValuesType} from "../../App";
import s from './UnButton.module.css'

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