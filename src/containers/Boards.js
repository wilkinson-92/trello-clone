import React, { Component } from 'react';
import {addBoard, removeBoard, setActiveBoard, setBoardNameVisibilityInHeader} from '../actions';
import '../styles/index.css';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Form} from '../components/Form';
import {AddElement} from '../components/AddElement';

//TODO
//board removal 

class Boards extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
          newBoardTitle : '',
          formOpen : false
        }
        
      }
    
    //set active board and link to board
    select = (index) => {
        
        const { dispatch } = this.props;
        
        dispatch(setActiveBoard(index));

    }
    
    addBoard = (title) => {

        const {dispatch} = this.props;

        if (title !== '') {
            dispatch(addBoard(title));
            this.toggle();
        }

    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    toggle = () => {
        this.setState({formOpen : !this.state.formOpen});
    }

    componentDidMount(){

        const {dispatch} = this.props;

        dispatch(setBoardNameVisibilityInHeader(false));

    }
      
    render() {

        const {boards} = this.props;

        const {select} = this;
        
        //create an array for boards jsx
        const boardsJSX = [];

        boards.forEach(board => {

            const {index, title} = board;

            <div>
                <Link to = "/board" >
                    <div className = 'showcase-item' key = {index} onClick = {() => select(index)}>
                            <div className = 'align'>
                                {title}
                            </div>  
                    </div>
                </ Link>
            </div>
            
        });

        for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
            //push board items to boardsJSX
            boardsJSX.push(
                    
                <div>
                    <Link to = "/board" >
                        <div className = 'showcase-item' onClick = {() => select(boardIndex)}>
                                <div className = 'align'>
                                    {boards[boardIndex].title}
                                </div>  
                        </div>
                    </ Link>
                </div>
                    
            )
        }

        //get function for add board form.
        const { handleChange, addBoard, toggle } = this;

        const { formOpen } = this.state;

        const boardsJSXEnd = [];

        if (formOpen) {

            const { newBoardTitle } = this.state;

            boardsJSXEnd.push(
                <Form
                    className = 'add-board-form'
                    onChange = {handleChange} 
                    submit = {() => addBoard(newBoardTitle)}
                    toggle = {toggle}
                    name = {'newBoardTitle'}
                    placeholder = {'Enter board name'}
                    buttonName = {'Create Board'}
                />
            )

        }

        else {

            boardsJSXEnd.push(
                <AddElement
                    className = 'showcase-item'
                    toggle = {() => toggle()}
                    title = 'Create new board...'
                />
            )

        }

        return (
                <div className = 'boards'>
                    {boardsJSX}
                    {boardsJSXEnd}
                </div>  
              )
              
      }


}

const mapStateToProps = state => {

    const {application} = state;
    const {boards} = application;
    
    return {

      boards

    }
  
};
  
  export default connect(mapStateToProps)(Boards);