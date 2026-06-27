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

let chosenArea = "", chosenMap = "mapGeneral", chosenTime = "", chosenWith = "";
let chosenNature = "", chosenNatureType = "", chosenEffort = "", chosenSeason = "", chosenSeasonType = "";
let maps = ["mapGeneral", "mapNorth", "mapCenter", "mapSouth"];

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

function chooseArea(area, map) {
    chosenArea = area;
    chosenMap = map;
    showTrailMap(map);
}

function chooseTime(time, text) {
    chosenTime = time;
    putInfo("timeInfo", text);
}

function chooseWith(tripWith, text) {
    chosenWith = tripWith;
    putInfo("withInfo", text);
}

function chooseNature(nature, type, text) {
    chosenNature = nature;
    chosenNatureType = type;
    putInfo("natureInfo", text);
}

function chooseEffort(effort) {
    chosenEffort = effort;
}

function chooseSeason(season, type, text) {
    chosenSeason = season;
    chosenSeasonType = type;
    putInfo("seasonInfo", text);
}

function getTrailTip() {
    let tip = "כדאי לבחור מסלול קרוב ונוח שמאפשר לכם לצאת בלי יותר מדי תכנון.";

    if (chosenNatureType == "water") {
        tip = "כדאי להתחיל ממסלול נחל קצר, מעיין נגיש או מקום עם מים שאפשר לעצור בו.";
    }
    if (chosenNatureType == "forest") {
        tip = "כדאי לבחור חורשה, יער מוצל או פארק טבע עם שביל הליכה רגוע.";
    }
    if (chosenNatureType == "view") {
        tip = "כדאי לחפש תצפית יפה, שביל נוף או מסלול עם נקודת עצירה לתמונה.";
    }
    if (chosenNatureType == "desert") {
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
        let trailText = "סיכום הבחירות שלכם<br>" +
            "אזור: " + chosenArea + "<br>" +
            "זמן: " + chosenTime + "<br>" +
            "עם מי: " + chosenWith + "<br>" +
            "סוג טבע: " + chosenNature + "<br>" +
            "מאמץ: " + chosenEffort + "<br>" +
            "עונה: " + chosenSeason + "<br><br>" +
            "המלצה קצרה: " + getTrailTip();

        document.getElementById("trailResult").innerHTML = trailText;
        document.getElementById("trailResult").hidden = false;
        showTrailMap(chosenMap);
    }
}
