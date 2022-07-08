import React, {memo, useState} from 'react';
import s from "../TodoList/TodoList.module.css";
import UniTextInput from "../UniTextInput/UniTextInput";
import UniButton from "../UniButton/UniButton";

type AddItemPropsType = {
    addItem: (title:string)=>void
}

export const AddItemForm = memo((props:AddItemPropsType)=> {
    console.log("AddItemForm")
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const addTaskHandler = () => {
        const taskTitle = title.trim()
        if (!taskTitle) {
            setError(true)
            return
        }
        props.addItem(taskTitle)
        setTitle("")
    }
    const onChangeInputHandler = (char:string) => {
        setTitle(char)
        if (error) setError(false)
    }

    return (
        <div className={s.inputArea}>

            <UniTextInput onEnter={addTaskHandler} value={title} error={error} onChangeText={onChangeInputHandler} />

            <UniButton onClick={addTaskHandler}>+</UniButton>
            {error && <div className={s.error}>"Title is required"</div>}
        </div>
    );
})

