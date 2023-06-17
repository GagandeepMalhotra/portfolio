"use strict";

var input = document.querySelectorAll('textarea')[0],
  characterCount = document.querySelector('#characterCount'),
  characterNoSpacesCount = document.querySelector('#characterNoSpacesCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount'),
  readingTime = document.querySelector('#readingTime'),

  keywordsDiv = document.querySelectorAll('.keywords')[0],
  keywordsli = document.querySelectorAll('.keywords ul')[0],
  topKeywords = document.querySelector('#topKeywords'),

  connectivesDiv = document.querySelectorAll('.connectives')[0],
  connectivesli = document.querySelectorAll('.connectives ul')[0],
  topConnectives = document.querySelector('#topConnectives'),

  pronounsDiv = document.querySelectorAll('.pronouns')[0],
  pronounsli = document.querySelectorAll('.pronouns ul')[0],
  topPronouns = document.querySelector('#topPronouns'),

  dialoguesDiv = document.querySelectorAll('.dialogues')[0],
  dialoguesli = document.querySelectorAll('.dialogues ul')[0],
  topDialogues = document.querySelector('#topDialogues');

// updating the displayed stats after every keypress
var updateWords = function () {
  // character count
  // just displaying the input length as everything is a character
  characterCount.innerHTML = input.value.length;

  // word count using \w metacharacter - replacing this with .* to match anything between word boundaries since it was not taking 'a' as a word.
  // this is a masterstroke - to count words with any number of hyphens as one word
  // [-?(\w+)?]+ looks for hyphen and a word (we make both optional with ?). + at the end makes it a repeated pattern
  // \b is word boundary metacharacter
  var words = input.value.match(/\b[-\w]+\b/g);
  if (words) {
    wordCount.innerHTML = words.length;
  } else {
    wordCount.innerHTML = 0;
  }

  characterNoSpacesCount.innerHTML = input.value.replace(/\s+/g, '').length;

  // sentence count using ./!/? as sentense separators
  if (words) {
    var sentences = input.value.split(/[.!?]\s[^.!?|]/);
    sentenceCount.innerHTML = sentences.length - 1;
  } else {
    sentenceCount.innerHTML = 0;
  }

  // paragraph count from http://stackoverflow.com/a/3336537
  if (words) {
    // \n$ takes care of empty lines: lines with no characters, and only \n are not paragraphs
    // and need to be replaced with empty string
    var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }

  // reading time based on 275 words/minute
  if (words) {
    var seconds = Math.floor(words.length * 60 / 275);
    // need to convert seconds to minutes and hours
    if (seconds > 59) {
      var minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
      readingTime.innerHTML = minutes + "m " + seconds + "s";
    } else {
      readingTime.innerHTML = seconds + "s";
    }
  } else {
    readingTime.innerHTML = "0s";
  }

  // finding out top keywords and their count
  // step-1: remove all the stop words
  // step-2: form an object with keywords and their count
  // step-3: sort the object by first converting it to a 2D array
  // step-4: display top keywords and their count

  if (words) {
    //##############################################################################
    // step-1: removing all the stop words
    var nonStopWords = [];
    var stopWords = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
      "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    for (var i = 0; i < words.length; i++) {
      // filtering out stop words and numbers
      if (stopWords.indexOf(words[i].toLowerCase()) === -1 && isNaN(words[i]) && words[i].length < 15) {
        nonStopWords.push(words[i].toLowerCase());
      }
    }

    // step-2: forming an object with keywords and their count
    var keywords = {};
    for (var i = 0; i < nonStopWords.length; i++) {
      // checking if the word(property) already exists
      // if it does increment the count otherwise set it to one
      if (nonStopWords[i] in keywords) {
        keywords[nonStopWords[i]] += 1;
      } else {
        keywords[nonStopWords[i]] = 1;
      }
    }

    // step-3: sorting the object by first converting it to a 2D array
    var sortedKeywords = [];
    for (var keyword in keywords) {
      sortedKeywords.push([keyword, keywords[keyword]])
    }
    sortedKeywords.sort(function (a, b) {
      return b[1] - a[1]
    });

    // step-4: displaying top 100 keywords and their count
    topKeywords.innerHTML = "";
    for (var i = 0; i < sortedKeywords.length && i < 10000; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + sortedKeywords[i][0] + "</b>: " + sortedKeywords[i][1];
      topKeywords.appendChild(li);
    }

    //##############################################################################
    var matchedConnectives = [];
    var allConnectives = ["and", "afterwards", "after", "before", "first", "second", "third", "fourth", "here",
      "meanwhile", "next", "now", "previously", "since", "soon", "straightaway", "then", "until", "when",
      "whenever", "while", "eg", "ie", "firstly", "secondly", "etc", "finally", "lastly", "accordingly",
      "because", "consequently", "despite", "hence", "however", "nevertheless", "otherwise", "so", "still",
      "therefore", "though", "additionally", "also", "even", "furthermore", "indeed", "only", "alternatively",
      "but", "differs", "instead", "rather", "whereas", "fifth", "yet", "anyway", "besides", "moreover",
      "including", "through", "unless", "without", "as", "like", "further", "too", "another", "later", "last",
      "subsequently", "where", "who", "why", "what", "how", "thereafter", "ultimately", "presently", "behind",
      "above", "below", "gradually", "opposite", "similarly", "thus", "likewise", "conversely", "nonetheless",
      "actually", "briefly", "henceforward", "whoever", "whatever", "with", "notwithstanding", "fortunately",
      "luckily", "unfortunately", "sadly", "happily", "although", "meanwhile", "eg", "ie", "firstly", "secondly",
      "etc", "finally", "lastly", "accordingly", "because", "consequently", "despite", "hence", "however",
      "nevertheless", "otherwise", "so", "still", "therefore", "though", "additionally", "also", "even",
      "furthermore", "indeed", "only", "alternatively", "but", "differs", "instead", "rather", "whereas", "fifth",
      "yet", "anyway", "besides", "moreover", "including", "through", "unless", "without", "as", "like", "further",
      "too", "another", "later", "last", "subsequently", "where", "who", "why", "what", "how", "thereafter",
      "ultimately", "presently", "behind", "above", "below", "gradually", "opposite", "similarly", "thus",
      "likewise", "conversely", "nonetheless", "actually", "briefly", "henceforward", "whoever", "whatever",
      "with", "notwithstanding", "fortunately", "luckily", "unfortunately", "sadly", "happily", "although"];

    for (var i = 0; i < words.length; i++) {
      // filtering out non-connectives
      if (allConnectives.indexOf(words[i].toLowerCase()) !== -1 && isNaN(words[i])) {
        matchedConnectives.push(words[i].toLowerCase());
      }
    }

    // step-2: forming an object with connectives and their count
    var connectives = {};
    for (var i = 0; i < matchedConnectives.length; i++) {
      // checking if the word(property) already exists
      // if it does increment the count otherwise set it to one
      if (matchedConnectives[i] in connectives) {
        connectives[matchedConnectives[i]] += 1;
      } else {
        connectives[matchedConnectives[i]] = 1;
      }
    }

    // step-3: sorting the object by first converting it to a 2D array
    var sortedConnectives = [];
    for (var connective in connectives) {
      sortedConnectives.push([connective, connectives[connective]])
    }
    sortedConnectives.sort(function (a, b) {
      return b[1] - a[1]
    });

    // step-4: displaying top 100 connectives and their count
    topConnectives.innerHTML = "";
    for (var i = 0; i < sortedConnectives.length && i < 10000; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + sortedConnectives[i][0] + "</b>: " + sortedConnectives[i][1];
      topConnectives.appendChild(li);
    }

    //##############################################################################
    var matchedPronouns = [];
    var allPronouns = ["i", "me", "my", "mine", "myself",
      "you", "your", "yours", "yourself",
      "he", "him", "his", "himself",
      "she", "her", "hers", "herself",
      "it", "its", "itself",
      "we", "us", "our", "ours", "ourselves",
      "they", "them", "their", "theirs", "themselves"];

    for (var i = 0; i < words.length; i++) {
      // filtering out non-pronouns
      if (allPronouns.indexOf(words[i].toLowerCase()) !== -1 && isNaN(words[i])) {
        matchedPronouns.push(words[i].toLowerCase());
      }
    }

    // step-2: forming an object with pronouns and their count
    var pronouns = {};
    for (var i = 0; i < matchedPronouns.length; i++) {
      // checking if the word(property) already exists
      // if it does increment the count otherwise set it to one
      if (matchedPronouns[i] in pronouns) {
        pronouns[matchedPronouns[i]] += 1;
      } else {
        pronouns[matchedPronouns[i]] = 1;
      }
    }

    // step-3: sorting the object by first converting it to a 2D array
    var sortedPronouns = [];
    for (var pronoun in pronouns) {
      sortedPronouns.push([pronoun, pronouns[pronoun]])
    }
    sortedPronouns.sort(function (a, b) {
      return b[1] - a[1]
    });

    // step-4: displaying top 100 pronouns and their count
    topPronouns.innerHTML = "";
    for (var i = 0; i < sortedPronouns.length && i < 10000; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + sortedPronouns[i][0] + "</b>: " + sortedPronouns[i][1];
      topPronouns.appendChild(li);
    }

    //##############################################################################
    var matchedDialogues = [];
    var allDialogues = ["acknowledged", "added", "answered", "articulated", "clarified", "commented", "conceded", "concurred", "corrected",
      "counseled", "deflected", "disagreed", "disputed", "explained", "interjected", "protested", "reassured", "remarked", "replied", "responded",
      "stated", "babbled", "chatted", "chattered", "effused", "jabbered", "nattered", "prattled", "rambled", "yakked", "yapped", "concluded",
      "considered", "countered", "debated", "hypothesized", "noted", "objected", "pointed out", "pondered", "proposed", "reasoned", "reiterated",
      "rejoined", "reported", "restated", "speculated", "surmised", "testified", "theorized", "verified", "advised", "appealed", "asserted",
      "assured", "avowed", "begged", "beseeched", "cajoled", "claimed", "convinced", "directed", "encouraged", "entreated", "implored", "needled",
      "pleaded", "pled", "prodded", "prompted", "stressed", "suggested", "urged", "bragged", "dared", "exasperated", "gibed", "goaded", "insulted",
      "jeered", "jested", "joked", "lied", "mimicked", "nagged", "provoked", "quipped", "sassed", "smirked", "snickered", "affirmed", "attested",
      "decided", "declared", "defended", "insisted", "maintained", "vowed", "asked", "challenged", "coaxed", "hinted", "inquired", "puzzled",
      "queried", "questioned", "quizzed", "wondered", "cautioned", "doubted", "faltered", "guessed", "hesitated", "vacillated", "barked", "bellowed"
      , "boomed", "croaked", "deadpanned", "drawled", "enunciated", "groaned", "heaved", "hissed", "hollered", "howled", "huffed", "intoned", "lisped"
      , "monotoned", "mumbled", "piped", "pronounced", "rattled", "roared", "screamed", "screeched", "shouted", "shrilled", "sibilated", "slurred",
      "sneezed", "stammered", "stuttered", "trilled", "wheezed", "whispered", "yelled", "accused", "argued", "badgered", "bickered", "caterwauled",
      "chastised", "chided", "commanded", "complained", "condemned", "cursed", "demanded", "denounced", "exploded", "fumed", "growled", "grumbled",
      "interrupted", "ordered", "raged", "ranted", "retaliated", "retorted", "scoffed", "scolded", "scowled", "seethed", "shot", "snapped", "snarled",
      "sneered", "stormed", "swore", "taunted", "threatened", "warned", "cringed", "groused", "griped", "grunted", "mocked", "rasped", "refused",
      "sniffed", "snorted", "admitted", "confessed", "spilled", "spluttered", "denied", "fretted", "moaned", "panted", "prayed", "quavered",
      "shivered", "shrieked", "shuddered", "squeaked", "squealed", "whimpered", "whined", "worried", "approved", "beamed", "bubbled", "burst",
      "cackled", "cheered", "chirped", "chortled", "chorused", "chuckled", "complimented", "congratulated", "crowed", "exulted", "giggled", "grinned",
      "gurgled", "gushed", "hummed", "joked", "praised", "resounded", "sang", "simpered", "smiled", "squealed", "thanked", "whooped", "breathed",
      "cooed", "expressed", "flattered", "flirted", "proclaimed", "professed", "promised", "purred", "swooned", "apologized", "aside", "forgave",
      "gulped", "mumbled", "murmured", "muttered", "sighed", "wished", "bawled", "bewailed", "blubbered", "comforted", "consoled", "cried", "lamented",
      "sobbed", "wailed", "wept", "sniffled", "bleated", "blurted", "exclaimed", "gasped", "marveled", "marvelled", "perplexed", "sputtered", "yelped",
      "groggily", "lethargically", "listlessly", "sleepily", "somnolently", "wearily", "yawned", "acquiesced", "added", "addressed", "agreed",
      "alliterated", "announced", "began", "bet", "boasted", "called", "chimed", "coached", "confided", "confirmed", "continued", "contributed",
      "conversed", "demurred", "described", "dictated", "disclosed", "divulged", "echoed", "emphasized", "gloated", "greeted", "imitated", "implied",
      "informed", "insinuated", "insisted", "instructed", "lectured", "mentioned", "motioned", "mouthed", "mused", "nodded", "notified", "observed",
      "offered", "opined", "peeped", "peppered", "pestered", "pressed", "prompted", "quoted", "read", "recalled", "reckoned", "recited", "recounted",
      "related", "remembered", "reminded", "repeated", "requested", "revealed", "rhymed", "ridiculed", "said", "spoke", "shout", "shouted",
      "started", "stumbled", "sympathized", "tartly", "teased", "tempted", "thought", "told", "uttered", "volunteered", "welcomed"];

    for (var i = 0; i < words.length; i++) {
      // filtering out non-dialogue
      if (allDialogues.indexOf(words[i].toLowerCase()) !== -1 && isNaN(words[i])) {
        matchedDialogues.push(words[i].toLowerCase());
      }
    }

    // step-2: forming an object with dialogue and their count
    var dialogues = {};
    for (var i = 0; i < matchedDialogues.length; i++) {
      // checking if the word(property) already exists
      // if it does increment the count otherwise set it to one
      if (matchedDialogues[i] in dialogues) {
        dialogues[matchedDialogues[i]] += 1;
      } else {
        dialogues[matchedDialogues[i]] = 1;
      }
    }

    // step-3: sorting the object by first converting it to a 2D array
    var sortedDialogues = [];
    for (var dialogue in dialogues) {
      sortedDialogues.push([dialogue, dialogues[dialogue]])
    }
    sortedDialogues.sort(function (a, b) {
      return b[1] - a[1]
    });

    // step-4: displaying top 100 dialogues and their count
    topDialogues.innerHTML = "";
    for (var i = 0; i < sortedDialogues.length && i < 10000; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + sortedDialogues[i][0] + "</b>: " + sortedDialogues[i][1];
      topDialogues.appendChild(li);
    }

  }

  // displaying top words only if there is a word in the text area
  
  if (words) {
    keywordsli.style.display = "grid";
    connectivesli.style.display = "grid";  
    pronounsli.style.display = "grid";
    dialoguesli.style.display = "grid";

  } else {
    keywordsli.style.display = "none";
    connectivesli.style.display = "none";
    pronounsli.style.display = "none";
    dialoguesli.style.display = "none";
  }
}

  input.addEventListener('keyup', updateWords, false);
  document.getElementById('updateButtonAnalysis').addEventListener('click', updateWords, false);