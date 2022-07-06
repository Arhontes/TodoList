import React from 'react';
import {FilterValuesType, TaskType} from "../../App";
import UniButton from "../UniButton/UniButton";
import s from './TodoList.module.css'
import UniCheckBox from "../UniCheckbox/UniCheckBox";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {
    changeTodoListFilterAC,
    editTodoListTitleAC,
    removeTodoListAC,
    TodoListsReducerActionType
} from "../reducers/TodoListsReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    editTaskTitleAC,
    removeTaskAC, removeTasksListAC,
    TasksReducerActionType
} from "../reducers/TasksReducer";

type TodoListPropsType = {
    todoListDispatch: (action: TodoListsReducerActionType) => void
    tasksDispatch:(action:TasksReducerActionType)=>void
    todoListID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType | undefined
}

export const TodoList = (props: TodoListPropsType) => {


    const changeTodoListFilterHandler = (value: FilterValuesType) => {
        props.todoListDispatch(changeTodoListFilterAC(props.todoListID, value))
    }
    const editTodoListTitleHandler = (title: string) => {
        props.todoListDispatch(editTodoListTitleAC(props.todoListID, title))
    }
    const removeTodoListHandler = ()=>{
        props.todoListDispatch(removeTodoListAC(props.todoListID))
        props.tasksDispatch(removeTasksListAC(props.todoListID))
    }
    const addTaskHandler = (title: string) => {
        const taskTitle = title.trim()
        if (!taskTitle) {
            return
        }
        props.tasksDispatch(addTaskAC(props.todoListID, taskTitle))
    }
    const editTaskTitleHandler = (taskID: string, title: string) => {
        props.tasksDispatch(editTaskTitleAC(props.todoListID, taskID, title))
    }
    const changeTaskStatusHandler = (todolistId: string, t: string, el: boolean) => {
        props.tasksDispatch(changeTaskStatusAC(todolistId, t, el))
    }
    const removeTaskHandler = (taskID:string)=>{
        props.tasksDispatch(removeTaskAC(props.todoListID,taskID))
    }

    const tasks = props.tasks.length
        ? props.tasks.map(t =>
            <li key={t.id}>
                <UniCheckBox onChangeChecked={(checked) => changeTaskStatusHandler(props.todoListID, t.id, checked)}
                             checked={t.isDone}/>
                <EditableSpan title={t.title} callback={(title) => editTaskTitleHandler(t.id, title)}/>

                <UniButton value={props.filter} children={"X"}
                           onClick={() => removeTaskHandler(t.id)}/>
            </li>)

        : <div> No tasks here</div>
    return (
        <div className={s.todo}>

            <div className={s.smartTitle}>
                <EditableSpan callback={editTodoListTitleHandler} title={props.title}/>
                <UniButton onClick={removeTodoListHandler}>-</UniButton>
            </div>

            <AddItemForm callBack={addTaskHandler}/>

            <ul>{tasks}</ul>

            <div className={s.filterButtonArea}>
                <UniButton className={props.filter === 'all' ? s.activeFilter : ""}
                           onClick={()=>changeTodoListFilterHandler( 'all')} children={'all'}/>

                <UniButton className={props.filter === 'active' ? s.activeFilter : ""}
                           onClick={()=>changeTodoListFilterHandler( "active")} children={"active"}/>

                <UniButton className={props.filter === 'completed' ? s.activeFilter : ""}
                           onClick={()=>changeTodoListFilterHandler( 'completed')} children={"completed"}/>
            </div>
        </div>
    )
}

