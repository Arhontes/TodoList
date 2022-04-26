import React from 'react';
import {TaskType} from "./App"; //rsc сниппед



type TodoListPropsType = {
    title:string
    tasks: TaskType[]
    removeTask: Function
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
                    {props.tasks.map(t=> <li><input type="checkbox" checked={t.isDone}/><span>{t.title}</span><button onClick={props.removeTask(t.id)}>x</button></li>)}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    );
};

