import React from 'react';
import { Button, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import FloatButton from "../components/FloatButton";
import { connect } from 'react-redux';
import { loadActivities, loadCategories } from '../actions';
import moment from 'moment'


class Home extends React.Component {
	constructor() {
		super()
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
		console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
		if (this.props.categories && this.props.activities) {
			[]
			const activities = [...this.props.activities]
			const categories = [...this.props.categories]
			// console.log('---------------------',activities,categories )
			
			const keys = Object.keys(activities);
			const agoravai = keys.map(key => {
				var color = this.getColor(activities[key].categoryid)
				var time = moment(activities[key].startdate).format('HH:mm')

				return { ...activities[key], circleColor: color, lineColor: color, time: time }
			})
			var currentdata = moment(agoravai[0].startdate)
			console.log(moment(currentdata).format('DD/MM/YYYY'))
			var intermediario = [];
			intermediario.push({time: '', title: moment(currentdata).format('DD/MM/YYYY'), lineColor: 'red', circleColor: 'red', id:'0' })
			for (var i = 0; i <agoravai.length; i++) {	
				var t = moment(agoravai).format('HH:mm');
				var {title, lineColor, circleColor, time, description} = agoravai[i];
				if (moment(currentdata).isSame(agoravai[i].startdate, 'day')) {

					intermediario.push({description,time, title, lineColor, circleColor});
				
				} else {
					date=moment(agoravai[i].startdate).format('DD/MM/YYYY')
					intermediario.push({time, title: date, lineColor: 'red', circleColor: 'red'})
					intermediario.push({description,time, title, lineColor, circleColor});
					currentdata=agoravai[i].startdate
				}
			}



			console.log('intermediario: ',intermediario)
			console.log('agiravai: ',agoravai)
			// const newData =[...activities[k],{color: getColor(activities[k].categoryid)}]; 

			return intermediario
		}
	}
	render() {
		// const { activity } = this.props.navigation.state.params;

		if (!(this.props.activities)) {
			return (<FloatButton
				onPress={() => this.props.navigation.navigate('NewActivity')}
			/>)
		}

		return (
			<View style={styles.container}>
				<Timeline
					style={styles.list}
					data={this.createData()}
					onEventPress={(event) => {

						// console.log(event);
						// console.log(this.props.timelineData)
						// Alert.alert('clik')
						// this.props.navigation.navigate('NewActivity', { activityToEdit: activity });
					}}
					separator={true}


				/>
				<View>
					{/* <Button
					
						title="NOVO"
						containerStyle={{ marginTop: 32, flex: 0,  }}
						buttonStyle={styles.NovoButton}
						titleStyle={styles.NovoTextButton}
						onPress={(parameters)=> this.props.navigation.navigate('Novo', parameters)}
					/> */}


				</View>
				<FloatButton
					onPress={() => this.props.navigation.navigate('NewActivity')}
				/>

			</View>
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


	const keys = Object.keys(listaAtividades);
	const listaActivitiesWithId = keys.map(key => {
		return { ...listaAtividades[key], id: key }
	})
	const keys2 = Object.keys(listaCategorias);
	const listaCategoriasWithId = keys2.map(key => {
		return { ...listaCategorias[key], id: key }
	})

	return { activities: listaActivitiesWithId, categories: listaCategoriasWithId }
}

export default connect(mapStateToProps, { loadActivities, loadCategories })(Home);

const styles = StyleSheet.create({
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

		backgroundColor: 'white'
	},
	list: {
		flex: 1,
		marginTop: 20,
	},
});