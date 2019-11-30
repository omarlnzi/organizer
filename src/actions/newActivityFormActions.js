import firebase from 'firebase';
export const SET_ACTIVITY_FIELD = 'SET_ACTIVITY_FIELD';
export const ACTIVITY_SAVED_SUCCESS = 'ACTIVITY_SAVED_SUCCESS';
export const SET_ALL_ACTIVITY_FIELDS = 'SET_ALL_ACTIVITY_FIELDS';
export const RESET_ACTIVITY_FORM = 'RESET_ACTIVITY_FORM';

export const setActivityField = (field, value) => {
  return {
    type: SET_ACTIVITY_FIELD,
    field,//= field: field,
    value,
  }
}

export const activitySavedSuccess = () => {
  return { type: ACTIVITY_SAVED_SUCCESS }
};

export const setAllActivityFields = activity => ({
  type: SET_ALL_ACTIVITY_FIELDS,
  activity: activity
});

export const resetActivityForm = () => ({
  type: RESET_ACTIVITY_FORM
});

export const saveActivity = activity => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if(activity.id){
      await firebase
      .database()
      .ref(`/users/${currentUser.uid}/activities/${activity.id}`)
      .set(activity);

    }else{
      await firebase
      .database()
      .ref(`/users/${currentUser.uid}/activities`)
      .push(activity);
    }
    dispatch(activitySavedSuccess());
  }
}
