import {TasksType} from "../../App";
import {v1} from "uuid";
import {removeTodoListAC} from "./TodoListsReducer";

export function addTaskAC(todoListID: string, title: string){
    return{
        type:"ADD-TASK",
        payload:{
            todoListID,
            title,
        }
    }as const
}
export function editTaskTitleAC(todoListID: string, taskID: string, newTitle: string){
    return{
        type:"EDIT-TASK-TITLE",
        payload:{
            todoListID,
            taskID,
            newTitle,
        }
    }as const
}
export function getTasksByTodoListFilterAC(todoListID: string, filter: string){
    return{
        type:"GET-TASKS-BY-FILTER",
        payload:{
            todoListID,
            filter,
        }
    }as const
}
export function removeTaskAC(todoListID: string, taskID: string){
    return{
        type:"REMOVE-TASK",
        payload:{
            todoListID,
            taskID,
        }
    }as const
}
export function changeTaskStatusAC(todoListID: string, taskID: string, isDone: boolean){
    return{
        type:"CHANGE-TASK-STATUS",
        payload:{
            todoListID,
            taskID,
            isDone,
        }
    }as const
}
export function addTaskListAC(newTaskList:TasksType){
    return{
       type:"ADD-TASK-LIST",
        payload:{
           newTasksList: newTaskList
        }
    }as const

}
export function removeTasksListAC(todolistID:string){
    return{
        type:"REMOVE-TASKS-LIST",
        payload:{
            todolistID
        }
    }as const

}

export type TasksReducerActionType =
    ReturnType<typeof addTaskAC>|
    ReturnType<typeof editTaskTitleAC>|
    ReturnType<typeof getTasksByTodoListFilterAC>|
    ReturnType<typeof removeTaskAC>|
    ReturnType<typeof changeTaskStatusAC>|
    ReturnType<typeof addTaskListAC>|
    ReturnType<typeof removeTasksListAC>



export const tasksReducer =
    (state:TasksType, action:TasksReducerActionType)=>{
        switch (action.type) {
            case "ADD-TASK" :
                const newTask = {id: v1(), title: action.payload.title, isDone: false}
                return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
            case "EDIT-TASK-TITLE" :
                return {...state,
                    [action.payload.todoListID]: state[action.payload.todoListID]
                        .map(t => t.id === action.payload.taskID
                            ? {...t, title: action.payload.newTitle}
                            : t)}
            case "REMOVE-TASK" :
                return {...state,
                    [action.payload.todoListID]: state[action.payload.todoListID]
                        .filter(el => el.id !== action.payload.taskID)}
            case "CHANGE-TASK-STATUS" :
                return {...state,
                    [action.payload.todoListID]: state[action.payload.todoListID]
                        .map(el => el.id === action.payload.taskID
                            ? {...el,isDone:action.payload.isDone}
                            : el)}
            case "ADD-TASK-LIST":
                return { ...state,...action.payload.newTasksList}
            case "REMOVE-TASKS-LIST":
                const newState = {...state}
                delete newState[action.payload.todolistID]
                return newState
            default:
                return state
        }
    }