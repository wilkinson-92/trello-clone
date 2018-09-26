import React, {Component} from 'react';
import {AddElement} from './AddElement';
import {Card} from './Card';
import {Form} from './Form';

export class List extends Component {
    
    constructor(props) {
      
      super(props);

      this.state = {

        formOpen : false,
        newCardTitle : ''

      }

    }
    
    toggle = () => {

      const { formOpen } = this.state;

      this.setState({formOpen : !formOpen})

    }

    handleChange = (event) => {
      
      this.setState({[event.target.name] : event.target.value});
      
    }
    
    render () {

    const { list, funcs, dragFuncs, listIndex } = this.props;
    
    const { dragStart, dragEnd, dragoverHandler, dropHandler } = dragFuncs;  
    
    const { removeCard } = funcs;
    
    const cardsJSX = [];

    const { cards } = list;
    
    //dropHandler(cardIndex, listIndex)
    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {

      //get item at index currentItemPosition from currentListItems
      const card = cards[cardIndex];

      //Landing Divs. Initially invisible. Become visible when a card is dragged over them.
      cardsJSX.push(
        <div 
          className = 'invisible' 
          onDragOver = {(event) => dragoverHandler(cardIndex, listIndex, event)}
          onDrop = {() => dropHandler()}
        />
      );

      cardsJSX.push(
        <Card
          index = {cardIndex} 
          card = {card}
          dragStart = {() => dragStart(cardIndex, listIndex)} 
          dragEnd = {() => dragEnd()}
          removeCard = {() => removeCard(cardIndex, listIndex)}
        />
      );
    }
    
    //another invisible div for list end or if list is empty.
    cardsJSX.push(
      <div 
        className = 'invisible' 
        onDragOver = {(event) => dragoverHandler(cards.length, listIndex, event)}
        onDrop = {() => dropHandler()} 
      />
    );
    
    //Generate list end.
    const listEndJSX = [];
    
    const { formOpen } = this.state;

    const { toggle } = this;
    
    if (formOpen) {

        const { handleChange, clearName } = this;

        const { addCard } = funcs;

        const { newCardTitle } = this.state;

        listEndJSX.push(
          
          <Form
            className = 'add-card-form' 
            placeholder = 'Enter card name'
            buttonName = 'Add Card'
            onChange = {(event) => handleChange(event)}
            submit = {() => addCard(newCardTitle, listIndex)}
            toggle = {() => toggle()}
            name = 'newCardTitle'
          />  

        )
      }
    
    else {

      listEndJSX.push(

        <AddElement
          className = 'add-list-card'
          toggle = {toggle}
          title = '+ Add another card'
        />
        
      )

    }

    const {removeList} = funcs;
    const {title} = list;

    return(
      
      <div className = 'list' key = {listIndex}>
          <div className = 'content'>
            <div className = 'title'>
              <h3>{title}</h3>
              <p onClick = {() => removeList(listIndex)}>x</p>
            </div> 
             {cardsJSX}
             {listEndJSX} 
          </div>
      </div>

    )

    }

}

