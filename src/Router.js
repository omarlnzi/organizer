import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './pages/LoginScreen';
import Home from './pages/Home';
import NewActivity from './pages/NewActivity';
import CategoryScreen from './pages/CategoryScreen';
import NewCategoryScreen from './pages/NewCategoryScreen';
import { Alert } from 'react-native';



const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    // navigationOptions: {
    //   title: 'Bem vindo',
    // },
  },

  'NewActivity': {
    screen: NewActivity,

    navigationOptions: ({ navigation }) => {
      return ({
        title: 'Nova atividade',
        headerTitleStyle: {
          color: 'white',
          fontSize: 30,
        }
      })
    }
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


  
  'Category': {
    screen: CategoryScreen,

    navigationOptions: ({ navigation }) => {
      return ({
        title: 'Categorias',
        headerTitleStyle: {
          color: 'white',
          fontSize: 30,
        }
      })
    }
  },
  'NewCategory': {
    screen: NewCategoryScreen,

    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;
      console.log(params);
      if (params && params.categoryToEdit) {

        return {
          title: "Editar Categoria",
          headerTitleStyle: {
            fontSize: 30,
          }
        }
      } else {
        return ({
          title: 'Nova Categoria',

          headerTitleStyle: {
            fontSize: 30,
          }
        })

      }
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

