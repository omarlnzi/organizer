import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, Picker, Text, Modal, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Input, } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';



class NewActivity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			datainicial: "",
			datafinal: "",
		};
	}

	changeDateInicial = (valor) => {
		this.setState({
			datainicial: valor
		})
	}
	changeDateFinal = (valor) => {
		this.setState({
			datafinal: valor
		})
	}

	render() {
		return (
			<ScrollView style={{ paddingTop: 10 }}>
				<View style={styles.containerH}>
					<Input
						label='Titulo'
						labelStyle={{ color: 'black' }}
					/>
				</View>
				<View style={styles.containerH}>
					<Input
						labelStyle={{ color: 'black' }}
						label='Descrição'
					/>
				</View>
				<View style={styles.containerH}>
					<View style={styles.dataContainer}>
						<Text style={styles.label}>Inicio</Text>
						<DatePicker
							date={this.state.datainicial}
							onDateChange={this.changeDateInicial}
							customStyles={dateStyle}
							style={styles.dataComponent}
							mode="datetime"
							format="DD/MM/YYYY hh:mm"
							is24Hour={true}
						/>
					</View>
					<View style={styles.dataContainer}>
						<Text style={styles.label}>Fim</Text>
						<DatePicker
							date={this.state.datafinal}
							onDateChange={this.changeDateFinal}
							customStyles={dateStyle}
							style={styles.dataComponent}
							mode="datetime"
							format="DD/MM/YYYY hh:mm"
							is24Hour={true}
						/>
					</View>
				</View>
				<View style={styles.containerH}>
					<View style={styles.categoria}>
						<Text style={styles.label}>Categoria</Text>
						<Picker
							selectedValue={this.state.categoria}
							style={styles.picker}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ categoria: itemValue })
							}>
							<Picker.Item label="Aula" value="aula" />
							<Picker.Item label="Estudo" value="estudo" />
							<Picker.Item label="Tarefas" value="estudo" />
						</Picker>
					</View>
					<View style={styles.colorBox}>
						<Text style={{ textAlignVertical: 'center', textAlign: 'center' }}>Cor</Text>
					</View>
				</View>
				<View style={styles.contButton}>
					<Button
						title='Salvar'
						// color="#FF0004"
						onPress={async () => {
							// this.setState({ isLoading: true });
							try {
								// await saveCategory(categoryForm);
								// navigation.goBack();
							} catch (error) {
								// Alert.alert('Erro', error.message);
							} finally {
								// this.setState({ isLoading: false });
							}
						}}
					/>
				</View>

			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	vazio: {

	},
	contButton: {
		width: '40%',
		margin: 10,
		alignSelf: 'center',


	},
	picker: {
		marginLeft: 5,
		// borderBottomWidth: 1,
		// borderBottomColor: 'blue'
	},
	colorBox: {
		flex: 1,
		margin: 15,
		borderWidth: 1,
		backgroundColor: 'red',
		borderColor: 'black',
		borderRadius: 20

	},
	dataComponent: {
		width: '100%',

	},
	label: {
		color: 'black',
		fontWeight: 'bold',
		paddingTop: 5,
		fontSize: 17,
		paddingLeft: 10
	},

	loginTextButton: {
		fontSize: 17,
		color: 'white',
		fontWeight: 'bold',
	},
	loginButton: {
		backgroundColor: '#25B5C4',
		borderRadius: 10,
		height: 50,
		width: 200,
	},
	container: {
		flex: 1,
		paddingTop: 15,

	},
	containerH: {
		flex: 1,
		// height: 70,
		flexDirection: 'row',
		marginTop: 5,
		marginRight: 10,
		marginLeft: 10,
		// borderWidth: 1,
		// borderColor: 'red',

	},
	categoria: {
		flex: 4,
		// flexDirection:'column'

	},
	dataContainer: {
		flex: 1,
	},



});

const dateStyle = StyleSheet.create({
	dateTouch: {
		width: '100%',

	},
	dateTouchBody: {

		flexDirection: 'row',
		height: 40,
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	dateIcon: {
		width: 32,
		height: 32,
		marginLeft: 25,
		marginRight: 5,
		marginBottom: 5
	},
	dateInput: {
		flex: 1,
		height: 40,
		borderWidth: 0,
		borderBottomWidth: 1,
		paddingLeft: 5,
		marginLeft: 10,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	dateText: {
		color: '#333'
	},
	placeholderText: {
		color: '#c9c9c9'
	},
	datePickerMask: {
		flex: 1,
		alignItems: 'flex-end',
		flexDirection: 'row',
		backgroundColor: '#00000077'
	},
	datePickerCon: {
		backgroundColor: '#fff',
		height: 0,
		overflow: 'hidden'
	},
	btnText: {
		position: 'absolute',
		top: 0,
		height: 42,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnTextText: {
		fontSize: 32,
		color: 'black'
	},
	btnTextCancel: {
		color: '#666'
	},
	btnCancel: {
		left: 0
	},
	btnConfirm: {
		right: 0
	},
	datePicker: {
		marginTop: 42,
		borderTopColor: '#ccc',
		borderTopWidth: 1
	},
	disabled: {
		backgroundColor: '#eee'
	}
});

export default NewActivity;