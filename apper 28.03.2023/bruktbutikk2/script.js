// Globale variablar og OnLoad
var vareJson;
var totalLaptop, totalPC, totalSkjerm, totalTOM;
var antalLaptop, antalPC, antalSkjerm, antalTOM;
var totalPris = 0, totalVarer = 0;
var kundenr = 1;

window.onload = startTing;
function startTing() {
    lastInnSide();
    gel("nykunde").onclick = nyKunde;
    gel("resetval").onclick = resetVal;
    gel("tilbetaling").onclick = tilBetaling;

    gel("greeting").innerHTML = "Hallo, kunde " + kundenr + "!";
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
        gel("mid").innerHTML += "<div class='midcontent' id='"+vareJson.varer[i].forkortelse+"div'><h3>"+vareJson.varer[i].varenamn+"</h3><p>"+vareJson.varer[i].pris+" kr</p><input id='"+vareJson.varer[i].forkortelse+"antal' type='number' value=0 placeholder='Antall bestillt:' onchange=kalkulerTotal()>";
    }
}
function kalkulerTotal() {
    sjekkForNegativ();
    totalPris = gel("lapantal").value * vareJson.varer[0].pris + gel("spcantal").value * vareJson.varer[1].pris + gel("skjantal").value * vareJson.varer[2].pris + gel("tomantal").value * vareJson.varer[3].pris;
    antalLaptop = parseInt(gel("lapantal").value);
    antalPC = parseInt(gel("spcantal").value);
    antalSkjerm = parseInt(gel("skjantal").value);
    antalTOM = parseInt(gel("tomantal").value);
    totalVarer = antalLaptop + antalPC + antalSkjerm + antalTOM;
    gel("tpris").innerHTML = "Totalpris = " + totalPris + " kr";
    gel("varer").innerHTML = "Total antal varer = " + totalVarer;
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
    cLog("Kunde " + kundenr + " bestiller " + gel("lapantal").value + " laptoper, " + gel("spcantal").value + " stasjonære PC-ar, " + gel("skjantal").value + " skjermar og " + gel("tomantal").value + " sett av mus og tastatur.");
    kundenr++;
    resetVal();
    gel("greeting").innerHTML = "Hallo, kunde " + kundenr + "!";
    cLog("Kunde " + kundenr + " har starta ein økt.");
}
function resetVal() {
    gel("lapantal").value = 0;
    gel("spcantal").value = 0;
    gel("skjantal").value = 0;
    gel("tomantal").value = 0;
}
function tilBetaling() {
    gel("errormsg").innerHTML = "Våre serverar er nede, du må vente med bestilling."
}