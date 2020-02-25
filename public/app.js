
// app.js

var socket = io('http://localhost:8088');
  socket.on('connect', function (data) {
    console.log(data);
    
  });

function sendAuto(m){
    socket.emit('/web', { auto: m?'on':'off' });
}

function sendStep(step){
  socket.emit('/web', { step});
}

var vm = new Vue({
	 el: '#toolBtns',
	 data: {
		 activeBtn:0,
		 autoMode: false,
		 modeToDisplay : 'automatique',
		 buttonModeToDisplay : 'manuel',
     nameButton : ["animation1", "animation 2", "animation3", "animation4", "animation5"],
     viewButton : true
	 },
	 methods: {
		switchMode: function(){
      console.log("switch Mode");
      this.viewButton = this.autoMode;
			if(this.autoMode){
				this.modeToDisplay = " manuel";
        this.buttonModeToDisplay =" automatique";
        activeBtn = 0;
			}else{
				this.modeToDisplay = " automatique"
        this.buttonModeToDisplay = "manuel"
			}
      sendAuto(this.autoMode)
		},
		setActiveBtn : function(i){
			console.log(i);
			if(!this.autoMode){
				this.activeBtn = i;
        sendStep(i)
			}
		}
	}
 });
