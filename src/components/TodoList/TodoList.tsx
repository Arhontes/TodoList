import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import UniButton from "../Buttons/UniButton";
import s from './TodoList.module.css'
import TodoListTitle from "../Title/TodoListTitle";
import UnTextInput from "../UniTextInput/UnTextInput";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    filter: FilterValuesType|undefined
    changeTaskStatus: (taskID:string, isDone:boolean)=>void
}

export const TodoList = (props: TodoListPropsType) => {
    const [error,setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const addTaskHandler = () => {
        const taskTitle = title.trim()
        if (!taskTitle){
            setError(true)
            return
        }
        props.addTask(taskTitle)
        setTitle("")
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        if(error)setError(false)
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const changeTaskStatusHandler = (t:string, el:boolean)=>{
        props.changeTaskStatus(t, el)
    }

    const tasks = props.tasks.length
        ?
        props.tasks.map(t =>
            <li key={t.id}>

                <input onChange={(el)=>changeTaskStatusHandler(t.id,el.currentTarget.checked)} type="checkbox" checked={t.isDone}/>
                <span className={t.isDone ? s.isDone : ""}>{t.title}</span>
                <UniButton  value={props.filter} children={"X"} onClick={() => props.removeTask(t.id)}/>
            </li>)
        :
        <div> Add task</div>

    return (

        <div>

            <TodoListTitle title={props.title}/>

            <div>
                <UnTextInput error={error} onChange={onChangeInputHandler} onEnter={addTaskHandler}/>
                <UniButton onClick={addTaskHandler}>+</UniButton>
                {error&&<div className={s.error}>"Title is required"</div> }
            </div>

            <ul>{tasks}</ul>

            <div>
                <UniButton className={props.filter==='all'?s.activeFilter:""}
                           onClick={() => changeFilterHandler('all')} children={'all'}/>

                <UniButton className={props.filter==='active'?s.activeFilter:""}
                           onClick={() => changeFilterHandler("active")} children={"active"}/>

                <UniButton className={props.filter==='completed'?s.activeFilter:""}
                           onClick={() => changeFilterHandler('completed')} children={"completed"}/>
            </div>
        </div>
    );
};

