import React, { Component } from 'react';
import { View, StyleSheet, Picker, Text, Modal, Alert } from 'react-native';
//import Home from '../screens/Home'
import { Input, Button, } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalette from 'react-native-color-palette'
import Icon from 'react-native-vector-icons/FontAwesome';



class NewActivity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			datainicial: "",
			datafinal: "",
			categoria: "",
			selectedColor: "#C0392B",
			modalVisible: false
		};
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
		Alert.alert('Modal has been changed.');
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

	mostrarDatas = () => {
		console.log('-------');
		console.log(this.state.datainicial, this.state.datafinal)
		console.log('-------');
	}

	render() {
		return (
			<View style={styles.container}>
				{/* <View>
					<Modal>
						<ColorPalette
							//onChange={color => selectedColor = color}
							value={this.state.selectedColor}
							colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
							title={"Controlled Color Palette:"}
							icon={
								<Icon name={'check-circle-o'} size={25} color={'black'} />
								// React-Native-Vector-Icons Example
							}
						/>
					</Modal>
				</View> */}




				<Input
					//	style={styles.Input}
					inputStyle={{ marginLeft: 10 }}
					containerStyle={{
						borderBottomColor: 'black',
						marginRight: 10,
						marginLeft: 10,
						marginVertical: 5
					}}
					labelStyle={styles.labelStyle}
					label='Titulo'
				/>
				<Input
					//	style={styles.Input}
					inputStyle={{ marginLeft: 10 }}
					containerStyle={{
						borderBottomColor: 'black',
						marginRight: 10,
						marginLeft: 10,
						marginVertical: 5
					}}
					labelStyle={styles.labelStyle}
					//	containerStyle={{ marginVertical: 10 }}
					label='Descrição'
				/>

				<View style={styles.containerH}>

					<View style={styles.containerCombo}>
						<Text style={styles.Text}>Inicio</Text>
						<DatePicker
							style={{ width: 200 }}
							showIcon={false}
							date={this.state.datainicial}
							mode="datetime"
							placeholder="select date"
							format="DD/MM/YYYY hh:mm"
							//confirmBtnText="Confirm"
							//cancelBtnText="Cancel"
							onDateChange={this.changeDateInicial}
							is24Hour={true}
							style={styles.dataComponent}
						/>
					</View>

					<View style={styles.containerCombo}>
						<Text style={styles.Text}>Fim</Text>
						<DatePicker
							showIcon = {false}
							style={{width: 200}}
							date={this.state.datafinal}
							mode="datetime"
							placeholder="select date"
							format="DD/MM/YYYY hh:mm"
							//confirmBtnText="Confirm"
							//cancelBtnText="Cancel"
							is24Hour = {true}
							onDateChange={this.changeDateFinal}
							style={styles.dataComponent}
						/>	
					</View>



				</View>
				<View style={styles.containerH}>
					<View style={styles.containerCombo}>
						<Text style={styles.Text}>Categoria</Text>
						<Picker
							selectedValue={this.state.categoria}
							style={{ height: 50, width: 200 }}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({ categoria: itemValue })
							}>
							<Picker.Item label="Aula" value="aula" />
							<Picker.Item label="Estudo" value="estudo" />
							<Picker.Item label="Tarefas" value="estudo" />
						</Picker>
					</View>
					<View style={styles.containerCombo}>

						<Input
							//	style={styles.Input}
							//	inputStyle={{ marginLeft: 10 }}
							containerStyle={{
								borderBottomColor: 'black',
								//marginRight:10,
								//	marginLeft:10,
								//	marginVertical: 5 
							}}
							labelStyle={styles.labelStyle}

							//	containerStyle={{ marginVertical: 10 }}
							label='cor a Definir'
						// onChangeText ={() => {
						// 	this.setModalVisible(true);
						// }}
						/>
					</View>
				</View>

				<View style={styles.ButtonNovoView}>
					<Button
						buttonStyle={styles.loginButton}
						titleStyle={styles.loginTextButton}
						title="Salvar"
						containerStyle={{ marginTop: 5, flex: 0, }}
						// onPress={()=>this.mostrarDatas()}
						// onPress={(parameters) => this.props.navigation.navigate('Home', parameters)}
					/>


				</View>



			</View>


		);
	}
}

const styles = StyleSheet.create({
	dataComponent: {

		flex: 1,
		paddingTop: 10,

	},
	ButtonNovoView: {
		//justifyContent: 'center',
		alignItems: 'center',
		flex: 3

	},
	Text: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16,
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
	container: {
		flex: 1,
		paddingTop: 15,

	},
	containerH: {
		flex: 1,
		//height: 100,
		flexDirection: 'row',
		paddingTop: 10,
		marginRight: 10,
		marginLeft: 10,
		//borderWidth: 1,
		//borderColor: 'black',

	},
	labelStyle: {
		marginLeft: 10,
		color: 'black',
	},
	containerCombo: {
		flex: 1,

		paddingLeft: 20,

	},


});

export default NewActivity;