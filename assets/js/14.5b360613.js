(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{554:function(t,i,s){},616:function(t,i,s){"use strict";s(554)},667:function(t,i,s){"use strict";s.r(i);s(80),s(81);var e={props:{src:String},data:function(){return{duration:0,currentTime:"00:00",totalTime:"00:00",playing:!1,audio:null,progress:0,initClientX:0,initOffsetX:0}},computed:{trackStyle:function(){return{width:"".concat(this.progress,"%")}},thumbStyle:function(){return{left:"".concat(this.progress,"%")}}},methods:{play:function(){if(this.audio){if(!this.playing)document.getElementsByTagName("audio").forEach((function(t){t.pause()}));this.playing?this.audio.pause():this.audio.play(),this.playing=!this.playing}},pause:function(){this.playing=!1},clickProgress:function(t){var i=t.offsetX/this.$refs.progress.clientWidth;this.audio.currentTime=this.duration*i},canplay:function(){this.audio=this.$refs.audio,this.audio&&(this.duration=this.audio.duration,this.totalTime=this.formatDuration(Math.ceil(this.duration)))},timeupdate:function(){this.audio&&(this.currentTime=this.formatDuration(Math.ceil(this.audio.currentTime)),this.progress=this.audio.currentTime/this.duration*100,this.audio.currentTime===this.audio.duration&&(this.audio.pause(),this.playing=!1))},thumbMouseDown:function(t){this.audio&&(this.audio.pause(),this.playing=!1,this.initClientX=t.clientX,this.initOffsetX=this.$refs.progress.clientWidth*this.progress/100,t.stopImmediatePropagation(),t.preventDefault(),document.addEventListener("mousemove",this.thumbMouseMove,!1),document.addEventListener("mouseup",this.thumbMouseUp,!1))},thumbMouseMove:function(t){var i=(t.clientX-this.initClientX+this.initOffsetX)/this.$refs.progress.clientWidth;i=i<=1?i>=0?i:0:1,this.progress=100*i},thumbMouseUp:function(){this.audio.currentTime=this.duration*this.progress/100,document.removeEventListener("mousemove",this.thumbMouseMove,!1),document.removeEventListener("mouseup",this.thumbMouseUp,!1)},formatDuration:function(t){if(t>0){var i=Math.floor(t/60),s=t%60;return(i=i<10?"0"+String(i):String(i))+":"+(s=s<10?"0"+String(s):String(s))}return"00:00"}}},o=(s(616),s(29)),n=Object(o.a)(e,(function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"audio-play"},[s("audio",{ref:"audio",attrs:{preload:"",src:t.src},on:{canplay:t.canplay,pause:t.pause,timeupdate:t.timeupdate}},[t._v("\n    您的浏览器不支持音频\n  ")]),t._v(" "),s("div",{staticClass:"audio-controls"},[s("div",{staticClass:"audio-play-icons",on:{click:t.play}},[t.playing?s("i",{staticClass:"iconfont iconzanting1 color-primary"}):s("i",{staticClass:"iconfont iconbofang1",class:[t.audio?"color-primary":"is-disabled"]})]),t._v(" "),s("div",{ref:"progress",staticClass:"audio-progress"},[s("div",{staticClass:"audio-progress__background",on:{click:function(i){return i.target!==i.currentTarget?null:t.clickProgress(i)}}}),t._v(" "),s("div",{staticClass:"audio-progress__track",style:t.trackStyle,on:{click:function(i){return i.target!==i.currentTarget?null:t.clickProgress(i)}}}),t._v(" "),s("div",{ref:"thumb",staticClass:"audio-progress__thumb",class:{"is-disabled":!t.audio},style:t.thumbStyle,on:{mousedown:t.thumbMouseDown}})]),t._v(" "),s("div",{staticClass:"flex-center"},[s("p",{staticClass:"font-small color-text-3"},[t._v(t._s(t.currentTime)+"/")]),t._v(" "),s("p",{staticClass:"font-small color-text-3"},[t._v(t._s(t.totalTime))])])])])}),[],!1,null,"56b470fd",null);i.default=n.exports}}]);