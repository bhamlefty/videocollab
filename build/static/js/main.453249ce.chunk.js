(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{38:function(e,t,a){e.exports=a(77)},43:function(e,t,a){},44:function(e,t,a){},68:function(e,t){},71:function(e,t,a){e.exports=a.p+"static/media/video.b220a35d.mp4"},77:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(30),o=a.n(c),l=(a(43),a(35)),s=a(31),r=a(32),m=a(36),u=a(33),d=a(3),y=a(37),p=(a(44),a(1)),h=a.n(p),T=h()("https://limitless-lake-54723.herokuapp.com");a(71),a(72);var v=a(34),g=a.n(v),f=a(74),b=1,k=h()("https://limitless-lake-54723.herokuapp.com"),E=0,P=function(e){function t(e){var a,n;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).initSocket=function(){var e=h()(e);e.on("connect",function(){console.log("connected")})},a.getClientLatency=function(){var e={},t=a.state.uuid,n=a.state.latencyObj;if(n!=={}){e=Object.values(n),b=e.length;var i=Math.max.apply(Math,Object(l.a)(e));console.log(e),E=n[t]>0?i-n[t]:0}},a.playVid=function(){var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime},console.log("Dynamic Latency Adjustment: ",E),a.setState({playState:"Play",playTime:e.currentTime},function(){k.emit("subscribeToTimer","Play",a.state.playTime)})},a.pauseVid=function(){var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime},a.setState({playState:"Pause",playTime:e.currentTime},function(){a.getClientLatency(),k.emit("subscribeToTimer","Pause",a.state.playTime)})},a.playAsync=function(){var e=document.getElementById("myVideo");a.setState({playState:"Play"}),e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime,e.play()}},a.pauseAsync=function(){var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime,e.pause()},a.setState({playState:"Pause",curPlayTime:e.currentTime})},a.updatePlayhead=function(){var e=Object(d.a)(a),t=document.getElementById("myVideo");"Pause"===a.state.playState&&"sync"===a.state.playMode&&a.state.curPlayTime!==t.currentTime&&(console.log("update",t.currentTime),e.setState({playTime:t.currentTime},function(){console.log("madeit",a.state.playTime),k.emit("subscribeToTimer","Pause",e.state.playTime)}))},a.state={playTime:10,playMode:"sync",latencyObj:{},curPlayTime:0,latencyDelay:0,checked:!1,videosrc:"https://firebasestorage.googleapis.com/v0/b/elevaetbackend.appspot.com/o/Test%2FMSF19087_Workplace_Vertilcals_YIR_v05.mp4?alt=media&token=5d72233a-ca4f-41d2-a692-118f845ae743"},n=function(e){return a.setState({timer:e})},T.on("setTimer",function(e){return n(e)}),a.handleLatencyChange=a.handleLatencyChange.bind(Object(d.a)(a)),function(e){T.on("playController",function(t){return e(t)})}(function(e){return a.setState({playState:e.curPlayState,curPlayTime:e.curPlayTime,latencyObj:e.latencyObj})}),a}return Object(y.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.setState({uuid:f()}),this.initSocket(),setInterval(function(){e.getClientLatency()},2e3)}},{key:"componentDidUpdate",value:function(){var e=document.getElementById("myVideo");"Play"===this.state.playState?(k.emit("timer",(new Date).getTime(),this.state.uuid),this.state.checked?setTimeout(function(){e.play()},E):e.play()):(k.emit("timer",(new Date).getTime(),this.state.uuid),e.pause()),e.currentTime=this.state.curPlayTime}},{key:"handleLatencyChange",value:function(e){this.setState({checked:e})}},{key:"render",value:function(){return i.a.createElement("div",{className:"videoSycnWrapper"},i.a.createElement("h1",null,"Synchronized Video Viewing"),i.a.createElement("div",{className:"block"},"Currently Viewing: ",b),i.a.createElement("div",{className:"videoWrapper"},i.a.createElement("video",{id:"myVideo",height:"300px",onTimeUpdate:this.updatePlayhead,src:this.state.videosrc,seeking:"true",controls:!0,preload:"auto"})),i.a.createElement("button",{onClick:this.playVid},"Sync Play"),i.a.createElement("button",{id:"SyncPause",onClick:this.pauseVid},"Sync Pause"),i.a.createElement("button",{onClick:this.playAsync},"Async Play"),i.a.createElement("button",{onClick:this.pauseAsync},"Async Pause"),i.a.createElement("p",null,"Client Video Timecode: ",i.a.createElement("span",{id:"demo"})),i.a.createElement("div",{className:"block"},"Dynamic Latency Control (WIP) ",i.a.createElement(g.a,{onChange:this.handleLatencyChange,checked:this.state.checked})),i.a.createElement("div",{className:"block"},"UUID: ",this.state.uuid),i.a.createElement("div",{className:"block"},"Aggregated Latency: ",E),i.a.createElement("div",{className:"block"},"From sever curPlayTime: ",this.state.curPlayTime),i.a.createElement("div",{className:"block"},"From sever PlayState: ",this.state.playState))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[38,1,2]]]);
//# sourceMappingURL=main.453249ce.chunk.js.map