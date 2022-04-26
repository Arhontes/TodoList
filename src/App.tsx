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

    let [filter, setFilter] = useState<FilterValuesType>()

    let tasksForTodoList = tasks
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
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)
        console.log(tasks)

    }

    const todoListTitle_1 = "What to learn"

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasksForTodoList} removeTask={removeTask} changeState={changeFilter}/>

        </div>
    );
}

export default App;
