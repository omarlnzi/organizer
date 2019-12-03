import firebase from 'firebase';
import { Alert } from 'react-native';
export const SET_ACTIVITIES = 'SET_ACTIVITIES';

const setActivities = activities => ({
  type: SET_ACTIVITIES,
  activities: activities
})

export const loadActivities = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/activities`)
      .orderByChild('startdate')
      .on('value', snapshot => {
        const ordered =[];
      
        snapshot.forEach((child)=>{
          const id = child.key;
          const val =  child.val();
          val['id'] = id;
          ordered.push(val)
        });
        const action = setActivities(ordered);
        dispatch(action);
      })
  }
}

export const deleteActivity = activity => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      
      Alert.alert(
        'Exclusão',
        `Deseja excluir a atividade ${activity.title}?`,
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
                .ref(`/users/${currentUser.uid}/activities/${activity.id}`)
                .remove();
              resolve(true);
            } catch (error) {
              reject(e);
            }
          },
        }],
        { cancelable: false }
      )
    })
  }
}