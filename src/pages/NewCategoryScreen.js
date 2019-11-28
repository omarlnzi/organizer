import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';

import ColorPalette from 'react-native-color-palette';
import FormRow from '../components/FormRow';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Button } from 'react-native-elements';

import { connect } from 'react-redux';
import { setField, saveCategory, setAllFields, resetCategoryForm, deleteCategory } from '../actions';

class NewCategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedColor: '',
      colors: [],
      isEditing: false

    }
  }

  randomColor(qtd, oldColor = '') {
    var letters = '0123456789ABCDEF';

    var colors = [];
    if (oldColor !== '') { colors.push(oldColor) };
    for (var j = 0; j < qtd; j++) {
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color)
    }

    return colors;
  }

  componentDidMount() {

    const { navigation, setAllFields, resetCategoryForm } = this.props;
    const { params } = navigation.state;
    if (params && params.categoryToEdit) {
      setAllFields(params.categoryToEdit);
      this.setState({
        colors: this.randomColor(20, params.categoryToEdit.color),
        isEditing: true
      });
    } else {
      this.setState({
        isEditing: false,
        colors: this.randomColor(21)
      }
      );
      resetCategoryForm();

    }

  }

  renderDeleteButton() {
    if (this.state.isEditing && !this.state.isLoading) {
      const { categoryToEdit } = this.props.navigation.state.params;
      console.log(categoryToEdit);
      return (
        <View style={styles.contButton}>
          <Button
            title="Excluir"
            color="#FF0004"
            onPress={async () => {
              const hasDeleted = await this.props.deleteCategory(categoryToEdit);
              if (hasDeleted) {
                this.props.navigation.goBack();
              }
            }}
          />
        </View>
      )
    }
  }

  render() {
    const { setField, categoryForm, saveCategory, navigation } = this.props;
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
        <View style={styles.viewButtons}>
          {
            this.state.isLoading ?
              <ActivityIndicator />
              :
              <View style={styles.contButton}>
                <Button
                  title='Salvar'
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
              </View>
          }
          {this.renderDeleteButton()}
        </View>
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
  resetCategoryForm,
  deleteCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(NewCategoryScreen);


const styles = StyleSheet.create({
  contButton: {
    width: '40%',
    margin: 10,

  },
  viewButtons:{
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row"
  },
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