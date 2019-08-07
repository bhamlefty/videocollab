import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer, timer } from './api';
import {video} from "./Video/video.mp4"
import { Socket } from 'dgram';
import Switch from "react-switch";
import io from 'socket.io-client'
import openSocket from 'socket.io-client';
const uuidv1 = require('uuid/v1');

// const  socket = openSocket('http://localhost:8000');
const  socket = openSocket('https://shielded-sea-84002.herokuapp.com');
// const  socket = "/"
let aggregateLatency=0; 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playTime: 10,
      playMode: "sync",
      latencyObj: {},
      curPlayTime: 0,
      latencyDelay: 0,
      checked: true,
      videosrc: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    };
    timer((time) => 
    this.setState({ 
      timer: time,
    }));
    this.handleLatencyChange = this.handleLatencyChange.bind(this);
    subscribeToTimer((playState) => 
    this.setState({ 
      playState: playState.curPlayState,
      curPlayTime: playState.curPlayTime,
      latencyObj: playState.latencyObj
    }));
  }

  componentWillMount(){
    this.setState({uuid: uuidv1()})
    // socket.emit('subscribeToTimer', "sdfasdf", this.state.curPlayTime)
    this.initSocket()
    
    setInterval(() => {
      this.getClientLatency()
    }, 2000);
  }

  initSocket=()=>{
    const socket = io(socket)
    socket.on('connect', () => {
      console.log('connected')
      // socket.emit('subscribeToTimer', "Play", this.state.playTime)
      setInterval(() => {
        socket.emit('timer', new Date().getTime(), this.state.uuid)
        
      }, 2000);
    })
  }

  


  componentDidUpdate() {
   
    let vid = document.getElementById("myVideo");
    if(this.state.playState==="Play"){
      if(this.state.checked){
        setTimeout(()=>{
          vid.play();
        },aggregateLatency)
      }else{
        vid.play();
      }
        
    }else{
      vid.pause()
    }
    vid.currentTime=this.state.curPlayTime
  }

  handleLatencyChange(checked) {
    this.setState({ checked });
  }

getClientLatency=()=>{
    let latencyValues={}
    let uid= this.state.uuid
    let latencyObj= this.state.latencyObj
    if(latencyObj !== {}){
      latencyValues=Object.values(latencyObj)
      let highestLatency=Math.max(...latencyValues)
      console.log(latencyValues)
      // console.log(highestLatency)
      aggregateLatency= highestLatency-latencyObj[uid]
      //if(aggregateLatency<2){
        //console.log("aggregatedLatency", aggregateLatency)
      // this.setState({latencyDelay: aggregateLatency})
      //}
      
    }
  }

  playVid=()=>{
     
      //console.log("called")
      //this.setState({playState: "Play"})
      let vid = document.getElementById("myVideo"); 
      vid.ontimeupdate = function() {
        document.getElementById("demo").innerHTML = vid.currentTime;
        //console.log(vid.currentTime)
      };
      
        console.log("Dynamic Latency Adjustment: ", aggregateLatency)
      
          this.setState({
            playState: "Play",
            playTime: vid.currentTime
          }, ()=> { 
            // alert(this.state.playTime)
            socket.emit('subscribeToTimer', "Play", this.state.playTime)
          })

        
        
     
      

      
  }

  pauseVid=()=>{
    let vid = document.getElementById("myVideo"); 
    
    vid.ontimeupdate = function() {
      document.getElementById("demo").innerHTML = vid.currentTime;
      //console.log(vid.currentTime)
    };
    this.setState({
      playState: "Pause",
      playTime: vid.currentTime
    }, ()=> {
      this.getClientLatency()
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
         <h1>Synchronized Video Viewing</h1>
         <div className="videoWrapper">
          <video id="myVideo" height="300px" onTimeUpdate={this.updatePlayhead} src={this.state.videosrc} seeking="true"controls preload="auto"></video>
         </div>
       
        Play State: {this.state.playState}
        <button onClick={this.playVid}>Sync Play</button>
        <button id="SyncPause" onClick={this.pauseVid}>Sync Pause</button>
        <button onClick={this.playAsync}>Async Play</button>
        <button onClick={this.pauseAsync}>Async Pause</button>

        <p>Client Video Timecode: <span id="demo"></span></p>
        From sever PlayState: {this.state.playState}
        From sever curPlayTime: {this.state.curPlayTime}
        <Switch onChange={this.handleLatencyChange} checked={this.state.checked} />
        Timer: {this.state.time}
        UUID: {this.state.uuid}
        Aggregated Latency: {this.state.latencyDelay}
        {/* latencyTest: {this.state.latencyTest} */}
      </div>
    );
  }
}


export default App;
