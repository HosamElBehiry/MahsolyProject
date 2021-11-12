import {combineReducers} from 'redux';
import userReducer from './UserReducer/UserReducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import AgricultureCropReducer from './AgricultureCropReducer/AgricultureCropReducer';
import CrReducer from './CropsReducer/CropsReducer';

const reducer = combineReducers({
  userReducer, 
  CropReducer : AgricultureCropReducer,
  Crops: CrReducer
})

const persistConfig = {
  key : 'root',
  storage,
  whitelist: ['userReducer', 'CropReducer', 'Crops']
}



export default persistReducer(persistConfig, reducer);