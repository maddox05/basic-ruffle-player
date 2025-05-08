"use strict";
//time in seconds from window.onload
var time_playing = -1;
var topScore=0;
function on_window_load() {
}
function on_level_start() {
}
function on_game_tick() {
    //console.log("on_tick");
}
function on_press_down() {
    //console.log("on_press_down");
}
function on_press_up() {
    //console.log("on_press_up");
}
function on_lose() {
}
function on_win() {

var ach=false;
var ach_numb=[];
if(game.current_level>19){
ach=true;
ach_numb.push("spiral_roll_vbvit004");
}
if(game.current_level>14){
ach=true;
ach_numb.push("spiral_roll_vbvit003");
}
if(game.current_level>9){
ach=true;
ach_numb.push("spiral_roll_vbvit002");
}
if(game.current_level>4){
ach=true;
ach_numb.push("spiral_roll_vbvit001");
}
if(ach){
LaggedAPI.Achievements.save(ach_numb, function(response) {
if(response.success) {
console.log('achievement saved')
}else {
console.log(response.errormsg);
}
});
}

}

function on_win_panel_open(){

  if(topScore<game.RECORD||topScore<game.SCORE){
  topScore=game.RECORD;
  if(game.SCORE>game.RECORD){
  topScore=game.SCORE;
  }

  var boardinfo={};
  boardinfo.score=topScore;
  boardinfo.board="spiral_roll_hsbdezr";
    LaggedAPI.Scores.save(boardinfo, function(response) {
    if(response.success) {
    console.log('high score saved')
    }else {
    console.log(response.errormsg);
    }
    });

  }

    LaggedAPI.APIAds.show('interstitial','spiral-roll','spiral-roll-game.jpg',function(response) {
    console.log('ad finished');
    });
}

function on_lose_panel_open(){

  LaggedAPI.APIAds.show('interstitial','spiral-roll','spiral-roll-game.jpg',function(response) {
  console.log('ad finished');
  });

}

function on_press_logo() {
    window.open("https://lagged.com");
}
