// Globale variablar og OnLoad
var nyLinjeNr = 1;
var gruppe2;

window.onload = startThings;
function startThings() {
    gel("lastInn").onclick = visGruppe;
    gel("leggtilRad").onclick = leggTilRad;
    gel("lagCustom").onclick = lagGruppe;
}

// Hjelpefunksjonar
function gel(id){
	return document.getElementById(id);
}
function cLog(log){
    return console.log(log);
}
function lastInn(fil) {
    return fetch(fil).then((response) => response.text() );
}

// Lag klasser for medlemmar og lister.
class Medlem {
    constructor(namn, alder, rolle) {
      this.namn = namn;
      this.alder = alder;
      this.rolle = rolle;
    }
}
class Medlemsliste {
    constructor(namn, medlemmar, meining) {
        this.namn = namn;
        this.medlemmar = medlemmar;
        this.meining = meining;
    }

    // Legg til ein medlem etter å ha oppretta lista.
    leggTilMedlem(medlem) {
      this.medlemmar.push(medlem);
    }
    // Få antal medlemmar frå ei liste.
    fåAntal() {
      return this.medlemmar.length;
    }
}

// Hardkoda medlemmar
let medlem1 = new Medlem("Wiktor", 17, "Kommer opp med idéar.");
let medlem2 = new Medlem("ChatGBT", 1, "Skriver 1% av koden");
let medlem3 = new Medlem("Melon", 7, "Er der når eg treng han mest.");

// Hardkoda grupper
let gruppe1 = new Medlemsliste("Beste gruppe", [medlem1, medlem2, medlem3]);


// VIS MIN GRUPPE
function visGruppe() {
    gel("lastInn").style.display = "none";
    gel("minGruppe").innerHTML += "<h2>"+gruppe1.namn+"</h2>";
    for (i=0;i<gruppe1.medlemmar.length;i++, gel("minGruppe").innerHTML += "<br>")
    {
        gel("minGruppe").innerHTML += "<div id='"+gruppe1.medlemmar[i].namn+"div'><h3>"+gruppe1.medlemmar[i].namn+"</h3><p>Alder: "+gruppe1.medlemmar[i].alder+"</p><p>Rolle: "+gruppe1.medlemmar[i].rolle+"</p></div>";
    }
    gel("minGruppe").innerHTML += "<br>";
}

// Custom gruppe ting
function lagGruppe() {
    gruppe2 = new Medlemsliste(gel("customNamn").value, []);
    for (i=0;i<nyLinjeNr;i++) {
        var test = i+1;
        var customNamnID = "customNamn"+ test;
        var customAlderID = "customAlder"+ test;
        var customRolleID = "customRolle"+ test;
        var medlem = new Medlem (gel(customNamnID).value, gel(customAlderID).value, gel(customRolleID).value);
        gruppe2.leggTilMedlem(medlem);
    }
    visCustomGruppe();
}
function visCustomGruppe() {
    gel("lagCustom").style.display = "none";
    gel("dinGruppe").innerHTML += "<h2>"+gruppe2.namn+"</h2>";
    for (i=0;i<gruppe2.medlemmar.length;i++, gel("dinGruppe").innerHTML += "<br>")
    {
        gel("dinGruppe").innerHTML += "<div id='"+gruppe2.medlemmar[i].namn+"div'><h3>"+gruppe2.medlemmar[i].namn+"</h3><p>Alder: "+gruppe2.medlemmar[i].alder+"</p><p>Rolle: "+gruppe2.medlemmar[i].rolle+"</p></div>";
    }
    gel("dinGruppe").innerHTML += "<br>";
    gel("bot").style.display = "none";
}
function leggTilRad() {
    nyLinjeNr++;
    gel("diy"). innerHTML += "<div id='linje"+nyLinjeNr+"'><input type='text' id='customNamn"+nyLinjeNr+"' placeholder='Namn til medlem "+nyLinjeNr+"'><input type='number' id='customAlder"+nyLinjeNr+"' placeholder='Alder til medlem "+nyLinjeNr+"'><input type='text' id='customRolle"+nyLinjeNr+"' placeholder='Rolle til medlem "+nyLinjeNr+"'></div>";
}