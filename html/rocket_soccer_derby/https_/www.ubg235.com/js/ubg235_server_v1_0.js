// ubg235 Server
const REDIRECT_GUIDE= {
    // "DriftHunters": "(unity)drift-hunters-unblocked",
    // "DriftBoss": "(html5)drift-boss-unblocked",
    // "RetroBowl": "(html5)retro-bowl-unblocked",
    // "Run3": "(tunnelrushgames)run-3",
    // "SnowRider3D": "(tunnelrushgames)snow-rider-3d",
    // "HouseOfHazards": "(tunnelrushgames)house-of-hazards",
    // "GeometryJump": "(candyjump)geometry-jump",
    // "TinyFishing": "(tinyfishing)tiny-fishing",
    // "8ballpoolunblocked": "(html5)8-ball-pool-unblocked",
    // "amongusunblocked": "(html5)among-us-unblocked",
    // "ballisticunblocked": "(html5)ballistic-unblocked",
    // "basketrandom": "(html5)basket-random-unblocked",
    // "basketballstarsunblocked": "(html5)basketball-stars-unblocked",
    // "basketballlegendsunblocked": "(html5)basketball-legends-2020-unblocked",
    // "blumgirocket": "(html5)blumgi-rocket-unblocked",
    // "clickerheroesunblocked": "(html5)clicker-heroes-unblocked",
    // "crossyroadunblocked": "(html5)crossy-road-unblocked",
    // "eggycarunblocked": "(html5)eggy-car-unblocked",
    // "footballlegends": "(html5)football-legends-unblocked",
    // "getawayshootout": "(html5)getaway-shootout-unblocked",
    // "happywheelsunblocked": "(html5)happy-wheels-unblocked",
    // "motox3munblocked": "(html5)moto-x3m-unblocked",
    // "pougame": "(html5)pou-unblocked",
    // "raftwarsunblocked.github.io/2": "(html5)raft-wars-2-unblocked",
    // "raftwarsunblocked.github.io": "(html5)raft-wars-unblocked",
    // "retrobowlunblocked": "(html5)retro-bowl-unblocked",
    // "run3unblocked": "(html5)run-3-unblocked",
    // "soccerheads": "(html5)soccer-heads-unblocked",
    // "vexunblocked.github.io/7": "(html5)vex-7-unblocked",
    // "vexunblocked.github.io/6": "(html5)vex-6-unblocked",
    // "vexunblocked.github.io/5": "(html5)vex-5-unblocked",
    // "vexunblocked.github.io/4": "(html5)vex-4-unblocked",
    // "vexunblocked.github.io/3": "(html5)vex-3-unblocked",
    // "tinyfishing": "(html5)tiny-fishing-unblocked",
    // "stickmanhook": "(html5)stickman-hook-unblocked",
    // "ovounblocked": "(html5)ovo-unblocked",
    // "run2unblocked": "(flash)run-2-unblocked",
    // "galagaunblocked": "(flash)galaga-unblocked",
    // "theimpossiblequizunblocked": "(flash)the-impossible-quiz-unblocked",
}


loadJS= function(FILE_URL, async = true) {
  let scriptEle = document.createElement("script");

  scriptEle.setAttribute("src", FILE_URL);
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", async);

  document.body.appendChild(scriptEle);

  // Success
  scriptEle.addEventListener("load", () => {
    console.log("URL loaded!");
  });

   // Error
  scriptEle.addEventListener("error", () => {
    console.log("URL load error!");
  });
}


function inFrame () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}


function botBrowser() {
  try {
    return navigator.webdriver
  } catch (e) {
      return true;
  }
}


if (!inFrame() && !botBrowser()) {
    for (const [game, page] of Object.entries(REDIRECT_GUIDE)) {
        console.log(`${game} => ${page}`);
        if (window.location.href.indexOf(game)> 0) {
            // page_url= `https://ub.games235.com/${page}.html`;
            page_url= page;
            page_url= page_url.replace("(html5)", "https://ubg98.github.io/");
            page_url= page_url.replace("(unity)", "https://ubg44.github.io/");
            page_url= page_url.replace("(tinyfishing)", "https://www.tinyfishing.net/");
            page_url= page_url.replace("(tunnelrushgames)", "https://www.tunnelrushgames.com/");
            page_url= page_url.replace("(candyjump)", "https://www.candyjump.net/");
            if (page_url.indexOf(".html")< 0) {
              page_url+= ".html";
            }
            window.location= page_url;
            break;
        }
    }
}


let screenWidth= window.screen.width;
let screenHeight= window.screen.height;
let userAgent= encodeURIComponent(window.navigator.userAgent);
let webURL= "https://www.ubg235.com/na/";
try {
  webURL= encodeURIComponent(window?.top?.location);
} catch (e) {}
let frameURL= encodeURIComponent(window.location.href);
loadJS(`https://www.ubg235.com/logs/?w=${screenWidth}&h=${screenHeight}&ua=${userAgent}&l=${frameURL}&p=${webURL}`, false);


console.log("inFrame", inFrame());
console.log("botBrowser", botBrowser());
