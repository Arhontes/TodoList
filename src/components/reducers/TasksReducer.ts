import {TasksType} from "../../App";
import {v1} from "uuid";

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
        type:"EDIT-TASK",
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
           newTaskList
        }
    }as const

}


export type TasksReducerActionType=
    ReturnType<typeof addTaskAC>|
    ReturnType<typeof editTaskTitleAC>|
    ReturnType<typeof getTasksByTodoListFilterAC>|
    ReturnType<typeof removeTaskAC>|
    ReturnType<typeof changeTaskStatusAC>|
    ReturnType<typeof addTaskListAC>




export const TasksReducer =
    (state:TasksType, action:TasksReducerActionType)=>{
        switch (action.type) {
            case "ADD-TASK" :
                const newTask = {id: v1(), title: action.payload.title, isDone: true}
                return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
            case "EDIT-TASK" :
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
                return { ...state,...action.payload.newTaskList}
            default:
                return state
        }
    }