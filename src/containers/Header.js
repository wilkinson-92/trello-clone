import React, {Component} from 'react';
import {connect} from "react-redux";
import {DropDown} from '../components/DropDown'
import {setActiveBoard, renameActiveBoard} from '../actions';
import {Link} from 'react-router-dom';

class Header extends Component {

    constructor(props) {
      super(props);
      this.state = {
        dropDownVisible : false,
        dropDownType : '',
        newBoardTitle : '',
        activeBoardTitle : ''
      }
    }
    
    handleChange = (event) => {

      this.setState({[event.target.name] : event.target.value});
      
    } 

    toggle(type) {

      this.setState({dropDownType : type});

      document.getElementById("dropdown").classList.toggle("show");

    }

    //set active board and link to board
    select = (index) => {

      const {dispatch} = this.props;
      
      dispatch(setActiveBoard(index));

    }

    setActiveBoardTitleInState = (title) => {

      this.setState({activeBoardTitle : title})

    }

    submit = () => {

      const {newBoardTitle} = this.state;

      if (newBoardTitle !== '') {

        const {dispatch} = this.props;

        dispatch(renameActiveBoard(newBoardTitle));

        this.setActiveBoardTitleInState(newBoardTitle);

      }

    }

    componentDidMount() {

      const {activeBoard} = this.props;

      const {title} = activeBoard;


      this.setActiveBoardTitleInState(title);


    }

    render() {
      
      //retreive array of type board from props
      const {boards, activeBoard, displayActiveBoardInHeader} = this.props;

      //create array to push names and dispatch function
      const items = [];

      //push board name to dropdown items
      for (let index = 0; index < boards.length; index++) {
        const board = boards[index];
        items.push(
          {
            title : board.title,
            select : () => this.select(index),
            key : index
          }
        );
      }
      
      const {dropDownType} = this.state;

      let config = {};

      switch (dropDownType) {
        case 'board-links':
          config = {
            items, 
            type : 'links'
          }
          break;

        case 'board-name-form':
          config = {
            submit : this.submit,
            onChange : this.handleChange,
            toggle : this.toggle,
            className : 'change-board-name-form',
            type : 'board-name-form',
            id : 'inDropDownScope',
            name : 'newBoardTitle',
            placeholder : 'Enter new board name',
            buttonName : 'Rename'
          }
          break;
      }
      
      return (
          <div className = 'header'>
            <div className = 'header-item' id = 'inDropDownScope' onClick = {() => this.toggle('board-links')}>
              Boards
            </div>
            <Link to = "/boards" className = 'header-item'>
              Home
            </Link>
            {displayActiveBoardInHeader && 
              <div className = 'header-item' id = 'inDropDownScope' onClick = {() => this.toggle('board-name-form')}>
                {activeBoard.title}
              </div>
            }
            <DropDown config = {config} />
          </div> 
      );
  }
}

const mapStateToProps = state => {
  
  const {application} = state;
  const {activeBoard, boards, displayActiveBoardInHeader} = application;  

  return {
    activeBoard,
    boards,
    displayActiveBoardInHeader
  }

};

export default connect(mapStateToProps)(Header);