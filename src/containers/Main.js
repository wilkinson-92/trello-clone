import React, {Component} from 'react';
import {connect} from "react-redux";
import {Switch, Route, withRouter} from 'react-router-dom';
import Board from './Board';
import Boards from './Boards';

class Main extends Component {

  constructor(props) {

      super(props);
      this.state = {};

  }

  render () {
    
    const { activeBoard } = this.props;
    
    return (

      <main>

        {activeBoard === undefined || activeBoard.title === undefined ? (
          <Switch>
            <Route exact path = '/*' component = {Boards} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path = '/Board' component = {Board} />
            <Route exact path = '/Boards' component = {Boards} />
            <Route exact path = '/*' component = {Boards} />
          </Switch>
        )}
        
      </main>

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

export default withRouter(connect(mapStateToProps)(Main));