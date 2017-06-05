//start after strict loss
var power = false;
var strict = false;
var playerPlay = false;
var playCount = 0;
var computerCount = 0;
var delay = 1000;
var computerPlays = [];
var playerMoves = [];
var beep = 0;
var arc0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var arc1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var arc2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var arc3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

function addMove(){
  var btn = Math.floor(Math.random() * 4);
  computerPlays.push(btn);
  if(computerPlays.length<10){
    $('#display').text('0'+computerPlays.length);
  }else{
    $('#display').text(computerPlays.length);
  }
}

function checkPlay(){
  //player got it wrong
  if(computerPlays[playCount-1] !== playerMoves[playCount-1]){
    if(strict){
      init();
      setTimeout(function(){
        $('#display').html('OV');
      },500);    
    }else{
      playPattern(delay);
    }  
    playCount=0;
    playerMoves=[];
    playerPlay = false;
  //player gets it right and pattern length complete
  }else if(computerPlays.length<20 && computerPlays.length === playCount && computerPlays[playCount-1] === playerMoves[playCount-1]){
    playerMoves = [];
    playerPlay = false;
    playCount = 0;
    playPattern(delay);
    addMove();
  }else if(computerPlays.length ===20 && computerPlays.length === playCount && computerPlays[playCount-1] === playerMoves[playCount-1]){
    setTimeout(function(){
        $('#display').html('WN');
      },500); 
    init();
  }
}

function playPattern(delay){
  var i = 0;
  var soundOff = setInterval(function(){
    btnPress('arc'+ computerPlays[i]);
    setTimeout(function(){
      btnLift('arc'+computerPlays[i])
      i++;
    },400)
  },delay);
  if(i>computerPlays.length){
    clearInterval(soundOff);   
  };
  computerCount++;
}

function init(){
  playerPlay = false;
  computerPlays = [];
  playerMoves = [];
  playCount = 0;
  $('#arc0').addClass('arc0Off').removeClass('arc0');
  $('#arc1').addClass('arc1Off').removeClass('arc1');
  $('#arc2').addClass('arc2Off').removeClass('arc2');
  $('#arc3').addClass('arc3Off').removeClass('arc3');
  $('#display').html('--');
}

function btnPress(btn){
      switch (btn){
        case 'arc0':
          arc0.play();
          break;
        case 'arc1':
          arc1.play();
          break;
        case 'arc2':
          arc2.play();
          break;
        case 'arc3':
          arc3.play();
          break;
      }  
  $('#'+btn).addClass(btn+'On').removeClass(btn+'Off');
}

function btnLift(btn){
  $('#'+btn).addClass(btn+'Off').removeClass(btn+'On');
  if(!playerPlay && computerCount === computerPlays.length){
    computerCount = 0; 
    playerPlay = !playerPlay;
  }else if(!playerPlay && computerCount < computerPlays.length){
    computerCount++;
  }
}

$(document).ready(function(){
  $('#arc0,#arc1,#arc2,#arc3').mousedown(function(el){
    if(power){
      var btn = this.id;
      btnPress(btn);
      if(playerPlay){
        playerMoves.push(parseInt(btn[btn.length-1]));
        playCount++;
      }
    }
  })
  
  $('#arc0,#arc1,#arc2,#arc3').mouseup(function(el){
    if(power){
      var btn = this.id;
      btnLift(btn);
      
      if(playerPlay){
        checkPlay();  
      }
    }
  })

  $("#switch").on("click", function(){
    if(power === false){
      init();
      $('#switchBtn')
        .css('left','28px')
        .css('box-shadow','-1px 1px 2px 1px #2975B7')
        .css('-webkit-box-shadow','-1px 1px 2px 1px #2975B7')
        .css('-mox-box-shadow','-1px 1px 2px 1px #2975B7');  
      $('#strictLight').addClass('strictLightOff').removeClass('strictLight');
    }else{
      $('#switchBtn')
        .css('left','2px')
        .css('box-shadow','3px 1px 2px 1px #2975B7')
        .css('-webkit-box-shadow','3px 1px 2px 1px #2975B7')
        .css('-mox-box-shadow','3px 1px 2px 1px #2975B7');
      $('#display').html('&nbsp;&nbsp;');
      $('#strictLight').addClass('strictLight').removeClass('strictLightOff').removeClass('strictLightOn');
      $('#arc0').addClass('arc0').removeClass('arc0Off');
      $('#arc1').addClass('arc1').removeClass('arc1Off');
      $('#arc2').addClass('arc2').removeClass('arc2Off');
      $('#arc3').addClass('arc3').removeClass('arc3Off');
    }
    power= !power;
  });

  // game restarts if player gets a button wrong
  $("#strict").on('click', function(){
    if(power){
      if(!strict){
        $('#strictLight').addClass('strictLightOn').removeClass('strictLightOff');
      }else{
        $('#strictLight').addClass('strictLightOff').removeClass('strictLightOn');
      }
      strict = !strict;  
    }
  })

  $('#start').on('click',function(){
    if(power){
      if(computerPlays.length>0){
        init();  
      }
      addMove();
      playPattern(delay);
    }
  })
});