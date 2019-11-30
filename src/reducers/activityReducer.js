import {SET_ACTIVITIES} from '../actions'
export default function(state = null, action){
  switch(action.type){
    case SET_ACTIVITIES:
      return action.activities;
    default:
      return state;
  }
}