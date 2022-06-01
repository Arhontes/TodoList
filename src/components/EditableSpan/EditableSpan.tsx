import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType={
    title:string
    callback:(title:string)=>void
}
function EditableSpan(props:EditableSpanPropsType) {
    const[newTitle, setNewTitle] = useState(props.title)
    const[edit,setNewEdit] = useState<boolean>(false)


    const editTrueHandler = ()=>{
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
    return (
            edit
            ?
            <input onChange={onChangeHandler} onKeyPress={onEnterHandler} onBlur={editTrueHandler} autoFocus  value={newTitle}/>
            :
            <span onDoubleClick={editTrueHandler}>{props.title}</span>
    );
}

export default EditableSpan;