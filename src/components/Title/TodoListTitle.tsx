import React from 'react';

type TodoListTitlePropsType = {
    title:string

}

const TodoListTitle:React.FC<TodoListTitlePropsType>=({title})=>{
    return (
            <div>
                <h3>{title}</h3>
            </div>



    );
}

export default TodoListTitle;