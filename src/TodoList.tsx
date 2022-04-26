import React from 'react';
import {FilterValuesType, TaskType} from "./App"; //rsc сниппед



type TodoListPropsType = {
    title:string
    tasks: TaskType[]
    removeTask: (id:number)=>void
    changeState: (value:FilterValuesType)=>void
}

export const TodoList = (props: TodoListPropsType) => {
    return (

            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>

                <ul>
                    {
                        props.tasks.map( t=> <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>{props.removeTask(t.id)}}> remove </button></li>)
                    }
                </ul>
                <div>
                    <button onClick={()=>{props.changeState("all")}}>All</button>
                    <button onClick={()=>{props.changeState("active")}}>Active</button>
                    <button onClick={()=>{props.changeState("completed")}}>Completed</button>
                </div>
            </div>
    );
};

