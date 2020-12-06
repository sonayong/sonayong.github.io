$(function() {

   var scroll = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback) {
         window.setTimeout(callback, 1000 / 60)
      }
   
   var $box = $(".box"), 
       $container = $(".scroll-container");
   
   var boxHeight = $box.height() + parseInt($box.css("margin-top"));
   
   function update() {
      var scrollTop = $container.scrollTop();
      
      var index = Math.floor(scrollTop / boxHeight);
      var $currentBox = $container.find(".box[data-index='" + index + "']");
      
      $currentBox.removeClass("inactive");
      $(".box").not($currentBox).addClass("inactive");

      var sc = scrollTop - index * boxHeight;
      var scale = 1 - (sc / boxHeight);

      $currentBox.css({
         transform: 'scaleY(' + scale + ')'//,
         // "opacity": scale
      });

      scroll(update);
   }

   window.addEventListener('load', update, false);

});

// $(function() {

//    var scroll = window.requestAnimationFrame ||
//       window.webkitRequestAnimationFrame ||
//       window.mozRequestAnimationFrame ||
//       window.msRequestAnimationFrame ||
//       window.oRequestAnimationFrame ||
//       function(callback) {
//          window.setTimeout(callback, 1000 / 60)
//       }
   
//    var $box = $(".box"), 
//        $container = $(".scroll-container");
   
//    var boxHeight = $box.height() + parseInt($box.css("margin-top"));
   
//    function update() {
//       var scrollTop = $container.scrollTop();
      
//       var index = Math.floor(scrollTop / boxHeight);
//       var $currentBox = $container.find(".box[data-index='" + index + "']");
      
//       $currentBox.removeClass("inactive");
//       $(".box").not($currentBox).addClass("inactive");

//       var sc = scrollTop - index * boxHeight;
//       var scale = 1 - (sc / boxHeight);

//       $currentBox.css({
//          transform: 'scaleX(' + scale + ')'//,
//          // "opacity": scale
//       });

//       scroll(update);
//    }

//    window.addEventListener('load', update, false);

// });


// language change

var Messenger = function(el){
  'use strict';
  var m = this;
  
  m.init = function(){
    m.codeletters = "/#*+%?£@§$";
    m.message = 0;
    m.current_length = 0;
    m.fadeBuffer = false;
    m.messages = [
      '<img class="text-img" src="http://1-2-3-4-5.studio/client/apartopia/sourcebox/desktop_main_01.png">',
    ];
    
    setTimeout(m.animateIn, 550);
  };
  
  m.generateRandomString = function(length){
    var random_text = '';
    while(random_text.length < length){
      random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
    } 
    
    return random_text;
  };
  
  m.animateIn = function(){
    if(m.current_length < m.messages[m.message].length){
      m.current_length = m.current_length + 2;
      if(m.current_length > m.messages[m.message].length) {
        m.current_length = m.messages[m.message].length;
      }
      
      var message = m.generateRandomString(m.current_length);
      $(el).html(message);
      
      setTimeout(m.animateIn, 35);
    } else { 
      setTimeout(m.animateFadeBuffer, 50);
    }
  };
  
  m.animateFadeBuffer = function(){
    if(m.fadeBuffer === false){
      m.fadeBuffer = [];
      for(var i = 0; i < m.messages[m.message].length; i++){
        m.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: m.messages[m.message].charAt(i)});
      }
    }
    
    var do_cycles = false;
    var message = ''; 
    
    for(var i = 0; i < m.fadeBuffer.length; i++){
      var fader = m.fadeBuffer[i];
      if(fader.c > 0){
        do_cycles = true;
        fader.c--;
        message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
      } else {
        message += fader.l;
      }
    }
    
    $(el).html(message);
    
    if(do_cycles === true){
      setTimeout(m.animateFadeBuffer, 70);
    } else {
      setTimeout(m.cycleText, 2000);
    }
  };
  
  m.cycleText = function(){
    m.message = m.message + 1;
    if(m.message >= m.messages.length){
      m.message = 0;
    }
    
    m.current_length = 0;
    m.fadeBuffer = false;
    $(el).html('');
    
    setTimeout(m.animateIn, 330);
  };
  
  m.init();
}

console.clear();
var messenger = new Messenger($('#messenger'));


// preloader

$(document).ready(function(){
   var Body = $('body');
   Body.addClass('preloader-site');
});

$(window).load(function() {
   $('.preloader-wrapper').delay(4000).fadeOut();
   $('body').removeClass('preloader-site');
});
