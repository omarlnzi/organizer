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

export const deleteCategory = category => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      
      Alert.alert(
        'Exclusão',
        `Deseja excluir a categoria ${category.title}?`,
        [{
          text: 'Não',
          onPress: () => {
            resolve(false);
          },
          style: 'cancel'
        }, {
          text: 'Sim',
          onPress: async () => {
            const { currentUser } = firebase.auth();

            try {
              await firebase
                .database()
                .ref(`/users/${currentUser.uid}/categories/${category.id}`)
                .remove();
              resolve(true);
            } catch (error) {
              console.log('AAAAAAAAAAAAAAAAAAAAAqui')
              reject(e);
            }
          },
        }],
        { cancelable: false }
      )
    })
  }
}