var filinnhold = [];
var norskInnhold = [];
var engelskInnhold = [];
var linjer = [];
var felt = [];

window.onload = winInit;
function winInit(){
	elGetId("lastInnCSV").onclick = lesFil;
    elGetId("noInput").onchange = finnEngelskOrd;
    elGetId("enInput").onchange = finnNorskOrd;
}
function elGetId(idName){
	return document.getElementById(idName);
}
function lastInn(file) {
    return fetch(file).then((response) => response.text() );
}
function filLest() {
    console.log("Ordlista er allereide lasta inn");
}
async function lesFil() {
    elGetId("lastInnCSV").onclick = filLest;
    console.log("loading");
    var tall = Math.random;
	filinnhold = await lastInn('the_list.csv?'+tall);
    console.log("done");
	visInnhold();
}
function visInnhold(){
	linjer = filinnhold.split('\n');
    for (var i=1;i<linjer.length;i++) {
        felt = linjer[i].split(";");
        
        norskInnhold.push(felt[0]);
        engelskInnhold.push(felt[1].replace("\r", ""));
    }
    elGetId('no').innerHTML = norskInnhold.join('<br>');
    elGetId('en').innerHTML = engelskInnhold.join('<br>');

    console.log(norskInnhold.length);
    console.log(engelskInnhold.length);
}
function finnEngelskOrd() {
    var currentNo = elGetId("noInput").value;
    currentNo = currentNo.toLowerCase();
    var errorCount = 0;
    for (i=0;i<norskInnhold.length;i++) {
        if (currentNo == norskInnhold[i].toLowerCase() || currentNo == norskInnhold[i])
            elGetId('enInput').value = engelskInnhold[i];
        else
            errorCount++;
    }
    if (errorCount > norskInnhold.length-1)
        elGetId('enInput').value = "Not found";
}
function finnNorskOrd() {
    var currentEn = elGetId("enInput").value;
    currentEn = currentEn.toLowerCase();
    var errorCount = 0;
    for (i=0;i<engelskInnhold.length;i++) {
        if (currentEn == engelskInnhold[i].toLowerCase() || currentEn == engelskInnhold[i])
            elGetId('noInput').value = norskInnhold[i];
        else
            errorCount++;
    }
    if (errorCount > engelskInnhold.length-1)
        elGetId('noInput').value = "Ikkje funnet";
}