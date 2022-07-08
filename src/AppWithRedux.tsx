import React, {memo, useCallback} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    editTodoListTitleAC,
    removeTodoListAC,
} from "./components/reducers/TodoListsReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    editTaskTitleAC,
    removeTaskAC,

} from "./components/reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Store/store";
import {log} from "util";


export type TaskType = {
    id: string, title: string, isDone: boolean
}
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string,
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

    console.log("AppWithRedux")
    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    const dispatch = useDispatch()

    const changeTodoListFilterHandler = useCallback((todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    },[dispatch])
    const editTodoListTitleHandler = useCallback((todoListID: string, title: string) => {
        dispatch(editTodoListTitleAC(todoListID, title))
    },[dispatch])
    const removeTodoListHandler = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))

    },[dispatch])
    const addTaskHandler = useCallback((todoListID: string, title: string) => {
        const taskTitle = title.trim()
        if (!taskTitle) {
            return
        }
        dispatch(addTaskAC(todoListID, taskTitle))
    },[dispatch])
    const editTaskTitleHandler = useCallback((todoListID: string, taskID: string, title: string) => {
        dispatch(editTaskTitleAC(todoListID, taskID, title))
    },[dispatch])
    const changeTaskStatusHandler = useCallback((todolistId: string, t: string, el: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, t, el))
    },[dispatch])
    const removeTaskHandler = useCallback((todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    },[dispatch])

    const addItem = useCallback((title: string) => {
        dispatch(addTodoListAC(title))

    }, [dispatch])

    const todoListArray = todoLists.length
        ? todoLists.map(el => {
            return <TodoList
                changeTodoListFilter={changeTodoListFilterHandler}
                addTask={addTaskHandler}
                changeTaskStatus={changeTaskStatusHandler}
                editTaskTitle={editTaskTitleHandler}
                removeTask={removeTaskHandler}
                editTodoListTitle={editTodoListTitleHandler}
                removeTodoList={removeTodoListHandler}
                todoListID={el.id}
                key={el.id}
                filter={el.filter}
                title={el.title}
                tasks={tasks[el.id]}
            />
        })
        : <div>No TodoLists</div>

    return (
        <div className="App">
            {todoListArray}
            <AddItemForm addItem={addItem}/>
        </div>
    );
}

