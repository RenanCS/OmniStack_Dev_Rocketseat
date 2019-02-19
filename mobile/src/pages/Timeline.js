import React, { Component } from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Socket from 'socket.io-client';
import Api from '../services/api';
import Tweet from '../components/Tweet';

export default class Timeline extends Component {

  static navigationOptions = ({ navigation } ) => ({
    title: "Início",
    headerRight:(
      <TouchableOpacity onPress= {() => navigation.navigate('New')}>
        
        <Icon style={{marginRight:10}} 
        name="add-circle-outline"
        size={24}
        color="#4BB0EE"
        ></Icon>
      
      </TouchableOpacity>
    ),
  });

  state = {
    tweets: []
  };


  async componentDidMount(){
    this.subscribeToEvents();
    
    const response = await Api.get('tweets');

    this.setState({tweets: response.data});
  }

  subscribeToEvents = () =>{
    const io = Socket('http://192.168.0.2:3000');

    io.on('tweet', data => {
      this.setState({ tweets : [data, ...this.state.tweets]  })
    });

    io.on('like', data => {
      this.setState({ tweets : this.state.tweets.map(tweet => 
          tweet._id === data._id ? data: tweet
      )})
    });
  }

  

  render() {
    return (
    <View  style={styles.container}>
      <FlatList
      data={this.state.tweets}
      keyExtractor={tweet => tweet._id}
      renderItem={({ item }) => <Tweet tweet={item}></Tweet>}
      ></FlatList>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    }
  });