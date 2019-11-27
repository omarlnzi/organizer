import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Picker,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';

import ColorPalette from 'react-native-color-palette';
import FormRow from '../components/FormRow';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { setField, saveCategory, setAllFields, resetCategoryForm } from '../actions';

class NewCategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedColor: '',
      colors: [],
    
    }
  }

  randomColor(qtd,oldColor='') {
    var letters = '0123456789ABCDEF';
    
    var colors = [];
    if(oldColor !== ''){colors.push(oldColor)};
    for (var j = 0; j < qtd; j++) {
      var color ='#'
      for (var i = 0; i < 6; i++) {
        color+=letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color) 
    }
    
    return colors;
  }

  componentDidMount(){
    
    const { navigation, setAllFields, resetCategoryForm } = this.props;
    const { params } = navigation.state;
    if (params && params.serieToEdit) {
      setAllFields(params.serieToEdit);
      this.setState({
        colors : this.randomColor(20,params.serieToEdit.color)}
      );
    } else {
      this.setState({
        colors : this.randomColor(21)}
      );
      resetCategoryForm();
      
    }
   
  }

  render() {


    // const { serieForm, setField, saveSerie, navigation } = this.props;
    const {setField, categoryForm, saveCategory, navigation} = this.props;
    return (
      <View>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Nome da Categoria"
            value={categoryForm.title}
            onChangeText={value => {
              setField('title', value)
            }}
          />
        </FormRow>
        <FormRow>
          <ColorPalette
            onChange={value => {
                setField('color', value)
            }}
            value={categoryForm.color}
            colors={this.state.colors}
            title={"Escolha uma cor"}
            icon={
              <Icon name={'check-circle-o'} size={25} color={'black'} />
              // React-Native-Vector-Icons Example
            }
          />
        </FormRow>

        {
          this.state.isLoading ?
            <ActivityIndicator />
            :
            <Button
              title="Salvar"
              onPress={async () => {
                this.setState({ isLoading: true });
                try {
                  await saveCategory(categoryForm);
                  navigation.goBack();
                } catch (error) {
                  Alert.alert('Erro', error.message);
                } finally {
                  this.setState({ isLoading: false });
                }
              }}
            />
        }

        


      </View>

    );
  }

}

const mapStateToProps = (state) => {
  return ({
    categoryForm: state.categoryForm
  })
}
const mapDispatchToProps = {
  setField,
  saveCategory,
  setAllFields,
  resetCategoryForm
}
export default connect(mapStateToProps, mapDispatchToProps)(NewCategoryScreen);


const styles = StyleSheet.create({
  textinput: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  rate: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  image: {
    aspectRatio: 1,
    width: '100%'

  }
});