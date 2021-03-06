import React, { Component } from 'react';
import { AsyncStorage, Text, KeyboardAvoidingView, TextInput, TouchableOpacity,  View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {

    state = {
        username:'' 
    }

    async componentDidMount(){
        const {username} = await AsyncStorage.getItem('@OmniStack:username');

        if(username.length) {
            this.props.navigation.navigate('App');
        }
    } 


    handleInputChange = (username) =>{
        this.setState({username});
    };

    handleLogin = async () =>{
        const {username} = this.state;

        if(!username.length) return;

        await AsyncStorage.setItem('@OmniStack:username',username);

        this.props.navigation.navigate('App');
    };


  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <View style={styles.content}>
                
                <View>
                    <Icon name='twitter' size={64} color='#4BB0EE' />
                </View>
                
                <TextInput style={ styles.input} 
                placeholder={"Nome do usuário"}
                onChangeText={this.handleInputChange}
                value={this.state.username}
                onSubmitEditing={this.handleLogin}
                returnKeyType="send"/>

                <TouchableOpacity onPress={this.handleLogin}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Entrar</Text>

                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    },
  
    input: {
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 30
    },
  
    button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 10,
      backgroundColor: "#4BB0EE",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    }
  });
