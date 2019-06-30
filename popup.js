var app = new Vue({
    el: '#app',
    data: {
        
        sourceText: '',
        sourceLang: 'auto',
        firstTargetLang: 'iw',
        firstTargetResult: '',
        secondTargetLang: 'ru',
        secondTargetResult: '',
        languages: {
            'Afrikaans': 'af',
            'Albanian': 'sq',
            'Amharic': 'am',
            'Arabic': 'ar',
            'Armenian': 'hy',
            'Azerbaijani': 'az',
            'Basque': 'eu',
            'Belarusian': 'be',
            'Bengali': 'bn',
            'Bosnian': 'bs',
            'Bulgarian': 'bg',
            'Catalan': 'ca',
            'Cebuano': 'ceb',
            'Chinese(Simplified)': 'zh-CN',
            'Chinese(Traditional)': 'zh-TW',
            'Corsican': 'co',
            'Croatian': 'hr',
            'Czech': 'cs',
            'Danish': 'da',
            'Dutch': 'nl',
            'English': 'en',
            'Esperanto': 'eo',
            'Estonian': 'et',
            'Finnish': 'fi',
            'French': 'fr',
            'Frisian': 'fy',
            'Galician': 'gl',
            'Georgian': 'ka',
            'German': 'de',
            'Greek': 'el',
            'Gujarati': 'gu',
            'Haitian Creole': 'ht',
            'Hausa': 'ha',
            'Hawaiian': 'haw',
            'Hebrew': 'iw',
            'Hindi': 'hi',
            'Hmong': 'hmn',
            'Hungarian': 'hu',
            'Icelandic': 'is',
            'Igbo': 'ig',
            'Indonesian': 'id',
            'Irish': 'ga',
            'Italian': 'it',
            'Japanese': 'ja',
            'Javanese': 'jw',
            'Kannada': 'kn',
            'Kazakh': 'kk',
            'Khmer': 'km',
            'Korean': 'ko',
            'Kurdish': 'ku',
            'Kyrgyz': 'ky',
            'Lao': 'lo',
            'Latin': 'la',
            'Latvian': 'lv',
            'Lithuanian': 'lt',
            'Luxembourgish': 'lb',
            'Macedonian': 'mk',
            'Malagasy': 'mg',
            'Malay': 'ms',
            'Malayalam': 'ml',
            'Maltese': 'mt',
            'Maori': 'mi',
            'Marathi': 'mr',
            'Mongolian': 'mn',
            'Myanmar(Burmese)': 'my',
            'Nepali': 'ne',
            'Norwegian': 'no',
            'Nyanja(Chichewa)': 'ny',
            'Pashto': 'ps',
            'Persian': 'fa',
            'Polish': 'pl',
            'Portuguese': 'pt',
            'Punjabi': 'pa',
            'Romanian': 'ro',
            'Russian': 'ru',
            'Samoan': 'sm',
            'Scots Gaelic': 'gd',
            'Serbian': 'sr',
            'Sesotho': 'st',
            'Shona': 'sn',
            'Sindhi': 'sd',
            'Sinhala(Sinhalese)': 'si',
            'Slovak': 'sk',
            'Slovenian': 'sl',
            'Somali': 'so',
            'Spanish': 'es',
            'Sundanese': 'su',
            'Swahili': 'sw',
            'Swedish': 'sv',
            'Tagalog(Filipino)': 'tl',
            'Tajik': 'tg',
            'Tamil': 'ta',
            'Telugu': 'te',
            'Thai': 'th',
            'Turkish': 'tr',
            'Ukrainian': 'uk',
            'Urdu': 'ur',
            'Uzbek': 'uz',
            'Vietnamese': 'vi',
            'Welsh': 'cy',
            'Xhosa': 'xh',
            'Yiddish': 'yi',
            'Yoruba': 'yo',
            'Zulu': 'zu'
        },



    },
    methods: {
        setTargetLanguage: function(selected){
            chrome.storage.local.set({ 'testKey': selected.target.value });
            chrome.storage.local.get('testKey', function (data) {
               // console.log(data);
                
            })
        },
        translateFirstLanguage: function () {

            if (this.sourceText.length < 3) { return; }
            //console.log("sourceText", this.sourceText);
            let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
                + this.sourceLang + "&tl=" + this.firstTargetLang + "&dt=t&q=" + encodeURI(this.sourceText);

            let response = JSON.parse(this.httpGet(url));

            this.firstTargetResult = response[0][0][0];

        },
        translateSecondLanguage: function () {
            if (this.sourceText.length < 3) { return; }
            //  console.log("sourceText",this.sourceText);
            let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
                + this.sourceLang + "&tl=" + this.secondTargetLang + "&dt=t&q=" + encodeURI(this.sourceText);
            let response = JSON.parse(this.httpGet(url));

            this.secondTargetResult = response[0][0][0];
        },
        httpGet: function (theUrl) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false); // false for synchronous request
            xmlHttp.send(null);
            return xmlHttp.responseText;
        }

    }
})
Vue.config.productionTip = false;