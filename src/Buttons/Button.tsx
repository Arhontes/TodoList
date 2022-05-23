import React, {ButtonHTMLAttributes, MouseEvent, DetailedHTMLProps} from 'react';
import {FilterValuesType} from "../App";
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    name?: string,
    filter?: FilterValuesType
    value?: string,
    red?: boolean
}


const Button:React.FC<ButtonPropsType> = (
    {
      red,
        className,
        ...restProps

    }) => {

    /*const style = props.name===props.filter?s.activeFilter:''*/
    return (
       <button {...restProps}></button>
    )
}

export default Button