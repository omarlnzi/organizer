import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './pages/LoginScreen';
import Home from './pages/Home';



const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    // navigationOptions: {
    //   title: 'Bem vindo',
    // },
  },
  'Home': {
    screen: Home,

    navigationOptions: ({ navigation }) => {
      return ({
        title: 'Home',
        headerTitleStyle: {
          color: 'white',
          fontSize: 30,
        }
      })
    }
  },



}, {
  defaultNavigationOptions: {
    title: 'Timeline',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#25B5C4',
      borderBottomColor: '#C5C5C5',
      borderBottomWidht: 1
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
      flexGrow: 1,
      textAlign: 'center'
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

