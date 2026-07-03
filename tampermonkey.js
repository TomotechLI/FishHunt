// ==UserScript==
// @name         Royal Fish Hunt Weekly Contest
// @namespace    http://tampermonkey.net/
// @version      1.4.1.0
// @description  try to take over the world!
// @author       Tomotechli
// @match        https://www.goldtokens.net/rankings/royal-fish-hunt*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=goldtokens.net
// @updateURL    https://github.com/TomotechLI/FishHunt/raw/main/tampermonkey.js
// @downloadURL  https://github.com/TomotechLI/FishHunt/raw/main/tampermonkey.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function runScript() {
        var menu = document.querySelector("#fullblock > table > tbody > tr:nth-child(1)");
        if (!menu) return false;

        var jt_column = document.createElement('th');
        jt_column.setAttribute("name", "diff");
        jt_column.innerHTML = "<b>Difference</b>";
        menu.appendChild(jt_column);

        var tbody = document.querySelector("#fullblock > table > tbody");
        var children = tbody.children;
        for (var i = 0; i < children.length; i++) {
            var tableChild = children[i];
            tableChild.setAttribute("id", "player" + [i]);
        }
        menu.removeAttribute("id");
        var els = document.querySelectorAll('[id*="player"]');
        Array.prototype.forEach.call(els, function(el) {
            var difference = document.createElement('td');
            difference.setAttribute("name", "diff");
            difference.innerHTML = "<b>0</b>";
            el.appendChild(difference);

            var children = el.children;
            for (var i2 = 0; i2 < children.length; i2++) {
                var tableChild = children[i2];
                tableChild.setAttribute("id", "score_data" + [i2]);
            }
        });
        menu.setAttribute("id", "player0");
        menu.setAttribute("wc_points", 0);

        var wc_values = document.querySelectorAll('[id*="score_data2"]');
        for (var i3 = 0, l = wc_values.length; i3 < l; i3++) {
            var el = wc_values[i3];
            var wc_points = el.innerText;
            el.parentElement.setAttribute("wc_points", wc_points);
        }

        var wc_difference = document.querySelectorAll('[id*="player"]');
        var len = wc_difference.length;
        for (var i4 = 0, l2 = wc_difference.length; i4 < l2; i4++) {
            var x1 = wc_difference[i4];
            x1.classList.add("player_data");
            var wc_old = wc_difference[(i4 + len - 1) % len].getAttribute("wc_points");
            var wc_new = x1.getAttribute("wc_points");

            if (wc_old !== null && wc_new !== null) {
                var wc_total = Math.abs(wc_old - wc_new);
                x1.setAttribute("wc_diff", wc_total);
            }

            var p1 = document.querySelector("#player1");
            if (p1) p1.setAttribute("wc_diff", "0");
        }

        var passes = document.querySelectorAll('[id="score_data5"]');
        Array.prototype.forEach.call(passes, function(pass) {
            pass.innerText = pass.parentElement.getAttribute("wc_diff");
        });

        var style = document.createElement('style');
        style.textContent = `
            @keyframes bellaSakuraGlow {
                0%   { box-shadow: 0 0 4px 1px rgba(165, 105, 189, 0.5); }
                50%  { box-shadow: 0 0 16px 6px rgba(165, 105, 189, 0.9); }
                100% { box-shadow: 0 0 4px 1px rgba(165, 105, 189, 0.5); }
            }
            .bella-sakura-highlight {
                animation: bellaSakuraGlow 1.8s ease-in-out infinite;
                position: relative;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);

        const conditions = ["Bella Sakura"];
        var wc_bgcolor = document.querySelectorAll('[id*="player"]');
        for (var i5 = 0, l5 = wc_bgcolor.length; i5 < l5; i5++) {
            var y1 = wc_bgcolor[i5];
            if (conditions.some(el => y1.innerText.includes(el))) {
                y1.setAttribute("textcolor", "DarkOrchid");
                y1.style.color = "#A569BD";
                y1.setAttribute("bgcolor", "pink");
                y1.style.fontWeight = "bold";
                y1.classList.add("bella-sakura-highlight");
            }
        }

        var da_table = document.querySelector("#fullblock > table");
        var wc_content = document.querySelector("#content");
        if (da_table && wc_content) {
            var tablediv = document.createElement('div');
            tablediv.setAttribute("id", "tablediv");
            wc_content.appendChild(tablediv);
            tablediv.appendChild(da_table);
        }

        [
            "#topnav",
            "#header",
            "#nav",
            "#calltoaction",
            "#footer",
            "#content > div:nth-child(2)"
        ].forEach(function(sel) {
            var elToHide = document.querySelector(sel);
            if (elToHide) elToHide.setAttribute("wc_remove", "");
        });
        var els5 = document.querySelectorAll('[wc_remove]');
        Array.prototype.forEach.call(els5, function(el5) {
            el5.style.display = 'none';
        });

        return true;
    }

    if (runScript()) return;

    var observer = new MutationObserver(function() {
        if (runScript()) {
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();