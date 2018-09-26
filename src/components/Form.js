import React from 'react'

export function Form (props) {
    
    const {submit, toggle, onChange} = props;

    const {placeholder, className, id, buttonName, name} = props;
    

    return (
        
        <div className = {className} id = {id}>
            <input type="text" name = {name} placeholder = {placeholder} onChange = {onChange}  id = {id}/>
            <div className = 'option-wrapper' id = {id}>
                <div className = 'button' onClick = {submit}>{buttonName}</div>
                <div className = 'cancel' onClick = {toggle}>X</div>
            </div>
        </div>

        )
}
        
  