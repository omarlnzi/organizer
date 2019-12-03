import React from 'react';
import { Button, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import FloatButton from "../components/FloatButton";
import { connect } from 'react-redux';
import { loadActivities, loadCategories } from '../actions';
import moment from 'moment'
import { FAB, Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';


class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			open: false,
		},
			this.data = [
				{ id: '3', datetime: '12/12/2009 12:11', time: '08:00', title: 'Estudar para Prova', description: 'Calculo ' },
				{ time: '10:30', title: 'Mercado', description: 'Comprar: Café, Energético' },
				{ time: '19:30', title: 'IF68X - A040', description: 'Aula de Jogos digitais', lineColor: 'green', circleColor: 'green' },
				{ time: '21:20', title: 'AS35A - I201', description: 'Aula Programação Móvel', lineColor: 'green', circleColor: 'green' },
				{ time: '', title: 'Dia 26/09', lineColor: 'red', circleColor: 'red' },
				{ time: '08:00', title: 'Estudar para Prova', description: 'Calculo ' },
				{ time: '10:30', title: 'Mercado', description: 'Comprar: Café, Energético' },
				{ time: '19:30', title: 'IF68X - A040', description: 'Aula de Jogos digitais', lineColor: 'green', circleColor: 'green' },
				{ time: '21:20', title: 'AS35A - I201', description: 'Aula Programação Móvel', lineColor: 'green', circleColor: 'green' },
				{ time: '', title: 'Dia 26/09', lineColor: 'red', circleColor: 'red' },
			]
	}

	componentDidMount() {
		this.props.loadActivities();
		this.props.loadCategories();

	}
	getColor(key) {
		const cat = this.props.categories;

		for (var i = 0; i < cat.length; i++) {
			if (cat[i].id === key) {
				return cat[i].color;
			}
		}
	}
	createData() {

		if (this.props.categories && this.props.activities) {

			const activities = [...this.props.activities]
			const keys = Object.keys(activities);
			const agoravai = keys.map(key => {
				var color = this.getColor(activities[key].categoryid)
				var time = moment(activities[key].startdate).format('HH:mm')
				return { ...activities[key], circleColor: color, lineColor: color, time: time, activity: { ...activities[key] } }
			})

			var intermediario = [];
			if (typeof agoravai !== 'undefined' && agoravai.length > 0) {
				var currentdata = moment(agoravai[0].startdate)
				var i = 0;
				do {
					var { title, lineColor, circleColor, time, description, activity } = agoravai[i];

					if (!(moment(currentdata).isSame(activity.startdate, 'day')) || i == 0) {
						var date = moment(activity.startdate).format('LL')
						intermediario.push({ time: '', title: date, lineColor: 'black', circleColor: 'black', id: '-1' })
						currentdata = activity.startdate
					}
					intermediario.push({ activity, description, title, time, lineColor, circleColor });
					i++;
				} while (i < agoravai.length)

			}
			return intermediario
		}
	}

	render() {
		// const { activity } = this.props.navigation.state.params;

		if (!(this.props.activities)) {
			return (
				<Provider>
					<Portal  >
						<FAB.Group
							open={this.state.open}
							icon={this.state.open ? 'close' : 'plus'}
							actions={[
								{ icon: 'tag', label: 'Categorias', onPress: () => this.props.navigation.navigate('Category') },
								{ icon: 'calendar', label: 'Atividades', onPress: () => this.props.navigation.navigate('NewActivity') },
							]}
							onStateChange={({ open }) => this.setState({ open })}
							onPress={() => {
								if (this.state.open) {
									// do something if the speed dial is open
								}
							}}
						/>
					</Portal>
				</Provider>
			)
		}
		return (

			<Provider>
				<Portal>
					<View style={styles.container}>
						<Timeline
							timeStyle={styles.time}
							timeContainerStyle={{ minWidth: 40 }}
							separatorStyle={{ marginBottom: 0 }}
							data={this.createData()}
							circleSize={20}
							renderFullLine={true}
							onEventPress={(event) => {

								// Alert.alert('clik')
								if (event.id !== '-1') {
									console.log(event.activity)
									this.props.navigation.navigate('NewActivity', { activityToEdit: event.activity });
								}

							}}
							separator={true}
						/>


						<FAB.Group
							open={this.state.open}
							icon={this.state.open ? 'close' : 'plus'}
							actions={[
								{ icon: 'tag', label: 'Categorias', onPress: () => this.props.navigation.navigate('Category') },
								{ icon: 'calendar', label: 'Atividades', onPress: () => this.props.navigation.navigate('NewActivity') },
							]}
							onStateChange={({ open }) => this.setState({ open })}
							onPress={() => {
								if (this.state.open) {
									// do something if the speed dial is open
								}
							}}
						/>
					</View>
				</Portal>
			</Provider>
		);
	}
}


const mapStateToProps = state => {
	const { listaAtividades } = state;
	const { listaCategorias } = state;

	if (listaAtividades === null) {
		return { activities: listaAtividades };
	}
	if (listaCategorias === null) {
		return { categories: listaCategorias };
	}
	const keys2 = Object.keys(listaCategorias);
	const listaCategoriasWithId = keys2.map(key => {
		return { ...listaCategorias[key], id: key }
	})

	// const timelineData = this.createData();
	return { activities: listaAtividades, categories: listaCategoriasWithId }
}

export default connect(mapStateToProps, { loadActivities, loadCategories })(Home);

const styles = StyleSheet.create({
	time: {
		textAlign: 'center',
		// backgroundColor:'#ff9797', 
		// color:'white', 
		fontWeight: 'bold',
		fontSize: 15,
		// padding:5, 
		// borderRadius:13, 
		// paddingTop: 10,
		overflow: 'hidden'
	},
	ButtonNovoView: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	NovoTextButton: {
		fontSize: 30,
		color: 'black',
		fontWeight: 'bold',
	},
	NovoButton: {

		backgroundColor: '#008B8B',
		borderRadius: 10,
		height: 50,
		width: 200,
	},
	container: {
		flex: 1,
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 10,
		backgroundColor: 'white'
	},
	list: {
		flex: 1,
		marginTop: 20,
	},
});


// Datepicker.js  Warning componentWillReceiveProps
//
// componentDidUpdate(prevProps) { 
// 	if (prevProps.date !== this.props.date) {
// 		this.setState({date: this.getDate(this.props.date)});
// 	}
// }
