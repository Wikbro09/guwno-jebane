/* Her kommer globale variablar */

var pjsonstring, p1jsonstring, p2jsonstring;
var spillerno1, spillerno2;
var spillernoSRC;

var erIListe = 0;
var spillerIListe;

/* Her kommer koden som bestemmer kva skjer når */

window.onload = winInit;
function winInit(){
    gel("playliste1").onclick    = lastInnListe1;
    gel("playliste2").onclick    = lastInnListe2;
    gel("gjømPlaylisteInnhald").onclick = lastInnLister;

    gel("spillerno").onended     = nesteLåt;
}

/* Her kommer koden som lagar forenkla metoder */

function gel(id){
	return document.getElementById(id);
}
function cLog(log){
    return console.log(log);
}
function lastInn(fil) {
    return fetch(fil).then((response) => response.text() );
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/* Her kommer koden som gjer ting */

async function lastInnLister() {
    erIListe = 0;
    gel("gjømPlaylisteInnhald").style.visibility = "hidden";
    gel("playlisteNo").innerHTML = "";
    gel("midContentLabel").innerHTML = "Playlister";
    cLog("Viser spillelister...")
}
async function lastInnListe1() {
    gel("playlisteNo").innerHTML = "";
    gel("gjømPlaylisteInnhald").style.visibility = "visible";
    cLog("Liste lader inn..");
    pjsonstring = JSON.parse(await lastInn('../soundify/playlists/playlists.json').then(cLog("Lastet inn playlists.json")));
    p1jsonstring = JSON.parse(await lastInn("../soundify/playlists/playlist_1/playlist_1.json").then(cLog("Lastet inn playliste ")));
    
    gel("midContentLabel").innerHTML = "Viser nå: " + pjsonstring.playlister[0].namn;
    gel("playlisteNo").innerHTML = "<div class='midCCbox'><button onclick = startRandom(1)><img src='../soundify/playlists/covers/shuffle.png'><br><b>Random låt</b></button></div>";
    let htmlcode = ""
    for(i = 0; i < p1jsonstring.songs.length;i++) {
        htmlcode ="<div class='midCCbox'><button onclick = startSang("+i+") id='sang"+i+"'><img src='"+p1jsonstring.songs[i].coverimg+"'><br><b>"+p1jsonstring.songs[i].tittel+"</b></button></div>";
        gel("playlisteNo").innerHTML += htmlcode;
    }
    erIListe = 1;
}
async function lastInnListe2() {
    gel("playlisteNo").innerHTML = "";
    gel("gjømPlaylisteInnhald").style.visibility = "visible";
    cLog("Liste lader inn..");
    pjsonstring = JSON.parse(await lastInn('../soundify/playlists/playlists.json').then(cLog("Lastet inn playlists.json")));
    p2jsonstring = JSON.parse(await lastInn("../soundify/playlists/playlist_2/playlist_2.json").then(cLog("Lastet inn playliste ")));
    
    gel("midContentLabel").innerHTML = "Viser nå: " + pjsonstring.playlister[1].namn;
    gel("playlisteNo").innerHTML = "<div class='midCCbox'><button onclick = startRandom(2)><img src='../soundify/playlists/covers/shuffle.png'><br><b>Random låt</b></button></div>";

    let htmlcode = ""
    for(ii = 0; ii < p2jsonstring.songs.length;ii++) {
        htmlcode ="<div class='midCCbox'><button onclick = startSangTo("+ii+") id='sangTo"+ii+"'><img src='"+p2jsonstring.songs[ii].coverimg+"'><br><b>"+p2jsonstring.songs[ii].tittel+"</b></button></div>";
        gel("playlisteNo").innerHTML += htmlcode;
    }
    erIListe = 2;
}

async function startSang(sangnr) {
    spillerIListe = 1;
    spillerno1 = sangnr;
    gel("sangtittel").innerHTML = p1jsonstring.songs[sangnr].tittel;
    gel("artistdisplay").innerHTML = p1jsonstring.songs[sangnr].artist;
    gel("coverNO").src = p1jsonstring.songs[sangnr].coverimg;
    spillernoSRC = "playlists/playlist_1/songs/" + p1jsonstring.songs[sangnr].src;
    cLog("lydfil: "+spillernoSRC);
    gel("spillerno").setAttribute("src", spillernoSRC);
}
async function startSangTo(sangnr) {
    spillerIListe = 2;
    spillerno2 = sangnr;
    cLog(sangnr+"tekst")
    gel("sangtittel").innerHTML = p2jsonstring.songs[sangnr].tittel;
    gel("artistdisplay").innerHTML = p2jsonstring.songs[sangnr].artist;
    gel("coverNO").src = p2jsonstring.songs[sangnr].coverimg;
    spillernoSRC = "playlists/playlist_2/songs/" + p2jsonstring.songs[sangnr].src;
    cLog("lydfil: "+spillernoSRC);
    gel("spillerno").setAttribute("src", spillernoSRC);
}

function nesteLåt() {
    if (spillerIListe == 1 && loop2.checked == true)
    {
        if (spillerno1 == p1jsonstring.songs.length && loop1.checked == true)
        {
            spillerno1 = 0;
            startSang(spillerno1);
        }
        else if (spillerno1 < p1jsonstring.songs.length-1)
        {
            startSang(spillerno1+1);
            cLog(spillerno1)
        }
    }
    else if (spillerIListe == 2 && loop2.checked == true)
    {
        if (spillerno2 == p2jsonstring.songs.length && loop1.checked == true)
        {
            spillerno2 = -1;
            startSangTo(spillerno2+1);
        }
        else if (spillerno2 < p2jsonstring.songs.length)
        {
            startSangTo(spillerno2+1);
        }
    }
}
function startRandom(iListe) {
    if (iListe == 1)
    {
        gel("spillerno").onended = startSang(getRandomInt(p1jsonstring.songs.length));
    }
    else if (iListe == 2)
    {
        gel("spillerno").onended = startSangTo(getRandomInt(p2jsonstring.songs.length));
    }
}