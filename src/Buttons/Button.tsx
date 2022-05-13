import React from 'react';

export type ButtonType = {
    name: string,
    callback: () => void

}
const Button = (props:ButtonType) => {

    return (
       <button onClick={props.callback}>{props.name}</button>
    )
}

export default Button