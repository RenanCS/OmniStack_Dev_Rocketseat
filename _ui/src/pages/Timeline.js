import React, { Component } from 'react';
import socket from 'socket.io-client';
import api from '../services/api';

import twitterLogo from '../twitter.svg';
import './Timeline.css';

import Tweet from '../components/Tweet';

export default class pages extends Component {
  
  state = {
    tweets: [],
    newTweet:'',
  }


  async componentDidMount(){
    this.subscribeToEvents();
    
    const response = await api.get('tweets');
    
    this.setState({tweets:response.data});
  }

  subscribeToEvents = () =>{
    const io = socket('http://localhost:3000');

    io.on('tweet', data => {
      this.setState({ tweets : [data, ...this.state.tweets]  })
    });

    io.on('like', data => {
      this.setState({ tweets : this.state.tweets.map(tweet => 
          tweet._id === data._id ? data: tweet
      )})
    });
  }

  handleInputChange = e =>{
    this.setState( { newTweet: e.target.value } );
  }

  handleNewTweet = async e =>{
    //Valida tecla digitada
    if(e.keyCode !== 13) return;
    //Busca o tweet atual
    const content = this.state.newTweet;
    //Busca o usuário logado
    const author  = localStorage.getItem('@GoTwitter:username');
    //Salva dados na api
    await api.post('tweets',{content,author});
    //Limpa variável
    this.setState({newTweet:''});
  }
  
  render() {
    return(
      <div className="timeline-wrapper">

        <img height={24} src={twitterLogo} alt="GoTwitter"></img>
      
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange} 
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?">
          </textarea>
        </form>

        {
          this.state.tweets.map(tweet =>( 
            <Tweet key={tweet._id} tweet={tweet} />  
            ))
        }
      </div>
    );
  }
}
