import 
    { INFO_AFTER_LOGIN, 
      DELETE_INFO_AFTER_LOGOUT, 
      ADD_TO_FAVOURITES,
      GET_USER_BY_ID
    } from '../../ActionFolder/ActionTypes/userActionTypes';

const initialState = {
  userInfo: {},
  isLogged: false,
  fullUserData: {}
}

const userReducer = (state = initialState, action) =>{
  switch(action.type){
    case INFO_AFTER_LOGIN: return {
      ...state,
      userInfo: action.payload,
      isLogged: !state.isLogged
    }
    case DELETE_INFO_AFTER_LOGOUT: return {
      ...state,
      userInfo: action.payload,
      isLogged: !state.isLogged,
      fullUserData: {}
    }
    case ADD_TO_FAVOURITES: 
    if(action.msg.includes('added')){
      state.userInfo.favourites.push(action.payload)
    }else{
      const index = state.userInfo.favourites.indexOf(action.payload)
      state.userInfo.favourites.splice(index, 1);
    }
    return {
      ...state,
      userInfo: state.userInfo
    }
    case GET_USER_BY_ID: return {
      ...state,
      fullUserData: action.payload
    }
    default: return state;
  }
}

export default userReducer