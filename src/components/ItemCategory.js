import React from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions, 
  Text, 
  Image, 
  TouchableOpacity 
} from "react-native";

const ItemCategory = ({ category, onNavigate }) =>(
  <TouchableOpacity 
    onPress={onNavigate}
    style={styles.container}>
    <View style={[styles.itemContainer,  {backgroundColor: category.color}]}>
      {/* <View style={[styles.categorContainer, {backgroundColor: category.color}]}> */}
        <Text style={styles.categoryTitle}>{ category.title }</Text>
      {/* </View> */}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 5,
    // flex: 0.5,
    height: Dimensions.get('window').height/8,
    // height: Dimensions.get('window').width/2,
    // borderColor: 'red',
    // borderWidth:1
  },
  itemContainer :{
    
    flex: 1,
    borderWidth:1,
    // margin: 10
    // alignItems: 'center',
    justifyContent: 'center'
  },
  categorContainer:{

    // backgroundColor: 'black',
    // opacity: 0.8,
    // height: 50,
    width: '100%',
    // position: 'absolute',
    // bottom: 0,
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingRight: 5,
    // paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'

  },
  categoryTitle: {
    // borderWidth: 1,
    // borderColor: 'red',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }

});

export default ItemCategory;