import React from 'react';

export type ButtonType = {
    name: string,
    function: () => void

}
const Button = (props:ButtonType) => {

    return (
       <button onClick={props.function}>{props.name}</button>
    )
}

export default Button