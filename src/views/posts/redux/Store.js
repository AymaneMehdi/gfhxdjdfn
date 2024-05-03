import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import blogsReducer from './Reducers/blogs_Reducer';
import loginReducer from "./Reducers/Login_Reducer";

const rootReducer = combineReducers({ 
  posts: blogsReducer,
  login: loginReducer,
});

const store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
); 

export default store;
