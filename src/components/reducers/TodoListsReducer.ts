import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";


export type TodoListsReducerActionType =
    ReturnType<typeof removeTodoListAC>|
    ReturnType<typeof addTodoListAC>|
    ReturnType<typeof changeTodoListFilterAC>|
    ReturnType<typeof editTodoListTitleAC>

export function editTodoListTitleAC(todoListID:string, newTitle:string){
    return {
        type: "EDIT-TODOLIST-TITLE",
        payload:{
            todoListID,
            newTitle
        }
    }as const
}
export function removeTodoListAC(todoListID:string){
    return{
        type:"REMOVE-TODOLIST",
        payload:{
            todoListID
        }
    }as const
}
export function addTodoListAC(newTodoList:TodolistType) {
    return {
        type:"ADD-TODOLIST",
        payload:{
            newTodoList
        }
    } as const
}
export function changeTodoListFilterAC(todoListID:string, newFilter:FilterValuesType){
    return{
        type:"CHANGE-TODOLIST-FILTER",
        payload: {
            todoListID,
            newFilter
        }
    }as const
}
let todolistID1 = v1();
let todolistID2 = v1();
const todoLists:Array<TodolistType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]
export const TodoListsReducer =
    (state=todoLists, action:TodoListsReducerActionType)=>{
    switch (action.type) {
        case "ADD-TODOLIST":
            return [...state,action.payload.newTodoList]
        case "REMOVE-TODOLIST":
            return state.filter(t=>t.id!==action.payload.todoListID)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t=>t.id===action.payload.todoListID?
                {...t,filter:action.payload.newFilter}:t)
        case "EDIT-TODOLIST-TITLE":
            return state.map(t=>t.id===action.payload.todoListID
                ?{...t,title:action.payload.newTitle}:t)
        default:
            return state
    }
}

