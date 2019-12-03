import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, ActivityIndicator, Text, ScrollView, SafeAreaView } from 'react-native';
 
//import Home from '../screens/Home'
 
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { processLogin } from '../actions';
import firebase from 'firebase';
 
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      message: "",
    }
  }
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCZtAFSBT1uVNjmhV1XqB6Sn05uDRwRUqc",
      authDomain: "organizer-5ab31.firebaseapp.com",
      databaseURL: "https://organizer-5ab31.firebaseio.com",
      projectId: "organizer-5ab31",
      storageBucket: "organizer-5ab31.appspot.com",
      messagingSenderId: "569052026142",
      appId: "1:569052026142:web:18354d169772d62554650f",
      measurementId: "G-QKHV7R7G5J"
    };
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else { firebase.app() }
  }
 
  onChangeHandler(field, valor) {
    this.setState({
      [field]: valor,
    })
  }
 
  processLogin() {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
 
    this.props.processLogin({ email, password })
      .then(user => {
        if (user) {
          this.props.navigation.replace('Home');
        } else {
          this.setState({
            isLoading: false,
            message: '',
          })
        }
 
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          message: this.getMessageByError(error.code)
        });
      })
  }
 
  static navigationOptions = {
    header: null
  }
  setIcon(tipo) {
    return (
      <Icon
        name={tipo}
        type="font-awesome"
        size={25}
        color='white'
      />
    );
  }
  renderMessage() {
    const { message } = this.state;
    if (!message)
      return null;
 
    return (
      <View>
        <Text style={{ color: 'white', fontSize: 15 }}>{message}</Text>
      </View>
    );
 
  }
 
  getMessageByError(code) {
    switch (code) {
      case 'auth/user-not-found':
        return "E-mail inexistente";
      case "auth/wrong-password":
        return "Senha incorreta";
      default:
        return "Erro desconhecido";
    }
  }
 
  renderButton() {
    if (this.state.isLoading) {
      return (<View style={styles.contButton}><ActivityIndicator /></View>)
    } else {
      return (
 
        <Button
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginTextButton}
          title="Login"
          containerStyle={styles.contButton}
          onPress={() => this.processLogin()}
        />
      );
    }
  }
 
 
  render() {
    return (
 
      <View style={{display: 'flex'}}>
 
        {/* <KeyboardAvoidingView style={{
        flex: 1,
      }}> */}
        <ScrollView style={[styles.scrollview]}>
 
          <View style={styles.containerLogin}>
 
            <Input
              placeholder='Email'
              placeholderTextColor='#808080'
              inputStyle={styles.inputStyle}
              containerStyle={styles.inputContainer}
              labelStyle={styles.inputStyle}
              leftIcon={this.setIcon('envelope')}
              label='Email'
              onChangeText={valor => { this.onChangeHandler('email', valor) }}
              keyboardType='email-address'
              autoCapitalize='none'
            />
 
            <Input
 
              placeholder='Senha'
              secureTextEntry={true}
              placeholderTextColor='#808080'
              inputStyle={styles.inputStyle}
              containerStyle={styles.inputContainer}
              labelStyle={styles.inputStyle}
              leftIcon={this.setIcon('lock')}
              label='Senha'
              onChangeText={valor => { this.onChangeHandler('password', valor) }}
 
            />
            {/* <View style={styles.ButtonLoginView}> */}
            {this.renderButton()}
            {this.renderMessage()}
            {/* </View> */}
 
          </View>
        </ScrollView>
        <ImageBackground
          resizeMode={'cover'} // or cover
          style={[styles.fixed, styles.containter, {zIndex: -1}]}
          source={require('../img/fundo2.png')}
        >
 
 
 
        </ImageBackground>
 
 
 
        {/* </KeyboardAvoidingView> */}
 
      </View>
 
    );
  }
}
 
const styles = StyleSheet.create({
  containter: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height //for full screen
  },
  scrollview: {
    backgroundColor: 'transparent'
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }, inputContainer: {
    borderBottomColor: 'white',
 
  },
  inputStyle: {
    marginLeft: 10,
    color: 'white',
 
  },
  contButton: {
    paddingTop: 10,
    // borderWidth: 1,
  },
 
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#25B5C4',
    borderRadius: 10,
    height: 50,
    width: 200,
 
  },
  containerLogin: {
    marginTop: Dimensions.get("window").height/3,
    paddingBottom: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // alignSelf:'center',
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: 'red',
    alignContent: 'center'
    // height: '100%'
 
  }
});
 
export default connect(null, { processLogin })(LoginScreen);
