import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './routes';

YellowBox.ignoreWarnings(['Unrecognized Websocket']);

const App = () => <Routes />;

export default App;
