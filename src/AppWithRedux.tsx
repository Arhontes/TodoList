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

    const changeTodoListFilterHandler = (todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }
    const editTodoListTitleHandler = (todoListID: string, title: string) => {
        dispatch(editTodoListTitleAC(todoListID, title))
    }
    const removeTodoListHandler = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))

    }
    const addTaskHandler = (todoListID: string, title: string) => {
        const taskTitle = title.trim()
        if (!taskTitle) {
            return
        }
        dispatch(addTaskAC(todoListID, taskTitle))
    }
    const editTaskTitleHandler = (todoListID: string, taskID: string, title: string) => {
        dispatch(editTaskTitleAC(todoListID, taskID, title))
    }
    const changeTaskStatusHandler = (todolistId: string, t: string, el: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, t, el))
    }
    const removeTaskHandler = (todoListID: string, taskID: string) => {
        dispatch(removeTaskAC(todoListID, taskID))
    }

    const addItem = useCallback((title: string) => {
        dispatch(addTodoListAC(title))

    }, [dispatch])

    const todoListArray = todoLists.length
        ? todoLists.map(el => {
            return <TodoListReactMemoContainer
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
                tasks={tasks}
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

export const TodoListReactMemoContainer = memo(TodoList)
