import React, {memo, useCallback} from 'react';
import UniButton from "../UniButton/UniButton";
import s from './TodoList.module.css'
import UniCheckBox from "../UniCheckbox/UniCheckBox";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {FilterValuesType} from "../reducers/TodoListsReducer";
import {TaskType} from "../reducers/TasksReducer";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType | undefined
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todolistId: string, t: string, el: boolean) => void
    editTaskTitle: (todoListID: string, taskID: string, title: string) => void
    removeTask: (todoListID: string, taskID: string) => void
    editTodoListTitle: (todoListID: string, title: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (todoListID: string, value: FilterValuesType) => void
}

export const TodoList = memo((props: TodoListPropsType) => {
    console.log("TodoList")
    function getTasksByTodoListFilter(): Array<TaskType> {
        switch (props.filter) {
            case "completed":
                return  props.tasks.filter((t) => t.isDone)
            case "active":
                return props.tasks.filter((t) => !t.isDone)
            case "all":
                return [...props.tasks]
            default:
                return [...props.tasks]
        }
    }
    const filteredTasks = getTasksByTodoListFilter()
    const addTask = useCallback((title) => props.addTask(props.todoListID, title),[props.addTask,props.todoListID])
    const editTodoListTitle = useCallback((title) => props.editTodoListTitle(props.todoListID, title),[props.editTodoListTitle,props.todoListID])
    const tasks = filteredTasks.length ? filteredTasks.map(t =>
            <li key={t.id}>
                <UniCheckBox onChangeChecked={(checked) => props.changeTaskStatus(props.todoListID, t.id, checked)}
                             checked={t.isDone}/>
                <EditableSpan title={t.title} callback={(title) => props.editTaskTitle(props.todoListID, t.id, title)}/>

                <UniButton value={props.filter} children={"X"}
                           onClick={() => props.removeTask(props.todoListID, t.id)}/>
            </li>)

        : <div> No tasks here</div>

    return (
        <div className={s.todo}>

            <div className={s.smartTitle}>
                <EditableSpan callback={editTodoListTitle}
                              title={props.title}/>
                <UniButton onClick={() => props.removeTodoList(props.todoListID)}>-</UniButton>
            </div>

            <AddItemForm addItem={addTask}/>

            <ul>{tasks}</ul>

            <div className={s.filterButtonArea}>
                <UniButton className={props.filter === 'all' ? s.activeFilter : ""}
                           onClick={() => props.changeTodoListFilter(props.todoListID, 'all')} children={'all'}/>

                <UniButton className={props.filter === 'active' ? s.activeFilter : ""}
                           onClick={() => props.changeTodoListFilter(props.todoListID, "active")} children={"active"}/>

                <UniButton className={props.filter === 'completed' ? s.activeFilter : ""}
                           onClick={() => props.changeTodoListFilter(props.todoListID, 'completed')}
                           children={"completed"}/>
            </div>
        </div>
    )

})

