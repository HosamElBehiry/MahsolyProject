import {DELETE_CROP, GET_ALL, ADD_CROP} from '../../ActionFolder/ActionTypes/AgricultureCropTypes';

const initialState = {
  Crops: [],
  isAdded: false,
  cropID: {}
}

const AgricultureCropReducer = (state = initialState, action) =>{
  switch(action.type){
    case DELETE_CROP : return {
      ...state,
      isDeleted: true
    }
    case GET_ALL: return {
      ...state,
      Crops: action.payload
    }
    case ADD_CROP: return {
      ...state,
      isAdded: !action.payload,
    }
    default: return state;
  }
}

export default AgricultureCropReducer;