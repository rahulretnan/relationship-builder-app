import{ combineReducers } from 'redux';
import persons from './persons';
import tags from './tags';
import relations from './relations';
import relationCheck from './relationCheck';

export default combineReducers({persons,tags,relations,relationCheck})