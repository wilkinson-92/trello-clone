import React, {Component} from 'react';
import Main from '../containers/Main';
import Header from '../containers/Header';

export default class App extends Component {
  
  constructor(props) {

    super(props);
    this.state = {};

  }

  componentDidMount(){

    // Close any drop down menus currently open when screen is clicked 
    // (unless equal to the dropdown button that invoked the call)
    window.onclick = function(event) {
      
      if (!event.target.matches('#inDropDownScope') && !event.target.matches('#dropdown')) {


        
        

        //Check if target division is an ancestor of dropdown.
        //if true do nothing. 

        let dropdowns = document.getElementsByClassName("dropdown");
        
        for (let index = 0; index < dropdowns.length; index++) {
          
          let openDropdown = dropdowns[index];
          
          if (openDropdown.classList.contains('show')) {
            
            openDropdown.classList.remove('show');

          }
        }
      }
    }
    
  }
  
  render () {

    return (
      <div className = "app">
            <Header />
            <Main />
      </div>
    );

  }
}

