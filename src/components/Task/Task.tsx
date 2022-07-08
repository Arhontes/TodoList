import {FilterValuesType} from "../reducers/TodoListsReducer";
import React, {memo, useCallback} from "react";
import UniCheckBox from "../UniCheckbox/UniCheckBox";
import EditableSpan from "../EditableSpan/EditableSpan";
import UniButton from "../UniButton/UniButton";

export type TaskPropsType = {
    changeTaskStatus: (todoListID: string, id: string, checked: boolean) => void
    editTaskTitle: (todoListID: string, id: string, title: string) => void
    removeTask: (todoListID: string, id: string) => void
    filter: FilterValuesType|undefined
    todoListID: string
    isDone: boolean
    id: string
    title: string
}
export const Task = memo((props: TaskPropsType) => {
    const editTaskTitle = useCallback((title) => props.editTaskTitle(props.todoListID, props.id, title),[props.todoListID,props.id])
        return <li key={props.id}>
            <UniCheckBox onChangeChecked={(checked) => props.changeTaskStatus(props.todoListID, props.id, checked)}
                         checked={props.isDone}/>
            <EditableSpan title={props.title} callback={editTaskTitle}/>

            <UniButton value={props.filter} children={"X"}
                       onClick={() => props.removeTask(props.todoListID, props.id)}/>
        </li>
    }
)