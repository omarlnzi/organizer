import React from "react";
import Router from "./Router";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'

import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from './reducers'
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: TimePickerAndroid', 'Warning: DatePickerAndroid', 'Setting a timer']);

const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(reduxThunk)
));

const OrganizerApp = prop => (
	<Provider store={store}>
		<Router />
	</Provider>
)

export default OrganizerApp;