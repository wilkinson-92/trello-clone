import React from 'react';

export function AddElement(props) {  

    const { toggle, title, className, wrapper } = props;
    
    return (

        <div className = {className} onClick = { toggle } >
            <div className = 'align'>{title}</div>
        </div>
        
    )
    
}