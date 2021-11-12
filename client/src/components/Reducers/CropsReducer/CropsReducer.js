import {GET_ALL_CROPS} from '../../ActionFolder/ActionTypes/CropsActionTypes'
const initialState = {
  Crops : []
}

const CrReducer = (state = initialState, action) =>{
  switch(action.type){
    case GET_ALL_CROPS : return {
      ...state,
      Crops: action.payload
    }
    default: return state;
  }
}

export default CrReducer;