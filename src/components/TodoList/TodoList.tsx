import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import UniButton from "../UniButton/UniButton";
import s from './TodoList.module.css'
import TodoListTitle from "../Title/TodoListTitle";
import UniTextInput from "../UniTextInput/UniTextInput";
import UniCheckBox from "../UniCheckbox/UniCheckBox";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todoLisTID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    filter: FilterValuesType | undefined
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const addTaskHandler = () => {
        const taskTitle = title.trim()
        if (!taskTitle) {
            setError(true)
            return
        }
        props.addTask(props.todoListID, taskTitle)
        setTitle("")
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        if (error) setError(false)
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todoListID, value)
    }

   /* const changeTaskStatusHandler = (todolistId:string,t: string, el: boolean) => {
        props.changeTaskStatus(todolistId, t, el)
    }*/

    const tasks = props.tasks.length
        ?
        props.tasks.map(t =>
            <li key={t.id}>
                <UniCheckBox onChangeChecked={(checked) => props.changeTaskStatus(props.todoListID,t.id, checked)} checked={t.isDone}/>
                <span className={t.isDone ? s.isDone : ""}>{t.title}</span>
                <UniButton value={props.filter} children={"X"}
                           onClick={() => props.removeTask(props.todoListID, t.id)}/>
            </li>)
        :
        <div> No tasks here</div>

    return (

        <div className={s.todo}>

            <div className={s.smartTitle}>
                <h3>{props.title}</h3>
                <UniButton onClick={() => props.removeTodoList(props.todoListID)}>-</UniButton>
            </div>


            <div className={s.inputArea}>
                <UniTextInput value={title} error={error} onChange={onChangeInputHandler} onEnter={addTaskHandler}/>
                <UniButton onClick={addTaskHandler}>+</UniButton>
                {error && <div className={s.error}>"Title is required"</div>}
            </div>

            <ul>{tasks}</ul>

            <div className={s.filterButtonArea}>
                <UniButton className={props.filter === 'all' ? s.activeFilter : ""}
                           onClick={() =>  props.changeFilter(props.todoListID, 'all')} children={'all'}/>

                <UniButton className={props.filter === 'active' ? s.activeFilter : ""}
                           onClick={() => props.changeFilter(props.todoListID, "active")} children={"active"}/>

                <UniButton className={props.filter === 'completed' ? s.activeFilter : ""}
                           onClick={() => props.changeFilter(props.todoListID, 'completed')} children={"completed"}/>
            </div>
        </div>
    )
}

