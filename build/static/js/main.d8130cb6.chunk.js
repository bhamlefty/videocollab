(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{38:function(e,t,a){e.exports=a(77)},43:function(e,t,a){},44:function(e,t,a){},68:function(e,t){},71:function(e,t,a){e.exports=a.p+"static/media/video.b220a35d.mp4"},77:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(31),o=a.n(i),l=(a(43),a(35)),s=a(32),r=a(33),m=a(36),u=a(34),d=a(3),y=a(37),p=(a(44),a(1)),h=a.n(p),g=h()("https://syncprototype.herokuapp.com/");a(71),a(72);var v=a(16),T=a.n(v),b=a(74),f=1,E=h()("https://syncprototype.herokuapp.com/"),S=0,k=function(e){function t(e){var a,n;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).initSocket=function(){var e=h()(e);e.on("connect",function(){console.log("connected"),setInterval(function(){e.emit("timer",(new Date).getTime(),a.state.uuid)},2e3)})},a.enterViewing=function(){console.log("asdfasdfasdf"),a.setState({enterViewing:!0})},a.getClientLatency=function(){var e={},t=a.state.uuid,n=a.state.latencyObj;if(n!=={}){e=Object.values(n),f=e.length;var c=Math.max.apply(Math,Object(l.a)(e));console.log(e),S=n[t]>0?c-n[t]:0}},a.playVid=function(){a.getClientLatency();var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime},console.log("Dynamic Latency Adjustment: ",S),a.setState({playState:"Play",playTime:e.currentTime},function(){E.emit("subscribeToTimer","Play",a.state.playTime)})},a.pauseVid=function(){var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime},a.setState({playState:"Pause",playTime:e.currentTime},function(){E.emit("subscribeToTimer","Pause",a.state.playTime)})},a.playAsync=function(){var e=document.getElementById("myVideo");a.setState({playState:"Play"}),e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime,e.play()}},a.pauseAsync=function(){var e=document.getElementById("myVideo");e.ontimeupdate=function(){document.getElementById("demo").innerHTML=e.currentTime,e.pause()},a.setState({playState:"Pause",curPlayTime:e.currentTime})},a.updatePlayhead=function(){var e=Object(d.a)(a),t=document.getElementById("myVideo");"Pause"===a.state.playState&&a.state.syncMode&&a.state.curPlayTime!==t.currentTime&&(console.log("update",t.currentTime),e.setState({playTime:t.currentTime},function(){console.log("madeit",e.state.playTime),E.emit("subscribeToTimer","Pause",e.state.playTime)}))},a.state={playTime:10,syncMode:!0,playState:"Pause",latencyObj:{},curPlayTime:0,latencyDelay:0,enterViewing:!1,checked:!1,videosrc:"https://firebasestorage.googleapis.com/v0/b/elevaetbackend.appspot.com/o/Test%2FMSF19087_Workplace_Vertilcals_YIR_v05.mp4?alt=media&token=5d72233a-ca4f-41d2-a692-118f845ae743"},n=function(e){return a.setState({timer:e})},g.on("setTimer",function(e){return n(e)}),a.handleLatencyChange=a.handleLatencyChange.bind(Object(d.a)(a)),a.toggleSyncMode=a.toggleSyncMode.bind(Object(d.a)(a)),function(e){g.on("playController",function(t){return e(t)})}(function(e){return a.setState({playState:e.curPlayState,curPlayTime:e.curPlayTime,latencyObj:e.latencyObj})}),a}return Object(y.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){this.setState({uuid:b()}),this.initSocket()}},{key:"componentDidUpdate",value:function(){var e=document.getElementById("myVideo");"Play"===this.state.playState?(E.emit("timer",(new Date).getTime(),this.state.uuid),this.state.checked?setTimeout(function(){e.play()},S):e.play()):(E.emit("timer",(new Date).getTime(),this.state.uuid),e.pause()),e.currentTime=this.state.curPlayTime}},{key:"handleLatencyChange",value:function(e){this.setState({checked:e})}},{key:"toggleSyncMode",value:function(){console.log("toggleSyncMode"),this.setState({syncMode:!this.state.syncMode})}},{key:"render",value:function(){return c.a.createElement("div",{className:"videoSycnWrapper"},!1===this.state.enterViewing?c.a.createElement("div",{className:"bg"},c.a.createElement("button",{className:"enter",onClick:this.enterViewing},"Enter Viewing")):c.a.createElement("span",null," "),c.a.createElement("h1",null,"Synchronized Video Viewing"),c.a.createElement("div",null,"Active Viewers: ",f),c.a.createElement("div",{className:"videoWrapper"},c.a.createElement("video",{id:"myVideo",height:"300px",onTimeUpdate:this.updatePlayhead,src:this.state.videosrc,seeking:"true",controls:!0,preload:"auto"})),!0===this.state.syncMode?c.a.createElement("div",null,"Pause"===this.state.playState?c.a.createElement("button",{className:"player-controls-btns",onClick:this.playVid},"Play"):c.a.createElement("button",{className:"player-controls-btns",id:"SyncPause",onClick:this.pauseVid},"Pause")):c.a.createElement("span",null),!1===this.state.syncMode?c.a.createElement("div",null,"Pause"===this.state.playState?c.a.createElement("button",{className:"player-controls-btns",onClick:this.playAsync},"Play"):c.a.createElement("button",{className:"player-controls-btns",onClick:this.pauseAsync},"Pause")):c.a.createElement("span",null),c.a.createElement("span",null,"Synchronize Playback:"),c.a.createElement(T.a,{onChange:this.toggleSyncMode,checked:this.state.syncMode,onColor:"#6264a7",checkedIcon:!0}),c.a.createElement("p",null,"Client Video Timecode: ",c.a.createElement("span",{id:"demo"})),c.a.createElement("div",{className:"block"},"Server Timecode: ",this.state.curPlayTime),c.a.createElement("div",{className:"block"},"Server Playstate: ",this.state.playState),c.a.createElement("div",{className:"block"},"Client UUID: ",this.state.uuid),c.a.createElement("div",{className:"block"},"Dynamic Latency Control (WIP) ",c.a.createElement(T.a,{onChange:this.handleLatencyChange,checked:this.state.checked})),c.a.createElement("div",{className:"block"},"Latency Sync Adjustment: ",S))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[38,1,2]]]);
//# sourceMappingURL=main.d8130cb6.chunk.js.map