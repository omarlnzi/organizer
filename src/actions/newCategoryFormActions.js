import firebase from 'firebase';
export const SET_FIELD = 'SET_FIELD';
export const CATEGORY_SAVED_SUCCESS = 'CATEGORY_SAVED_SUCCESS';
export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const RESET_CATEGORY_FORM = 'RESET_CATEGORY_FORM';

export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field,//= field: field,
    value,
  }
}

export const categorySavedSuccess = () => {
  return { type: CATEGORY_SAVED_SUCCESS }
};

export const setAllFields = serie => ({
  type: SET_ALL_FIELDS,
  serie: serie
});

export const resetCategoryForm = () => ({
  type: RESET_CATEGORY_FORM
});


export const saveCategory = category => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if(category.id){
      await firebase
      .database()
      .ref(`/users/${currentUser.uid}/categories/${category.id}`)
      .set(category);

    }else{
      await firebase
      .database()
      .ref(`/users/${currentUser.uid}/categories`)
      .push(category);
    }
    dispatch(categorySavedSuccess());
  }
}
