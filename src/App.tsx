import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string, title: string, isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistsType = {
    id: string,
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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

    const changeTaskStatus = (todoListID:string,taskID: string, isDone: boolean) => {
        setTasks({...tasks,[todoListID]:tasks[todoListID].map(el=>el.id===taskID?{...el,isDone}:el)})
        /*setTasks(tasks.map(t => t.id === taskID ? {...t, isDone} : t))*/
    }

    function removeTask(todoListID:string,taskID: string ) {

        setTasks({...tasks,[todoListID]:tasks[todoListID].filter(el=>el.id!==taskID)})
    }

    function addTask(todoListID:string,title: string) {
        let newTask = {id: v1(), title: title, isDone: true}
        setTasks({...tasks,[todoListID]:[newTask,...tasks[todoListID]]})

    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }
    const removeTodoList = (todoListID:string)=>{
        setTodolists(todolists.filter(el=>el.id!==todoListID))
        delete tasks[todoListID]
    }
    return (
        <div className="App">
            {todolists.map(el => {
                debugger
                let tasksForTodoList =
                    el.filter === "completed"
                    ? tasks[el.id].filter((t) => t.isDone)
                    : el.filter === "active"
                    ? tasks[el.id].filter((t) => !t.isDone)
                    : [...tasks[el.id]]

                return (
                    <TodoList
                        todoListID={el.id}
                        key={el.id}
                        filter={el.filter}
                        title={el.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}/>
                )
            })}

        </div>
    );
}

export default App;
