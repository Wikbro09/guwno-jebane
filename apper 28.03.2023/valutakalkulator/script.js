var nokUsd = 8;
var nokEnp = 12;
var nokEur = 10;

window.onload = winInit;
function winInit(){
    console.log("help");
	document.getElementById("convert").onclick = convert;
    document.getElementById("nok").onchange = convert;
    document.getElementById("conUSD").onclick = converttoUSD;
    document.getElementById("conENP").onclick = converttoENP;
    document.getElementById("conEUR").onclick = converttoEUR;
    document.getElementById("update").onclick = update;

    document.getElementById("kursUsd").innerHTML = "1 USD ($) = " + nokUsd + " NOK";
    document.getElementById("kursEnp").innerHTML = "1 ENP (£) = " + nokEnp + " NOK";
    document.getElementById("kursEur").innerHTML = "1 EUR (€) = " + nokEur + " NOK";
}

function convert() {
    var nok = parseFloat(document.getElementById("nok").value);
    console.log("kr. =", nok);

    var usdfromnok = nok / nokUsd;
    usdfromnok = usdfromnok.toFixed(2);
    document.getElementById("usd").value = usdfromnok;

    var enpfromnok = nok / nokEnp;
    enpfromnok = enpfromnok.toFixed(2);
    document.getElementById("enp").value = enpfromnok;

    var eurfromnok = nok / nokEur;
    eurfromnok = eurfromnok.toFixed(2);
    document.getElementById("eur").value = eurfromnok;
}

function converttoUSD() {
    var usd = parseFloat(document.getElementById("usd").value);
    console.log("$ =", usd);
    document.getElementById("nok").value = usd + "$ =" + usd * nokUsd + "kr";
}

function converttoENP() {
    var enp = parseFloat(document.getElementById("enp").value);
    console.log("£ =", enp);
    document.getElementById("nok").value = enp + "£ =" + enp * nokEnp + "kr";
}

function converttoEUR() {
    var eur = parseFloat(document.getElementById("eur").value);
    console.log("€ =", eur);
    document.getElementById("nok").value = eur + "€ =" + eur * nokEur + "kr";
}

function update() {
    console.log(nokUsd, nokEnp, nokEur);
    winInit;
}