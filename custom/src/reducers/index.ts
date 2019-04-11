import { combineReducers } from 'redux';
import user from './user';
import app from './app';
import apartment from './apartment';

export default combineReducers({
	user,
	app,
	apartment
});
