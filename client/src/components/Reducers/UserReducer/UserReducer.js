import 
      { INFO_AFTER_LOGIN, 
        DELETE_INFO_AFTER_LOGOUT, 
        ADD_TO_FAVOURITES
      } from '../../ActionFolder/ActionTypes/userActionTypes';

      
const initialState = {
  userInfo: {},
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    case INFO_AFTER_LOGIN: return {
      ...state,
      userInfo: action.payload
    }
    case DELETE_INFO_AFTER_LOGOUT: return {
      ...state,
      userInfo: action.payload
    }
    case ADD_TO_FAVOURITES: return {
      ...state, 
      isProductAddedToFavourites: true
    }
    default: return state;
  }
}

export default userReducer