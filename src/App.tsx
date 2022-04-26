import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export type TaskType ={
    id:number, title:string, isDone: boolean
}

function App() {
    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to buy"
    const todoListTitle_3 = "What do you mean?"
    const tasks: Array<TaskType>= [
        {id:1, title:"HTML", isDone: true},
        {id:2, title:"CSS", isDone: false},
        {id:3, title:"JS", isDone: false},
        {id:4, title:"TS", isDone: true},
    ]
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks}/>
           {/* <TodoList title={todoListTitle_2}/>
            <TodoList title={todoListTitle_3}/>*/}

        </div>
    );
}

export default App;
