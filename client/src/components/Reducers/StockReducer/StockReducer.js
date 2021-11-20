import {GET_ALL_STOCKS} from '../../ActionFolder/ActionTypes/StockTypes'
const initialState = {
  Stock: []
}

const StockReducer = (state = initialState, action) =>{
  switch(action.type){
    case GET_ALL_STOCKS: return {
      ...state,
      Stock: action.payload
    }
    default: return state;
  }
}

export default StockReducer;