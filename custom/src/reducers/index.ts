import { combineReducers } from 'redux';
import user from './user';
import app from './app';
import apartment from './apartment';
import maintain from './maintain'

export default combineReducers({
	user,
	app,
	apartment,
	maintain
});
