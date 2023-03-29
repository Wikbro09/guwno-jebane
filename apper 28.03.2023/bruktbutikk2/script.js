// Globale variablar og OnLoad
var vareJson;
var totalLaptop, totalPC, totalSkjerm, totalTOM;
var totalPris = 0, totalVarer = 0;

window.onload = startTing;
function startTing() {
    lastInnSide();
    gel("nykunde").onclick = nyKunde;
    gel("resetval").onclick = resetVal;
    gel("tilbetaling").onclick = tilBetaling;
}

// Hjelpefuksjonar
function gel(id){
	return document.getElementById(id);
}
function cLog(log){
    return console.log(log);
}
function lastInn(fil) {
    return fetch(fil).then((response) => response.text() );
}

// Aktuell kode
async function lastInnSide() {
    vareJson = JSON.parse(await lastInn("vareinfo.json").then(cLog("Lastet inn vareinfo.json")));
    gel("mid").innerHTML = "";
    for (i=0;i<vareJson.varer.length;i++)
    {
        gel("mid").innerHTML += "<div class='midcontent' id='"+vareJson.varer[i].forkortelse+"div'><h3>"+vareJson.varer[i].varenamn+"</h3><p>"+vareJson.varer[i].pris+" kr</p><input id='"+vareJson.varer[i].forkortelse+"antal' type='number' placeholder='Antall bestillt:' onchange=kalkulerTotal()>";
    }
}
function kalkulerTotal() {
    sjekkForNegativ(); 
}
function sjekkForNegativ() {
    if (gel("lapantal").value < 0)
    {
        gel("lapantal").value = 0;
    }
    if (gel("spcantal").value < 0)
    {
        gel("spcantal").value = 0;
    }
    if (gel("skjantal").value < 0)
    {
        gel("skjantal").value = 0;
    }
    if (gel("tomantal").value < 0)
    {
        gel("tomantal").value = 0;
    }
}

function nyKunde() {

}
function resetVal() {
    
}
function tilBetaling() {
    gel("errormsg").innerHTML = "Våre serverar er nede, du må vente med bestilling."
}