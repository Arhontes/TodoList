import React, {useRef} from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from "./Buttons/Button";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (props:TaskType) => void
}
let inputValue = React.createRef()
export const TodoList = (props: TodoListPropsType) => {

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" />
                {/*<Button name={"add"} function={()=>{props.addTask()}}*/}
            </div>

            <ul>
                {
                    props.tasks.length ?
                    props.tasks.map(t => <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={"remove"} function={() => props.removeTask(t.id)}/>
                        {/*<button onClick={()=>{props.removeTask(t.id)}}> remove </button>*/}
                    </li>):<div> All is done</div>
                }
            </ul>
            <div>
                <Button function={() => props.changeFilter('all')} name={'all'}/>
                <Button function={() => props.changeFilter("active")} name={"active"}/>
                <Button function={() => props.changeFilter('completed')} name={"completed"}/>

                {/*<button onClick={()=>{props.changeState("all")}}>All</button>
                    <button onClick={()=>{props.changeState("active")}}>Active</button>
                    <button onClick={()=>{props.changeState("completed")}}>Completed</button>*/}
            </div>
        </div>
    );
};

