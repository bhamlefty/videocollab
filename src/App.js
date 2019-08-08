import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer, timer } from './api';
import {video} from "./Video/video.mp4"
import { Socket } from 'dgram';
import Switch from "react-switch";
import io from 'socket.io-client'
import openSocket from 'socket.io-client';
const uuidv1 = require('uuid/v1');
let numClients=1;
// const  socket = openSocket('http://localhost:8000');
const  socket = openSocket('https://limitless-lake-54723.herokuapp.com');
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
      checked: false,
      videosrc: "https://firebasestorage.googleapis.com/v0/b/elevaetbackend.appspot.com/o/Test%2FMSF19087_Workplace_Vertilcals_YIR_v05.mp4?alt=media&token=5d72233a-ca4f-41d2-a692-118f845ae743"
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
      // setInterval(() => {
      //   socket.emit('timer', new Date().getTime(), this.state.uuid)
      // }, 2000);
    })
  }

  


  componentDidUpdate() {
   
    let vid = document.getElementById("myVideo");
    if(this.state.playState==="Play"){
      socket.emit('timer', new Date().getTime(), this.state.uuid)
      if(this.state.checked){
        setTimeout(()=>{
          vid.play();
        },aggregateLatency)
      }else{
        vid.play();
      }
        
    }else{
      socket.emit('timer', new Date().getTime(), this.state.uuid)
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
      numClients=latencyValues.length
      let highestLatency=Math.max(...latencyValues)
      
      console.log(latencyValues)
      // console.log(highestLatency)

      if(latencyObj[uid]>0){
        aggregateLatency= highestLatency-latencyObj[uid]
      }else{
        aggregateLatency= 0
      }
      
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
            console.log("madeit", that.state.playTime)
            socket.emit('subscribeToTimer', "Pause", that.state.playTime)
           })
        };
  }



  render() {
    return (
      <div className="videoSycnWrapper">
         <h1>Synchronized Video Viewing</h1>
         <div className="block">
           Currently Viewing: {numClients}
        </div>
         <div className="videoWrapper">
          <video id="myVideo" height="300px" onTimeUpdate={this.updatePlayhead} src={this.state.videosrc} seeking="true"controls preload="auto"></video>
         </div>
         
         {this.state.playState==="Pause" ? 
         <button onClick={this.playVid}>Sync Play</button>: <button id="SyncPause" onClick={this.pauseVid}>Sync Pause</button>
        }
        
        <button onClick={this.playAsync}>Async Play</button>
        <button onClick={this.pauseAsync}>Async Pause</button>
  
        <p>Client Video Timecode: <span id="demo"></span></p>

        <div className="block">
        Server Timecode: {this.state.curPlayTime}
        </div>
        <div className="block">
        Server Playstate: {this.state.playState}
        </div>

        <div className="block">
           Client UUID: {this.state.uuid}
        </div>

        <div className="block" >
          Dynamic Latency Control (WIP) <Switch onChange={this.handleLatencyChange} checked={this.state.checked} />
        </div>
        
        <div className="block">
          Aggregated Latency: {aggregateLatency}
        </div>

   
        
        {/* latencyTest: {this.state.latencyTest} */}
      </div>
    );
  }
}


export default App;
