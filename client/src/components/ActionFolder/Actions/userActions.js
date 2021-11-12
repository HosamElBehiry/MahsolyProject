import axios from 'axios';
import 
      { ADD_TO_FAVOURITES,
        INFO_AFTER_LOGIN, 
        DELETE_INFO_AFTER_LOGOUT,
      } from '../ActionTypes/userActionTypes';

export const userInfo = (userData) =>{
  return {
    type: INFO_AFTER_LOGIN,
    payload: userData
  }
}

export const fetchUserDataAfterLogin = () =>{
  return (dispatch) =>{
    axios.get(`http://localhost:8080/users/whoAmI`, {
      headers : {
        authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response)=>{
      const users = response.data;
      dispatch(userInfo(users))
    })
    .catch(()=>{
      alert('Error in user Action.js')
    })
  }
}

export const deleteUserInfo = () =>{
  return {
    type: DELETE_INFO_AFTER_LOGOUT,
    payload: {}
  }
}



export const AddProductToFavourite  = () =>{
  return {
    type: ADD_TO_FAVOURITES
  }
}

export const AddToFavoutite = (product_id) =>{
  return (dispatch) =>{
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.post(`http://localhost:8080/users/add-to-favourites/${product_id}`)
    .then(()=>{
      alert('Added to favourite')
      dispatch(AddProductToFavourite())
    }).catch((err)=>{
      console.log('Error Adding to Favourites', err)
    })
  }
}



