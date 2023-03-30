// Globale variablar og OnLoad
var cJson;

window.onload = lastInnVerktøy;

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
async function lastInnVerktøy() {
    cJson = JSON.parse(await lastInn("content.json").then(cLog("Lasta inn content.json")));
    gel("mid").innerHTML = "";
    var x = 1;
    for (i=0;i<cJson.verktøy.length;i++)
    {
        gel("mid").innerHTML += "<a href='"+cJson.verktøy[i].directory+"'>"+cJson.verktøy[i].namn+" V"+cJson.verktøy[i].versjon+"</a>";
        if (i ==  -1 + x*2)
        {
            x++;
            gel("mid").innerHTML += "<br><br>";
        }
    }
}