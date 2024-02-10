// ==UserScript==
// @name         Royal Fish Hunt Weekly Contest
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  try to take over the world!
// @author       You
// @match        http://www.goldtokens.net/rankings/royal-fish-hunt*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=goldtokens.net
// @updateURL    https://github.com/TomotechLI/FishHunt/blob/main/tampermonkey.js
// @downloadURL  https://github.com/TomotechLI/FishHunt/blob/main/tampermonkey.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var menu = document.querySelector("#fullblock > table > tbody > tr:nth-child(1)");
var jt_column=document.createElement('th');
jt_column.setAttribute("name", "diff");
jt_column.innerHTML = "<b>Difference</b>";
menu.appendChild(jt_column);

var tbody = document.querySelector("#fullblock > table > tbody");
var children = tbody.children;
for (var i = 0; i < children.length; i++) {
  var tableChild = children[i];
tableChild.setAttribute("id", "player"+[i]);
}
menu.removeAttribute("id");
var els = document.querySelectorAll('[id*="player"]')
Array.prototype.forEach.call(els, function(el) {

var difference=document.createElement('td');
difference.setAttribute("name", "diff");
difference.innerHTML = "<b>0</b>";
el.appendChild(difference);

var children = el.children;
for (var i2 = 0; i2 < children.length; i2++) {
  var tableChild = children[i2];
tableChild.setAttribute("id", "score_data"+[i2]);
}
});
menu.setAttribute("id", "player0");
menu.setAttribute("wc_points", 0);
var wc_values = document.querySelectorAll('[id*="score_data2"]')
for (var i3 = 0, l = wc_values.length; i3 < l; i3++) {
  var el = wc_values[i3];
var wc_points = el.innerText;
el.parentElement.setAttribute("wc_points", wc_points);
}
var wc_difference = document.querySelectorAll('[id*="player"]');
var len = wc_difference.length;
for (var i4 = 0, l2 = wc_difference.length; i4 < l2; i4++) {
  var x1 = wc_difference[i4];

var wc_old = wc_difference[(i4+len-1)%len].getAttribute("wc_points");
var wc_new = x1.getAttribute("wc_points");

if(wc_old !== null && wc_old !== null){

var wc_total = Math.abs(wc_old - wc_new);
x1.setAttribute("wc_diff", wc_total);

}
var p1= document.querySelector("#player1");
p1.setAttribute("wc_diff", "0");
}
var passes = document.querySelectorAll('[id="score_data5"]')
Array.prototype.forEach.call(passes, function(pass) {
pass.innerText = pass.parentElement.getAttribute("wc_diff");
});
const conditions = ["BellaLuna35", "Takarra", "Kelly Huntsman","kev Admiral"];
var wc_bgcolor = document.querySelectorAll('[id*="player"]');
for (var i5 = 0, l5 = wc_bgcolor.length; i5 < l5; i5++) {
var y1 = wc_bgcolor[i5];

if (conditions.some(el => y1.innerText.includes(el))){
y1.setAttribute("textcolor", "DarkOrchid");
y1.style.color = "#A569BD";
y1.setAttribute("bgcolor", "pink");
y1.setAttribute("style", "font-weight:bold");
}}

var da_table = document.querySelector("#fullblock > table");
var wc_content = document.querySelector("#content");
var tablediv = document.createElement('div');
tablediv.setAttribute("id", "tablediv");
wc_content.appendChild(tablediv);
tablediv.appendChild(da_table);


var topnav = document.querySelector("#topnav").setAttribute("wc_remove", "");
var fullblock = document.querySelector("#header").setAttribute("wc_remove", "");
var nav = document.querySelector("#nav").setAttribute("wc_remove", "");
var call2action = document.querySelector("#calltoaction").setAttribute("wc_remove", "");
var footer = document.querySelector("#footer").setAttribute("wc_remove", "");
var block = document.querySelector("#content > div:nth-child(2)").setAttribute("wc_remove", "");
var els5 = document.querySelectorAll('[wc_remove]')
Array.prototype.forEach.call(els5, function(el5) {
el5.style.display = 'none';
});

})();
