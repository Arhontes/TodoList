import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string, title: string, isDone: boolean
}

export type FilterValuesType = "all"| "completed"| "active"

function App() {
    console.log(v1())
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "TS", isDone: true},
    ]);


    let tasksForTodoList = tasks
    let [filter, setFilter] = useState<FilterValuesType>()

    if (filter === "completed") {
        tasksForTodoList = tasks.filter((t) => t.isDone)
    }
    else if (filter === "active") {
        tasksForTodoList = tasks.filter((t) => !t.isDone)
    }

    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)

    }
    function addTask(title:string){
        const addedTask:TaskType = {
            id: v1(),
            title: title,
            isDone:false
        }

        setTasks([addedTask, ...tasks])
    }


    return (

        <div className="App">

            <TodoList title="What to learn" tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>

        </div>
    );
}

export default App;
