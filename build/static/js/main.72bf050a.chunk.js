(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,t,a){e.exports=a(71)},41:function(e,t,a){},42:function(e,t,a){},66:function(e,t){},69:function(e,t,a){e.exports=a.p+"static/media/video.b220a35d.mp4"},71:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(30),c=a.n(o),r=(a(41),a(31)),l=a(32),m=a(34),u=a(33),s=a(7),d=a(35),y=(a(42),a(2)),p=a.n(y),T=p()("https://shielded-sea-84002.herokuapp.com");a(69),a(70);var h=p()("https://shielded-sea-84002.herokuapp.com"),f=function(e){function t(e){var a,n;return Object(r.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).playVid=function(){console.log("called"),a.setState({playState:"Play"});var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime},a.setState({playState:"Play",playTime:e.currentTime},function(){h.emit("subscribeToTimer","Play",a.state.playTime)})},a.pauseVid=function(){var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime,console.log(e.currentTime)},a.setState({playState:"Pause",playTime:e.currentTime},function(){h.emit("subscribeToTimer","Pause",a.state.playTime)})},a.playAsync=function(){var e=document.getElementById("myVideo");a.setState({playState:"Play"}),e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime,e.play()}},a.pauseAsync=function(){var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime,e.pause()},a.setState({playState:"Pause",curPlayTime:e.currentTime})},a.updatePlayhead=function(){var e=Object(s.a)(a),t=document.getElementById("myVideo");"Pause"===a.state.playState&&"sync"===a.state.playMode&&a.state.curPlayTime!==t.currentTime&&(console.log("update",t.currentTime),e.setState({playTime:t.currentTime},function(){console.log("madeit",a.state.playTime),h.emit("subscribeToTimer","Pause",e.state.playTime)}))},a.state={playTime:10,playMode:"sync",message:"",playFunc:"test",curPlayTime:0,videosrc:"https://www.youtube.com/watch?v=Raf9bVk75s8"},n=function(e){return a.setState({playState:e.curPlayState,curPlayTime:e.curPlayTime})},T.on("playController",function(e){return n(e)}),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(){"Play"===this.state.playState?document.getElementById("myVideo").play():document.getElementById("myVideo").pause();document.getElementById("myVideo").currentTime=this.state.curPlayTime}},{key:"render",value:function(){return i.a.createElement("div",{className:"videoSycnWrapper"},i.a.createElement("h1",null,"High framerate video collaboration prototype"),i.a.createElement("div",{className:"videoWrapper"},i.a.createElement("video",{id:"myVideo",height:"300px",onTimeUpdate:this.updatePlayhead,src:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4",seeking:"true",controls:!0,preload:!0})),"Play State: ",this.state.playState,i.a.createElement("button",{onClick:this.playVid},"Sync Play"),i.a.createElement("button",{onClick:this.pauseVid},"Sycn Pause"),i.a.createElement("button",{onClick:this.playAsync},"Async Play"),i.a.createElement("button",{onClick:this.pauseAsync},"Async Pause"),i.a.createElement("p",null,"Client Video Timecode: ",i.a.createElement("span",{id:"demo"})),"From sever PlayState: ",this.state.playState,"From sever curPlayTime: ",this.state.curPlayTime)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[36,1,2]]]);
//# sourceMappingURL=main.72bf050a.chunk.js.map