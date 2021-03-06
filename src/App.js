import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer, timer, changeVid } from './api';
import {video} from "./Video/video.mp4"
import { Socket } from 'dgram';
import Switch from "react-switch";
import io from 'socket.io-client'
import openSocket from 'socket.io-client';
const uuidv1 = require('uuid/v1');
let numClients=1;
// const  socket = openSocket('http://localhost:8000');
const  socket = openSocket('https://syncprototype.herokuapp.com/');
// const  socket = "/"
let aggregateLatency=0; 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playTime: 10,
      syncMode: true,
      playState: "Pause",
      latencyObj: {},
      curPlayTime: 0,
      latencyDelay: 0,
      enterViewing: false,
      curPass: "",
      pass: "BOD4945",
      checked: false,
      videosrc: "https://firebasestorage.googleapis.com/v0/b/elevaetbackend.appspot.com/o/Test%2FTeams_Calling_BOD_V7.mp4?alt=media&token=6128a443-ca9b-49e6-a2b1-3bdbbc0b75db"
    };
    timer((time) => 
    this.setState({ 
      timer: time,
    }));

    changeVid((src) => 
    this.setState({ 
      videosrc: src.videosrc,
    }));

    this.handleLatencyChange = this.handleLatencyChange.bind(this);
    this.toggleSyncMode = this.toggleSyncMode.bind(this);
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



  updatePass=(event)=>{
    if(event.target.value===this.state.pass){
      this.setState({ 
        enterViewing: true
       });
    }
  }

  updateVidSRC=(src)=>{
    this.setState({videosrc: src})
    socket.emit('changeVid', src)
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

  toggleSyncMode() {
    console.log("toggleSyncMode")
    this.setState({ 
      syncMode: !this.state.syncMode
     });
  }

  enterViewing=()=>{
    if(this.state.curPass===this.state.pass){
      this.setState({ 
        enterViewing: true
       });
    }
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
      this.getClientLatency()
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
      if(this.state.playState==="Pause" && this.state.syncMode && this.state.curPlayTime !== vid.currentTime){  
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
          {this.state.enterViewing === false ?
          <div className="bg">
             <input className="enterPass" type="password" placeholder="Enter Password" onChange={this.updatePass}></input>
            {/* <button className="enter" onClick={this.enterViewing}>Join</button> */}
          </div>:<span> </span>
          }
         <h1>Synchronized Video Viewing</h1>
         <div>
           Active Viewers: {numClients}
        </div>
         <div className="videoWrapper">
          <video id="myVideo" height="300px" onTimeUpdate={this.updatePlayhead} src={this.state.videosrc} seeking="true" controls preload="auto"></video>
         </div>
        
         {this.state.syncMode === true ? 
         <div>
           {this.state.playState==="Pause" ?
            <button className="player-controls-btns" onClick={this.playVid}>Play</button>: <button className="player-controls-btns" id="SyncPause" onClick={this.pauseVid}>Pause</button>
          }
         </div>:<span></span>
        }

        {this.state.syncMode === false ? 
        <div>
          {this.state.playState==="Pause" ?
          <button className="player-controls-btns" onClick={this.playAsync}>Play</button>:<button className="player-controls-btns" onClick={this.pauseAsync}>Pause</button>
          }
        </div>:<span></span>
        }
         <div className="videoContainer">
            <button onClick={()=>{this.updateVidSRC("https://firebasestorage.googleapis.com/v0/b/elevaetbackend.appspot.com/o/Test%2FTeams_Calling_BOD_V9_Subtitles.mp4?alt=media&token=fc32c4ab-6c8f-4635-902b-691574d65665")}}>Calling</button>
            <button onClick={()=>{this.updateVidSRC("https://firebasestorage.googleapis.com/v0/b/elevaetbackend.appspot.com/o/Test%2FTeams_Meetings_BOD_V9_Subtitles.mp4?alt=media&token=b28e878c-4b56-442f-bff9-7671616a8cf8")}}>Meetings</button>
            <button onClick={()=>{this.updateVidSRC("https://firebasestorage.googleapis.com/v0/b/elevaetbackend.appspot.com/o/Test%2FTFL_Subtitles_030620_v1.mp4?alt=media&token=f8e36624-bbd1-46a4-b492-08f3e26c644a")}}>TFL</button>
            <button onClick={()=>{this.updateVidSRC("https://firebasestorage.googleapis.com/v0/b/elevaetbackend.appspot.com/o/Test%2FBOD_Devices_V14HQ_Captions.mp4?alt=media&token=683b4fd0-fc90-4365-bc10-21c0ec0d5d19")}}>Devices</button>
         </div>
        <span>
          Synchronize Playback:
        </span>
        <Switch onChange={this.toggleSyncMode} checked={this.state.syncMode} onColor="#6264a7" checkedIcon/>
{/* <Switch onChange={this.toggleSyncMode} checked={this.state.toggleSyncMode} /> */}

  
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
          Latency Sync Adjustment: {aggregateLatency}
        </div>

   
        
        {/* latencyTest: {this.state.latencyTest} */}
      </div>
    );
  }
}


export default App;
