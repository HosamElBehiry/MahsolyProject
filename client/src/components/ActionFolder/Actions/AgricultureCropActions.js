import {ADD_CROP, DELETE_CROP, GET_ALL} from '../ActionTypes/AgricultureCropTypes';
import axios from 'axios';
export const deleteAgricultureCrop = () =>{
  return {
    type: DELETE_CROP,
    payload: false
  }
}

export const getAllProducts = (Crops) =>{
  return {
    type: GET_ALL,
    payload: Crops
  }
}

export const deleteCrop = (crop_id) =>{
  return (dispatch) =>{
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.delete(`http://localhost:8080/agriculture-crops-router/${crop_id}`)
    .then(()=>{
      console.log('Crop deleted')
      dispatch(deleteAgricultureCrop());
    }).catch(()=>{
      alert('Error while deleting Agriculture Crop')
    })
  }
}

export const getAllCrops = () =>{
  return (dispatch) =>{
    axios.get(`http://localhost:8080/agriculture-crops-router`)
    .then((response)=>{
      const AllCrops = response.data;
      dispatch(getAllProducts(AllCrops));
    }).catch((err)=>{
      alert('Error Getting Agriculture Crop', err);
    })
  }
}

export const AddNewCrop = (cropData) =>{
  return {
    type: ADD_CROP,
    isAdded: false
  }
}

export const AddCrop = (formData) =>{
  return (dispatch) =>{
      axios.post(`http://localhost:8080/agriculture-crops-router`, formData, {
        headers : {
          authorization : `Bearer ${localStorage.getItem('token')}`
        }
      }).then(()=>{
        console.log('inside post axios add agriculture crop ')
        dispatch(AddNewCrop(formData));
      }).catch((err)=>{
        console.log('Error Adding New Product', err);
      })
  }
}