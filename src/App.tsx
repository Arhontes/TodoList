import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

const tasks: Array<TaskType>= [
    {id:1, title:"HTML", isDone: true},
    {id:2, title:"CSS", isDone: false},
    {id:3, title:"JS", isDone: false},
    {id:4, title:"TS", isDone: true},
]
export type TaskType ={
    id:number, title:string, isDone: boolean
}

function removeTask(id:number){
    let newTasks = tasks.filter((t)=>{return true})
    console.log(newTasks)
}
function App() {
    const todoListTitle_1 = "What to learn"



    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks}  removeTask={removeTask}/>

        </div>
    );
}

export default App;
