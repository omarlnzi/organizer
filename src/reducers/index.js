import { combineReducers } from 'redux';
import userReducer from './userReducer';
export default combineReducers({
	user: userReducer,
	// serieForm: newSerieForm,
	// listaSeries: serieReducer,
});