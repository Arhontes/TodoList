import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {TodoListsReducer} from "./components/reducers/TodoListsReducer";


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

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todoLists, todoListDispatch] = useReducer(TodoListsReducer,[])
    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function changeTaskStatus(todoListID: string, taskID: string, isDone: boolean){
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone} : el)})
    }
    function removeTask(todoListID: string, taskID: string) {

        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }
    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: true}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})

    }
    function changeFilter(todolistID: string, value: FilterValuesType) {
        todoListDispatch(todoLists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }
    function removeTodoList(todoListID: string){
        todoListDispatch(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }
    function editTodoListTitle(todolistID: string, newTitle: string){
        todoListDispatch(todoLists.map(t => t.id === todolistID ? {...t, title: newTitle} : t))
    }
    function editTask(todoListID: string, taskID: string, newTitle: string){
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)})
    }
    function getTasksByTodoListFilter(todoListID: string, filter: string) {
        switch (filter) {
            case "completed":
                return tasks[todoListID].filter((t) => t.isDone)
            case "active":
                return tasks[todoListID].filter((t) => !t.isDone)
            case "all":
                return [...tasks[todoListID]]
            default:
                return [...tasks[todoListID]]
        }
    }

    const todoListArray = todoLists.length ? todoLists.map(el => {

        let tasksForTodoList = getTasksByTodoListFilter(el.id, el.filter);
        return  <TodoList
                editTaskTitle={editTask}
                editTodoListTitle={editTodoListTitle}
                todoListID={el.id}
                key={el.id}
                filter={el.filter}
                title={el.title}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}/> }) : <div>No TodoLists</div>

    const newTodoListId = v1()

    function addTodoList(title: string){
        todoListDispatch([...todoLists, {id: newTodoListId, title: title, filter: "all"}])
        setTasks({
            ...tasks, [newTodoListId]: [{id: v1(), title: "HTML&CSS2", isDone: true},
                {id: v1(), title: "JS2", isDone: true},
                {id: v1(), title: "ReactJS2", isDone: false}]
        })
    }

    return (
        <div className="App">
            {
                todoListArray
            }
            <AddItemForm callBack={addTodoList}/>
        </div>
    );
}

export default App;
