import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from './Form';

//Switch Justification.
//DropDown is a general purpose component.
//Trello makes use of many different dropdowns.
//It is simple to add new cases to accomodate additional dropdowns,
//... eliminating the need to create additional components (that are
//... just slight variations of this one).

export function DropDown(props) {  
  
    const {config} = props;  
    const {type} = config;

    let optionsJSX = [];

    switch (type) {

        case 'board-name-form':
            const {submit, onChange, id, name, placeholder, buttonName, className} = config;
            
            optionsJSX.push(
                <Form
                    className = {className}
                    submit = {submit}
                    onChange = {onChange}
                    id = {id}
                    name = {name}
                    placeholder = {placeholder}
                    buttonName = {buttonName}
                />
            )

            break;

        case 'links':
            const {items} = config;
               
            items.forEach(
                item => {

                    const { title, select, key } = item;  
                
                    //Link may have to be placed in select function.
                    optionsJSX.push(
                    <Link to = "/board" onClick = {select}>
                        <div key = {key} className = 'dropdown-item'>{title}</div>
                    </Link>
                    )

                }
 
            )
            break;
              
        default: 
            break;


    }

    return (
        <div className = 'dropdown' id = 'dropdown'>
                {optionsJSX}
        </div>
    );

}