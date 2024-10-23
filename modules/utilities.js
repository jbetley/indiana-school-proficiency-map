// Indiana School Map Modules //
// revised: 10.17.24
// https://github.com/jbetley

function calc_percent(d) {
    if (d === "***") {
        return "***";
    } else if (d === "" || isNaN(d)) {
        return "No Data";
    } else {
        return d3.format(",.2%")(d);
    }
}

function shortenNames(objects, replacements) {
    for (const obj of objects) {
      for (const replacement of replacements) {
        if (obj["First Name"] === replacement.name) {
          if (replacement.new) {
            obj["First Name"] = replacement.new;
          }
        }
        if (obj["Second Name"] === replacement.name) {
          if (replacement.new) {
            obj["Second Name"] = replacement.new;
          }
        }              
      }
    }
  return objects
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// find avg value for an array of elements based on key
function findAverage(arr, key) {
    if (arr.length === 0) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += +arr[i][key];
    }

    return sum / arr.length;
}

// takes as input an array of points x, y and r values, determines
// if the circles overlap and if so, shifts their coordinates
// away from each other. can give inconsistent results if there
// are multiple points right next to each other
// if dx > 0 -> shift x0 left, else shift x0 right
// if dy > 0 -> shift y0 up, else shift y0 down
function shifty(s) {
    for (let q = 0; q < s.length - 1; q++) {
        for (let p = q + 1; p < s.length; p++) {
            if (Math.hypot(s[q].x - s[p].x, s[q].y - s[p].y) < 2 * s[q].r) {
                dx = s[p].x - s[q].x;
                dy = s[p].y - s[q].y;
                shift = (s[q].r * 2) - Math.hypot(s[q].x - s[p].x, s[q].y - s[p].y)
                if (dx > 0) { s[q].x = s[q].x - shift / 1.5 } else { s[q].x = s[q].x + shift / 1.5 }
                if (dy > 0) { s[q].y = s[q].y - shift / 1.5 } else { s[q].y = s[q].y + shift / 1.5 }
            }
        }
    }
    return s
}

// TODO: Check for smells
function calculateGap(data, subject, category) {
    if (category == "Black" || category == "Multiracial" ||
        category == "Hispanic" || category == "Asian") {
        firstCategory = "White"
        secondCategory = category
    }

    else if (category == "Paid Meals") {
        firstCategory = category
        secondCategory = "Free or Reduced Price Meals"
    }

    else if (category == "Free or Reduced Price Meals") {
        firstCategory = "Paid Meals"
        secondCategory = category
    }

    else if (category == "Non English Language Learners") {
        firstCategory = "English Language Learners"
        secondCategory = category
    }

    else if (category == "English Language Learners") {
        firstCategory = category
        secondCategory = "Non English Language Learners"
    }

    else if (category == "Special Education") {
        firstCategory = "General Education"
        secondCategory = category
    }

    else if (category == "General Education") {
        firstCategory = category
        secondCategory = "Special Education"
    }
    else {
        return
    }

    if (d3.select("#subject")._groups[0][0].value == "IREAD") {
        firstTested = firstCategory + "|" + subject + " Test N";
        secondTested = secondCategory + "|" + subject + " Test N";
    } else {
        firstTested = firstCategory + "|" + subject + " Total Tested";
        secondTested = secondCategory + "|" + subject + " Total Tested";         
    }

    // filter out schools with no students tested for both categories
    const adjustedData = data.filter(function (el) {
        return firstTested[category] != "***" && firstTested[category] != "" &&
        secondTested[category] != "***" && secondTested[category] != ""
        });

    // keep only schools with n of tested students greater than average
    const firstAvg = findAverage(adjustedData, firstTested)
    const secondAvg = findAverage(adjustedData, secondTested)

    const gapSet = adjustedData.filter(d => {
        if (+d[firstTested] < firstAvg) return false;
        if (+d[secondTested] < secondAvg) return false;
        return d;
    });

    gapList = []

    firstProficiency = firstCategory + "|" + subject + " Proficiency %";
    secondProficiency = secondCategory + "|" + subject + " Proficiency %";

    const gapDifference = gapSet.map(item => {
        firstItem = parseFloat(item[firstProficiency]);
        secondItem = parseFloat(item[secondProficiency]);

        if (secondItem > firstItem) {
        firstValue = secondItem
        secondValue = firstItem
        higherCategory = secondCategory
        lowerCategory = firstCategory
        }
        else {
        firstValue = firstItem
        secondValue = secondItem
        higherCategory = firstCategory
        lowerCategory = secondCategory
        }

        gapObj = new Object();

        if ("School Name" in item) {
        gapObj['School Name'] = item['School Name']
        }
        gapObj['Corporation Name'] = item['Corporation Name']

        gapObj["First Name"] = higherCategory
        gapObj["First"] = firstValue
        gapObj["Second Name"] = lowerCategory
        gapObj["Second"] = secondValue
        gapObj["Difference"] = Math.abs(firstValue - secondValue);
        gapList.push(gapObj)
    });

    // filter out schools with no difference value (means one or both
    // of the proficiency categories was "" or "***")
    const adjustedgapList = gapList.filter(function (el) {
        return !isNaN(el["Difference"]);
    });

    adjustedgapList.sort(function (a, b) {
        if (+a["Difference"] === +b["Difference"]) { return 0 } else { return (+a["Difference"] < +b["Difference"]) ? -1 : 1 };
    });

    badGaps = adjustedgapList.slice(adjustedgapList.length - 10);

    return badGaps;
}
