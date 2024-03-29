var menuItem = {
  "id": "SpeakTranslation",
  "title": "SpeakTranslation",
  "contexts": ["selection"]
};
chrome.contextMenus.create(menuItem);

function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}


chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "SpeakTranslation" && clickData.selectionText) {

    var p = new Promise((resolve, reject) => {
      chrome.storage.local.get('testKey', function (data) { targetLanguage = data['testKey'];  let asd = data['testKey'];
      resolve(asd);
    });
    });
    p.then((targetLanguage) => {
      if (!targetLanguage) {
     
        targetLanguage = 'ru';
      }
      let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
        + 'auto' + "&tl=" + targetLanguage + "&dt=t&q=" + fixedEncodeURI(clickData.selectionText);
      let response = JSON.parse(httpGet(url));
     
      chrome.tts.speak(response[0][0][0] , {'lang': targetLanguage});
    }).catch((error) => alert("errorrrrrr",error));
  }

});


function httpGet(theUrl) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
