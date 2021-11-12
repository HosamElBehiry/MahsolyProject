import { applyMiddleware, createStore } from "redux";
import reducer from "../Reducers/RootReducer";
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)
const result = {store, persistor}
export default result;