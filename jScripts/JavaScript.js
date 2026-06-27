let tipIndex = 0;

let tips = [
    "צאו להליכה של 20 דקות בלי אוזניות ובלי גלילה בטלפון.",
    "קחו בקבוק מים ושבו כמה דקות במקום ירוק ורגוע.",
    "קבעו עם חבר סיבוב קצר בחוץ במקום עוד שיחה בוואטסאפ.",
    "צאו לראות שקיעה במקום קרוב לבית.",
    "בחרו פארק קרוב וצאו אליו גם אם יש לכם רק חצי שעה."
];

function showTip() {
    document.getElementById("tipResult").innerHTML = tips[tipIndex];

    tipIndex = tipIndex + 1;

    if (tipIndex === tips.length) {
        tipIndex = 0;
    }
}

let travelerName = "";
let trailNotes = "";
let chosenArea = "", chosenMap = "mapGeneral", chosenTime = "", chosenWith = "";
let chosenNature = "", chosenNatureType = "", chosenEffort = "", chosenSeason = "", chosenSeasonType = "";
let maps = ["mapGeneral", "mapNorth", "mapCenter", "mapSouth", "mapNorthCenter", "mapNorthSouth", "mapCenterSouth"];
let areaChoices = ["", "", "", ""];
let areaMapChoices = ["mapNorth", "mapCenter", "mapSouth", "mapGeneral"];
let natureChoices = ["", "", "", ""];
let natureTypes = ["", "", "", ""];
let natureLabels = ["", "", "", ""];

function showTrailMap(map) {
    for (let i = 0; i < maps.length; i++) {
        document.getElementById(maps[i]).hidden = true;
    }

    document.getElementById(map).hidden = false;
}

function putInfo(id, text) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id).hidden = false;
}

function hideInfo(id) {
    document.getElementById(id).hidden = true;
}

function writeTravelerName() {
    travelerName = document.getElementById("travelerName").value;
    checkTrailReady();
}

function writeTrailNotes() {
    trailNotes = document.getElementById("trailNotes").value;
}

function joinChoices(list) {
    let text = "";

    for (let i = 0; i < list.length; i++) {
        if (list[i] != "") {
            if (text != "") {
                text = text + ", ";
            }
            text = text + list[i];
        }
    }

    return text;
}

function countChoices(list) {
    let total = 0;

    for (let i = 0; i < list.length; i++) {
        if (list[i] != "") {
            total = total + 1;
        }
    }

    return total;
}

function hasChoice(list, word) {
    let found = false;

    for (let i = 0; i < list.length; i++) {
        if (list[i] == word) {
            found = true;
        }
    }

    return found;
}

function checkTrailReady() {
    if (travelerName != "" && chosenArea != "" && chosenTime != "" && chosenWith != "" && chosenNature != "" && chosenEffort != "" && chosenSeason != "") {
        document.getElementById("findTrailButton").disabled = false;
    }
    else {
        document.getElementById("findTrailButton").disabled = true;
    }
}

function chooseAreaMap() {
    let total = countChoices(areaChoices);

    if (total == 1) {
        for (let i = 0; i < areaChoices.length; i++) {
            if (areaChoices[i] != "") {
                chosenMap = areaMapChoices[i];
            }
        }
    }
    else {
        chosenMap = "mapGeneral";
    }

    if (areaChoices[0] != "" && areaChoices[1] != "" && areaChoices[2] == "" && areaChoices[3] == "") {
        chosenMap = "mapNorthCenter";
    }
    if (areaChoices[0] != "" && areaChoices[2] != "" && areaChoices[1] == "" && areaChoices[3] == "") {
        chosenMap = "mapNorthSouth";
    }
    if (areaChoices[1] != "" && areaChoices[2] != "" && areaChoices[0] == "" && areaChoices[3] == "") {
        chosenMap = "mapCenterSouth";
    }
}

function chooseAreaBox(area, place) {
    if (areaChoices[place] == "") {
        areaChoices[place] = area;
    }
    else {
        areaChoices[place] = "";
    }

    chosenArea = joinChoices(areaChoices);
    chooseAreaMap();

    showTrailMap(chosenMap);
    checkTrailReady();
}

