import axios from 'axios';
import {GET_ALL_STOCKS} from '../ActionTypes/StockTypes';

export const getAll = (StockData) =>{
  return {
    type: GET_ALL_STOCKS,
    payload: StockData
  }
}

export const getAllStocks = () =>{
  return (dispatch) =>{
    axios.get('http://localhost:8080/cropsRouter').then((response)=>{
      dispatch(getAll(response.data))
    }).catch((err)=>{
      alert('Error Getting Stock Market Data', err);
    })
  }
}


export const getByTypeId = (stockID) =>{
  return (dispatch) => {
    axios.get(`http://localhost:8080/cropsRouter/typeId/${stockID}`).then((response)=>{
      dispatch(getAll(response.data));
    }).catch((err)=>{
      alert('Error', err);
    })
  }
}