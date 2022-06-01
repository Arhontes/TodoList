import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import UniButton from "../UniButton/UniButton";
import s from './TodoList.module.css'
import UniCheckBox from "../UniCheckbox/UniCheckBox";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";

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
    editTodoListTitle:(todolistId:string, title:string)=>void
    editTaskTitle:(todolistId:string, taskID:string,title:string)=>void
}

export const TodoList = (props: TodoListPropsType) => {


    const addTaskHandler = (title:string) => {
        const taskTitle = title.trim()
        if (!taskTitle) {
            return
        }
        props.addTask(props.todoListID, taskTitle)
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todoListID, value)
    }

    const changeTaskStatusHandler = (todolistId:string,t: string, el: boolean) => {
        props.changeTaskStatus(todolistId, t, el)
    }

    const editTaskHandler = ( taskID:string,title:string)=>{
        props.editTaskTitle(props.todoListID,taskID,title)
    }
    const tasks = props.tasks.length
        ?
        props.tasks.map(t =>
            <li key={t.id}>
                <UniCheckBox onChangeChecked={(checked) => changeTaskStatusHandler(props.todoListID,t.id, checked)} checked={t.isDone}/>
                <EditableSpan title={t.title} callback={(title)=>props.editTaskTitle(props.todoListID,t.id,title)}/>

                <UniButton value={props.filter} children={"X"}
                           onClick={() => props.removeTask(props.todoListID, t.id)}/>
            </li>)
        :
        <div> No tasks here</div>
    const editTodoListTitleHandler = (title:string)=>{
        props.editTodoListTitle(props.todoListID,title)
    }

    return (
        <div className={s.todo}>

            <div className={s.smartTitle}>
                <EditableSpan callback={editTodoListTitleHandler} title={props.title} />
                <UniButton onClick={() => props.removeTodoList(props.todoListID)}>-</UniButton>
            </div>

            <AddItemForm callBack={addTaskHandler}/>

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