function chooseTime(time, text) {
    chosenTime = time;
    putInfo("timeInfo", text);
    checkTrailReady();
}

function chooseWith(tripWith, text) {
    chosenWith = tripWith;
    putInfo("withInfo", text);
    checkTrailReady();
}

function chooseNatureBox(nature, type, text, place) {
    if (natureChoices[place] == "") {
        natureChoices[place] = nature;
        natureTypes[place] = type;
        natureLabels[place] = text;
    }
    else {
        natureChoices[place] = "";
        natureTypes[place] = "";
        natureLabels[place] = "";
    }

    chosenNature = joinChoices(natureChoices);
    chosenNatureType = joinChoices(natureTypes);

    if (chosenNature == "") {
        hideInfo("natureInfo");
    }
    else {
        putInfo("natureInfo", joinChoices(natureLabels));
    }

    checkTrailReady();
}

function chooseEffort(effort) {
    chosenEffort = effort;
    checkTrailReady();
}

function chooseSeason(season, type, text) {
    chosenSeason = season;
    chosenSeasonType = type;
    putInfo("seasonInfo", text);
    checkTrailReady();
}

function getTrailTip() {
    let tip = "כדאי לבחור מסלול קרוב ונוח שמאפשר לכם לצאת בלי יותר מדי תכנון.";

    if (hasChoice(natureTypes, "water")) {
        tip = "כדאי להתחיל ממסלול נחל קצר, מעיין נגיש או מקום עם מים שאפשר לעצור בו.";
    }
    if (hasChoice(natureTypes, "forest")) {
        tip = "כדאי לבחור חורשה, יער מוצל או פארק טבע עם שביל הליכה רגוע.";
    }
    if (hasChoice(natureTypes, "view")) {
        tip = "כדאי לחפש תצפית יפה, שביל נוף או מסלול עם נקודת עצירה לתמונה.";
    }
    if (hasChoice(natureTypes, "desert")) {
        tip = "כדאי לבחור מסלול פתוח ושקט, במיוחד בשעות נעימות ולא חמות מדי.";
    }

    if (chosenSeasonType == "summer") {
        tip = tip + " בקיץ עדיף לחפש צל, מים ושעות בוקר מוקדמות.";
    }
    if (chosenSeasonType == "winter") {
        tip = tip + " בחורף כדאי לבדוק מזג אוויר ולהעדיף שביל בטוח ולא חלק.";
    }
    if (chosenSeasonType == "spring") {
        tip = tip + " באביב מומלץ לחפש פריחה, נחלים זורמים ומסלולים ירוקים.";
    }
    if (chosenSeasonType == "autumn") {
        tip = tip + " בסתיו מזג האוויר נוח, אז אפשר לבחור גם מסלול פתוח עם נוף.";
    }

    return tip;
}

function findTrail() {
    if (chosenArea == "" || chosenTime == "" || chosenWith == "" || chosenNature == "" || chosenEffort == "" || chosenSeason == "") {
        alert("חסרה בחירה אחת או יותר. סמנו תשובה בכל שאלה ואז לחצו שוב על הכפתור.");
        document.getElementById("trailResult").innerHTML = "יש לענות על כל השאלות כדי לקבל המלצה מתאימה.";
        document.getElementById("trailResult").hidden = false;
    }
    else {
        let notesText = trailNotes;

        if (notesText == "") {
            notesText = "אין";
        }

        let trailText = "סיכום הבחירות של " + travelerName + "<br>" +
            "אזור: " + chosenArea + "<br>" +
            "זמן: " + chosenTime + "<br>" +
            "עם מי: " + chosenWith + "<br>" +
            "סוג טבע: " + chosenNature + "<br>" +
            "מאמץ: " + chosenEffort + "<br>" +
            "עונה: " + chosenSeason + "<br>" +
            "הערות: " + notesText + "<br><br>" +
            "המלצה קצרה: " + getTrailTip();

        document.getElementById("trailResult").innerHTML = trailText;
        document.getElementById("trailResult").hidden = false;
        showTrailMap(chosenMap);
    }
}
