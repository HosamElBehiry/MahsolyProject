import axios from 'axios';
import 
      { ADD_TO_FAVOURITES,
        INFO_AFTER_LOGIN, 
        DELETE_INFO_AFTER_LOGOUT,
        GET_USER_BY_ID
      } from '../ActionTypes/userActionTypes';

export const RegisterUser = (formData) =>{
  return (dispatch) =>{
    axios.post('http://localhost:8080/users/', formData).then((response)=>{
      localStorage.setItem(response.data.token);
      dispatch(fetchUserDataAfterLogin(response.data.data))
    }).catch((err)=>{
      console.log('Error Creating new user', err)
    })
  }
}


export const userInfo = (userData) =>{
  return {
    type: INFO_AFTER_LOGIN,
    payload: userData,
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
      dispatch(userInfo(users));
      dispatch(getUserById(response.data._id))
    })
    .catch(()=>{
      alert('Error in user Action.js')
    })
  }
}

export const deleteUserInfo = () =>{
  return {
    type: DELETE_INFO_AFTER_LOGOUT,
    payload: {},
  }
}


export const AddProductToFavourite  = (productID, msg) =>{
  return {
    type: ADD_TO_FAVOURITES,
    payload: productID,
    msg
  }
}

export const addToFavourite = (productID) => {
  return (dispatch) =>{
    axios.post(`http://localhost:8080/users/add-to-favourites/${productID}`, null, {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response)=>{
      dispatch(AddProductToFavourite(productID, response.data.msg));
    }).catch((err)=>{
      console.log('Error', err)
    })
  }
}


export const GET_USER_ID = (userID) =>{
  return {
    type: GET_USER_BY_ID,
    payload: userID
  }
}

export const getUserById = (userId) =>{
  return (dispatch) =>{
    if(userId !== undefined){
      axios.get(`http://localhost:8080/users/${userId}`).then((response)=>{
      dispatch(GET_USER_ID(response.data));
      }).catch((err)=>{
        alert('Error finding user By Id', err)
      })
    }
  }
}



