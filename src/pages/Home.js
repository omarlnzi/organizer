import React from 'react';
import { Button, View, StyleSheet} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import FloatButton  from "../components/FloatButton";



export default class Home extends React.Component{
  constructor(){
    super()
  	    this.data = [
        {time: '08:00', title: 'Estudar para Prova', description: 'Calculo '},
        {time: '10:30', title: 'Mercado', description: 'Comprar: Café, Energético'},
        {time: '19:30', title: 'IF68X - A040', description: 'Aula de Jogos digitais',lineColor: 'green', circleColor: 'green'},
				{time: '21:20', title: 'AS35A - I201', description: 'Aula Programação Móvel',lineColor: 'green', circleColor: 'green'},
				{time: '', title: 'Dia 26/09', lineColor: 'red', circleColor: 'red'},
				{time: '08:00', title: 'Estudar para Prova', description: 'Calculo '},
        {time: '10:30', title: 'Mercado', description: 'Comprar: Café, Energético'},
        {time: '19:30', title: 'IF68X - A040', description: 'Aula de Jogos digitais',lineColor: 'green', circleColor: 'green'},
				{time: '21:20', title: 'AS35A - I201', description: 'Aula Programação Móvel',lineColor: 'green', circleColor: 'green'},
				{time: '', title: 'Dia 26/09', lineColor: 'red', circleColor: 'red'},
    ]
  } 


  render(){
		return(
			<View style={styles.container}>
        <Timeline 
          style={styles.list}
					data={this.data}
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
					onPress={ (parameters)=> this.props.navigation.navigate('NewActivity', parameters)}
				/>
				
      </View>		
		);
	}  
}

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
	
		backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
	},
});