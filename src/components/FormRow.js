import React  from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FormRow = (props) => {

	const {children} = props;

	return(
		<View style={styles.container}>
			{children}
		</View>
	)
};

const styles = StyleSheet.create({
	container:{
		padding: 5,
		backgroundColor: 'white',
		marginTop: 5,
		marginBottom: 5,
		elevation: 1,
		// borderWidth:1,
	}
});

export default FormRow;