!function(e){if(e.wp=e.wp||!1,!e.wp)return;if(!e.wp.customHeader)return;const t=e.wp.customHeader.BaseVideoHandler.extend({test:e=>"video/x-vimeo"===e.mimeType,ready(){const t=this;if("Vimeo"in e)t.loadVideo();else{const e=document.createElement("script");e.src="https://player.vimeo.com/api/player.js",e.onload=function(){t.loadVideo()},document.getElementsByTagName("head")[0].appendChild(e)}},loadVideo(){let e;const t=this;this._paused=!0,this.player=e=new Vimeo.Player(this.container,{autopause:!1,autoplay:!0,background:!0,byline:!1,height:this.settings.height,loop:!0,portrait:!1,title:!1,url:this.settings.videoUrl,width:this.settings.width,id:this.settings.id}),e.on("play",function(){t._paused=!1,t.trigger("play")}),e.on("pause",function(){t._paused=!0,t.trigger("pause")}),e.ready().then(function(){const s=t.container.getElementsByTagName("img")[0];s.src===t.settings.posterUrl&&t.container.removeChild(s),t.showControls(),e.getPaused().then(function(e){t._paused=e,e||t.trigger("play")})}),e.setVolume(0)},isPaused(){return this._paused},pause(){this.player.pause()},play(){this.player.play()}});e.wp.customHeader.BaseVideoHandler.extend({origin:"https://player.vimeo.com",test:e=>"video/x-vimeo"===e.mimeType,ready(){const t=this,s=this.settings.videoUrl.split("/").pop(),i=document.createElement("iframe");this._paused=!0,t.setVideo(i),i.id="wp-custom-header-video",i.src="https://player.vimeo.com/video/"+s+"?api=1&autopause=0&autoplay=0&background=1&badge=0&byline=0&loop=1&player_id="+i.id+"&portrait=0&title=0",this.iframe=i,e.addEventListener("message",function(e){let s;if(t.origin===e.origin){try{s=JSON.parse(e.data)}catch(e){return}"wp-custom-header-video"===s.player_id&&("ready"===s.event?(t.postMessage("addEventListener","pause"),t.postMessage("addEventListener","play"),t.postMessage("setVolume",0),t.play(),t.showControls()):"pause"===s.event?(t._paused=!0,t.trigger(s.event)):"play"===s.event&&(t._paused=!1,t.trigger(s.event)))}})},isPaused(){return this._paused},pause(){this.postMessage("pause")},play(){this.postMessage("play")},postMessage(e,t){const s=JSON.stringify({method:e,value:t});this.iframe.contentWindow.postMessage(s,this.origin)}});e.wp.customHeader.handlers.vimeo=new t}(window);