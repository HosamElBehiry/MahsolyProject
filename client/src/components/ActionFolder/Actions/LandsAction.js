import axios from "axios";
import { GET_ALL_LANDS, ADD_NEW_LAND, DELETE_LAND } from "../ActionTypes/LandsTypes";

export const getAll = (lands) =>{
  return {
    type: GET_ALL_LANDS,
    payload: lands
  }
}

export const getAllLands = () =>{
  return (dispatch) =>{
    axios.get('http://localhost:8080/lands').then((response)=>{
      dispatch(getAll(response.data))
    }).catch((err)=>{
      alert('Error Getting All Lands', err)
    })
  }
}

export const Add = (land) =>{
  return {
    type: ADD_NEW_LAND,
    payload: land
  }
}

export const AddNewLand = (formData) =>{
  
  return (dispatch) =>{
    axios.post(`http://localhost:8080/lands`, formData, {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response)=>{
      dispatch(Add(response.data.result));
      dispatch(getAllLands());
    }).catch((err)=>{
      alert('Error Add New Agriculture Land', err)
    })
  }
}

export const deleteAgricultureLand = () =>{
  return {
    type: DELETE_LAND
  }
}

export const deleteLand = (landID) =>{
  return (dispatch) =>{
    axios.delete(`http://localhost:8080/lands/${landID}`, {
      headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(()=>{
      dispatch(deleteAgricultureLand());
      dispatch(getAllLands());
    })
    .catch((err)=>{
      alert('Error While Deleting', err)
    })
  }
}