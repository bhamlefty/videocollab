
import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer } from './api';
import {video} from "./Video/video.mp4"
import { Socket } from 'dgram';
import io from 'socket.io-client'
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');
// const  socket = "/"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playTime: 10,
      playMode: "sync",
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
  componentDidMount(){
    this.initSocket()
  }

initSocket=()=>{
    const socket=io(socket)
    socket.on('connect', ()=>{
      console.log("adfasdf")
    })
    
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
      let vid = document.getElementById("myVideo"); 
      vid.ontimeupdate = function() {
        document.getElementById("demo").innerHTML = vid.currentTime;
        //console.log(vid.currentTime)
      };
      this.setState({
        playState: "Play",
        playTime: vid.currentTime
      }, ()=> {
        // alert(this.state.playTime)
        socket.emit('subscribeToTimer', "Play", this.state.playTime)
       })
      // socket.emit('subscribeToTimer', "Play", this.state.playTime) 
  }

  pauseVid=()=>{
    let vid = document.getElementById("myVideo"); 
    
    vid.ontimeupdate = function() {
      document.getElementById("demo").innerHTML = vid.currentTime;
      console.log(vid.currentTime)
    };
    this.setState({
      playState: "Pause",
      playTime: vid.currentTime
    }, ()=> {
      // alert(this.state.playTime)
      socket.emit('subscribeToTimer', "Pause", this.state.playTime)
     })
  }


playAsync=()=>{
      
    let vid = document.getElementById("myVideo"); 
    this.setState({
      playState: "Play",
    })
    vid.ontimeupdate = function() {
      document.getElementById("demo").innerHTML = vid.currentTime;
      vid.play()
    };
}

pauseAsync=()=>{

  let vid = document.getElementById("myVideo"); 
  vid.ontimeupdate = function() {
    document.getElementById("demo").innerHTML = vid.currentTime;
    vid.pause()
  };
  this.setState({
    playState: "Pause",
    curPlayTime: vid.currentTime,
})
}

  updatePlayhead=()=>{
      let that = this
      let vid = document.getElementById("myVideo");
      if(this.state.playState==="Pause" && this.state.playMode==="sync" && this.state.curPlayTime !== vid.currentTime){  
          console.log("update", vid.currentTime);
          that.setState({
            playTime: vid.currentTime
          }, ()=> {
            console.log("madeit", this.state.playTime)
            socket.emit('subscribeToTimer', "Pause", that.state.playTime)
           })
        };
  }



  render() {
    return (
      <div className="videoSycnWrapper">
         <h1>High framerate video collaboration prototype</h1>
         <div className="videoWrapper">
          <video id="myVideo" height="300px" onTimeUpdate={this.updatePlayhead} src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" seeking="true"controls preload></video>
         </div>
       
        Play State: {this.state.playState}
        
        <button onClick={this.playVid}>Sync Play</button>
        <button onClick={this.pauseVid}>Sycn Pause</button>
        <button onClick={this.playAsync}>Async Play</button>
        <button onClick={this.pauseAsync}>Async Pause</button>
        <p>Client Video Timecode: <span id="demo"></span></p>
        From sever PlayState: {this.state.playState}
        From sever curPlayTime: {this.state.curPlayTime}
      </div>
    );
  }
}


export default App;