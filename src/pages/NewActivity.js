import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator, Alert, SafeAreaView, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Input, } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment'
import { connect } from 'react-redux';
// import {setField} from '../actions/newActivityFormActions'
import { setActivityField, saveActivity, setAllActivityFields, resetActivityForm, deleteActivity } from '../actions'; //falta delete
import { loadCategories } from '../actions';
class NewActivity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			colorSelected: 'white',
			isLoading: true

		};
	}



	componentDidMount() {
		this.props.loadCategories();
		const { navigation, setAllActivityFields, resetActivityForm } = this.props;
		const { params } = navigation.state;


		if (params && params.activityToEdit) {
			setAllActivityFields(params.activityToEdit);
			this.setState({
				colorSelected: this.getColor(params.activityToEdit.categoryid),
				isEditing: true
			})
		} else {
			resetActivityForm();
			this.setState({
				isEditing: false
			})
		}

	}
	renderDeleteButton() {
		if (this.state.isEditing) {
			const { activityToEdit } = this.props.navigation.state.params;
		
			return (
				<View style={styles.contButton}>
					<Button
						title="Excluir"
						color="#FF0004"
						onPress={async () => {

							const hasDeleted = await this.props.deleteActivity(activityToEdit);
							if (hasDeleted) {
								this.props.navigation.goBack();
							}

						}}
					/>
				</View>
			)
		}
	}

	getColor(key) {
		const cat = this.props.categories;

		for (var i = 0; i < cat.length; i++) {
			if (cat[i].id === key) {
				return cat[i].color;
			}
		}
	}
	// onSelect = data => {

	// 	// this.setState(data)
	// 	this.props.setActivityField('categoryid',data)

	// }

	dataComboSet=()=>{
		if(this.props.categories){
			return([...this.props.comboData, { label: 'Adicionar Categoria', value: 'new' }])
		}else{
			return([{ label: 'Adicionar Categoria', value: 'new' }])
		}
	}

	render() {

		const { setActivityField, activityForm, saveActivity, navigation } = this.props;
		// if (this.props.categories === null) {
		// 	return <ActivityIndicator />
		// }
		return (

			// <ScrollView nestedS	crollEnabled={true} style={{ paddingTop: 10 }}>
			< ScrollView >

				<View style={styles.containerH}>
					<Input
						label='Titulo'
						labelStyle={{ color: 'black' }}
						value={activityForm.title}
						onChangeText={value => {
							setActivityField('title', value)
						}}
					/>
				</View>


				<View style={styles.containerH}>
					<Input
						labelStyle={{ color: 'black' }}
						label='Descrição'
						value={activityForm.description}
						onChangeText={value => {
							setActivityField('description', value)
						}}
					/>
				</View>
				<View style={styles.containerH}>
					<View style={styles.dataContainer}>
						<Text style={styles.label}>Inicio</Text>
						<DatePicker
							icon={false}
							placeholder="Selecione a data"
							// date={activityForm.startdate}
							date={activityForm.startdate ? moment(activityForm.startdate).format('DD/MM/YYYY HH:mm') : ''}
							onDateChange={value => {
								setActivityField('startdate', moment(value.toString(), 'DD/MM/YYYY HH:mm').toISOString())
							}}
							customStyles={dateStyle}
							style={styles.dataComponent}
							mode="datetime"
							format="DD/MM/YYYY HH:mm"
							is24Hour={true}
						/>
					</View>
					<View style={styles.dataContainer}>
						<Text style={styles.label}>Fim</Text>
						<DatePicker
							date={activityForm.enddate ? moment(activityForm.enddate).format('DD/MM/YYYY HH:mm') : ''}
							onDateChange={value => {
								setActivityField('enddate', moment(value.toString(), 'DD/MM/YYYY HH:mm').toISOString())
							}}
							placeholder="Selecione a data"
							customStyles={dateStyle}
							style={styles.dataComponent}
							mode="datetime"
							format="DD/MM/YYYY HH:mm"
							is24Hour={true}
						/>
					</View>
				</View>
				<View style={styles.containerH}>
					<View style={styles.categoria}>
						<Text style={styles.label}>Categoria</Text>
						<RNPickerSelect
							items={this.dataComboSet()}
							placeholder={{ label: 'Selecione', value: 'default' }}
							onValueChange={(value, index) => {

								
								if (value == 'new') {
									this.props.navigation.navigate('NewCategory')
								} else if(value !=='default'){
											
									setActivityField('categoryid', value)
									this.setState({
										colorSelected: this.getColor(value)
									})
								}
							}}
							style={{ fontSize: 17, placeholder: { color: 'black' } }}
							value={activityForm.categoryid}

						/>
					</View>
					<View style={[styles.colorBox, {
						backgroundColor: this.state.colorSelected,
						justifyContent: 'center',


					}]}>
						<Text style={{
							textAlignVertical: 'center', textAlign: 'center',
							textShadowColor: 'black',
							textShadowOffset: { width: -1, height: 1 },
							textShadowRadius: 10,
							color: 'white',
							// fontWeight:'bold',
							fontSize: 20
						}}>Cor</Text>
					</View>
				</View>

				<View style={styles.viewButtons}>
					<View style={styles.contButton}>
						<Button
							title='Salvar'
							color='#008B8B'
							onPress={async () => {

								if (activityForm.title == '' || activityForm.description == '') {
									Alert.alert('Aviso', 'Verifique se todos os campos estão preenchidos')
								} else if (activityForm.enddate == '' || activityForm.startdate == '') {
									Alert.alert('Aviso', 'Escolha a data');
								} else if (activityForm.categoryid == 'default' || activityForm.categoryid == '' || activityForm.categoryid == 'new') {
									Alert.alert('Aviso', 'Selecione uma categoria');
								} else {
									this.setState({ isLoading: true });
									try {
										await saveActivity(activityForm);
										navigation.goBack();
									} catch (error) {
										Alert.alert('Erro', error.message);
									} finally {
										this.setState({ isLoading: false });
									}
								}
							}}
						/>

					</View>
					{/* {this.renderDeleteButton()} */}

				</View>
			</ScrollView >


		);
	}
}

