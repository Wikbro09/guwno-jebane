// Globale variablar og OnLoad
var NOK, USD, EUR, GBP, PLN;
var valJson;

window.onload = startTing;
function startTing() {
    gel("startSide").onclick = lastInnSide;
    gel("inputNOK").style.display = "none";
    gel("inputNOK").onchange = konverter;
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
    gel("startSide").style.display = "none";
    gel("inputNOK").style.display = "block";
    valJson = JSON.parse(await lastInn("../valutakalkulator2/valutainfo.json").then(cLog("Lastet inn external info")));
    gel("mid").innerHTML = "";
    cLog(valJson);
    cLog(valJson.valutaer.length)
    for (i=0;i<valJson.valutaer.length;i++)
    {
        gel("mid").innerHTML += "<div class='midcontent' id='div"+valJson.valutaer[i].forkortelse+"'><h3>"+valJson.valutaer[i].forkortelse+"</h3><i id='verdi"+valJson.valutaer[i].forkortelse+"'>1 "+valJson.valutaer[i].forkortelse+" = "+valJson.valutaer[i].enNokErlik+" NOK</i><br><br><input type='number' id='konvertert"+valJson.valutaer[i].forkortelse+"'><br><button onclick=konverterTilNOK("+i+")>Konverter frå "+valJson.valutaer[i].forkortelse+"</button>";
    }
}

function konverter() {
    sjekkForNegativ();
    NOK = parseFloat(gel("inputNOK").value).toFixed(2);

    USD = NOK / valJson.valutaer[0].enNokErlik;
    USD = USD.toFixed(2);
    EUR = NOK / valJson.valutaer[1].enNokErlik;
    EUR = EUR.toFixed(2);
    GBP = NOK / valJson.valutaer[2].enNokErlik;
    GBP = GBP.toFixed(2);
    PLN = NOK / valJson.valutaer[3].enNokErlik;
    PLN = PLN.toFixed(2);

    gel("konvertertUSD").value = USD;
    console.log(NOK, "NOK =", USD, "USD");
    gel("konvertertEUR").value = EUR;
    console.log(NOK, "NOK =", EUR, "EUR");
    gel("konvertertGBP").value = GBP;
    console.log(NOK, "NOK =", GBP, "GBP");
    gel("konvertertPLN").value = PLN;
    console.log(NOK, "NOK =", PLN, "PLN");
}
function konverterTilNOK(frå) {
    sjekkForNegativ();
    if (frå == 0)
    {
        USD = parseFloat(gel("konvertertUSD").value).toFixed(2);
        NOK = USD * valJson.valutaer[0].enNokErlik;
        gel("inputNOK").value = NOK;
        console.log(USD, "USD =", NOK, "USD");
    }
    if (frå == 1)
    {
        EUR = parseFloat(gel("konvertertEUR").value).toFixed(2);
        NOK = EUR * valJson.valutaer[1].enNokErlik;
        gel("inputNOK").value = NOK;
        console.log(EUR, "EUR =", NOK, "EUR");
    }
    if (frå == 2)
    {
        GBP = parseFloat(gel("konvertertGBP").value).toFixed(2);
        NOK = GBP * valJson.valutaer[2].enNokErlik;
        gel("inputNOK").value = NOK;
        console.log(GBP, "GBP =", NOK, "NOK");
    }
    if (frå == 3)
    {
        PLN = parseFloat(gel("konvertertPLN").value).toFixed(2);
        NOK = PLN * valJson.valutaer[3].enNokErlik;
        gel("inputNOK").value = NOK;
        console.log(PLN, "PLN =", NOK, "NOK");
    }
}
function sjekkForNegativ() {
    if (gel("inputNOK").value < 0 || gel("konvertertUSD").value < 0 || gel("konvertertEUR").value < 0 || gel("konvertertGBP").value < 0)
    {
        gel("inputNOK").value = 0;
        gel("konvertertUSD").value = 0;
        gel("konvertertEUR").value = 0;
        gel("konvertertGBP").value = 0;
    }
}