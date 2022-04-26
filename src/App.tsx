import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";




export type TaskType ={
    id:number, title:string, isDone: boolean
}


function App() {
    let initTasks: Array<TaskType>= [
        {id:1, title:"HTML", isDone: true},
        {id:2, title:"CSS", isDone: false},
        {id:3, title:"JS", isDone: false},
        {id:4, title:"TS", isDone: true},
    ]

    let [tasks,setTasks] = useState(initTasks);

    function removeTask(id:number){
        let filteredTasks = tasks.filter((t)=>t.id!==id)
        setTasks(filteredTasks)
        console.log(tasks)

    }
    const todoListTitle_1 = "What to learn"

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks} removeTask={removeTask}/>

        </div>
    );
}

export default App;
