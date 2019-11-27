import { SET_FIELD, CATEGORY_SAVED_SUCCESS, SET_ALL_FIELDS, RESET_CATEGORY_FORM } from '../actions';
const INITIAL_STATE = {
  id: null,
  title: '',
  color: ''
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIELD:
      const clonedState = { ...state };
      clonedState[action.field] = action.value;
      return clonedState;
    case CATEGORY_SAVED_SUCCESS:
      return INITIAL_STATE;
    case SET_ALL_FIELDS:
      return action.serie;
    case RESET_CATEGORY_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
}