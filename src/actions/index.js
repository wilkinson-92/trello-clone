export const ADD_LISTS = 'ADD_LISTS'
export function addLists(lists) {
  return {
    type : ADD_LISTS,
    lists
  }
}

////////////////////////////////////
//CARD ACTIONS
export const ADD_CARD = 'ADD_CARD'
export function addCardAction(title, listIndex) {
  return {
    type : ADD_CARD,
    title,
    listIndex
  }
}

export const MOVE_CARD = 'MOVE_CARD'
export function moveCard(originCardIndex, destinationCardIndex,  originListIndex, destinationListIndex) {
  return {
    type : MOVE_CARD,
    originCardIndex,
    destinationCardIndex, 
    originListIndex, 
    destinationListIndex
  }
}

//Removes card from a list in active board. 
export const REMOVE_CARD = 'REMOVE_CARD'
export function removeCardAction(cardIndex, listIndex) {
  return {
    type : REMOVE_CARD,
    cardIndex,
    listIndex
  }
}
////////////////////////////////////
//LIST ACTIONS
//Add list to active board lists.
export const ADD_LIST = 'ADD_LIST'
export function addListAction(title) {
  return {
    type : ADD_LIST,
    title
  }
}

//Remove list from active board lists.
export const REMOVE_LIST = 'REMOVE_LIST'
export function removeListAction(listIndex) {
  return {
    type : REMOVE_LIST,
    listIndex
  }
}

////////////////////////////////////
//BOARD ACTIONS
export const ADD_BOARD = 'ADD_BOARD'
export function addBoard(title) {
  return {
    type : ADD_BOARD,
    title
  }
}

//Remove board from boards.
export const REMOVE_BOARD = 'REMOVE_BOARD'
export function removeBoard(index) {
  return {
    type : REMOVE_BOARD,
    index
  }
}

export const SET_ACTIVE_BOARD = 'SET_ACTIVE_BOARD'
export function setActiveBoard(index) {
  return {
    type : SET_ACTIVE_BOARD,
    index
  }
}

export const SET_BOARD_NAME_VISIBILITY_IN_HEADER = 'SET_BOARD_NAME_VISIBILITY_IN_HEADER'
export function setBoardNameVisibilityInHeader(visible) {
  return {
    type : SET_BOARD_NAME_VISIBILITY_IN_HEADER,
    visible
  }
}

export const RENAME_ACTIVE_BOARD = 'RENAME_ACTIVE_BOARD'
export function renameActiveBoard(title) {
  return {
    type : RENAME_ACTIVE_BOARD,
    title
  }
}
