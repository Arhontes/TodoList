import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export type TaskType = {
    id: number, title: string, isDone: boolean
}

export type FilterValuesType = "all"| "completed"| "active"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: false},
        {id: 3, title: "JS", isDone: false},
        {id: 4, title: "TS", isDone: true},
    ]);
    let tasksForTodoList = tasks
    let y;
    let [filter, setFilter] = useState<FilterValuesType>()
    if (filter === "completed") {
        tasksForTodoList = tasks.filter((t) => t.isDone === true)
    }
    else if (filter === "active") {
        tasksForTodoList = tasks.filter((t) => t.isDone === false)
    }

    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }

    function removeTask(id: number) {
        console.log(id)
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)

    }
    function addTask(props:TaskType){
        let addedTask = {
            id: props.id,
            title: props.title,
            isDone:false
        }
        tasksForTodoList.push(addedTask)
    }

    return (
        <div className="App">

            <TodoList title="What to learn" tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>

        </div>
    );
}

export default App;
