import React, {ChangeEvent, memo, useState} from 'react';
import UniTextInput from "../UniTextInput/UniTextInput";

type EditableSpanPropsType={
    title:string
    callback:(title:string)=>void
}
const EditableSpan = memo((props:EditableSpanPropsType)=> {
    console.log("EditableSpan")
    const[newTitle, setNewTitle] = useState(props.title)
    const[edit,setNewEdit] = useState<boolean>(false)


    const editHandler = ()=>{
        setNewEdit(!edit)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
    }
    const onEnterHandler = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==="Enter"){
            props.callback(newTitle)
            setNewEdit(false)
        }
    }
    const onBlurHandler =()=>{
        setNewEdit(!edit)
        setNewTitle(props.title)
    }
    return (
            edit
            ?
            <UniTextInput onChange={onChangeHandler} onKeyPress={onEnterHandler} onBlur={onBlurHandler} autoFocus  value={newTitle}/>
            :
            <span onDoubleClick={editHandler}>{props.title}</span>
    );
})
export default EditableSpan
