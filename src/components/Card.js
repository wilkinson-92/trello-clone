import React from 'react';

export function Card(props) {  



    const {

        index,
        card,
        dragStart,
        dragEnd, 
        removeCard

    } = props;

    const {

        title
        
    } = card;



    return (
       
        <div className = 'card' key = {index} draggable = 'true' onDragStart = {dragStart} onDragEnd = {dragEnd}>
                <div className = 'card-text'>{title}</div>
                <div className = 'card-cancel-wrapper'>
                    <div className = 'card-cancel' onClick = {removeCard}>x</div>
                </div>  
        </div>
       
        
    );

}