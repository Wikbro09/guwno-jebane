// Globale variablar
var ninefive = 9/5;
var fivenine = 5/9;
var exchangecount = 0;

window.onload = WinInit;
function WinInit() {
    document.getElementById("celciuscounter").onchange = toFarenheit;
    document.getElementById("farenheitcounter").onchange = toCelcius;
}

function toFarenheit() {
    exchangecount++;
    var farenheit = parseFloat(document.getElementById("celciuscounter").value);
    farenheit = farenheit * ninefive + 32;
    farenheit = farenheit.toFixed(2);
    console.log(exchangecount, farenheit);
    document.getElementById("farenheitcounter").value = farenheit;
}
function toCelcius() {
    exchangecount++;
    var celcius = parseFloat(document.getElementById("farenheitcounter").value);
    celcius = celcius - 32;
    celcius = celcius * fivenine;
    celcius = celcius.toFixed(2);
    console.log(exchangecount, celcius);
    document.getElementById("celciuscounter").value = celcius;
}