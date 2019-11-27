import { combineReducers } from 'redux';
import userReducer from './userReducer';
import newCategoryForm from './newCategoryForm';
import categoryReducer from './categoryReducer'
export default combineReducers({
	user: userReducer,
	categoryForm: newCategoryForm,
	listaCategorias: categoryReducer,
});