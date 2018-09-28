import React, { Component } from 'react';
import { moveCard, addListAction, removeCardAction, removeListAction, addCardAction, setBoardNameVisibilityInHeader } from '../actions';
import '../styles/index.css';
import { connect } from "react-redux";
import { List } from '../components/List';
import { Form } from '../components/Form';
import { AddElement } from '../components/AddElement'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {

      //card index at drag start
      newListTitle : '',
      createListVisible : false,
      originCardIndex : '',
      originListIndex : '',
      destinationCardIndex : '',
      destinationListIndex : '',
      landingDiv : ''
       
    }
  }

  //Done.  
  toggle = () => {

    this.setState({createListVisible : !this.state.createListVisible});

  }

  //Done.
  addCard = (title, listIndex) => {

    const { dispatch } = this.props;
    
    if (title !== '') {

      dispatch(addCardAction(title, listIndex));

    }

  }

  //Done.
  removeCard = (cardIndex, listIndex) => {

    const {dispatch} = this.props;

    dispatch(removeCardAction(cardIndex, listIndex));

  }

  //Done.
  addList = (title) => {

    const {dispatch} = this.props;
    
    if (title !== '') {
      
      dispatch(addListAction(title));

    }

  }

  //Done.
  removeList = (index) => {

    const {dispatch} = this.props;

    dispatch(removeListAction(index));

  }

  //Done.
  dragStart = (originCardIndex, originListIndex) => {

    this.setState({originCardIndex, originListIndex});

  }

  //Done.
  dragEnd = () => {
    
    this.setState({originCardIndex : '', originListIndex : ''});

    this.clearLanding();
    
  }

  //Done.
  dragoverHandler = (destinationCardIndex, destinationListIndex, event) => {
    
    //BELOW CODE IS NEEDED TO ALLOW FOR DROP EVENT FIRING.
    event.preventDefault();

    // a landing div is placed between each list card. (Or on on it's own in an empty list)
    // Consideration : landing divs don't become visible on dragover if the card being dragged 
    // has an index equal to it or it - 1. 

    const {originCardIndex, originListIndex} = this.state;

    //Return if consideration is met.
    if (originListIndex === destinationListIndex) {
      
      if (originCardIndex === destinationCardIndex || originCardIndex === destinationCardIndex - 1) {
        return;
      }

    }

    //clears previously visible landing divs (if present).
    this.clearLanding();

    //highlight div being hovered over and store a reference to it
    event.target.className = 'visible';

    this.setState({landingDiv : event.target, destinationCardIndex, destinationListIndex});

  }

  //Done.  
  dropHandler = () => {
    
    const {dispatch} = this.props;

    const {originCardIndex, originListIndex, destinationCardIndex, destinationListIndex} = this.state;

    dispatch(moveCard(originCardIndex, destinationCardIndex, originListIndex, destinationListIndex));

    this.clearLanding();  
    
  }

  handleChange = (event) => {

    this.setState({[event.target.name] : event.target.value});
    
  } 
  
  //Done.
  clearLanding = () => {

    const {landingDiv} = this.state;

    //event.target.className = 'invisible';
    if (landingDiv !== '') {

      landingDiv.className = 'invisible';

    }

    this.setState({ landingDiv : '' });

  }

  componentDidMount(){

    const {dispatch} = this.props;
    dispatch(setBoardNameVisibilityInHeader(true));

    //set the background of color of body (this will change between pages.)
    const lightBlue = "rgb(240, 240, 240)";
    
    document.body.style.backgroundColor = lightBlue;

  }

  render() {
    
    const {activeBoard} = this.props;
    const {lists} = activeBoard;

    const listJSX = [];  
    
    //list funcs
    const funcs = {

      addCard : this.addCard,
      removeCard : this.removeCard,
      removeList : this.removeList
        
    }

    const dragFuncs = {
      
      dragStart : this.dragStart,
      dragEnd : this.dragEnd,
      dragoverHandler : this.dragoverHandler,
      dropHandler : this.dropHandler
      
    }

    lists.forEach(list => {

      const {index} = list;
      listJSX.push(
        <List 
          listIndex = {index} 
          funcs = {funcs} 
          dragFuncs = {dragFuncs} 
          list = {list}
        />
      )
    });
      
    const addListJSX = [];
      
    const {createListVisible} = this.state;

    const {toggle} = this;

    if (createListVisible) {

      addListJSX.push(
        <AddElement 
          toggle = {() => toggle()}
          className = 'add-list'
          title = 'Create new list...'
        />
      )

    }

    else {

      const {addList, handleChange} = this;

      const {newListTitle} = this.state;


      addListJSX.push(
        <Form 
          className = 'add-list-form'
          placeholder = 'Enter list name' 
          buttonName = 'Add List'
          submit = {() => addList(newListTitle)} 
          toggle = {() => toggle()}
          onChange = {(event) => handleChange(event)}
          name = 'newListTitle'
        />
      )  

    }

    return (

      <div className = 'board'>
        {listJSX}
        {addListJSX}    
      </div>
      
    );
  }
}

const mapStateToProps = state => {

  const {application} = state;
  const {activeBoard} = application;
  
  return {

    activeBoard

  }

};

export default connect(mapStateToProps)(Board);

