import React from 'react';
import {FilterValuesType} from "../App";
import s from './Button.module.css'
export type ButtonType = {
    name: string,
    callback: () => void
    filter?: FilterValuesType
    value?: string
}
const Button = (props:ButtonType) => {
    const style = props.name===props.filter?s.activeFilter:''
    return (
       <button value={props.value} className={style} onClick={props.callback}>{props.name}</button>
    )
}

export default Button