import {combineReducers} from 'redux';
import userReducer from './UserReducer/UserReducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import AgricultureCropReducer from './AgricultureCropReducer/AgricultureCropReducer';
import CrReducer from './CropsReducer/CropsReducer';
import  landsReducer  from './LandsReducer/LandsReducer';
import StockReducer from './StockReducer/StockReducer';

const reducer = combineReducers({
  userReducer, 
  CropReducer : AgricultureCropReducer,
  Crops: CrReducer,
  Lands: landsReducer,
  StockReducer
})

const persistConfig = {
  key : 'root',
  storage,
  whitelist: ['userReducer', 'CropReducer', 'Crops', 'Lands', 'StockReducer']
}



export default persistReducer(persistConfig, reducer);