const styles = StyleSheet.create({
	vazio: {

	},
	viewButtons: {
		// flex: 1,
		// alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "row",
		// borderWidth: 1,
		// borderColor: 'red',
	},
	inputAndroid: {
		fontWeight: 'bold',
		borderRadius: 8,
		color: 'black',
		borderWidth: 0.5,
		borderColor: 'purple',
	},
	contButton: {
		width: '40%',
		margin: 10,
		// borderWidth: 1,
		// borderColor: 'red',
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
		backgroundColor: 'white',
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
		// flex: 1,
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
		// marginLeft: 5,
		// marginRight: 5,
		marginBottom: 5
	},
	dateInput: {
		flex: 1,
		height: 40,
		borderWidth: 0,
		borderBottomWidth: 1,
		// paddingLeft: 5,
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

const mapStateToProps = state => {
	const { listaCategorias } = state;


	if (listaCategorias === null) {
		return { categories: listaCategorias, activityForm: state.activityForm };
	}

	const keys = Object.keys(listaCategorias);
	const listaCategoriesWithId = keys.map(key => {
		return { ...listaCategorias[key], id: key }
	})
	const keys2 = Object.keys(listaCategoriesWithId);
	const itemsList = keys2.map(key => {
		return { ...listaCategoriesWithId[key], label: listaCategoriesWithId[key].title, value: listaCategoriesWithId[key].id }
	})

	return { categories: listaCategoriesWithId, activityForm: state.activityForm, comboData: itemsList }
}
const mapDispatchToProps = {
	setActivityField,
	saveActivity,
	setAllActivityFields,
	resetActivityForm,
	deleteActivity,
	loadCategories
}
export default connect(mapStateToProps, mapDispatchToProps)(NewActivity);