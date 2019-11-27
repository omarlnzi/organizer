import React from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator, Text, FlatList, Alert } from 'react-native';
import ItemCategory from '../components/ItemCategory'
import AddCategory from '../components/AddCategory'
import { connect } from 'react-redux';
import { loadCategories } from '../actions';

const itemDATA = [
  {
    id: '1',
    title: 'Faculdade',
    color: '#7FFF00'
  },
  {
    id: '2',
    title: 'Prova',
    color: '#00BFFF'
  },
  {
    id: '3',
    title: 'Compras',
    color: '#F08080'
  },
  {
    id: '4',
    title: 'Estudo',
    color: 'black'
  },
  {
    id: '5',
    title: 'Estudo',
    color: 'white'
  },
];

class CategoryScreen extends React.Component {
  componentDidMount(){
		this.props.loadCategories();
	}

  render() {
    // const { category } = this.props.navigation.state.params;
    if(this.props.categories===null){
			return <ActivityIndicator />
		}
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={[...this.props.categories, { isLast: true }]}
          // data={[...itemDATA, { isLast: true }]}
          // data={itemDATA}
          renderItem={({ item, index }) => {
            return (
              item.isLast ?
                <AddCategory
                  onNavigate={() => this.props.navigation.navigate('NewCategory')}
                />
                :
                <ItemCategory
                  category={item}
                  onNavigate={() => this.props.navigation.navigate('NewCategory', { serieToEdit: item })}
                  // onNavigate={() => console.log("clicou")}
                />
            );
          }}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </SafeAreaView>
    );
  }

}


const mapStateToProps = state => {
	const {listaCategorias} = state;

	if (listaCategorias === null){
		return {categories: listaCategorias};
	}

	const keys = Object.keys(listaCategorias);
	const listaCategoriesWithId = keys.map(key =>{
		return {...listaCategorias[key], id: key}
	})
	return {categories: listaCategoriesWithId}
}

export default connect(mapStateToProps, {loadCategories})(CategoryScreen);