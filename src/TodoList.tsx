import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from "./Buttons/Button";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    let [title, setTitle] = useState<string>("")

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }
    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>

            <ul>
                {
                    props.tasks.length
                        ?
                        props.tasks.map(t =>
                            <li>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={"remove"} callback={() => props.removeTask(t.id)}/>
                            </li>)
                        : <div> All is done</div>
                }
            </ul>
            <div>
                <Button callback={() => changeFilterHandler('all')} name={'all'}/>
                <Button callback={() => changeFilterHandler("active")} name={"active"}/>
                <Button callback={() => changeFilterHandler('completed')} name={"completed"}/>

                {/*<button onClick={()=>{props.changeState("all")}}>All</button>
                    <button onClick={()=>{props.changeState("active")}}>Active</button>
                    <button onClick={()=>{props.changeState("completed")}}>Completed</button>*/}
            </div>
        </div>
    );
};

