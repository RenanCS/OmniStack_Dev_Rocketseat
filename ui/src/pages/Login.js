import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
  
  state = { 
        username: ''
  };
  

  handleInputChange = e => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = e =>{
    e.preventDefault();
    
    const { username } = this.state;

    //Se não for nada informado, não continua
    if(!username.length) return;
    
    //Salva no navegador
    localStorage.setItem('@GoTwitter:username', username);

    //Redireciona para a página timeline
    this.props.history.push('/timeline');

  }


  render() {
    return (
      <div className="login-wrapper">

        <img src={twitterLogo} alt="GoTwitter" />
      
        <form onSubmit={this.handleSubmit}>
          <input 
          value={this.state.username} 
          onChange={this.handleInputChange}
          placeholder="Nome do usuário"></input>
          <button type="submit">Entrar</button>
        </form>

      </div>
    );
  }

  
}
