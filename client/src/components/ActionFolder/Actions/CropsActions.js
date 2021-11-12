import axios from 'axios';
import {GET_ALL_CROPS} from '../ActionTypes/CropsActionTypes';

export const getAll = (Crops) =>{
  return {
    type: GET_ALL_CROPS,
    payload: Crops
  }
}

export const getAllCrops = () =>{
  return async (dispatch) =>{
    await axios.get(`http://localhost:8080/cropsRouter`)
    .then((response)=>{
      dispatch(getAll(response.data));
    })
    .catch((err)=>{
      console.log('Error', err)
    })
  }
}