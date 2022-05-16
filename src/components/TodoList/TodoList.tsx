import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import Button from "../../Buttons/Button";
import s from './TodoList.module.css'

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
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const changeTaskStatusHandler = (t:string, el:boolean)=>{
        props.changeTaskStatus(t, el)
    }

    const tasks = props.tasks.length ?
        props.tasks.map(t =>
            <li key={t.id}>
                <input onChange={(el)=>changeTaskStatusHandler(t.id,el.currentTarget.checked)} type="checkbox" checked={t.isDone}/>
                <span className={t.isDone ? s.isDone : ""}>{t.title}</span>
                <Button value ={props.filter} name={"remove"} callback={() => props.removeTask(t.id)}/>

            </li>)
        :
        <div> All is done</div>

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error?s.inputError:""} value={title} onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={s.error}>Title is required</div> }
            </div>
            <ul>{tasks}</ul>
            <div>
                <Button filter={props.filter} callback={() => changeFilterHandler('all')} name={'all'}/>
                <Button filter={props.filter} callback={() => changeFilterHandler("active")} name={"active"}/>
                <Button filter={props.filter} callback={() => changeFilterHandler('completed')} name={"completed"}/>

            </div>
        </div>
    );
};

