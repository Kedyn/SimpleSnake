!function e(t,n,o){function i(s,a){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(r)return r(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[s]={exports:{}};t[s][0].call(u.exports,function(e){var n=t[s][1][e];return i(n||e)},u,u.exports,e,t,n,o)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)i(o[s]);return i}({1:[function(e,t,n){"use strict";n.__esModule=!0;var o=e("./SceneManager"),i=e("./Tools/constants"),r={title:"Simple Game",frame_rate:60,debug_mode:!0,canvas:{id:"SimpleGame",width:960,height:540},version:i.VERSION},s=function(){function e(){}return e.GetInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.create=function(e){return e?this.checkOptions(e):this.options=r,this.checkCanvas()?(this.time=new Date,this.frame_counter=0,this.last_frame_time=this.time.getTime(),this.log("Game creation successful"),!0):(this.log("Game creation failed"),!1)},e.prototype.init=function(){return o.SimpleSceneManager.currentScene()?(requestAnimationFrame(this.animate),this.log("Initiating game animation"),!0):(this.log("Failed to initialize game [no game scene]"),!1)},e.prototype.getCanvas=function(){return this.canvas},e.prototype.log=function(e){this.options.debug_mode&&console.log(this.options.title+": "+e+"...")},e.prototype.checkOptions=function(e){e.title||(e.title=r.title),e.frame_rate||(e.frame_rate=r.frame_rate),e.debug_mode||(e.debug_mode=r.debug_mode),e.canvas?(e.canvas.id||(e.canvas.id=r.canvas.id),e.canvas.width||(e.canvas.width=r.canvas.width),e.canvas.height||(e.canvas.height=r.canvas.height)):e.canvas=r.canvas,this.options=e},e.prototype.checkCanvas=function(){var e=document.getElementById(this.options.canvas.id);return e||((e=document.createElement("canvas")).width=this.options.canvas.width,e.height=this.options.canvas.height,document.getElementsByTagName("body")[0].insertBefore(e,document.body.firstChild)),"CANVAS"===e.tagName&&(this.canvas=e,!0)},e.prototype.animate=function(){var e=new Date,t=e.getTime()-n.SimpleGame.last_frame_time,r=i.SECOND/n.SimpleGame.options.frame_rate;t>r&&(o.SimpleSceneManager.update(t),o.SimpleSceneManager.render(t),n.SimpleGame.last_frame_time=e.getTime()-t%r),requestAnimationFrame(n.SimpleGame.animate)},e}();n.SimpleGame=s.GetInstance()},{"./SceneManager":4,"./Tools/constants":7}],2:[function(e,t,n){"use strict";n.__esModule=!0;var o=e("./Tools/constants"),i=e("./Tools/KeyCode"),r=e("./Tools/constants"),s=e("./Game"),a=function(){function e(){this.keys=[],this.mouse_buttons=[],this.resetCallbacks();for(var e in i.KEYCODE){var t=parseInt(e,10);isNaN(t)||(this.keys[t]=!1)}this.mouse_buttons[r.MOUSE_BUTTON.LEFT]=!1,this.mouse_buttons[r.MOUSE_BUTTON.MIDDLE]=!1,this.mouse_buttons[r.MOUSE_BUTTON.RIGHT]=!1,this.mouse_pos={x:0,y:0},this.initiated=!1}return e.GetInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.listen=function(e,t){this.initiated||this.init(),e==o.INPUT_TYPE.KEYDOWN?this.callbacks.onKeyDown.push(t):e==o.INPUT_TYPE.KEYUP?this.callbacks.onKeyUp.push(t):e==o.INPUT_TYPE.MOUSE_MOVE?this.callbacks.onMouseMove.push(t):e==o.INPUT_TYPE.MOUSE_DOWN?this.callbacks.onMouseDown.push(t):e==o.INPUT_TYPE.MOUSE_UP&&this.callbacks.onMouseUp.push(t)},e.prototype.removeListens=function(){this.resetCallbacks()},e.prototype.isKeyDown=function(e){return!!this.keys[e]&&this.keys[e]},e.prototype.mousePos=function(){return this.mouse_pos},e.prototype.isMouseButtonDown=function(e){return!!this.mouse_buttons[e]&&this.mouse_buttons[e]},e.prototype.init=function(){s.SimpleGame.getCanvas().tabIndex=0,s.SimpleGame.getCanvas().addEventListener("keydown",this.onKeyDown,!1),s.SimpleGame.getCanvas().addEventListener("keyup",this.onKeyUp,!1),s.SimpleGame.getCanvas().addEventListener("mousemove",this.onMouseMove,!1),s.SimpleGame.getCanvas().addEventListener("mousedown",this.onMouseDown,!1),s.SimpleGame.getCanvas().addEventListener("mouseup",this.onMouseUp,!1),s.SimpleGame.getCanvas().onclick=function(e){return!1},s.SimpleGame.getCanvas().oncontextmenu=function(e){return!1},s.SimpleGame.getCanvas().onwheel=function(e){return!1},s.SimpleGame.getCanvas().focus(),this.initiated=!0,s.SimpleGame.log("Input Handler initiated...")},e.prototype.resetCallbacks=function(){this.callbacks={onKeyDown:[],onKeyUp:[],onMouseMove:[],onMouseDown:[],onMouseUp:[]}},e.prototype.onKeyDown=function(e){e.preventDefault(),n.SimpleInputHandler.keys[e.keyCode]=!0;for(var t=0,o=n.SimpleInputHandler.callbacks.onKeyDown;t<o.length;t++){(0,o[t])(e.keyCode)}},e.prototype.onKeyUp=function(e){n.SimpleInputHandler.keys[e.keyCode]=!1;for(var t=0,o=n.SimpleInputHandler.callbacks.onKeyUp;t<o.length;t++){(0,o[t])(e.keyCode)}},e.prototype.onMouseMove=function(e){var t=e.pageX,o=e.pageY;t-=s.SimpleGame.getCanvas().offsetLeft,o-=s.SimpleGame.getCanvas().offsetTop,n.SimpleInputHandler.mouse_pos.x=t,n.SimpleInputHandler.mouse_pos.y=o;for(var i=0,r=n.SimpleInputHandler.callbacks.onMouseMove;i<r.length;i++){(0,r[i])(n.SimpleInputHandler.mouse_pos)}},e.prototype.onMouseDown=function(e){n.SimpleInputHandler.mouse_buttons[e.button]=!0;for(var t=0,o=n.SimpleInputHandler.callbacks.onMouseDown;t<o.length;t++){(0,o[t])(e.button,n.SimpleInputHandler.mouse_pos)}},e.prototype.onMouseUp=function(e){n.SimpleInputHandler.mouse_buttons[e.button]=!1;for(var t=0,o=n.SimpleInputHandler.callbacks.onMouseUp;t<o.length;t++){(0,o[t])(e.button,n.SimpleInputHandler.mouse_pos)}},e}();n.SimpleInputHandler=a.GetInstance()},{"./Game":1,"./Tools/KeyCode":6,"./Tools/constants":7}],3:[function(e,t,n){"use strict";n.__esModule=!0;var o=e("./Game"),i=function(){function e(e){this.id=e,o.SimpleGame.log("Creating "+e+" scene..."),this.game_objects=[]}return e.prototype.update=function(e){},e.prototype.render=function(e){},e.prototype.onEnter=function(){return!0},e.prototype.onKeyDown=function(e){},e.prototype.onKeyUp=function(e){},e.prototype.onMouseMove=function(e,t){},e.prototype.onMouseDown=function(e,t,n){},e.prototype.onMouseUp=function(e,t,n){},e.prototype.onExit=function(){return!0},e}();n.Scene=i},{"./Game":1}],4:[function(e,t,n){"use strict";n.__esModule=!0;var o=e("./Game"),i=e("./InputHandler"),r=e("./Tools/constants"),s=function(){function e(){this.scenes=[],this.input_handler=!1}return e.GetInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.pushScene=function(e){this.input_handler||(i.SimpleInputHandler.listen(r.INPUT_TYPE.KEYDOWN,this.onKeyDown),i.SimpleInputHandler.listen(r.INPUT_TYPE.KEYUP,this.onKeyUp),i.SimpleInputHandler.listen(r.INPUT_TYPE.MOUSE_MOVE,this.onMouseMove),i.SimpleInputHandler.listen(r.INPUT_TYPE.MOUSE_DOWN,this.onMouseDown),i.SimpleInputHandler.listen(r.INPUT_TYPE.MOUSE_UP,this.onMouseUp),this.input_handler=!0),this.onCurrentSceneExit()?this.scenes.push(e):o.SimpleGame.log("Error exiting scene "+this.currentScene().id),this.onCurrentSceneEnter()||o.SimpleGame.log("Error while entering scene")},e.prototype.changeScene=function(e){this.scenes.length?this.scenes[this.scenes.length-1].id!=e.id?(this.scenes.push(e),this.onCurrentSceneExit()?this.scenes.splice(this.scenes.length-2,1):o.SimpleGame.log("Error exiting scene "+this.currentScene().id),this.onCurrentSceneEnter()||o.SimpleGame.log("Error while changing scene")):o.SimpleGame.log("Cannot change to the same scene"):o.SimpleGame.log("Cannot change scene when there are no current scenes")},e.prototype.popScene=function(){this.scenes.length>1&&this.onCurrentSceneExit()&&(this.scenes.pop(),this.onCurrentSceneEnter()||o.SimpleGame.log("Error while entering scene"))},e.prototype.currentScene=function(){return this.scenes[this.scenes.length-1]},e.prototype.update=function(e){this.currentScene().update(e);for(var t=0,n=this.currentScene().game_objects;t<n.length;t++){n[t].update()}},e.prototype.render=function(e){this.currentScene().render(e);for(var t=0,n=this.currentScene().game_objects;t<n.length;t++){n[t].render()}},e.prototype.onCurrentSceneEnter=function(){var e=!1;if(this.currentScene().onEnter()){e=!0;for(var t=0,n=!0,o=this.currentScene().game_objects;n;)t<o.length?o[t].onEnter()||(e=!1,n=!1):n=!1,t++}return e},e.prototype.onCurrentSceneExit=function(){var e=!1;if(this.scenes.length){if(this.currentScene().onExit()){e=!0;for(var t=0,n=!0,o=this.currentScene().game_objects;n;)t<o.length?o[t].onExit()||(e=!1,n=!1):n=!1,t++}}else e=!0;return e},e.prototype.onKeyDown=function(e){n.SimpleSceneManager.currentScene().onKeyDown(e);for(var t=0,o=n.SimpleSceneManager.currentScene().game_objects;t<o.length;t++){o[t].onKeyDown(e)}},e.prototype.onKeyUp=function(e){n.SimpleSceneManager.currentScene().onKeyUp(e);for(var t=0,o=n.SimpleSceneManager.currentScene().game_objects;t<o.length;t++){o[t].onKeyUp(e)}},e.prototype.onMouseMove=function(e){n.SimpleSceneManager.currentScene().onMouseMove(e.x,e.y);for(var t=0,o=n.SimpleSceneManager.currentScene().game_objects;t<o.length;t++){o[t].onMouseMove(e.x,e.y)}},e.prototype.onMouseDown=function(e,t){n.SimpleSceneManager.currentScene().onMouseDown(e,t.x,t.y);for(var o=0,i=n.SimpleSceneManager.currentScene().game_objects;o<i.length;o++){i[o].onMouseDown(e,t.x,t.y)}},e.prototype.onMouseUp=function(e,t){n.SimpleSceneManager.currentScene().onMouseUp(e,t.x,t.y);for(var o=0,i=n.SimpleSceneManager.currentScene().game_objects;o<i.length;o++){i[o].onMouseUp(e,t.x,t.y)}},e}();n.SimpleSceneManager=s.GetInstance()},{"./Game":1,"./InputHandler":2,"./Tools/constants":7}],5:[function(e,t,n){"use strict";function o(e,t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}function i(e,t){t.fill&&(e.fillStyle=t.fill_color,e.fill()),t.stroke&&(e.lineWidth=t.line_width,e.strokeStyle=t.stroke_color,e.stroke())}function r(e,t,n){void 0===t&&(t=s.DEFAULT_FONT_SIZE),void 0===n&&(n=s.DEFAULT_FONT);var o=a.SimpleGame.getCanvas().getContext("2d"),i=t+"px "+n;o.save(),o.font=i;var r=o.measureText(e).width;return o.restore(),{width:r,height:t}}n.__esModule=!0;var s=e("./constants"),a=e("./../Game");n.drawLine=function(e,t){void 0===t&&(t={});var n=a.SimpleGame.getCanvas().getContext("2d");n.save(),n.moveTo(e[0].x,e[0].y);for(var r=1;r<e.length;++r)n.lineTo(e[r].x,e[r].y);o(t,s.DEFAULT_DRAW_OPTIONS),t.fill&&n.closePath(),i(n,t),n.restore()},n.drawCircle=function(e,t,n){void 0===n&&(n={});var r=a.SimpleGame.getCanvas().getContext("2d");r.save(),r.beginPath(),o(n,s.DEFAULT_DRAW_CIRCLE_OPTIONS),r.arc(e,t,n.radius,n.angle.start,n.angle.end,n.clockwise),i(r,n),r.restore()},n.drawRect=function(e,t,n,i,r){void 0===r&&(r={});var c=a.SimpleGame.getCanvas().getContext("2d");c.save(),o(r,s.DEFAULT_DRAW_OPTIONS),r.fill&&(c.fillStyle=r.fill_color,c.fillRect(e,t,n,i)),r.stroke&&(c.rect(e,t,n,i),c.lineWidth=r.line_width,c.strokeStyle=r.stroke_color,c.stroke()),c.restore()},n.drawImage=function(e,t,n,o){void 0===o&&(o={});var i=a.SimpleGame.getCanvas().getContext("2d");i.save(),o.width||(o.width=n.width),o.height||(o.width=n.width),o.only_show.x||(o.only_show.x=0),o.only_show.y||(o.only_show.y=0),o.only_show.width||(o.only_show.width=o.width),o.only_show.height||(o.only_show.height=o.height),o.center&&(e-=o.only_show.width/2,t-=o.only_show.height/2),i.drawImage(n,e,t,o.width,o.height,o.only_show.x,o.only_show.y,o.only_show.width,o.only_show.height),i.restore()},n.drawText=function(e,t,n,i){void 0===i&&(i={});var c=a.SimpleGame.getCanvas().getContext("2d");r(n,i.font_size,i.font_name).height,c.save(),o(i,s.DEFAULT_DRAW_TEXT_OPTIONS),c.font=i.font_size+"px "+i.font_name,i.center?(c.textAlign="center",c.textBaseline="middle"):(c.textAlign="left",c.textBaseline="bottom"),i.fill&&(c.fillStyle=i.fill_color,c.fillText(n,e,t)),i.stroke&&(c.lineWidth=i.line_width,c.strokeStyle=i.stroke_color,c.strokeText(n,e,t)),i.blur.size&&(c.shadowBlur=i.blur.size,c.shadowColor=i.blur.color,c.shadowOffsetX=i.blur.x,c.shadowOffsetY=i.blur.y),c.restore()},n.getTextSize=r},{"./../Game":1,"./constants":7}],6:[function(e,t,n){"use strict";n.__esModule=!0;!function(e){e[e.BACKSPACE=8]="BACKSPACE",e[e.TAB=9]="TAB",e[e.ENTER=13]="ENTER",e[e.SHIFT=16]="SHIFT",e[e.CTRL=17]="CTRL",e[e.ALT=18]="ALT",e[e.PAUSE=19]="PAUSE",e[e.CAPS_LOCK=20]="CAPS_LOCK",e[e.ESCAPE=27]="ESCAPE",e[e.SPACE=32]="SPACE",e[e.PAGE_UP=33]="PAGE_UP",e[e.PAGE_DOWN=34]="PAGE_DOWN",e[e.END=35]="END",e[e.HOME=36]="HOME",e[e.LEFT_ARROW=37]="LEFT_ARROW",e[e.UP_ARROW=38]="UP_ARROW",e[e.RIGHT_ARROW=39]="RIGHT_ARROW",e[e.DOWN_ARROW=40]="DOWN_ARROW",e[e.INSERT=45]="INSERT",e[e.DELETE=46]="DELETE",e[e.KEY_0=48]="KEY_0",e[e.KEY_1=49]="KEY_1",e[e.KEY_2=50]="KEY_2",e[e.KEY_3=51]="KEY_3",e[e.KEY_4=52]="KEY_4",e[e.KEY_5=53]="KEY_5",e[e.KEY_6=54]="KEY_6",e[e.KEY_7=55]="KEY_7",e[e.KEY_8=56]="KEY_8",e[e.KEY_9=57]="KEY_9",e[e.KEY_A=65]="KEY_A",e[e.KEY_B=66]="KEY_B",e[e.KEY_C=67]="KEY_C",e[e.KEY_D=68]="KEY_D",e[e.KEY_E=69]="KEY_E",e[e.KEY_F=70]="KEY_F",e[e.KEY_G=71]="KEY_G",e[e.KEY_H=72]="KEY_H",e[e.KEY_I=73]="KEY_I",e[e.KEY_J=74]="KEY_J",e[e.KEY_K=75]="KEY_K",e[e.KEY_L=76]="KEY_L",e[e.KEY_M=77]="KEY_M",e[e.KEY_N=78]="KEY_N",e[e.KEY_O=79]="KEY_O",e[e.KEY_P=80]="KEY_P",e[e.KEY_Q=81]="KEY_Q",e[e.KEY_R=82]="KEY_R",e[e.KEY_S=83]="KEY_S",e[e.KEY_T=84]="KEY_T",e[e.KEY_U=85]="KEY_U",e[e.KEY_V=86]="KEY_V",e[e.KEY_W=87]="KEY_W",e[e.KEY_X=88]="KEY_X",e[e.KEY_Y=89]="KEY_Y",e[e.KEY_Z=90]="KEY_Z",e[e.LEFT_META=91]="LEFT_META",e[e.RIGHT_META=92]="RIGHT_META",e[e.SELECT=93]="SELECT",e[e.NUMPAD_0=96]="NUMPAD_0",e[e.NUMPAD_1=97]="NUMPAD_1",e[e.NUMPAD_2=98]="NUMPAD_2",e[e.NUMPAD_3=99]="NUMPAD_3",e[e.NUMPAD_4=100]="NUMPAD_4",e[e.NUMPAD_5=101]="NUMPAD_5",e[e.NUMPAD_6=102]="NUMPAD_6",e[e.NUMPAD_7=103]="NUMPAD_7",e[e.NUMPAD_8=104]="NUMPAD_8",e[e.NUMPAD_9=105]="NUMPAD_9",e[e.MULTIPLY=106]="MULTIPLY",e[e.ADD=107]="ADD",e[e.SUBTRACT=109]="SUBTRACT",e[e.DECIMAL=110]="DECIMAL",e[e.DIVIDE=111]="DIVIDE",e[e.F1=112]="F1",e[e.F2=113]="F2",e[e.F3=114]="F3",e[e.F4=115]="F4",e[e.F5=116]="F5",e[e.F6=117]="F6",e[e.F7=118]="F7",e[e.F8=119]="F8",e[e.F9=120]="F9",e[e.F10=121]="F10",e[e.F11=122]="F11",e[e.F12=123]="F12",e[e.NUM_LOCK=144]="NUM_LOCK",e[e.SCROLL_LOCK=145]="SCROLL_LOCK",e[e.SEMICOLON=186]="SEMICOLON",e[e.EQUALS=187]="EQUALS",e[e.COMMA=188]="COMMA",e[e.DASH=189]="DASH",e[e.PERIOD=190]="PERIOD",e[e.FORWARD_SLASH=191]="FORWARD_SLASH",e[e.GRAVE_ACCENT=192]="GRAVE_ACCENT",e[e.OPEN_BRACKET=219]="OPEN_BRACKET",e[e.BACK_SLASH=220]="BACK_SLASH",e[e.CLOSE_BRACKET=221]="CLOSE_BRACKET",e[e.SINGLE_QUOTE=222]="SINGLE_QUOTE"}(n.KEYCODE||(n.KEYCODE={}))},{}],7:[function(e,t,n){"use strict";n.__esModule=!0,n.VERSION="0.0.2",n.SECOND=1e3;!function(e){e[e.KEYDOWN=0]="KEYDOWN",e[e.KEYUP=1]="KEYUP",e[e.MOUSE_MOVE=2]="MOUSE_MOVE",e[e.MOUSE_DOWN=3]="MOUSE_DOWN",e[e.MOUSE_UP=4]="MOUSE_UP"}(n.INPUT_TYPE||(n.INPUT_TYPE={}));!function(e){e[e.LEFT=0]="LEFT",e[e.MIDDLE=1]="MIDDLE",e[e.RIGHT=2]="RIGHT"}(n.MOUSE_BUTTON||(n.MOUSE_BUTTON={})),n.DEFAULT_FONT="impact",n.DEFAULT_FONT_SIZE=16,n.THEME_BACKGROUND="black",n.THEME_FORECOLOR="white",n.DEFAULT_DRAW_OPTIONS={line_width:1,stroke:!0,stroke_color:n.THEME_FORECOLOR,fill:!1,fill_color:n.THEME_BACKGROUND},n.DEFAULT_DRAW_CIRCLE_OPTIONS={line_width:n.DEFAULT_DRAW_OPTIONS.line_width,stroke:n.DEFAULT_DRAW_OPTIONS.stroke,stroke_color:n.DEFAULT_DRAW_OPTIONS.stroke_color,fill:n.DEFAULT_DRAW_OPTIONS.fill,fill_color:n.DEFAULT_DRAW_OPTIONS.fill_color,radius:0,angle:{start:0,end:2*Math.PI},clockwise:!1},n.DEFAULT_DRAW_TEXT_OPTIONS={line_width:n.DEFAULT_DRAW_OPTIONS.line_width,stroke:!1,stroke_color:n.DEFAULT_DRAW_OPTIONS.stroke_color,fill:!0,fill_color:n.DEFAULT_DRAW_OPTIONS.fill_color,font_size:n.DEFAULT_FONT_SIZE,font_name:n.DEFAULT_FONT,center:!0,blur:{x:0,y:0,size:0,color:n.THEME_BACKGROUND}}},{}],8:[function(e,t,n){"use strict";function o(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}var i=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();n.__esModule=!0;var r,s=e("../framework/SceneManager"),a=e("../framework/Scene"),c=e("../framework/Game"),l=e("../framework/Tools/Drawings"),u=e("../framework/Tools/constants"),_=e("../framework/Tools/KeyCode"),h=20;!function(e){e[e.LEFT=0]="LEFT",e[e.UP=1]="UP",e[e.RIGHT=2]="RIGHT",e[e.DOWN=3]="DOWN"}(r||(r={}));var p=function(e){function t(){var t=e.call(this,"GameScene")||this;return t.width=c.SimpleGame.getCanvas().width,t.height=c.SimpleGame.getCanvas().height,t.cols=Math.floor(t.width/h),t.rows=Math.floor(t.height/h),t.reset(),t}return i(t,e),t.prototype.update=function(e){if(this.time+=e,this.time>=u.SECOND/this.speed&&!this.pause&&!this.game_over){this.grow||this.snake.shift(),this.grow=!1;var t=0,n=0,o=this.snake[this.snake.length-1];switch(this.direction){case r.LEFT:0==o.x?t=this.cols*h:t-=h;break;case r.UP:0==o.y?n=this.rows*h:n-=h;break;case r.RIGHT:o.x==this.cols*h-h?t-=this.cols*h:t=h;break;case r.DOWN:o.y==this.rows*h-h?n-=this.rows*h:n=h}var i=o.x+t,a=o.y+n;this.isPointInSnake({x:i,y:a})?this.game_over=!0:(this.snake.push({x:i,y:a}),(o=this.snake[this.snake.length-1]).x==this.fruit.x&&o.y==this.fruit.y&&(this.grow=!0,this.setFruit())),this.time=0}else this.game_over&&this.time>=3*u.SECOND&&s.SimpleSceneManager.popScene()},t.prototype.render=function(e){l.drawRect(0,0,this.width,this.height,{stroke:!1,fill:!0,fill_color:"black"});for(var t=0,n=this.snake;t<n.length;t++){var o=n[t];l.drawRect(o.x,o.y,h,h,{stroke:!1,fill:!0,fill_color:"#005599"})}l.drawRect(this.fruit.x,this.fruit.y,h,h,{stroke:!1,fill:!0,fill_color:"#770000"}),this.pause&&l.drawText(this.width/2,this.height/2,"PAUSE",{font_size:30,fill_color:"teal"}),this.game_over&&l.drawText(this.width/2,this.height/2,"GAME OVER",{font_size:30,fill_color:"teal"})},t.prototype.onKeyDown=function(t){switch(e.prototype.onKeyDown.call(this,t),t){case _.KEYCODE.LEFT_ARROW:this.direction!=r.RIGHT&&(this.direction=r.LEFT);break;case _.KEYCODE.UP_ARROW:this.direction!=r.DOWN&&(this.direction=r.UP);break;case _.KEYCODE.RIGHT_ARROW:this.direction!=r.LEFT&&(this.direction=r.RIGHT);break;case _.KEYCODE.DOWN_ARROW:this.direction!=r.UP&&(this.direction=r.DOWN);break;case _.KEYCODE.KEY_P:this.pause=!this.pause}},t.prototype.isPointInSnake=function(e){for(var t=!0,n=!1,o=0;t;)if(o<this.snake.length){var i=this.snake[o];i.x==e.x&&i.y==e.y&&(t=!1,n=!0),o++}else t=!1;return n},t.prototype.reset=function(){this.snake=[];for(var e=0;e<4;++e)this.snake.push({x:e*h,y:0});this.setFruit(),this.grow=!1,this.direction=r.RIGHT,this.time=0,this.pause=!1,this.game_over=!1,this.speed=4},t.prototype.setFruit=function(){for(var e={x:h*o(0,this.cols-1),y:h*o(0,this.rows-1)};this.isPointInSnake(e);)e={x:h*o(0,this.cols),y:h*o(0,this.rows)};this.fruit=e},t}(a.Scene);n.GameScene=p},{"../framework/Game":1,"../framework/Scene":3,"../framework/SceneManager":4,"../framework/Tools/Drawings":5,"../framework/Tools/KeyCode":6,"../framework/Tools/constants":7}],9:[function(e,t,n){"use strict";var o=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();n.__esModule=!0;var i=e("../framework/Game"),r=e("../framework/Scene"),s=e("../framework/Tools/Drawings"),a=e("../framework/Tools/constants"),c=e("../framework/SceneManager"),l=e("./GameScene"),u=3*a.SECOND,_=function(e){function t(){return e.call(this,"Intro")||this}return o(t,e),t.prototype.onEnter=function(){return this.time=0,!0},t.prototype.update=function(e){this.time+=e,this.time>=u&&c.SimpleSceneManager.pushScene(new l.GameScene)},t.prototype.render=function(e){var t=i.SimpleGame.getCanvas().width,n=i.SimpleGame.getCanvas().height;s.drawRect(0,0,t,n,{stroke:!1,fill:!0,fill_color:"black"}),s.drawText(t/2,n/2,"Simple Kreations",{font_size:30,fill_color:"teal"})},t}(r.Scene);n.IntroScene=_},{"../framework/Game":1,"../framework/Scene":3,"../framework/SceneManager":4,"../framework/Tools/Drawings":5,"../framework/Tools/constants":7,"./GameScene":8}],10:[function(e,t,n){"use strict";n.__esModule=!0;var o=e("./framework/Game"),i=e("./game/IntroScene"),r=e("./framework/SceneManager");window.onload=function(){o.SimpleGame.create({title:"Snake"}),r.SimpleSceneManager.pushScene(new i.IntroScene),o.SimpleGame.init()}},{"./framework/Game":1,"./framework/SceneManager":4,"./game/IntroScene":9}]},{},[10]);
//# sourceMappingURL=SimpleGame.js.map
