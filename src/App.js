
import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer } from './api';
import {video} from "./Video/video.mp4"
import { Socket } from 'dgram';
import io from 'socket.io-client'
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playTime: 0,
      message: "",
      playFunc: "test",
      curPlayTime: 0,
      videosrc: "https://www.youtube.com/watch?v=Raf9bVk75s8"
    };
    subscribeToTimer((playState) => 
    
    this.setState({ 
      playState: playState.curPlayState,
      curPlayTime: playState.curPlayTime
    }));
  }


  componentDidUpdate() {
    if(this.state.playState==="Play"){
      let vid = document.getElementById("myVideo"); 
      vid.play()
    }else{
      let vid = document.getElementById("myVideo"); 
      vid.pause()
    }
    let vid = document.getElementById("myVideo"); 
    vid.currentTime=this.state.curPlayTime
  }


  playVid=()=>{
      this.setState({playState: "Play"})
      socket.emit('subscribeToTimer', "Play", this.state.playTime) 
  }

  pauseVid=()=>{
    let vid = document.getElementById("myVideo"); 
    
    vid.ontimeupdate = function() {
      document.getElementById("demo").innerHTML = vid.currentTime;
    };
    this.setState({
      playState: "Pause",
      playTime: vid.currentTime
    }, ()=> {
      // alert(this.state.playTime)
      socket.emit('subscribeToTimer', "Pause", this.state.playTime)
     })
      
  }



  render() {
    return (
      <div>
         <h1>High framerate video collaboartion prototype</h1>
        <video id="myVideo" height="300px" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"></video>

        Play State: {this.state.playState}
        
        <button onClick={this.playVid}>Play</button>
        <button onClick={this.pauseVid}>Pause</button>
        <p>Client Video Timecode: <span id="demo"></span></p>
        From sever PlayState: {this.state.playState}
        From sever PlayTime: {this.state.curPlayTime}
      </div>
    );
  }
}


export default App;