import React, {ChangeEvent, useState} from 'react';
import s from "../TodoList/TodoList.module.css";
import UniTextInput from "../UniTextInput/UniTextInput";
import UniButton from "../UniButton/UniButton";

type AddItemPropsType = {
    callBack: (title:string)=>void
}

function AddItemForm(props:AddItemPropsType) {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const addTaskHandler = () => {
        const taskTitle = title.trim()
        if (!taskTitle) {
            setError(true)
            return
        }
        props.callBack(taskTitle)
        setTitle("")
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        if (error) setError(false)
    }
    const onClickHandler = ()=>{
       props.callBack(title)
    }
    return (
        <div className={s.inputArea}>

            <UniTextInput value={title} error={error} onChange={onChangeInputHandler} />

            <UniButton onClick={onClickHandler}>+</UniButton>
            {error && <div className={s.error}>"Title is required"</div>}
        </div>
    );
}

export default AddItemForm;