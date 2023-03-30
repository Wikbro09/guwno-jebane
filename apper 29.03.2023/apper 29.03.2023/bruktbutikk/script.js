var laptopcost = 1900;
var pccost = 1500;
var screencost = 600;
var inputcost = 150;

var customerNR = 1;
var totalprices = [];

window.onload = winInit;
function winInit()
{
	elGetId("laptopCount").onchange = updateTotalCost;
    elGetId("PCCount").onchange = updateTotalCost;
    elGetId("screenCount").onchange = updateTotalCost;
    elGetId("inputsCount").onchange = updateTotalCost;

    elGetId("newcustomer").onclick = NewCustomer;
    elGetId("resetchoice").onclick = ResetChoice;
    elGetId("greeting").innerHTML = "Velkommen, kunde " + customerNR + "!";

    elGetId("laptopPrice").innerHTML = "Pris: " + laptopcost + " kr"
    elGetId("PCPrice").innerHTML = "Pris: " + pccost + " kr"
    elGetId("screenPrice").innerHTML = "Pris: " + screencost + " kr"
    elGetId("inputsPrice").innerHTML = "Pris: " + inputcost + " kr"

    elGetId("totalPris").innerHTML = "Totalpris: "
    elGetId("totalAntal").innerHTML = "Antall varer: "
    elGetId("buy").onclick = BuyError;
}
function elGetId(idName){
	return document.getElementById(idName);
}
function updateTotalCost()
{
    var lCount = parseInt(elGetId("laptopCount").value);
    if (lCount < 0) {
        lCount = 0;
        elGetId("laptopCount").value = lCount;
    }
    var lTotalPrice = lCount * laptopcost;

    var pCount = parseInt(elGetId("PCCount").value);
    if (pCount < 0) {
        pCount = 0;
        elGetId("PCCount").value = pCount;
    }
    var pTotalPrice = pCount * pccost;

    var sCount = parseInt(elGetId("screenCount").value);
    if (sCount < 0) {
        sCount = 0;
        elGetId("screenCount").value = sCount;
    }
    var sTotalPrice = sCount * screencost;

    var iCount = parseInt(elGetId("inputsCount").value);
    if (iCount < 0) {
        iCount = 0;
        elGetId("inputsCount").value = iCount;
    }
    var iTotalPrice = iCount * inputcost;

    var TotalPrice = lTotalPrice + pTotalPrice + sTotalPrice + iTotalPrice;
    elGetId("totalPris").innerHTML = "Totalpris: " + TotalPrice + " kr";

    var TotalCount = lCount + pCount + sCount + iCount; 
    elGetId("totalAntal").innerHTML = "Total antal varer: " + TotalCount;

    if (TotalPrice > 0)
    {
        console.log("New total price for customer", customerNR, ":", TotalPrice);
        console.log("New total ammount for customer", customerNR, ":", TotalCount);

        totalprices.push(TotalPrice);
    }
}
function NewCustomer()
{
    var lCount = parseInt(elGetId("laptopCount").value);
    var pCount = parseInt(elGetId("PCCount").value);
    var sCount = parseInt(elGetId("screenCount").value);
    var iCount = parseInt(elGetId("inputsCount").value);

    console.log("Kunde", customerNR, "har avsluttet med", lCount, "laptopar,", pCount, "PC-ar,", sCount, "skjermar og", iCount, "sett av tastatur og mus.");
    logTotalPrices();
    customerNR++;
    elGetId("greeting").innerHTML = "Velkommen, kunde " + customerNR + "!";
    ResetChoice();
}
function ResetChoice()
{
    elGetId("laptopCount").value = "Antall bestilt:";
    elGetId("PCCount").value = "Antall bestilt:";
    elGetId("screenCount").value = "Antall bestilt:";
    elGetId("inputsCount").value = "Antall bestilt:";
    updateTotalCost();
}
function BuyError()
{
    elGetId("buyerror").innerHTML = "Serveren er nede og du kan imidlertidlig ikkje kjøpe frå oss :/";
}
function logTotalPrices()
{
    console.log(totalprices);
}