import {GET_ALL_LANDS, ADD_NEW_LAND, DELETE_LAND} from '../../ActionFolder/ActionTypes/LandsTypes';

const initialState = {
  lands: []
}

const landsReducer = (state = initialState, action) =>{
  switch(action.type){
    case GET_ALL_LANDS: return {
      ...state,
      lands: action.payload
    }
    case ADD_NEW_LAND: return {
      ...state,
    }
    case DELETE_LAND: return {
      ...state
    }
    default: return state;
  }
}

export default landsReducer