import firebase from 'firebase';
import { Alert } from 'react-native';
export const SET_CATEGORIES = 'SET_CATEGORIES';

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories: categories
})

export const loadCategories = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/categories`)
      .on('value', snapshot => {
        const categories = snapshot.val();
        const action = setCategories(categories);
        dispatch(action);
      })
  }
}