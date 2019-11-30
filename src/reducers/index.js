import { combineReducers } from 'redux';
import userReducer from './userReducer';
import newCategoryForm from './newCategoryForm';
import categoryReducer from './categoryReducer'
import newActivityReducer from './newActivityReducer'
import activityReducer from './activityReducer'
export default combineReducers({
	user: userReducer,
	categoryForm: newCategoryForm,
	listaCategorias: categoryReducer,
	activityForm: newActivityReducer,
	listaAtividades: activityReducer
});