import { SET_ACTIVITY_FIELD, ACTIVITY_SAVED_SUCCESS, SET_ALL_ACTIVITY_FIELDS, RESET_ACTIVITY_FORM } from '../actions';
const INITIAL_STATE = {
  id: null,
  title: '',
  description: '',
  startdate: '',
  enddate: '',
  categoryid: 'default'
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ACTIVITY_FIELD:
      const clonedState = { ...state };
      clonedState[action.field] = action.value;
      return clonedState;
    case ACTIVITY_SAVED_SUCCESS:
      return INITIAL_STATE;
    case SET_ALL_ACTIVITY_FIELDS:
      return action.activity;
    case RESET_ACTIVITY_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
}