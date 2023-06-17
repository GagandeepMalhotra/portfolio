"use strict";

var input = document.querySelectorAll('textarea')[0],
setSplit = document.getElementById("splitter"),
customSplit = document.getElementsByClassName('splitCharacter')[0],
setSurround = document.getElementById("surround"),
borderArray = document.getElementById("borderArray"),
spaceSplit = document.getElementById("spaceSplit"),
caseChange = document.getElementById("caseChange"),

outputArray = document.getElementsByClassName('outputArray')[0];

// updating the displayed stats after every keypress
var updateWords = function() {

  //keeping the console clean to make only the latest data visible
  //console.clear();

    if(customSplit.value != "") {
        setSplit.disabled = true;
    } else {
        setSplit.disabled = false;
    }

    var replace = customSplit.value;

    var tempArray = input.value;
    if(setSplit.disabled == false){
        if (spaceSplit.value == "spaceYes"){
            if (setSurround.value == "singleQuotation"){
                if(setSplit.value == "newLine"){
                    tempArray = tempArray.replace(/\n+/g, "', '");
                }
                else if (setSplit.value == "space"){
                    tempArray = tempArray.replace(/ +/g, "', '");
                }
                else if (setSplit.value == "comma"){
                    tempArray = tempArray.replace(/,+/g, "', '");
                }
                else if (setSplit.value == "forwardslash"){
                    tempArray = tempArray.replace(/\/+/g, "', '");
                }
                else if (setSplit.value == "hyphen"){
                    tempArray = tempArray.replace(/-+/g, "', '");
                }
            }
            else if (setSurround.value == "doubleQuotation"){
                if(setSplit.value == "newLine"){
                    tempArray = tempArray.replace(/\n+/g, '", "');
                }
                else if (setSplit.value == "space"){
                    tempArray = tempArray.replace(/ +/g, '", "');
                }
                else if (setSplit.value == "comma"){
                    tempArray = tempArray.replace(/,+/g, '", "');
                }
                else if (setSplit.value == "forwardslash"){
                    tempArray = tempArray.replace(/\/+/g, '", "');
                }
                else if (setSplit.value == "hyphen"){
                    tempArray = tempArray.replace(/-+/g, '", "');
                }
            }
            else {
                if(setSplit.value == "newLine"){
                    tempArray = tempArray.replace(/\n+/g, ", ");
                }
                else if (setSplit.value == "space"){
                    tempArray = tempArray.replace(/ +/g, ", ");
                }
                else if (setSplit.value == "comma"){
                    tempArray = tempArray.replace(/,+/g, ", ");
                }
                else if (setSplit.value == "forwardslash"){
                    tempArray = tempArray.replace(/\/+/g, ", ");
                }
                else if (setSplit.value == "hyphen"){
                    tempArray = tempArray.replace(/-+/g, ", ");
                }
            }
        }
        else {
            if (setSurround.value == "singleQuotation"){
                if(setSplit.value == "newLine"){
                    tempArray = tempArray.replace(/\n+/g, "','");
                }
                else if (setSplit.value == "space"){
                    tempArray = tempArray.replace(/ +/g, "','");
                }
                else if (setSplit.value == "comma"){
                    tempArray = tempArray.replace(/,+/g, "','");
                }
                else if (setSplit.value == "forwardslash"){
                    tempArray = tempArray.replace(/\/+/g, "','");
                }
                else if (setSplit.value == "hyphen"){
                    tempArray = tempArray.replace(/-+/g, "','");
                }
            }
            else if (setSurround.value == "doubleQuotation"){
                if(setSplit.value == "newLine"){
                    tempArray = tempArray.replace(/\n+/g, '","');
                }
                else if (setSplit.value == "space"){
                    tempArray = tempArray.replace(/ +/g, '","');
                }
                else if (setSplit.value == "comma"){
                    tempArray = tempArray.replace(/,+/g, '","');
                }
                else if (setSplit.value == "forwardslash"){
                    tempArray = tempArray.replace(/\/+/g, '","');
                }
                else if (setSplit.value == "hyphen"){
                    tempArray = tempArray.replace(/-+/g, '","');
                }
            }
            else {
                if(setSplit.value == "newLine"){
                    tempArray = tempArray.replace(/\n+/g, ",");
                }
                else if (setSplit.value == "space"){
                    tempArray = tempArray.replace(/ +/g, ",");
                }
                else if (setSplit.value == "comma"){
                    tempArray = tempArray.replace(/,+/g, ",");
                }
                else if (setSplit.value == "forwardslash"){
                    tempArray = tempArray.replace(/\/+/g, ",");
                }
                else if (setSplit.value == "hyphen"){
                    tempArray = tempArray.replace(/-+/g, ",");
                }
            }
        }
    }
    else {
        if (replace.includes(".")){
            replace = replace.replace(/\./g, "\\.")
        }
        var re = new RegExp(replace,"g")
        
        if (spaceSplit.value == "spaceYes"){
            if (setSurround.value == "singleQuotation"){
                tempArray = tempArray.replace(re, "', '");
            }
            else if (setSurround.value == "doubleQuotation"){
                tempArray = tempArray.replace(re, '", "');
            }
            else{
                tempArray = tempArray.replace(re, ', ');
            }
        }
        else {
            if (setSurround.value == "singleQuotation"){
                tempArray = tempArray.replace(re, "','");
            }
            else if (setSurround.value == "doubleQuotation"){
                tempArray = tempArray.replace(re, '","');
            }
            else{
                tempArray = tempArray.replace(re, ',');
            }
        }
    }

    if (setSurround.value == "singleQuotation"){
        if (borderArray.value == "borderSquare"){
            tempArray = "['" + tempArray + "']";
        }
        else if (borderArray.value == "borderCurly"){
            tempArray = "{'" + tempArray + "'}";
        }
        else if (borderArray.value == "borderRound"){
            tempArray = "('" + tempArray + "')";
        }
        else{
            tempArray = "<'" + tempArray + "'>";
        }
    }
    else if (setSurround.value == "doubleQuotation"){
        if (borderArray.value == "borderSquare"){
            tempArray = '["' + tempArray + '"]';
        }
        else if (borderArray.value == "borderCurly"){
            tempArray = '{"' + tempArray + '"}';
        }
        else if (borderArray.value == "borderRound"){
            tempArray = '("' + tempArray + '")';
        }
        else{
            tempArray = '<"' + tempArray + '">';
        }
    }
    else {
        if (borderArray.value == "borderSquare"){
            tempArray = '[' + tempArray + ']';
        }
        else if (borderArray.value == "borderCurly"){
            tempArray = '{' + tempArray + '}';
        }
        else if (borderArray.value == "borderRound"){
            tempArray = '(' + tempArray + ')';
        }
        else{
            tempArray = '<' + tempArray + '>';
        }
    }

    if (caseChange.value == "lowercaseAll"){
        tempArray = tempArray.toLowerCase();
    }
    else if (caseChange.value == "uppercaseAll"){
        tempArray = tempArray.toUpperCase();
    }

    tempArray = tempArray.replace(/\n+/g, "");

    if (input.value != ""){
        outputArray.innerHTML = tempArray;
    }
    else{
        outputArray.innerHTML = "";
    }
}

document.addEventListener('keyup', updateWords, false);
document.addEventListener('click', updateWords, false);
document.getElementById('updateButton').addEventListener('click', updateWords, false);

var copy = function() {
    outputArray.select();
    document.execCommand("copy");
}

document.getElementById('copyButton').addEventListener('click', copy, false);

