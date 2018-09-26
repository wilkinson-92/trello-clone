import { combineReducers } from 'redux';
import {ADD_LISTS, ADD_CARD, ADD_LIST, MOVE_CARD,
        REMOVE_CARD, REMOVE_LIST, ADD_BOARD, 
        SET_ACTIVE_BOARD, RENAME_ACTIVE_BOARD,
        SET_BOARD_NAME_VISIBILITY_IN_HEADER} from '../actions'

function application ( state = { 
    
    boards : [

        {
            
        index : 0,    
        title : 'TODO', 
        lists : [

            {index : 0, title : 'TODO', cards : [{title : 'go get food'},{title : 'make bed'},{title : 'walk dog'}]}, 
            {index : 1, title : 'Done', cards : []} 

        ]}


    ],
    activeBoard : {} 
    ,
    displayActiveBoardInHeader : false


    }, action) {
    
    switch (action.type) {
      
      //Done.
      case ADD_BOARD: {

        //create a shallow copy of state boards.
        const boards = [...state.boards];

        //get board to be added from action.
        const { title } = action;
        
        const board = {index : boards.length, title, lists : []}

        //add board to boards
        boards.push(board);
        
        return Object.assign({}, state, {
            boards : boards
            }) 
      }  
      
      //Done.
      case SET_ACTIVE_BOARD: {

        const { index } = action;

        const { boards } = state;

        const activeBoard = boards[index];

        return Object.assign({}, state, {
            activeBoard
            }) 
      }

      //Done.
      case ADD_CARD: {

        //get card and listIndex from action.
        const { title, listIndex } = action;

        const card = {title}

        //create a deep copy of activeBoard from state.
        const board = JSON.parse(JSON.stringify(state.activeBoard));

        //get lists from board.
        const { lists } = board;

        //get list.
        const list = lists[listIndex];

        //get cards array from list.
        const { cards } = list;
        
        //add card to cards array.
        cards.push(card);

        //make a shallow copy of boards
        const boards = [...state.boards];

        //update boards at board index
        boards[board.index] = board;

        return Object.assign({}, state, {
            activeBoard : board,
            boards 
          })

      }

     //Done.
      case REMOVE_CARD: {
        
        //get card and listIndex from action.
        const { cardIndex, listIndex } = action;

        //create a deep copy of activeBoard from state.
        const board = JSON.parse(JSON.stringify(state.activeBoard));

        //get lists from board.
        const { lists } = board;

        //get list.
        const list = lists[listIndex];

        //get cards array from list.
        const { cards } = list;
        
        //remove item at provided itemPosition index
        cards.splice(cardIndex, 1);

        //make a shallow copy of boards
        const boards = [...state.boards];

        //update boards at board index
        boards[board.index] = board;

        //update state
        return Object.assign({}, state, {
           activeBoard : board,
           boards
          })
         
      } 
      
      //Done.
      case MOVE_CARD: {

        //const {activeBoard} = state;
        
        //create a deep copy of activeBoard from state
        let board = JSON.parse(JSON.stringify(state.activeBoard));

        //get lists from active board copy
        const {lists} = board;

        //get card indexes
        const {
            originCardIndex, 
            destinationCardIndex,  
            originListIndex, 
            destinationListIndex
        } = action;

        //get list card to be move originates from
        const originList = lists[originListIndex];

        //get card from origin list
        const card = originList.cards[originCardIndex];

        //remove card from origin list
        originList.cards.splice(originCardIndex, 1);

        //if card is being moved to a different list
        if (originListIndex !== destinationListIndex) {

            //get list to insert into.
            const targetList = lists[destinationListIndex];

            //insert item into target list at index provided
            targetList.cards.splice(destinationCardIndex, 0, card);  

        }

        else {

            //if card had a lower index than it's destination, decrement destination index by 1.
            if (originCardIndex < destinationCardIndex) {

                //add card back into list at new index.
                originList.cards.splice(destinationCardIndex - 1, 0, card);

            }
            
            else {

                //add card back into list at new index.
                originList.cards.splice(destinationCardIndex, 0, card);

            }
            
        }

        //make a shallow copy of boards
        const boards = [...state.boards];

        //update boards at board index
        boards[board.index] = board;

        return Object.assign({}, state, {
            activeBoard : board,
            boards
            }) 

      }

      //Done.
      case ADD_LIST : {

        //get list to be added from action.
        const { title } = action;

        //create a deep copy of activeBoard from state.
        const board = JSON.parse(JSON.stringify(state.activeBoard));
        
        //create a reference to board's lists.
        const { lists } = board;

        const list = {index : lists.length, title, cards : []};

        //push new list to active board copy.
        lists.push(list);

        //make a shallow copy of boards
        const boards = [...state.boards];

        //update boards at board index
        boards[board.index] = board;

        //update state.
        return Object.assign({}, state, {
            activeBoard : board,
            boards
          })

      }

      //Done.
      case REMOVE_LIST: {

        //create a deep copy of active board.
        let board = JSON.parse(JSON.stringify(state.activeBoard));

        //get lists from active board
        let {lists} = board;
        
        //get index of list to be removed from action
        const {listIndex} = action;

        //remove list from lists at the index above
        lists.splice(listIndex, 1);

        //decrement index of every list if it was proceeded by remove list
        lists.forEach(list => {
            const {index} = list;
            if (index > listIndex){
                list.index = index - 1;
            }
        }); 

        //make a shallow copy of boards
        const boards = [...state.boards];

        //update boards at board index
        boards[board.listIndex] = board;

        //update state
        return Object.assign({}, state, {
            activeBoard : board,
            boards
          })

      }
      
      case SET_BOARD_NAME_VISIBILITY_IN_HEADER: {
        
        const {visible} = action;
        
        return Object.assign({}, state, {
            displayActiveBoardInHeader : visible
          })

      }

      case RENAME_ACTIVE_BOARD: {
        const {title} = action;

        let board = JSON.parse(JSON.stringify(state.activeBoard));

        board.title = title;

        //make a shallow copy of boards
        const boards = [...state.boards];

        //update boards at board index
        boards[board.index] = board;

        return Object.assign({}, state, {
            activeBoard : board,
            boards
          })

      }

      default: {

        return state

      }  
      
    }
  
}


const rootReducer = combineReducers({

    application

})
  
export default rootReducer;

