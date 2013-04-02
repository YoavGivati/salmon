/*------------------------------------------------------------------------------------------
GLOBAL - 3RD PARTY UTILITY
------------------------------------------------------------------------------------------*/
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

/*
	// date format https://github.com/phstc/jquery-dateFormat
	note: use the formatDate() helper function
*/
(function($){var daysInWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var shortMonthsInYear=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var longMonthsInYear=["January","February","March","April","May","June","July","August","September","October","November","December"];var shortMonthsToNumber=[];shortMonthsToNumber["Jan"]="01";shortMonthsToNumber["Feb"]="02";shortMonthsToNumber["Mar"]="03";shortMonthsToNumber["Apr"]="04";shortMonthsToNumber["May"]="05";shortMonthsToNumber["Jun"]="06";shortMonthsToNumber["Jul"]="07";shortMonthsToNumber["Aug"]="08";shortMonthsToNumber["Sep"]="09";shortMonthsToNumber["Oct"]="10";shortMonthsToNumber["Nov"]="11";shortMonthsToNumber["Dec"]="12";$.format=(function(){function strDay(value){return daysInWeek[parseInt(value,10)]||value;}
function strMonth(value){var monthArrayIndex=parseInt(value,10)-1;return shortMonthsInYear[monthArrayIndex]||value;}
function strLongMonth(value){var monthArrayIndex=parseInt(value,10)-1;return longMonthsInYear[monthArrayIndex]||value;}
var parseMonth=function(value){return shortMonthsToNumber[value]||value;};var parseTime=function(value){var retValue=value;var millis="";if(retValue.indexOf(".")!==-1){var delimited=retValue.split('.');retValue=delimited[0];millis=delimited[1];}
var values3=retValue.split(":");if(values3.length===3){hour=values3[0];minute=values3[1];second=values3[2];return{time:retValue,hour:hour,minute:minute,second:second,millis:millis};}else{return{time:"",hour:"",minute:"",second:"",millis:""};}};return{date:function(value,format){try{var date=null;var year=null;var month=null;var dayOfMonth=null;var dayOfWeek=null;var time=null;if(typeof value.getFullYear==="function"){year=value.getFullYear();month=value.getMonth()+1;dayOfMonth=value.getDate();dayOfWeek=value.getDay();time=parseTime(value.toTimeString());}else if(value.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:\d{2}/)!=-1){var values=value.split(/[T\+-]/);year=values[0];month=values[1];dayOfMonth=values[2];time=parseTime(values[3].split(".")[0]);date=new Date(year,month-1,dayOfMonth);dayOfWeek=date.getDay();}else{var values=value.split(" ");switch(values.length){case 6:year=values[5];month=parseMonth(values[1]);dayOfMonth=values[2];time=parseTime(values[3]);date=new Date(year,month-1,dayOfMonth);dayOfWeek=date.getDay();break;case 2:var values2=values[0].split("-");year=values2[0];month=values2[1];dayOfMonth=values2[2];time=parseTime(values[1]);date=new Date(year,month-1,dayOfMonth);dayOfWeek=date.getDay();break;case 7:case 9:case 10:year=values[3];month=parseMonth(values[1]);dayOfMonth=values[2];time=parseTime(values[4]);date=new Date(year,month-1,dayOfMonth);dayOfWeek=date.getDay();break;default:return value;}}
var pattern="";var retValue="";for(var i=0;i<format.length;i++){var currentPattern=format.charAt(i);pattern+=currentPattern;switch(pattern){case"ddd":retValue+=strDay(dayOfWeek);pattern="";break;case"dd":if(format.charAt(i+1)=="d"){break;}
if(String(dayOfMonth).length===1){dayOfMonth='0'+dayOfMonth;}
retValue+=dayOfMonth;pattern="";break;case"MMMM":retValue+=strLongMonth(month);pattern="";break;case"MMM":if(format.charAt(i+1)==="M"){break;}
retValue+=strMonth(month);pattern="";break;case"MM":if(format.charAt(i+1)=="M"){break;}
if(String(month).length===1){month='0'+month;}
retValue+=month;pattern="";break;case"yyyy":retValue+=year;pattern="";break;case"HH":retValue+=time.hour;pattern="";break;case"hh":retValue+=(time.hour==0?12:time.hour<13?time.hour:time.hour-12);pattern="";break;case"mm":retValue+=time.minute;pattern="";break;case"ss":retValue+=time.second.substring(0,2);pattern="";break;case"SSS":retValue+=time.millis.substring(0,3);pattern="";break;case"a":retValue+=time.hour>=12?"PM":"AM";pattern="";break;case" ":retValue+=currentPattern;pattern="";break;case"/":retValue+=currentPattern;pattern="";break;case":":retValue+=currentPattern;pattern="";break;default:if(pattern.length===2&&pattern.indexOf("y")!==0&&pattern!="SS"){retValue+=pattern.substring(0,1);pattern=pattern.substring(1,2);}else if((pattern.length===3&&pattern.indexOf("yyy")===-1)){pattern="";}}}
return retValue;}catch(e){return value;}}};}());}(jQuery));

/**
*
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/
function SHA256(s){var chrsz=8;var hexcase=0;function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function S(X,n){return(X>>>n)|(X<<(32-n));}function R(X,n){return(X>>>n);}function Ch(x,y,z){return((x&y)^((~x)&z));}function Maj(x,y,z){return((x&y)^(x&z)^(y&z));}function Sigma0256(x){return(S(x,2)^S(x,13)^S(x,22));}function Sigma1256(x){return(S(x,6)^S(x,11)^S(x,25));}function Gamma0256(x){return(S(x,7)^S(x,18)^R(x,3));}function Gamma1256(x){return(S(x,17)^S(x,19)^R(x,10));}function core_sha256(m,l){var K=new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);var HASH=new Array(0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19);var W=new Array(64);var a,b,c,d,e,f,g,h,i,j;var T1,T2;m[l>>5]|=0x80<<(24-l%32);m[((l+64>>9)<<4)+15]=l;for(var i=0;i<m.length;i+=16){a=HASH[0];b=HASH[1];c=HASH[2];d=HASH[3];e=HASH[4];f=HASH[5];g=HASH[6];h=HASH[7];for(var j=0;j<64;j++){if(j<16)W[j]=m[j+i];else W[j]=safe_add(safe_add(safe_add(Gamma1256(W[j-2]),W[j-7]),Gamma0256(W[j-15])),W[j-16]);T1=safe_add(safe_add(safe_add(safe_add(h,Sigma1256(e)),Ch(e,f,g)),K[j]),W[j]);T2=safe_add(Sigma0256(a),Maj(a,b,c));h=g;g=f;f=e;e=safe_add(d,T1);d=c;c=b;b=a;a=safe_add(T1,T2);}HASH[0]=safe_add(a,HASH[0]);HASH[1]=safe_add(b,HASH[1]);HASH[2]=safe_add(c,HASH[2]);HASH[3]=safe_add(d,HASH[3]);HASH[4]=safe_add(e,HASH[4]);HASH[5]=safe_add(f,HASH[5]);HASH[6]=safe_add(g,HASH[6]);HASH[7]=safe_add(h,HASH[7]);}return HASH;}function str2binb(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz){bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(24-i%32);}return bin;}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;}function binb2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8))&0xF);}return str;}s=Utf8Encode(s);return binb2hex(core_sha256(str2binb(s),s.length*chrsz));}

/**************** Preamble ****************/
// This script is licensed under the creative commons license
// Attribution-Share Alike 2.5 Switzerland
// You are free to share and to remix this work under the 
// following conditions: Attribution and Share-Alike
// See http://creativecommons.org/licenses/by-sa/2.5/ch/deed.en
// Thus you are free to use it for commercial purposes.
//
// Dieses Script steht unter der Creative Commons-Lizenz
// Attribution-Share Alike 2.5 Switzerland
// Sie dürfen das Werk vervielfältigen, verbreiten und
// öffentlich zugänglich machen,
// sowie Bearbeitungen des Werkes anfertigen
// Zu den folgenden Bedingungen:
// Namensnennung und Weitergabe unter gleichen Bedingungen.
// Siehe http://creativecommons.org/licenses/by-sa/2.5/ch/
// Somit sind Sie frei, das Script für kommerzielle Zwecke zu nutzen.
//
// Mathias Nater, Zürich, 2009
// mathias at mnn dot ch
/**************** Preamble ****************/
var Hyphenator=function(){var SUPPORTEDLANG={"de":true,"en":true,"es":true,"fr":true,"nl":true,"ml":true,"hi":true,"bn":true,"gu":true,"ta":true,"ka":true,"te":true,"or":true,"pa":true,"sv":true,"it":true};var LANGUAGEHINT="Deutsch: de\tEnglish: en\tEspa%F1ol: es\tFran%E7ais: fr\tNederlands: nl\tSvenska: sv\tMalayalam: ml\tHindi: hi\tBengali: bn\tGujarati : gu\tTamil: ta\tOriya: or\tPanjabi: pa\tTelugu: te\tKannada: kn\tItaliano: it";var PROMPTERSTRINGS={"de":"Die Sprache dieser Webseite konnte nicht automatisch bestimmt werden. Bitte Sprache angeben: \n\n"+LANGUAGEHINT,"en":"The language of this website could not be determined automatically. Please indicate main language: \n\n"+LANGUAGEHINT,"es":"El idioma del sitio no pudo determinarse autom%E1ticamente. Por favor, indique el idioma principal: \n\n"+LANGUAGEHINT,"fr":"La langue de ce site n%u2019a pas pu %EAtre d%E9termin%E9e automatiquement. Veuillez indiquer une langue%A0: \n\n"+LANGUAGEHINT,"nl":"De taal van deze website kan niet automatisch worden bepaald. Geef de hoofdtaal op: \n\n"+LANGUAGEHINT,"sv":"Spr%E5ket p%E5 den h%E4r webbplatsen kunde inte avg%F6ras automatiskt. V%E4nligen ange: \n\n"+LANGUAGEHINT,"ml":"ഈ വെബ്സൈറ്റിന്റെ ഭാഷ കണ്ടുപിടിയ്ക്കാന് കഴിഞ്ഞില്ല. ഭാഷ ഏതാണെന്നു തിരഞ്ഞെടുക്കുക: \n\n"+LANGUAGEHINT,"it":"Lingua del sito sconosciuta. Indicare una lingua, per favore: \n\n"+LANGUAGEHINT};var BASEPATH="/assets/js/";var DONTHYPHENATE={"script":true,"code":true,"pre":true,"img":true,"br":true,"samp":true,"kbd":true,"var":true,"abbr":true,"acronym":true,"sub":true,"sup":true,"button":true,"option":true,"label":true};var exceptions={};var enableCache=true;var cache=function(){if(!enableCache){return undefined;}var r={},l;for(l in SUPPORTEDLANG){if(SUPPORTEDLANG.hasOwnProperty(l)){r[l]={};}}return r;}();var enableRemoteLoading=true;var displayToggleBox=false;var hyphenateclass="hyphenate";var hyphen=String.fromCharCode(173);var urlhyphen="";var min=6;var bookmarklet=false;var patternsloaded={};var preparestate=0;var mainlanguage=null;var url="(\\w*://)((\\w*:)?(\\w*)@)?([\\w\\.]*)?(:\\d*)?(/[\\w#!:\\.?\\+=&%@!\\-]*)*";var mail="[\\w-\\.]+@[\\w\\.]+";var urlRE=new RegExp(url,"i");var mailRE=new RegExp(mail,"i");var zerowidthspace="";function createZeroWidthSpace(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("msie 6")===-1&&ua.indexOf("msie 8")===-1){zerowidthspace=String.fromCharCode(8203);}else{zerowidthspace="";}return zerowidthspace;}function checkIfBookmarklet(){var loc=null;var jsArray=document.getElementsByTagName("script");for(var i=0,l=jsArray.length;i<l;i++){if(!!jsArray[i].getAttribute("src")){loc=jsArray[i].getAttribute("src");}if(!loc){continue;}else{if(loc.indexOf("Hyphenator.js?bm=true")!==-1){bookmarklet=true;}}}}function getLang(el,nofallback){if(!!el.getAttribute("lang")){return el.getAttribute("lang").substring(0,2);}try{if(!!el.getAttribute("xml:lang")){return el.getAttribute("xml:lang").substring(0,2);}}catch(ex){}if(el.tagName!="HTML"&&nofallback){return getLang(el.parentNode);}if(!nofallback&&mainlanguage){return mainlanguage;}return null;}function autoSetMainLanguage(){var el=document.getElementsByTagName("html")[0];mainlanguage=getLang(el);if(!mainlanguage){var m=document.getElementsByTagName("meta");for(var i=0;i<m.length;i++){if(!!m[i].getAttribute("http-equiv")&&(m[i].getAttribute("http-equiv")==="content-language")){mainlanguage=m[i].getAttribute("content").substring(0,2);}if(!!m[i].getAttribute("name")&&(m[i].getAttribute("name")==="DC.language")){mainlanguage=m[i].getAttribute("content").substring(0,2);}if(!!m[i].getAttribute("name")&&(m[i].getAttribute("name")==="language")){mainlanguage=m[i].getAttribute("content").substring(0,2);}}}if(!mainlanguage){var text="";var ul=navigator.language?navigator.language:navigator.userLanguage;ul=ul.substring(0,2);if(SUPPORTEDLANG[ul]){text=PROMPTERSTRINGS[ul];}else{text=PROMPTERSTRINGS.en;}var lang=window.prompt(unescape(text),ul);if(SUPPORTEDLANG[lang]){mainlanguage=lang;}}}function hideInside(){var elements,i,l;if(document.getElementsByClassName){elements=document.getElementsByClassName(hyphenateclass);for(i=0,l=elements.length;i<l;i++){elements[i].style.visibility="hidden";}}else{elements=document.getElementsByTagName("*");for(i=0,l=elements.length;i<l;i++){if(elements[i].className.indexOf(hyphenateclass)!==-1&&elements[i].className.indexOf("donthyphenate")===-1){elements[i].style.visibility="hidden";}}}}function switchToggleBox(s){var myBox,bdy,myIdAttribute,myTextNode;if(s){bdy=document.getElementsByTagName("body")[0];myBox=document.createElement("div");myIdAttribute=document.createAttribute("id");myIdAttribute.nodeValue="HyphenatorToggleBox";myClassAttribute=document.createAttribute("class");myClassAttribute.nodeValue="donthyphenate";myTextNode=document.createTextNode("Hy-phe-na-ti-on");myBox.appendChild(myTextNode);myBox.setAttributeNode(myIdAttribute);myBox.setAttributeNode(myClassAttribute);myBox.onclick=Hyphenator.toggleHyphenation;myBox.style.position="absolute";myBox.style.top="0px";myBox.style.right="0px";myBox.style.margin="0";myBox.style.backgroundColor="#AAAAAA";myBox.style.color="#FFFFFF";myBox.style.font="6pt Arial";myBox.style.letterSpacing="0.2em";myBox.style.padding="3px";myBox.style.cursor="pointer";myBox.style.WebkitBorderBottomLeftRadius="4px";myBox.style.MozBorderRadiusBottomleft="4px";bdy.appendChild(myBox);}else{myBox=document.getElementById("HyphenatorToggleBox");myBox.style.visibility="hidden";}}function loadPatterns(lang){if(SUPPORTEDLANG[lang]&&!patternsloaded[lang]){var url=BASEPATH+"patterns/"+lang+".js";}else{return;}if(document.createElement){var head=document.getElementsByTagName("head").item(0);var script=document.createElement("script");script.src=url;script.id=lang;script.type="text/javascript";head.appendChild(script);}}function convertPatternsToObject(){for(var lang in Hyphenator.patterns){if(Hyphenator.patterns.hasOwnProperty(lang)){var sa=Hyphenator.patterns[lang].split(" ");Hyphenator.patterns[lang]={};var pat,key,i=0;while(!!(pat=sa[i++])){key=pat.replace(/\d/g,"");Hyphenator.patterns[lang][key]=pat;}}}}function runHyphenation(){function bind(obj,fun,args){return function(){var f=obj[fun];return f.call(obj,args);};}var body=document.getElementsByTagName("body")[0];var i,elements,l;if(Hyphenator.isBookmarklet()){Hyphenator.hyphenateElement(body);}else{if(document.getElementsByClassName){elements=document.getElementsByClassName(hyphenateclass);for(i=0,l=elements.length;i<l;i++){window.setTimeout(bind(Hyphenator,"hyphenateElement",elements[i]),0);}}else{elements=document.getElementsByTagName("*");for(i=0,l=elements.length;i<l;i++){if(elements[i].className.indexOf(hyphenateclass)!==-1){window.setTimeout(bind(Hyphenator,"hyphenateElement",elements[i]),0);}}}}}function removeHyphenation(){var body=document.getElementsByTagName("body")[0];var elements,i,l;if(Hyphenator.isBookmarklet()){Hyphenator.deleteHyphenationInElement(body);}else{if(document.getElementsByClassName){elements=document.getElementsByClassName(hyphenateclass);for(i=0,l=elements.length;i<l;i++){Hyphenator.deleteHyphenationInElement(elements[i]);}}else{elements=document.getElementsByTagName("*");for(i=0,l=elements.length;i<l;i++){if(elements[i].className.indexOf(hyphenateclass)!==-1){Hyphenator.deleteHyphenationInElement(elements[i]);}}}}}function runOnContentLoaded(w,f){var d=w.document,D="DOMContentLoaded",u=w.navigator.userAgent.toLowerCase(),v=parseFloat(u.match(/.+(?:rv|it|ml|ra|ie)[\/: ]([\d.]+)/)[1]),documentloaded=false;function init(e){if(!documentloaded){documentloaded=true;f((e.type&&e.type===D)?e:{type:D,target:d,eventPhase:0,currentTarget:d,timeStamp:new Date().getTime(),eventType:e.type||e});}}if(/webkit\//.test(u)&&v<525.13){(function(){if(/complete|loaded/.test(d.readyState)){init("khtml-poll");}else{setTimeout(arguments.callee,10);}})();}else{if(/msie/.test(u)&&!w.opera){d.attachEvent("onreadystatechange",function(e){if(d.readyState==="complete"){d.detachEvent("on"+e.type,arguments.callee);init(e);}});if(w==top){(function(){try{d.documentElement.doScroll("left");}catch(e){setTimeout(arguments.callee,10);return;}init("msie-poll");})();}}else{if(d.addEventListener&&(/opera\//.test(u)&&v>9)||(/gecko\//.test(u)&&v>=1.8)||(/khtml\//.test(u)&&v>=4)||(/webkit\//.test(u)&&v>=525.13)){d.addEventListener(D,function(e){d.removeEventListener(D,arguments.callee,false);init(e);},false);}else{var oldonload=w.onload;w.onload=function(e){init(e||w.event);if(typeof oldonload==="function"){oldonload(e||w.event);}};}}}}function prepare(callback){if(!enableRemoteLoading){preparestate=2;callback();return;}preparestate=1;var doclanguages={};doclanguages[mainlanguage]=true;var elements=document.getElementsByTagName("body")[0].getElementsByTagName("*");var lang=null;var i,l;for(i=0,l=elements.length;i<l;i++){if(!!(lang=getLang(elements[i],true))){if(SUPPORTEDLANG[lang]){doclanguages[lang]=true;}else{}}}for(lang in doclanguages){if(doclanguages.hasOwnProperty(lang)){loadPatterns(lang);}}var interval=window.setInterval(function(){var finishedLoading=false;for(lang in doclanguages){if(!patternsloaded[lang]){finishedLoading=false;break;}else{finishedLoading=true;}}if(finishedLoading){window.clearInterval(interval);preparestate=2;callback();}},100);}function autoinit(){for(var lang in SUPPORTEDLANG){if(SUPPORTEDLANG.hasOwnProperty(lang)){patternsloaded[lang]=false;}}autoSetMainLanguage();urlhyphen=createZeroWidthSpace();checkIfBookmarklet();}autoinit();return{leftmin:{},rightmin:{},shortestPattern:{},longestPattern:{},specialChars:{},patterns:{},init:function(obj){if(obj.classname){Hyphenator.setClassName(obj.classname);}if(obj.minwordlength){Hyphenator.setMinWordLength(obj.minwordlength);}if(obj.hyphenchar){Hyphenator.setHyphenChar(obj.hyphenchar);}if(obj.togglebox){Hyphenator.setDisplayToggleBox(obj.togglebox);}if(obj.urlhyphenchar){Hyphenator.setUrlHyphenChar(obj.urlhyphenchar);}if(obj.remoteloading){Hyphenator.setRemoteLoading(obj.remoteloading);}},run:function(){runOnContentLoaded(window,function(){hideInside();Hyphenator.hyphenateDocument();if(displayToggleBox){switchToggleBox(true);}});},addExceptions:function(words){var w=words.split(",");for(var i=0,l=w.length;i<l;i++){var key=w[i].replace(/-/g,"");if(!exceptions[key]){exceptions[key]=w[i];}}},setClassName:function(str){hyphenateclass=str||"hyphenate";},setMinWordLength:function(mymin){min=mymin||6;},setHyphenChar:function(str){if(str==="&shy;"){str=String.fromCharCode(173);}hyphen=str||String.fromCharCode(173);},setDisplayToggleBox:function(bool){if(bool===undefined){var bool=true;}displayToggleBox=bool;},setUrlHyphenChar:function(str){urlhyphen=str||createZeroWidthSpace();},setRemoteLoading:function(bool){enableRemoteLoading=bool;},setEnableCache:function(bool){enableCache=bool;},updatePatternsLoadState:function(lang,bool){patternsloaded[lang]=bool;},isBookmarklet:function(){return bookmarklet;},hyphenateDocument:function(){function callback(){convertPatternsToObject();runHyphenation();}if(preparestate!==2){if(preparestate===0){prepare(callback);}}},hyphenateElement:function(el,lang){if(el.className.indexOf("donthyphenate")!==-1){return;}if(!lang){lang=getLang(el,true);}else{var elemlang=getLang(el,true);if(elemlang!==null){lang=elemlang;}}var wrd="[\\w"+Hyphenator.specialChars[lang]+"@"+String.fromCharCode(173)+"-]{"+min+",}";function hyphenate(word){if(urlRE.test(word)||mailRE.test(word)){return Hyphenator.hyphenateURL(word);}else{return Hyphenator.hyphenateWord(lang,word);}}var genRegExp=new RegExp("("+url+")|("+mail+")|("+wrd+")","gi");var n,i;for(i=0;(n=el.childNodes[i]);i++){if(n.nodeType===3&&n.data.length>=min){n.data=n.data.replace(genRegExp,hyphenate);}else{if(n.nodeType===1&&!DONTHYPHENATE[n.nodeName.toLowerCase()]){Hyphenator.hyphenateElement(n,lang);}}}if(el.className.indexOf(hyphenateclass)!==-1){el.style.visibility="visible";}},deleteHyphenationInElement:function(el){var h,i,n;switch(hyphen){case"|":h="\\|";break;case"+":h="\\+";break;case"*":h="\\*";break;default:h=hyphen;}for(i=0;(n=el.childNodes[i]);i++){if(n.nodeType===3){n.data=n.data.replace(new RegExp(h,"g"),"");}else{if(n.nodeType===1){Hyphenator.deleteHyphenationInElement(n);}}}},hyphenateWord:function(lang,word){if(word===""){return"";}if(word.indexOf(String.fromCharCode(173))!==-1){return word;}if(exceptions.hasOwnProperty(word)){return exceptions[word].replace(/-/g,hyphen);}if(enableCache&&cache.hasOwnProperty(lang)&&cache[lang].hasOwnProperty(word)){return cache[lang][word];}if(word.indexOf("-")!==-1){var parts=word.split("-");for(var i=0,l=parts.length;i<l;i++){parts[i]=Hyphenator.hyphenateWord(lang,parts[i]);}return parts.join("-"+zerowidthspace);}var w="_"+word+"_";var wl=w.length;var s=w.split("");w=w.toLowerCase();var hypos=[];var p,maxwins,win,pat=false,patl,c,digits,z;var numb3rs={"0":true,"1":true,"2":true,"3":true,"4":true,"5":true,"6":true,"7":true,"8":true,"9":true};var n=wl-Hyphenator.shortestPattern[lang];for(p=0;p<=n;p++){maxwins=Math.min((wl-p),Hyphenator.longestPattern[lang]);for(win=Hyphenator.shortestPattern[lang];win<=maxwins;win++){if(Hyphenator.patterns[lang].hasOwnProperty(w.substr(p,win))){pat=Hyphenator.patterns[lang][w.substr(p,win)];}else{continue;}digits=1;patl=pat.length;for(i=0;i<patl;i++){c=pat.charAt(i);if(numb3rs[c]){if(i===0){z=p-1;if(!hypos[z]||hypos[z]<c){hypos[z]=c;}}else{z=p+i-digits;if(!hypos[z]||hypos[z]<c){hypos[z]=c;}}digits++;}}}}var inserted=0;for(i=Hyphenator.leftmin[lang];i<=(word.length-Hyphenator.rightmin[lang]);i++){if(!!(hypos[i]&1)){s.splice(i+inserted+1,0,hyphen);inserted++;}}var hyphenatedword=s.slice(1,-1).join("");if(enableCache){cache[lang][word]=hyphenatedword;}return hyphenatedword;},hyphenateURL:function(url){return url.replace(/([:\/\.\?#&_,;!@]+)/gi,"$&"+urlhyphen);},toggleHyphenation:function(){var currentText=document.getElementById("HyphenatorToggleBox").firstChild.nodeValue;if(currentText==="Hy-phe-na-ti-on"){removeHyphenation();document.getElementById("HyphenatorToggleBox").firstChild.nodeValue="Hyphenation";}else{runHyphenation();document.getElementById("HyphenatorToggleBox").firstChild.nodeValue="Hy-phe-na-ti-on";}}};}();if(Hyphenator.isBookmarklet()){Hyphenator.hyphenateDocument();}
// hyphenater en.js
Hyphenator.leftmin['en']=2;
Hyphenator.rightmin['en']=2;
Hyphenator.shortestPattern['en']=2;
Hyphenator.longestPattern['en']=8;
Hyphenator.specialChars['en']='';
Hyphenator.patterns['en']="_ach4 _ad4der _af1t _al3t _am5at _an5c _ang4 _ani5m _ant4 _an3te _anti5s _ar5s _ar4tie _ar4ty _as3c _as1p _as1s _aster5 _atom5 _au1d _av4i _awn4 _ba4g _ba5na _bas4e _ber4 _be5ra _be3sm _be5sto _bri2 _but4ti _cam4pe _can5c _capa5b _car5ol _ca4t _ce4la _ch4 _chill5i _ci2 _cit5r _co3e _co4r _cor5ner _de4moi _de3o _de3ra _de3ri _des4c _dictio5 _do4t _du4c _dumb5 _earth5 _eas3i _eb4 _eer4 _eg2 _el5d _el3em _enam3 _en3g _en3s _eq5ui5t _er4ri _es3 _eu3 _eye5 _fes3 _for5mer _ga2 _ge2 _gen3t4 _ge5og _gi5a _gi4b _go4r _hand5i _han5k _he2 _hero5i _hes3 _het3 _hi3b _hi3er _hon5ey _hon3o _hov5 _id4l _idol3 _im3m _im5pin _in1 _in3ci _ine2 _in2k _in3s _ir5r _is4i _ju3r _la4cy _la4m _lat5er _lath5 _le2 _leg5e _len4 _lep5 _lev1 _li4g _lig5a _li2n _li3o _li4t _mag5a5 _mal5o _man5a _mar5ti _me2 _mer3c _me5ter _mis1 _mist5i _mon3e _mo3ro _mu5ta _muta5b _ni4c _od2 _odd5 _of5te _or5ato _or3c _or1d _or3t _os3 _os4tl _oth3 _out3 _ped5al _pe5te _pe5tit _pi4e _pio5n _pi2t _pre3m _ra4c _ran4t _ratio5na _ree2 _re5mit _res2 _re5stat _ri4g _rit5u _ro4q _ros5t _row5d _ru4d _sci3e _self5 _sell5 _se2n _se5rie _sh2 _si2 _sing4 _st4 _sta5bl _sy2 _ta4 _te4 _ten5an _th2 _ti2 _til4 _tim5o5 _ting4 _tin5k _ton4a _to4p _top5i _tou5s _trib5ut _un1a _un3ce _under5 _un1e _un5k _un5o _un3u _up3 _ure3 _us5a _ven4de _ve5ra _wil5i _ye4 4ab_ a5bal a5ban abe2 ab5erd abi5a ab5it5ab ab5lat ab5o5liz 4abr ab5rog ab3ul a4car ac5ard ac5aro a5ceou ac1er a5chet 4a2ci a3cie ac1in a3cio ac5rob act5if ac3ul ac4um a2d ad4din ad5er_ 2adi a3dia ad3ica adi4er a3dio a3dit a5diu ad4le ad3ow ad5ran ad4su 4adu a3duc ad5um ae4r aeri4e a2f aff4 a4gab aga4n ag5ell age4o 4ageu ag1i 4ag4l ag1n a2go 3agog ag3oni a5guer ag5ul a4gy a3ha a3he ah4l a3ho ai2 a5ia a3ic_ ai5ly a4i4n ain5in ain5o ait5en a1j ak1en al5ab al3ad a4lar 4aldi 2ale al3end a4lenti a5le5o al1i al4ia_ ali4e al5lev 4allic 4alm a5log_ a4ly_ 4alys 5a5lyst 5alyt 3alyz 4ama am5ab am3ag ama5ra am5asc a4matis a4m5ato am5era am3ic am5if am5ily am1in ami4no a2mo a5mon amor5i amp5en a2n an3age 3analy a3nar an3arc anar4i a3nati 4and ande4s an3dis an1dl an4dow a5nee a3nen an5est_ a3neu 2ang ang5ie an1gl a4n1ic a3nies an3i3f an4ime a5nimi a5nine an3io a3nip an3ish an3it a3niu an4kli 5anniz ano4 an5ot anoth5 an2sa an4sco an4sn an2sp ans3po an4st an4sur antal4 an4tie 4anto an2tr an4tw an3ua an3ul a5nur 4ao apar4 ap5at ap5ero a3pher 4aphi a4pilla ap5illar ap3in ap3ita a3pitu a2pl apoc5 ap5ola apor5i apos3t aps5es a3pu aque5 2a2r ar3act a5rade ar5adis ar3al a5ramete aran4g ara3p ar4at a5ratio ar5ativ a5rau ar5av4 araw4 arbal4 ar4chan ar5dine ar4dr ar5eas a3ree ar3ent a5ress ar4fi ar4fl ar1i ar5ial ar3ian a3riet ar4im ar5inat ar3io ar2iz ar2mi ar5o5d a5roni a3roo ar2p ar3q arre4 ar4sa ar2sh 4as_ as4ab as3ant ashi4 a5sia_ a3sib a3sic 5a5si4t ask3i as4l a4soc as5ph as4sh as3ten as1tr asur5a a2ta at3abl at5ac at3alo at5ap ate5c at5ech at3ego at3en_ at3era ater5n a5terna at3est at5ev 4ath ath5em a5then at4ho ath5om 4ati_ a5tia at5i5b at1ic at3if ation5ar at3itu a4tog a2tom at5omiz a4top a4tos a1tr at5rop at4sk at4tag at5te at4th a2tu at5ua at5ue at3ul at3ura a2ty au4b augh3 au3gu au4l2 aun5d au3r au5sib aut5en au1th a2va av3ag a5van ave4no av3era av5ern av5ery av1i avi4er av3ig av5oc a1vor 3away aw3i aw4ly aws4 ax4ic ax4id ay5al aye4 ays4 azi4er azz5i 5ba_ bad5ger ba4ge bal1a ban5dag ban4e ban3i barbi5 bari4a bas4si 1bat ba4z 2b1b b2be b3ber bbi4na 4b1d 4be_ beak4 beat3 4be2d be3da be3de be3di be3gi be5gu 1bel be1li be3lo 4be5m be5nig be5nu 4bes4 be3sp be5str 3bet bet5iz be5tr be3tw be3w be5yo 2bf 4b3h bi2b bi4d 3bie bi5en bi4er 2b3if 1bil bi3liz bina5r4 bin4d bi5net bi3ogr bi5ou bi2t 3bi3tio bi3tr 3bit5ua b5itz b1j bk4 b2l2 blath5 b4le_ blen4 5blesp b3lis b4lo blun4t 4b1m 4b3n bne5g 3bod bod3i bo4e bol3ic bom4bi bon4a bon5at 3boo 5bor_ 4b1ora bor5d 5bore 5bori 5bos4 b5ota both5 bo4to bound3 4bp 4brit broth3 2b5s2 bsor4 2bt bt4l b4to b3tr buf4fer bu4ga bu3li bumi4 bu4n bunt4i bu3re bus5ie buss4e 5bust 4buta 3butio b5uto b1v 4b5w 5by_ bys4 1ca cab3in ca1bl cach4 ca5den 4cag4 2c5ah ca3lat cal4la call5in 4calo can5d can4e can4ic can5is can3iz can4ty cany4 ca5per car5om cast5er cas5tig 4casy ca4th 4cativ cav5al c3c ccha5 cci4a ccompa5 ccon4 ccou3t 2ce_ 4ced_ 4ceden 3cei 5cel_ 3cell 1cen 3cenc 2cen4e 4ceni 3cent 3cep ce5ram 4cesa 3cessi ces5si5b ces5t cet4 c5e4ta cew4 2ch 4ch_ 4ch3ab 5chanic ch5a5nis che2 cheap3 4ched che5lo 3chemi ch5ene ch3er_ ch3ers 4ch1in 5chine_ ch5iness 5chini 5chio 3chit chi2z 3cho2 ch4ti 1ci 3cia ci2a5b cia5r ci5c 4cier 5cific_ 4cii ci4la 3cili 2cim 2cin c4ina 3cinat cin3em c1ing c5ing_ 5cino cion4 4cipe ci3ph 4cipic 4cista 4cisti 2c1it cit3iz 5ciz ck1 ck3i 1c4l4 4clar c5laratio 5clare cle4m 4clic clim4 cly4 c5n 1co co5ag coe2 2cog co4gr coi4 co3inc col5i 5colo col3or com5er con4a c4one con3g con5t co3pa cop3ic co4pl 4corb coro3n cos4e cov1 cove4 cow5a coz5e co5zi c1q cras5t 5crat_ 5cratic cre3at 5cred 4c3reta cre4v cri2 cri5f c4rin cris4 5criti cro4pl crop5o cros4e cru4d 4c3s2 2c1t cta4b ct5ang c5tant c2te c3ter c4ticu ctim3i ctu4r c4tw cud5 c4uf c4ui cu5ity 5culi cul4tis 3cultu cu2ma c3ume cu4mi 3cun cu3pi cu5py cur5a4b cu5ria 1cus cuss4i 3c4ut cu4tie 4c5utiv 4cutr 1cy cze4 1d2a 5da_ 2d3a4b dach4 4daf 2dag da2m2 dan3g dard5 dark5 4dary 3dat 4dativ 4dato 5dav4 dav5e 5day d1b d5c d1d4 2de_ deaf5 deb5it de4bon decan4 de4cil de5com 2d1ed 4dee_ de5if deli4e del5i5q de5lo d4em 5dem_ 3demic dem5ic_ de5mil de4mons demor5 1den de4nar de3no denti5f de3nu de1p de3pa depi4 de2pu d3eq d4erh 5derm dern5iz der5s des2 d2es_ de1sc de2s5o des3ti de3str de4su de1t de2to de1v dev3il 4dey 4d1f d4ga d3ge4t dg1i d2gy d1h2 5di_ 1d4i3a dia5b di4cam d4ice 3dict 3did 5di3en d1if di3ge di4lato d1in 1dina 3dine_ 5dini di5niz 1dio dio5g di4pl dir2 di1re dirt5i dis1 5disi d4is3t d2iti 1di1v d1j d5k2 4d5la 3dle_ 3dled 3dles_ 4dless 2d3lo 4d5lu 2dly d1m 4d1n4 1do 3do_ do5de 5doe 2d5of d4og do4la doli4 do5lor dom5iz do3nat doni4 doo3d dop4p d4or 3dos 4d5out do4v 3dox d1p 1dr drag5on 4drai dre4 drea5r 5dren dri4b dril4 dro4p 4drow 5drupli 4dry 2d1s2 ds4p d4sw d4sy d2th 1du d1u1a du2c d1uca duc5er 4duct_ 4ducts du5el du4g d3ule dum4be du4n 4dup du4pe d1v d1w d2y 5dyn dy4se dys5p e1a4b e3act ead1 ead5ie ea4ge ea5ger ea4l eal5er eal3ou eam3er e5and ear3a ear4c ear5es ear4ic ear4il ear5k ear2t eart3e ea5sp e3ass east3 ea2t eat5en eath3i e5atif e4a3tu ea2v eav3en eav5i eav5o 2e1b e4bel_ e4bels e4ben e4bit e3br e4cad ecan5c ecca5 e1ce ec5essa ec2i e4cib ec5ificat ec5ifie ec5ify ec3im eci4t e5cite e4clam e4clus e2col e4comm e4compe e4conc e2cor ec3ora eco5ro e1cr e4crem ec4tan ec4te e1cu e4cul ec3ula 2e2da 4ed3d e4d1er ede4s 4edi e3dia ed3ib ed3ica ed3im ed1it edi5z 4edo e4dol edon2 e4dri e4dul ed5ulo ee2c eed3i ee2f eel3i ee4ly ee2m ee4na ee4p1 ee2s4 eest4 ee4ty e5ex e1f e4f3ere 1eff e4fic 5efici efil4 e3fine ef5i5nite 3efit efor5es e4fuse_ 4egal eger4 eg5ib eg4ic eg5ing e5git5 eg5n e4go_ e4gos eg1ul e5gur 5egy e1h4 eher4 ei2 e5ic ei5d eig2 ei5gl e3imb e3inf e1ing e5inst eir4d eit3e ei3th e5ity e1j e4jud ej5udi eki4n ek4la e1la e4la_ e4lac elan4d el5ativ e4law elaxa4 e3lea el5ebra 5elec e4led el3ega e5len e4l1er e1les el2f el2i e3libe e4l5ic_ el3ica e3lier el5igib e5lim e4l3ing e3lio e2lis el5ish e3liv3 4ella el4lab ello4 e5loc el5og el3op_ el2sh el4ta e5lud el5ug e4mac e4mag e5man em5ana em5b e1me e2mel e4met em3ica emi4e em5igra em1in2 em5ine em3i3ni e4mis em5ish e5miss em3iz 5emniz emo4g emoni5o em3pi e4mul em5ula emu3n e3my en5amo e4nant ench4er en3dic e5nea e5nee en3em en5ero en5esi en5est en3etr e3new en5ics e5nie e5nil e3nio en3ish en3it e5niu 5eniz 4enn 4eno eno4g e4nos en3ov en4sw ent5age 4enthes en3ua en5uf e3ny_ 4en3z e5of eo2g e4oi4 e3ol eop3ar e1or eo3re eo5rol eos4 e4ot eo4to e5out e5ow e2pa e3pai ep5anc e5pel e3pent ep5etitio ephe4 e4pli e1po e4prec ep5reca e4pred ep3reh e3pro e4prob ep4sh ep5ti5b e4put ep5uta e1q equi3l e4q3ui3s er1a era4b 4erand er3ar 4erati_ 2erb er4bl er3ch er4che 2ere_ e3real ere5co ere3in er5el_ er3emo er5ena er5ence 4erene er3ent ere4q er5ess er3est eret4 er1h er1i e1ria4 5erick e3rien eri4er er3ine e1rio 4erit er4iu eri4v e4riva er3m4 er4nis 4ernit 5erniz er3no 2ero er5ob e5roc ero4r er1ou er1s er3set ert3er 4ertl er3tw 4eru eru4t 5erwau e1s4a e4sage_ e4sages es2c e2sca es5can e3scr es5cu e1s2e e2sec es5ecr es5enc e4sert_ e4serts e4serva 4esh e3sha esh5en e1si e2sic e2sid es5iden es5igna e2s5im es4i4n esis4te esi4u e5skin es4mi e2sol es3olu e2son es5ona e1sp es3per es5pira es4pre 2ess es4si4b estan4 es3tig es5tim 4es2to e3ston 2estr e5stro estruc5 e2sur es5urr es4w eta4b eten4d e3teo ethod3 et1ic e5tide etin4 eti4no e5tir e5titio et5itiv 4etn et5ona e3tra e3tre et3ric et5rif et3rog et5ros et3ua et5ym et5z 4eu e5un e3up eu3ro eus4 eute4 euti5l eu5tr eva2p5 e2vas ev5ast e5vea ev3ell evel3o e5veng even4i ev1er e5verb e1vi ev3id evi4l e4vin evi4v e5voc e5vu e1wa e4wag e5wee e3wh ewil5 ew3ing e3wit 1exp 5eyc 5eye_ eys4 1fa fa3bl fab3r fa4ce 4fag fain4 fall5e 4fa4ma fam5is 5far far5th fa3ta fa3the 4fato fault5 4f5b 4fd 4fe_ feas4 feath3 fe4b 4feca 5fect 2fed fe3li fe4mo fen2d fend5e fer1 5ferr fev4 4f1f f4fes f4fie f5fin_ f2f5is f4fly f2fy 4fh 1fi fi3a 2f3ic_ 4f3ical f3ican 4ficate f3icen fi3cer fic4i 5ficia 5ficie 4fics fi3cu fi5del fight5 fil5i fill5in 4fily 2fin 5fina fin2d5 fi2ne f1in3g fin4n fis4ti f4l2 f5less flin4 flo3re f2ly5 4fm 4fn 1fo 5fon fon4de fon4t fo2r fo5rat for5ay fore5t for4i fort5a fos5 4f5p fra4t f5rea fres5c fri2 fril4 frol5 2f3s 2ft f4to f2ty 3fu fu5el 4fug fu4min fu5ne fu3ri fusi4 fus4s 4futa 1fy 1ga gaf4 5gal_ 3gali ga3lo 2gam ga5met g5amo gan5is ga3niz gani5za 4gano gar5n4 gass4 gath3 4gativ 4gaz g3b gd4 2ge_ 2ged geez4 gel4in ge5lis ge5liz 4gely 1gen ge4nat ge5niz 4geno 4geny 1geo ge3om g4ery 5gesi geth5 4geto ge4ty ge4v 4g1g2 g2ge g3ger gglu5 ggo4 gh3in gh5out gh4to 5gi_ 1gi4a gia5r g1ic 5gicia g4ico gien5 5gies_ gil4 g3imen 3g4in_ gin5ge 5g4ins 5gio 3gir gir4l g3isl gi4u 5giv 3giz gl2 gla4 glad5i 5glas 1gle gli4b g3lig 3glo glo3r g1m g4my gn4a g4na_ gnet4t g1ni g2nin g4nio g1no g4non 1go 3go_ gob5 5goe 3g4o4g go3is gon2 4g3o3na gondo5 go3ni 5goo go5riz gor5ou 5gos_ gov1 g3p 1gr 4grada g4rai gran2 5graph_ g5rapher 5graphic 4graphy 4gray gre4n 4gress_ 4grit g4ro gruf4 gs2 g5ste gth3 gu4a 3guard 2gue 5gui5t 3gun 3gus 4gu4t g3w 1gy 2g5y3n gy5ra h3ab4l hach4 hae4m hae4t h5agu ha3la hala3m ha4m han4ci han4cy 5hand_ han4g hang5er hang5o h5a5niz han4k han4te hap3l hap5t ha3ran ha5ras har2d hard3e har4le harp5en har5ter has5s haun4 5haz haz3a h1b 1head 3hear he4can h5ecat h4ed he5do5 he3l4i hel4lis hel4ly h5elo hem4p he2n hena4 hen5at heo5r hep5 h4era hera3p her4ba here5a h3ern h5erou h3ery h1es he2s5p he4t het4ed heu4 h1f h1h hi5an hi4co high5 h4il2 himer4 h4ina hion4e hi4p hir4l hi3ro hir4p hir4r his3el his4s hith5er hi2v 4hk 4h1l4 hlan4 h2lo hlo3ri 4h1m hmet4 2h1n h5odiz h5ods ho4g hoge4 hol5ar 3hol4e ho4ma home3 hon4a ho5ny 3hood hoon4 hor5at ho5ris hort3e ho5ru hos4e ho5sen hos1p 1hous house3 hov5el 4h5p 4hr4 hree5 hro5niz hro3po 4h1s2 h4sh h4tar ht1en ht5es h4ty hu4g hu4min hun5ke hun4t hus3t4 hu4t h1w h4wart hy3pe hy3ph hy2s 2i1a i2al iam4 iam5ete i2an 4ianc ian3i 4ian4t ia5pe iass4 i4ativ ia4tric i4atu ibe4 ib3era ib5ert ib5ia ib3in ib5it_ ib5ite i1bl ib3li i5bo i1br i2b5ri i5bun 4icam 5icap 4icar i4car_ i4cara icas5 i4cay iccu4 4iceo 4ich 2ici i5cid ic5ina i2cip ic3ipa i4cly i2c5oc 4i1cr 5icra i4cry ic4te ictu2 ic4t3ua ic3ula ic4um ic5uo i3cur 2id i4dai id5anc id5d ide3al ide4s i2di id5ian idi4ar i5die id3io idi5ou id1it id5iu i3dle i4dom id3ow i4dr i2du id5uo 2ie4 ied4e 5ie5ga ield3 ien5a4 ien4e i5enn i3enti i1er_ i3esc i1est i3et 4if_ if5ero iff5en if4fr 4ific_ i3fie i3fl 4ift 2ig iga5b ig3era ight3i 4igi i3gib ig3il ig3in ig3it i4g4l i2go ig3or ig5ot i5gre igu5i ig1ur i3h 4i5i4 i3j 4ik i1la il3a4b i4lade i2l5am ila5ra i3leg il1er ilev4 il5f il1i il3ia il2ib il3io il4ist 2ilit il2iz ill5ab 4iln il3oq il4ty il5ur il3v i4mag im3age ima5ry imenta5r 4imet im1i im5ida imi5le i5mini 4imit im4ni i3mon i2mu im3ula 2in_ i4n3au 4inav incel4 in3cer 4ind in5dling 2ine i3nee iner4ar i5ness 4inga 4inge in5gen 4ingi in5gling 4ingo 4ingu 2ini i5ni_ i4nia in3io in1is i5nite_ 5initio in3ity 4ink 4inl 2inn 2i1no i4no4c ino4s i4not 2ins in3se insur5a 2int_ 2in4th in1u i5nus 4iny 2io 4io_ ioge4 io2gr i1ol io4m ion3at ion4ery ion3i io5ph ior3i i4os io5th i5oti io4to i4our 2ip ipe4 iphras4 ip3i ip4ic ip4re4 ip3ul i3qua iq5uef iq3uid iq3ui3t 4ir i1ra ira4b i4rac ird5e ire4de i4ref i4rel4 i4res ir5gi ir1i iri5de ir4is iri3tu 5i5r2iz ir4min iro4g 5iron_ ir5ul 2is_ is5ag is3ar isas5 2is1c is3ch 4ise is3er 3isf is5han is3hon ish5op is3ib isi4d i5sis is5itiv 4is4k islan4 4isms i2so iso5mer is1p is2pi is4py 4is1s is4sal issen4 is4ses is4ta_ is1te is1ti ist4ly 4istral i2su is5us 4ita_ ita4bi i4tag 4ita5m i3tan i3tat 2ite it3era i5teri it4es 2ith i1ti 4itia 4i2tic it3ica 5i5tick it3ig it5ill i2tim 2itio 4itis i4tism i2t5o5m 4iton i4tram it5ry 4itt it3uat i5tud it3ul 4itz_ i1u 2iv iv3ell iv3en_ i4v3er_ i4vers_ iv5il_ iv5io iv1it i5vore iv3o3ro i4v3ot 4i5w ix4o 4iy 4izar izi4 5izont 5ja jac4q ja4p 1je jer5s 4jestie 4jesty jew3 jo4p 5judg 3ka_ k3ab k5ag kais4 kal4 k1b k2ed 1kee ke4g ke5li k3en4d k1er kes4 k3est_ ke4ty k3f kh4 k1i 5ki_ 5k2ic k4ill kilo5 k4im k4in_ kin4de k5iness kin4g ki4p kis4 k5ish kk4 k1l 4kley 4kly k1m k5nes 1k2no ko5r kosh4 k3ou kro5n 4k1s2 k4sc ks4l k4sy k5t k1w lab3ic l4abo laci4 l4ade la3dy lag4n lam3o 3land lan4dl lan5et lan4te lar4g lar3i las4e la5tan 4lateli 4lativ 4lav la4v4a 2l1b lbin4 4l1c2 lce4 l3ci 2ld l2de ld4ere ld4eri ldi4 ld5is l3dr l4dri le2a le4bi left5 5leg_ 5legg le4mat lem5atic 4len_ 3lenc 5lene_ 1lent le3ph le4pr lera5b ler4e 3lerg 3l4eri l4ero les2 le5sco 5lesq 3less 5less_ l3eva lev4er_ lev4era lev4ers 3ley 4leye 2lf l5fr 4l1g4 l5ga lgar3 l4ges lgo3 2l3h li4ag li2am liar5iz li4as li4ato li5bi 5licio li4cor 4lics 4lict_ l4icu l3icy l3ida lid5er 3lidi lif3er l4iff li4fl 5ligate 3ligh li4gra 3lik 4l4i4l lim4bl lim3i li4mo l4im4p l4ina 1l4ine lin3ea lin3i link5er li5og 4l4iq lis4p l1it l2it_ 5litica l5i5tics liv3er l1iz 4lj lka3 l3kal lka4t l1l l4law l2le l5lea l3lec l3leg l3lel l3le4n l3le4t ll2i l2lin4 l5lina ll4o lloqui5 ll5out l5low 2lm l5met lm3ing l4mod lmon4 2l1n2 3lo_ lob5al lo4ci 4lof 3logic l5ogo 3logu lom3er 5long lon4i l3o3niz lood5 5lope_ lop3i l3opm lora4 lo4rato lo5rie lor5ou 5los_ los5et 5losophiz 5losophy los4t lo4ta loun5d 2lout 4lov 2lp lpa5b l3pha l5phi lp5ing l3pit l4pl l5pr 4l1r 2l1s2 l4sc l2se l4sie 4lt lt5ag ltane5 l1te lten4 ltera4 lth3i l5ties_ ltis4 l1tr ltu2 ltur3a lu5a lu3br luch4 lu3ci lu3en luf4 lu5id lu4ma 5lumi l5umn_ 5lumnia lu3o luo3r 4lup luss4 lus3te 1lut l5ven l5vet4 2l1w 1ly 4lya 4lyb ly5me ly3no 2lys4 l5yse 1ma 2mab ma2ca ma5chine ma4cl mag5in 5magn 2mah maid5 4mald ma3lig ma5lin mal4li mal4ty 5mania man5is man3iz 4map ma5rine_ ma5riz mar4ly mar3v ma5sce mas4e mas1t 5mate math3 ma3tis 4matiza 4m1b mba4t5 m5bil m4b3ing mbi4v 4m5c 4me_ 2med 4med_ 5media me3die m5e5dy me2g mel5on mel4t me2m mem1o3 1men men4a men5ac men4de 4mene men4i mens4 mensu5 3ment men4te me5on m5ersa 2mes 3mesti me4ta met3al me1te me5thi m4etr 5metric me5trie me3try me4v 4m1f 2mh 5mi_ mi3a mid4a mid4g mig4 3milia m5i5lie m4ill min4a 3mind m5inee m4ingl min5gli m5ingly min4t m4inu miot4 m2is mis4er_ mis5l mis4ti m5istry 4mith m2iz 4mk 4m1l m1m mma5ry 4m1n mn4a m4nin mn4o 1mo 4mocr 5mocratiz mo2d1 mo4go mois2 moi5se 4mok mo5lest mo3me mon5et mon5ge moni3a mon4ism mon4ist mo3niz monol4 mo3ny_ mo2r 4mora_ mos2 mo5sey mo3sp moth3 m5ouf 3mous mo2v 4m1p mpara5 mpa5rab mpar5i m3pet mphas4 m2pi mpi4a mp5ies m4p1in m5pir mp5is mpo3ri mpos5ite m4pous mpov5 mp4tr m2py 4m3r 4m1s2 m4sh m5si 4mt 1mu mula5r4 5mult multi3 3mum mun2 4mup mu4u 4mw 1na 2n1a2b n4abu 4nac_ na4ca n5act nag5er_ nak4 na4li na5lia 4nalt na5mit n2an nanci4 nan4it nank4 nar3c 4nare nar3i nar4l n5arm n4as nas4c nas5ti n2at na3tal nato5miz n2au nau3se 3naut nav4e 4n1b4 ncar5 n4ces_ n3cha n5cheo n5chil n3chis nc1in nc4it ncour5a n1cr n1cu n4dai n5dan n1de nd5est_ ndi4b n5d2if n1dit n3diz n5duc ndu4r nd2we 2ne_ n3ear ne2b neb3u ne2c 5neck 2ned ne4gat neg5ativ 5nege ne4la nel5iz ne5mi ne4mo 1nen 4nene 3neo ne4po ne2q n1er nera5b n4erar n2ere n4er5i ner4r 1nes 2nes_ 4nesp 2nest 4nesw 3netic ne4v n5eve ne4w n3f n4gab n3gel nge4n4e n5gere n3geri ng5ha n3gib ng1in n5git n4gla ngov4 ng5sh n1gu n4gum n2gy 4n1h4 nha4 nhab3 nhe4 3n4ia ni3an ni4ap ni3ba ni4bl ni4d ni5di ni4er ni2fi ni5ficat n5igr nik4 n1im ni3miz n1in 5nine_ nin4g ni4o 5nis_ nis4ta n2it n4ith 3nitio n3itor ni3tr n1j 4nk2 n5kero n3ket nk3in n1kl 4n1l n5m nme4 nmet4 4n1n2 nne4 nni3al nni4v nob4l no3ble n5ocl 4n3o2d 3noe 4nog noge4 nois5i no5l4i 5nologis 3nomic n5o5miz no4mo no3my no4n non4ag non5i n5oniz 4nop 5nop5o5li nor5ab no4rary 4nosc nos4e nos5t no5ta 1nou 3noun nov3el3 nowl3 n1p4 npi4 npre4c n1q n1r nru4 2n1s2 ns5ab nsati4 ns4c n2se n4s3es nsid1 nsig4 n2sl ns3m n4soc ns4pe n5spi nsta5bl n1t nta4b nter3s nt2i n5tib nti4er nti2f n3tine n4t3ing nti4p ntrol5li nt4s ntu3me nu1a nu4d nu5en nuf4fe n3uin 3nu3it n4um nu1me n5umi 3nu4n n3uo nu3tr n1v2 n1w4 nym4 nyp4 4nz n3za 4oa oad3 o5a5les oard3 oas4e oast5e oat5i ob3a3b o5bar obe4l o1bi o2bin ob5ing o3br ob3ul o1ce och4 o3chet ocif3 o4cil o4clam o4cod oc3rac oc5ratiz ocre3 5ocrit octor5a oc3ula o5cure od5ded od3ic odi3o o2do4 odor3 od5uct_ od5ucts o4el o5eng o3er oe4ta o3ev o2fi of5ite ofit4t o2g5a5r og5ativ o4gato o1ge o5gene o5geo o4ger o3gie 1o1gis og3it o4gl o5g2ly 3ogniz o4gro ogu5i 1ogy 2ogyn o1h2 ohab5 oi2 oic3es oi3der oiff4 oig4 oi5let o3ing oint5er o5ism oi5son oist5en oi3ter o5j 2ok o3ken ok5ie o1la o4lan olass4 ol2d old1e ol3er o3lesc o3let ol4fi ol2i o3lia o3lice ol5id_ o3li4f o5lil ol3ing o5lio o5lis_ ol3ish o5lite o5litio o5liv olli4e ol5ogiz olo4r ol5pl ol2t ol3ub ol3ume ol3un o5lus ol2v o2ly om5ah oma5l om5atiz om2be om4bl o2me om3ena om5erse o4met om5etry o3mia om3ic_ om3ica o5mid om1in o5mini 5ommend omo4ge o4mon om3pi ompro5 o2n on1a on4ac o3nan on1c 3oncil 2ond on5do o3nen on5est on4gu on1ic o3nio on1is o5niu on3key on4odi on3omy on3s onspi4 onspir5a onsu4 onten4 on3t4i ontif5 on5um onva5 oo2 ood5e ood5i oo4k oop3i o3ord oost5 o2pa ope5d op1er 3opera 4operag 2oph o5phan o5pher op3ing o3pit o5pon o4posi o1pr op1u opy5 o1q o1ra o5ra_ o4r3ag or5aliz or5ange ore5a o5real or3ei ore5sh or5est_ orew4 or4gu 4o5ria or3ica o5ril or1in o1rio or3ity o3riu or2mi orn2e o5rof or3oug or5pe 3orrh or4se ors5en orst4 or3thi or3thy or4ty o5rum o1ry os3al os2c os4ce o3scop 4oscopi o5scr os4i4e os5itiv os3ito os3ity osi4u os4l o2so os4pa os4po os2ta o5stati os5til os5tit o4tan otele4g ot3er_ ot5ers o4tes 4oth oth5esi oth3i4 ot3ic_ ot5ica o3tice o3tif o3tis oto5s ou2 ou3bl ouch5i ou5et ou4l ounc5er oun2d ou5v ov4en over4ne over3s ov4ert o3vis oviti4 o5v4ol ow3der ow3el ow5est ow1i own5i o4wo oy1a 1pa pa4ca pa4ce pac4t p4ad 5pagan p3agat p4ai pain4 p4al pan4a pan3el pan4ty pa3ny pa1p pa4pu para5bl par5age par5di 3pare par5el p4a4ri par4is pa2te pa5ter 5pathic pa5thy pa4tric pav4 3pay 4p1b pd4 4pe_ 3pe4a pear4l pe2c 2p2ed 3pede 3pedi pedia4 ped4ic p4ee pee4d pek4 pe4la peli4e pe4nan p4enc pen4th pe5on p4era_ pera5bl p4erag p4eri peri5st per4mal perme5 p4ern per3o per3ti pe5ru per1v pe2t pe5ten pe5tiz 4pf 4pg 4ph_ phar5i phe3no ph4er ph4es_ ph1ic 5phie ph5ing 5phisti 3phiz ph2l 3phob 3phone 5phoni pho4r 4phs ph3t 5phu 1phy pi3a pian4 pi4cie pi4cy p4id p5ida pi3de 5pidi 3piec pi3en pi4grap pi3lo pi2n p4in_ pind4 p4ino 3pi1o pion4 p3ith pi5tha pi2tu 2p3k2 1p2l2 3plan plas5t pli3a pli5er 4plig pli4n ploi4 plu4m plum4b 4p1m 2p3n po4c 5pod_ po5em po3et5 5po4g poin2 5point poly5t po4ni po4p 1p4or po4ry 1pos pos1s p4ot po4ta 5poun 4p1p ppa5ra p2pe p4ped p5pel p3pen p3per p3pet ppo5site pr2 pray4e 5preci pre5co pre3em pref5ac pre4la pre3r p3rese 3press pre5ten pre3v 5pri4e prin4t3 pri4s pris3o p3roca prof5it pro3l pros3e pro1t 2p1s2 p2se ps4h p4sib 2p1t pt5a4b p2te p2th pti3m ptu4r p4tw pub3 pue4 puf4 pul3c pu4m pu2n pur4r 5pus pu2t 5pute put3er pu3tr put4ted put4tin p3w qu2 qua5v 2que_ 3quer 3quet 2rab ra3bi rach4e r5acl raf5fi raf4t r2ai ra4lo ram3et r2ami rane5o ran4ge r4ani ra5no rap3er 3raphy rar5c rare4 rar5ef 4raril r2as ration4 rau4t ra5vai rav3el ra5zie r1b r4bab r4bag rbi2 rbi4f r2bin r5bine rb5ing_ rb4o r1c r2ce rcen4 r3cha rch4er r4ci4b rc4it rcum3 r4dal rd2i rdi4a rdi4er rdin4 rd3ing 2re_ re1al re3an re5arr 5reav re4aw r5ebrat rec5oll rec5ompe re4cre 2r2ed re1de re3dis red5it re4fac re2fe re5fer_ re3fi re4fy reg3is re5it re1li re5lu r4en4ta ren4te re1o re5pin re4posi re1pu r1er4 r4eri rero4 re5ru r4es_ re4spi ress5ib res2t re5stal re3str re4ter re4ti4z re3tri reu2 re5uti rev2 re4val rev3el r5ev5er_ re5vers re5vert re5vil rev5olu re4wh r1f rfu4 r4fy rg2 rg3er r3get r3gic rgi4n rg3ing r5gis r5git r1gl rgo4n r3gu rh4 4rh_ 4rhal ri3a ria4b ri4ag r4ib rib3a ric5as r4ice 4rici 5ricid ri4cie r4ico rid5er ri3enc ri3ent ri1er ri5et rig5an 5rigi ril3iz 5riman rim5i 3rimo rim4pe r2ina 5rina_ rin4d rin4e rin4g ri1o 5riph riph5e ri2pl rip5lic r4iq r2is r4is_ ris4c r3ish ris4p ri3ta3b r5ited_ rit5er_ rit5ers rit3ic ri2tu rit5ur riv5el riv3et riv3i r3j r3ket rk4le rk4lin r1l rle4 r2led r4lig r4lis rl5ish r3lo4 r1m rma5c r2me r3men rm5ers rm3ing r4ming_ r4mio r3mit r4my r4nar r3nel r4ner r5net r3ney r5nic r1nis4 r3nit r3niv rno4 r4nou r3nu rob3l r2oc ro3cr ro4e ro1fe ro5fil rok2 ro5ker 5role_ rom5ete rom4i rom4p ron4al ron4e ro5n4is ron4ta 1room 5root ro3pel rop3ic ror3i ro5ro ros5per ros4s ro4the ro4ty ro4va rov5el rox5 r1p r4pea r5pent rp5er_ r3pet rp4h4 rp3ing r3po r1r4 rre4c rre4f r4reo rre4st rri4o rri4v rron4 rros4 rrys4 4rs2 r1sa rsa5ti rs4c r2se r3sec rse4cr rs5er_ rs3es rse5v2 r1sh r5sha r1si r4si4b rson3 r1sp r5sw rtach4 r4tag r3teb rten4d rte5o r1ti rt5ib rti4d r4tier r3tig rtil3i rtil4l r4tily r4tist r4tiv r3tri rtroph4 rt4sh ru3a ru3e4l ru3en ru4gl ru3in rum3pl ru2n runk5 run4ty r5usc ruti5n rv4e rvel4i r3ven rv5er_ r5vest r3vey r3vic rvi4v r3vo r1w ry4c 5rynge ry3t sa2 2s1ab 5sack sac3ri s3act 5sai salar4 sal4m sa5lo sal4t 3sanc san4de s1ap sa5ta 5sa3tio sat3u sau4 sa5vor 5saw 4s5b scan4t5 sca4p scav5 s4ced 4scei s4ces sch2 s4cho 3s4cie 5scin4d scle5 s4cli scof4 4scopy scour5a s1cu 4s5d 4se_ se4a seas4 sea5w se2c3o 3sect 4s4ed se4d4e s5edl se2g seg3r 5sei se1le 5self 5selv 4seme se4mol sen5at 4senc sen4d s5ened sen5g s5enin 4sentd 4sentl sep3a3 4s1er_ s4erl ser4o 4servo s1e4s se5sh ses5t 5se5um 5sev sev3en sew4i 5sex 4s3f 2s3g s2h 2sh_ sh1er 5shev sh1in sh3io 3ship shiv5 sho4 sh5old shon3 shor4 short5 4shw si1b s5icc 3side_ 5sides 5sidi si5diz 4signa sil4e 4sily 2s1in s2ina 5sine_ s3ing 1sio 5sion sion5a si2r sir5a 1sis 3sitio 5siu 1siv 5siz sk2 4ske s3ket sk5ine sk5ing s1l2 s3lat s2le slith5 2s1m s3ma small3 sman3 smel4 s5men 5smith smol5d4 s1n4 1so so4ce soft3 so4lab sol3d2 so3lic 5solv 3som 3s4on_ sona4 son4g s4op 5sophic s5ophiz s5ophy sor5c sor5d 4sov so5vi 2spa 5spai spa4n spen4d 2s5peo 2sper s2phe 3spher spho5 spil4 sp5ing 4spio s4ply s4pon spor4 4spot squal4l s1r 2ss s1sa ssas3 s2s5c s3sel s5seng s4ses_ s5set s1si s4sie ssi4er ss5ily s4sl ss4li s4sn sspend4 ss2t ssur5a ss5w 2st_ s2tag s2tal stam4i 5stand s4ta4p 5stat_ s4ted stern5i s5tero ste2w stew5a s3the st2i s4ti_ s5tia s1tic 5stick s4tie s3tif st3ing 5stir s1tle 5stock stom3a 5stone s4top 3store st4r s4trad 5stratu s4tray s4trid 4stry 4st3w s2ty 1su su1al su4b3 su2g3 su5is suit3 s4ul su2m sum3i su2n su2r 4sv sw2 4swo s4y 4syc 3syl syn5o sy5rin 1ta 3ta_ 2tab ta5bles 5taboliz 4taci ta5do 4taf4 tai5lo ta2l ta5la tal5en tal3i 4talk tal4lis ta5log ta5mo tan4de tanta3 ta5per ta5pl tar4a 4tarc 4tare ta3riz tas4e ta5sy 4tatic ta4tur taun4 tav4 2taw tax4is 2t1b 4tc t4ch tch5et 4t1d 4te_ tead4i 4teat tece4 5tect 2t1ed te5di 1tee teg4 te5ger te5gi 3tel_ teli4 5tels te2ma2 tem3at 3tenan 3tenc 3tend 4tenes 1tent ten4tag 1teo te4p te5pe ter3c 5ter3d 1teri ter5ies ter3is teri5za 5ternit ter5v 4tes_ 4tess t3ess_ teth5e 3teu 3tex 4tey 2t1f 4t1g 2th_ than4 th2e 4thea th3eas the5at the3is 3thet th5ic_ th5ica 4thil 5think 4thl th5ode 5thodic 4thoo thor5it tho5riz 2ths 1tia ti4ab ti4ato 2ti2b 4tick t4ico t4ic1u 5tidi 3tien tif2 ti5fy 2tig 5tigu till5in 1tim 4timp tim5ul 2t1in t2ina 3tine_ 3tini 1tio ti5oc tion5ee 5tiq ti3sa 3tise tis4m ti5so tis4p 5tistica ti3tl ti4u 1tiv tiv4a 1tiz ti3za ti3zen 2tl t5la tlan4 3tle_ 3tled 3tles_ t5let_ t5lo 4t1m tme4 2t1n2 1to to3b to5crat 4todo 2tof to2gr to5ic to2ma tom4b to3my ton4ali to3nat 4tono 4tony to2ra to3rie tor5iz tos2 5tour 4tout to3war 4t1p 1tra tra3b tra5ch traci4 trac4it trac4te tras4 tra5ven trav5es5 tre5f tre4m trem5i 5tria tri5ces 5tricia 4trics 2trim tri4v tro5mi tron5i 4trony tro5phe tro3sp tro3v tru5i trus4 4t1s2 t4sc tsh4 t4sw 4t3t2 t4tes t5to ttu4 1tu tu1a tu3ar tu4bi tud2 4tue 4tuf4 5tu3i 3tum tu4nis 2t3up_ 3ture 5turi tur3is tur5o tu5ry 3tus 4tv tw4 4t1wa twis4 4two 1ty 4tya 2tyl type3 ty5ph 4tz tz4e 4uab uac4 ua5na uan4i uar5ant uar2d uar3i uar3t u1at uav4 ub4e u4bel u3ber u4bero u1b4i u4b5ing u3ble_ u3ca uci4b uc4it ucle3 u3cr u3cu u4cy ud5d ud3er ud5est udev4 u1dic ud3ied ud3ies ud5is u5dit u4don ud4si u4du u4ene uens4 uen4te uer4il 3ufa u3fl ugh3en ug5in 2ui2 uil5iz ui4n u1ing uir4m uita4 uiv3 uiv4er_ u5j 4uk u1la ula5b u5lati ulch4 5ulche ul3der ul4e u1len ul4gi ul2i u5lia ul3ing ul5ish ul4lar ul4li4b ul4lis 4ul3m u1l4o 4uls uls5es ul1ti ultra3 4ultu u3lu ul5ul ul5v um5ab um4bi um4bly u1mi u4m3ing umor5o um2p unat4 u2ne un4er u1ni un4im u2nin un5ish uni3v un3s4 un4sw unt3ab un4ter_ un4tes unu4 un5y un5z u4ors u5os u1ou u1pe uper5s u5pia up3ing u3pl up3p upport5 upt5ib uptu4 u1ra 4ura_ u4rag u4ras ur4be urc4 ur1d ure5at ur4fer ur4fr u3rif uri4fic ur1in u3rio u1rit ur3iz ur2l url5ing_ ur4no uros4 ur4pe ur4pi urs5er ur5tes ur3the urti4 ur4tie u3ru 2us u5sad u5san us4ap usc2 us3ci use5a u5sia u3sic us4lin us1p us5sl us5tere us1tr u2su usur4 uta4b u3tat 4ute_ 4utel 4uten uten4i 4u1t2i uti5liz u3tine ut3ing ution5a u4tis 5u5tiz u4t1l ut5of uto5g uto5matic u5ton u4tou uts4 u3u uu4m u1v2 uxu3 uz4e 1va 5va_ 2v1a4b vac5il vac3u vag4 va4ge va5lie val5o val1u va5mo va5niz va5pi var5ied 3vat 4ve_ 4ved veg3 v3el_ vel3li ve4lo v4ely ven3om v5enue v4erd 5vere_ v4erel v3eren ver5enc v4eres ver3ie vermi4n 3verse ver3th v4e2s 4ves_ ves4te ve4te vet3er ve4ty vi5ali 5vian 5vide_ 5vided 4v3iden 5vides 5vidi v3if vi5gn vik4 2vil 5vilit v3i3liz v1in 4vi4na v2inc vin5d 4ving vio3l v3io4r vi1ou vi4p vi5ro vis3it vi3so vi3su 4viti vit3r 4vity 3viv 5vo_ voi4 3vok vo4la v5ole 5volt 3volv vom5i vor5ab vori4 vo4ry vo4ta 4votee 4vv4 v4y w5abl 2wac wa5ger wag5o wait5 w5al_ wam4 war4t was4t wa1te wa5ver w1b wea5rie weath3 wed4n weet3 wee5v wel4l w1er west3 w3ev whi4 wi2 wil2 will5in win4de win4g wir4 3wise with3 wiz5 w4k wl4es wl3in w4no 1wo2 wom1 wo5ven w5p wra4 wri4 writa4 w3sh ws4l ws4pe w5s4t 4wt wy4 x1a xac5e x4ago xam3 x4ap xas5 x3c2 x1e xe4cuto x2ed xer4i xe5ro x1h xhi2 xhil5 xhu4 x3i xi5a xi5c xi5di x4ime xi5miz x3o x4ob x3p xpan4d xpecto5 xpe3d x1t2 x3ti x1u xu3a xx4 y5ac 3yar4 y5at y1b y1c y2ce yc5er y3ch ych4e ycom4 ycot4 y1d y5ee y1er y4erf yes4 ye4t y5gi 4y3h y1i y3la ylla5bl y3lo y5lu ymbol5 yme4 ympa3 yn3chr yn5d yn5g yn5ic 5ynx y1o4 yo5d y4o5g yom4 yo5net y4ons y4os y4ped yper5 yp3i y3po y4poc yp2ta y5pu yra5m yr5ia y3ro yr4r ys4c y3s2e ys3ica ys3io 3ysis y4so yss4 ys1t ys3ta ysur4 y3thin yt3ic y1w za1 z5a2b zar2 4zb 2ze ze4n ze4p z1er ze3ro zet4 2z1i z4il z4is 5zl 4zm 1zo zo4m zo5ol zte4 4z1z2 z4zy";
Hyphenator.updatePatternsLoadState('en',true);

/* 
	// Google Plus One Button Dependencies
	note: ads functionality for +1 buttons used on the site
*/
(function() {
var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
po.src = 'https://apis.google.com/js/plusone.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

/*------------------------------------------------------------------------------------------
GLOBAL - UTILITY
------------------------------------------------------------------------------------------*/
/*
	// global log function, to prevent breaking/errors in outdated browsers
*/
function log(msg) {
    if(console) {
		console.log(msg);
	}
};

/*
	// global error handler
*/
window.onerror = function(e) {
	log(e.toString());
};

/*
	// createElement helper
	@type: string - type of element
	@attr: array {id: 'btn1'} - array of attributes
	@parent: string "#menu"- parent (jquery selectors) to attach to
	@content: String - innerHTML of element
	@events: object {click: "function(e){alert('test'+e.data.ind)}"} - events to add to the element
	@data: object {ind:i} - naughty scope variables to pass to the event handler, 
	note: if you're adding an event, supply an id in the attributes
	ex:
	var t = ce('div', {}, '#content', 't');
	ce('div', {}, t, 'h');
	ce('div', {}, t, 'i');
	ce('div', {}, t, 's');
	OR
	ce('div', {}, ce('div', {}, ce('div', {}, ce('div', {}, '#content', 't'), 'h'), 'i'), 's');
*/
//global var to store events
var assignedEvents = [];

function ce(type, attr, parent, content, events, data) {
	var e = document.createElement(type);
	for(var i in attr) {
		e[i] = attr[i]
	}
	if(content != undefined && content != "") {
		e.innerHTML = content;
	}
	for(var j in events) {
		assignedEvents.push({id:attr['id'], "event": j, "handler": events[j], data:data})	
	}
	
	
	if(parent != undefined && parent != "") {
		ach(parent, [e]);	
	}
	return e;
}

/*
	// loop through events, and attach them to DOM nodes as specificied by ce()
	note: called after DOM ready on refresh
*/
function attachEventListeners() {
	for(var i in assignedEvents) {
		$('#'+assignedEvents[i].id).bind(assignedEvents[i].event, assignedEvents[i].data, assignedEvents[i].handler);	
	}
	assignedEvents = new Array();
}

/*
	// appendChild Helper
	@parent - jquery selector
	@children - array of children elements to attach to parent
	@prepend - boolean, whether to prepend the element (default is false and will append the element)
	note: in most cases called automatically by ce()
*/
function ach(parent, children, prepend) {
	// if we're prepending reverse the order of children so that the order specified will == their order in the DOM
	if(prepend === true) {
		children.reverse();	
	}
	// loop through children and add them to the parent
	for(var i in children) {
		if(prepend === true) {				
			$(parent).prepend(children[i]);
		} else {
			if(typeof(parent) == "string") {
				// if parent is a string, treat as a jQuery selector
				$(parent).append(children[i]);	
			} else {
				// if parent is an object treat as a documentFragment
				parent.appendChild(children[i])	
			}	
		}
	} 
}

/*
	OBSOLETE: USING IFRAME FORM SUBMISSION NOW
	
	// parse form into JSON string
	@formID - the html element id of the form
	note: returns a string representation of an object with a key:value map of inputs in the form

function formtoJson(formID) {
	var values = {};
    $('#'+ formID + ' input[type != submit], #'+ formID + ' textarea').each(function() {
        // handle different input types
		if(this.type == "file") {
			// for file fields
			values[this.name] = $(this).attr('alt')
		} else if(this.type == "radio") {
			if($(this).attr('checked')) {
				values[this.name] = $(this).val();
			}
			
		} else {
			// for text inputs and text areas
			values[this.name] = $(this).val();
		}
    });
	
	//return false;
	return JSON.stringify(values);
}

	// loads contents of file input as base64 string ready for upload
	// should attach to all file inputs' change() event
	@e - event object generated by jQuery event handler
	@callback - a custom function for handling file previews, passes callback(e, ev) where e=file input, and ev=base64 data

function fileInputChange(e, callback) {
	
	
	// only workds for single file selectors.. TODO: add support for multiple files
	// check if files are selected
	if(document.getElementById(this.id).files.length > 0) {
			var file = e.currentTarget.files[0];
			 
			  var reader = new FileReader();
			  // Closure to capture the file information.
			  reader.onload = (function(theFile) {
				return function(ev) {
				  // add data to the alt attribute of the file input and modify it slightly 
				  e.target.alt = file.type.split('/')[1] + "," + ev.target.result.split(',')[1];
				  // render image preview
				 
				 if(callback != undefined) {
					 callback(e);
				 } else {
					 
				  var span = document.createElement('span');
				  span.innerHTML = ['<img width="100"  class="thumb" src="', ev.target.result,
									'" title="', theFile.name, '"/>'].join('');
				  document.getElementById(e.currentTarget.id).parentNode.insertBefore(span, e.currentTarget);
				 } 
				  
				  
				};
			  })(file);
		
			  // Read in the image file as a data URL.
			  reader.readAsDataURL(file);
		}
}
*/







/*
	// count an array of objects, like comments on a blog post
	@obj - the array of objects
	@noun - a singular noun for returning count as a string eg: "Comment"
	note: with noun left blank it will return a number, with noun == "Comment" it will return
	0 Comments, 1 Comment, and n Comments
	
*/
function countJson(obj, noun) {
	// count nodes in object
	var count = 0;
	for(var i in obj) {count++};
	// decide to return number or string, and pluralize
	if(noun == undefined) {
		return count;
	} else {
		if(count == 0) {
			return "0 " + noun + "s";	
		} else if(count == 1) {
			return "1 " + noun;	
		} else {
			return count + " " + noun + "s";	
		}
	}	
}

/*
	// date & local timezone helper
	@datestamp - UTC timestamp produced by new Date().toString();
	@format - string format see https://github.com/phstc/jquery-dateFormat
*/
function formatDate(datestamp, format) {
	if(format == undefined) {
		format = "ddd, MMMM dd, yyyy";
	}
	if(format == "datestamp") {
		format = "dd/MM/yyyy";	
	}
	return $.format.date(new Date(datestamp).toString(), format);
}

/*
	// remove leading and trailing slashes for consistency
	@path - a uri or hash string to remove slashes from
*/
function removeEndSlashes(path) {
	if(path.charAt(0) == "/") {
		path = path.toString().substr(1, path.length);
	}
	if(path.charAt(path.length-1) == "/") {
		path = path.toString().substr(0, path.length-1);
	}
	return path;
}

/*
	// hyphenate helper function
	note: hyphenates the document, use className: hyphenate or donthyphenate on the parent element
*/
var hyphenated = false;
function hyphenate() {
	if(hyphenated === false) {
		hyphenated = true
		Hyphenator.hyphenateDocument();
	} else {
		Hyphenator.hyphenateElement(document.getElementsByTagName("body")[0], 'en')
	}	
}


/*------------------------------------------------------------------------------------------
GLOBAL - NAVIGATION
------------------------------------------------------------------------------------------*/
var hostname = window.location.hostname.toString();
var protocol = window.location.protocol.toString();
var domain = protocol + "//" + hostname;
var pathname = removeEndSlashes(window.location.pathname.toString());
var hashbang, segments;

/* 
	// for navigating around the site, all ajaxy and stuff 
*/
// Bind the event.
$(window).hashchange( function(){
	// respond to location change events.
	
	// make sure uri is encoded for consistency
	if(encodeURI(decodeURI(window.location.href))  !== window.location.href) {
		window.location = encodeURI(decodeURI(window.location.href)) 
		return;	
	}
	
	// visual loading
	$('#loader').css('opacity', 1);
	// get hashbang uri
	hashbang = (window.location.hash).replace("#!","");
	// if we're coming from an escaped fragment link		
	if(window.location.search.match("_escaped_fragment_=")) {
		hashbang = window.location.search.substr(window.location.search.indexOf("_escaped_fragment_=")+String("_escaped_fragment_=")
			.length, window.location.search.length);	
	}
	// parse hash segments
	hashbang = removeEndSlashes(hashbang);
	//split
	segments = hashbang.split("/");
	// change subnav
	subNavs();
	// highlight navigation
	highlightNav();
	
	// request data from server
	$.post(domain+"/0", {pathname: pathname, hashbang: hashbang}, function(res, status, xhr) {
			
			if(status == "success") {
				// processContent
				processContent(res, segments);
			} else {
				// on error: try again in a bit
				setTimeout(function(){
					$(window).hashchange();
				}, 1000)
				return;		
			}
		});
});

/*
	// Figure out what data we fetched, and how to parse it
	// Call appropriate function to generate html, then append it
	@res - server response
	@segments - split hashbang uri
*/
function processContent(res, segments) {
	var fragment = document.createDocumentFragment();
	// for sharing on social media, and search engines
	// set default page title
	document.title = ("InkApp.co");
	// set default page description
	$('meta[name=description]').attr("content", "The ultimate resource for developers — BETA");
	// nav switch
	switch(segments[0]) {
		case "apps":
			fragment = res;
			setTimeout(function(){
				window.location = domain + "#!/news";
				}, 4000)
			break;	
		case "news":
			generateNewsSearch(fragment, res)
			generateNewsPosts(fragment, res)
			
			// if it's a post page, add the content to the page title and description
			if(segments[3]) {
				document.title = document.title + " - " + res[0].title;
				$('meta[name=description]').attr("content", $('meta[name=description]').attr("content") + " - " + res[0].post.substr(0, 200));	
			}
			break;	
		case "social":
			fragment = res;
			setTimeout(function(){
				window.location = domain + "#!/news";
				}, 4000)
			break;	
		case "stack":
			fragment = res;
			setTimeout(function(){
				window.location = domain + "#!/news";
				}, 4000)
			break;	
		case "":
			// homepage
			fragment = res;
			setTimeout(function(){
				window.location = domain + "#!/news";
				}, 1000)
			break;	
		default:
			//404
			fragment = res;
			setTimeout(function(){
				window.location = domain + "#!/news";
				}, 4000)
			break;
	}
	postProcess(fragment);
	// hyphenate
	if(segments[0] == "news") {
		hyphenate();
		// setup search form
		$('#topsearchform').submit(function(e) {
		  e.preventDefault();
		  window.location = "/#!/news/search/" + encodeURIComponent($("#topsearchinput").val());
		  return false;
		});
		// setup comment forms
		$('.cform').submit(function(e) {
		  e.preventDefault();
		  postComment(formtoJson(e.currentTarget.id));
		  return false;
		});
	}
}

/*
	// global post process stuff
*/
function postProcess(fragment) {
	// hide "loading", scroll up, and append html
	//$('#loader').css('display', 'none');
	$('#loader').animate({'opacity': 0}, 400);
	window.scroll(0,0);	
	// hide footer so it doesn't jump around
	// remove content
	$('#content').html('');
	$('#content').append(fragment);
	
	// attach assigned event listeners
	attachEventListeners();	
}

/* 
	// highlights navigation elements to indicate current page 
	@justMainNav - true or false, indicates whether sub or sidebar navigation should be highlighted
	note: should call it as the user navigates, and again when the content loads to highlight content menus 
*/

function highlightNav(justMainNav)
{
	// first unhighlight main nav
	$("#globalnav a, #stickyglobalnav a").removeClass("selected");
	// now highlight appropriate nav item
	if(segments[0] && segments[0] != "") {
		$("#globalnav a[name='"+ segments[0].toLowerCase() +"']").addClass("selected");	
		$("#stickyglobalnav a[name='"+ segments[0].toLowerCase() +"']").addClass("selected");	
	}
	if(justMainNav == true) {
		return;
	}
	
	// unhighlight sub nav
	$("#globalsubnav a, #stickyglobalsubnav a").removeClass("selected");
	// if justMainNav is false, then this is being called a second time for content menus,
	// we don't need to unselect content menus because they're flat out replaced
	if(segments[1] && segments[1] != "") {
		$("#globalsubnav a[name='"+ segments[1].toLowerCase() +"']").addClass("selected");	
		$("#stickyglobalsubnav a[name='"+ segments[1].toLowerCase() +"']").addClass("selected");	
	}
}
/*
	// manages the sub nav bar
*/
function subNavs() {
	// clear sub navs
	$("#globalsubnav, #stickyglobalsubnav").html('');
	// decide which sub navs to add
	switch(segments[0]) {
		case "apps":
			break;	
		case "news":
			break;	
		case "social":
			break;	
		case "stack":
			break;	
	}
	// add spacer for sticky subnav
	if($("#stickyglobalsubnav").html() != "") {
		ce('span', {className: "top-bar-spacer"}, "#stickyglobalsubnav", "&nbsp; | &nbsp;")	
	}
}

/*------------------------------------------------------------------------------------------
NEWS
------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------
NEWS - INTERFACE
------------------------------------------------------------------------------------------*/

/*
	// generates the search bar
	@fragment - the documentFragment or parent element container of the news posts
	@res - the JSON array
*/
function generateNewsSearch(fragment, res) {
	// search box
	var searchformdiv = ce('div', {id: 'searchformdiv'}, fragment);
	// determine search text
	var searchtext = "";
	if(segments[1] == "search") {
		if(segments[2]) {
			searchtext = decodeURIComponent(segments[2]);
		}
	}
	var searchform = ce('form', {id: "topsearchform", action: "/#!/news", method: "post"}, searchformdiv, 
		'<input type="input" id="topsearchinput" value="' + searchtext + '" /><input type="submit" id="topsearchsubmit" value="Search" />')
		
}

/*
	// generates one or more news posts from a JSON array
	@fragment - the documentFragment or parent element container of the news posts
	@res - the JSON array
*/
function generateNewsPosts(fragment, res) {
	var foundposts = false;	
	// loop through posts
	
	if(res.length == 0) {
		ce('h1', {className: 'message'}, fragment, "Criteria matched 0 posts<br /><a href='/#!/news'>Click here to view latest news</a>");
		
	}
	
	for(var i=0; i<res.length; i++) {
		foundposts = true;
		var post = res[i];
		permalink = domain + "/#!/news/" + post.url;
		var newsimagepath = "/assets/news/imgs/";
		// determin post type
		switch(post.type) {
			case "news":
				var article = ce('div', {className:'article'}, fragment);						
				//title
				var title = ce('h1', {className: 'title'}, article);
				ce('a', {rel: "bookmark", title: "Permanent Link to ", href: "/#!/news/"+post.url}, title, post.title );
				//article content
				var ac = ce('div', {className: "article-content", id: "ac"+post._id}, article);
				//lead image gallery			
				for(var j in post.leadgallery) {
					if(post.leadgallery[j].type == 'youtube') {
						// youtube video
						var regyoutube = new RegExp("v=[a-zA-Z_0-9-]+");
						if(post.leadgallery[j].youtube.match(regyoutube) != null) {
							var youtubelink = post.leadgallery[j].youtube.match(regyoutube)[0].replace('v=', "");
						} else {
							var youtubelink = post.leadgallery[j].youtube;	
						}
						
						
						ce('iframe', {className: "attachment-lead-image wp-post-image", width: 693, height: 300, 
							src: "http://www.youtube.com/embed/" + youtubelink + "?rel=0", frameborder: 0, allowfullscreen: ''}, ac );
					} else if(post.leadgallery[j].type == 'vimeo') {
						// vimeo video
						var regvimeo = new RegExp("[0-9]+");
						if(post.leadgallery[j].vimeo.match(regyoutube)) {
							var vimeolink = post.leadgallery[j].vimeo.match(regvimeo)[0];	
						} else {
							var vimeolink = post.leadgallery[j].vimeo;	
						}
						
						
						ce('iframe', {className: "attachment-lead-image wp-post-image", width: 693, height: 300, 
							src: "http://player.vimeo.com/video/" + post.leadgallery[j].vimeo + "?title=0&amp;byline=0&amp;portrait=0", 
							frameborder: 0, webkitAllowFullScreen: '', allowfullscreen: ''}, ac );
					} else if(post.leadgallery[j].type == 'image') {

						// image
						// check for inline image data
						
						if(post.leadgallery[j].img && post.leadgallery[j].img.match('data:')) {
							var lead = post.leadgallery[j].img;
						} else {
							var lead = 	newsimagepath+post.leadgallery[j].img;
						}
						ce('img', {className: "attachment-lead-image wp-post-image", width: 693, height: 300, src: lead}, ac );
					
						// image meta div
						var rollover = ce('div', {className: "attachement-lead-image wp-post-image lead-image-meta", id: "lim"+post._id}, ac, "", 
							{mouseenter: function(e){$('#lim'+e.data.post_id).animate({opacity: 0.85}, 500);}, 
							 mouseleave: function(e){$('#lim'+e.data.post_id).animate({opacity: 0}, 400);} }, {post_id: post._id});
						// caption
						if(post.leadgallery[j].caption != undefined) {
							ce('p', {className: "lead-image-caption"}, rollover, post.leadgallery[j].caption)	
						}
						// full size image
						
							
						if(post.leadgallery[j].full != undefined) {
							if(post.leadgallery[j].full.match('data:')) {
								var leadfull = post.leadgallery[j].full;
							} else {
								var leadfull = 	domain + newsimagepath + post.leadgallery[j].full;								
							}
							
							
							ce('div', {className: "lead-zoom", id: "liz"+post._id+j}, rollover, "", {click: function(e){Shadowbox.open({
										content:    leadfull,
										player:     "img",
										title:      "",
										options:	{handleOversize: "drag", overlayOpacity: 0.9}
									});} }, {leadfull: leadfull})	
						}
					}
				}
				//wrapper
				var wr = ce('div', {className: "wpcolumn-wrapper wpcolumn-wrapper-9"}, ac);
				
				//split post content into columns
				if(post.post) {
					var columns = post.post.split("/---/");
				
					// add blank columns as padding
					if(columns.length % 3 != 0) {
						columns.push("");
						if(columns.length % 3 != 0) {
							columns.push("");
						}
					}
					for(var j=1; j<=columns.length; j++) {
						// create column
						var col = ce('div', {className: "wpcolumn hyphenate wpcolumn-"+j}, wr); 
						var l = j-1;
						// read more left
						if(j != 1 && l % 3 == 0 && columns.length > j+1 ) {						
							var rmld = ce('div', {className: 'read-more-left', id: 'rmld'+post._id+j}, col, "", 
								{click: function(e){readMore(e.data.post_id, 'left')} }, {post_id: post._id});
							ce('div', {className: 'read-more-left-text'}, rmld, '&larr; Read More');
						}
						// post meta
						if(j==1) {
							// first column
							col.className += " wpcolumn-first"
							var meta = ce('div', {className: "post-meta"}, col);  
							ce('div', {className: "the-author"}, meta, post.author.toUpperCase()); 
							ce('hr', {className: "meta-hr"}, meta);
							var categories = ce('div', {className: "the-category"}, meta);
							for(var k in post.categories) {
								// comma separate list
								if(k > 0) {
									categories.innerHTML += ", ";
								}
								categories.innerHTML += post.categories[k].name.toUpperCase();
							}
							// indent
							ce('span', {className: "indent"}, col);
						} else if(j == columns.length) {
							// last column
							col.className += " wpcolumn-last";
						} else {
							// middle column
							col.className += " wpcolumn-other"	
						}
						// column content
						col.innerHTML += columns[j-1];
						//read more right
						if(j % 3 == 0 && columns.length > j+1) {
							var rmrd = ce('div', {className: 'read-more-right', id: 'rmrd'+post._id+j}, col, "", 
								{click: function(e){readMore(e.data.post_id, 'right')} }, {post_id: post._id});
							ce('div', {className: 'read-more-right-text'}, rmrd, 'Read More &rarr;');
						}	
					}
				}
				// comment surface
				/*
				var acs = ce('div', {className: "article-comment-surface", id: "acs"+post._id}, article, "");
				var acssb = ce('div', {className: 'social-buttons'}, acs);
				// close button
				ce('img', {className: 'close-surface', src: "/assets/imgs/close-surface.png", width:"24", height:"24", border:"0", 
					id: "close"+post._id}, acssb, "", {click: function(e){showSurface('hide', e.data.post_id)} }, {post_id: post._id});
				// google plus
				acssb.innerHTML += '<div class="googleplus"><div class="g-plusone" data-size="medium" data-href="'+permalink+'"></div></div>';
				// twitter
				acssb.innerHTML += '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="'+permalink+'" data-count="horizontal" data-via="InkAppco">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div>'; 
				// facebook
				acssb.innerHTML += '<div class="facebook"><iframe src="http://www.facebook.com/plugins/like.php?href='+encodeURIComponent(permalink)+'&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:21px;" allowTransparency="true"></iframe></div>';
				// generate comments		
				generateNewsComments(post.comments, post._id, acs);
				*/
				// sidebar
				var sidebar = ce('div', {className: 'sidebar'}, article);
				ce('div', {className: 'article-time'}, sidebar, formatDate(post.datestamp));
				ce('div', {className: 'article-viewcount'}, sidebar, post.views + " Views");
				var sidebarcontent = ce('div', {className: 'sidebar-content'}, sidebar);
				ce('img', {src: '/assets/imgs/sidebar-soon.png', width:100, height:436}, sidebarcontent);
				var articlesocial = ce('div', {className: 'article-social', id: 'as'+post._id}, sidebar, '', 
					{click: function(e){showSurface('acs', e.data.post_id)} }, {post_id: post._id});
					/*
				ce('img', {src: '/assets/imgs/social-googleplus.png', width:54, height: 54, border: 0}, sidebar);
				ce('img', {src: '/assets/imgs/social-twitter.png', width:54, height: 54, border: 0}, sidebar);
				ce('img', {src: '/assets/imgs/social-facebook.png', width:54, height: 54, border: 0}, sidebar);
				var sidebarfooter = ce('div', {className: 'sidebar-footer', id: 'cf'+post._id}, sidebar, '', 
					{click: function(e){showSurface('acs', e.data.post_id)} }, {post_id: post._id});
				ce('div', {className: 'sidebar-footer-text'}, sidebarfooter, countJson(post.comments, "Comment"))
				*/
				// article footer
				var articlefooter = ce('div', {className: 'article-footer'}, article); 
				for(var k in post.categories) {
					// comma separate list
					if(k == 0) {
						articlefooter.innerHTML += '<h1>Categories: </h1>';
					} else {
						articlefooter.innerHTML += ", ";
					}
					articlefooter.innerHTML += '<a href="/#!/news/category/'+post.categories[k].slug+'">&nbsp;'+ post.categories[k].name + '&nbsp;</a>';
				}
				for(var k in post.tags) {
					// comma separate list
					if(k == 0) {
						// category tag spacer
						if(articlefooter.innerHTML.length > 0) {
							ce('span', {className: 'top-bar-spacer'}, articlefooter, "&nbsp; | &nbsp;")	
							//articlefooter.innerHTML += '<span class="top-bar">&nbsp; | &nbsp;</span>';
						}
						articlefooter.innerHTML += "<h1>Tags: </h1>";
					} else {
						articlefooter.innerHTML += ", ";
					}
					articlefooter.innerHTML += '<a href="#!/news/tag/'+post.tags[k].slug+'">&nbsp;'+ post.tags[k].name + '&nbsp;</a>';
				}		
				break;
		}
		// add post to fragment
		
		fragment.appendChild(article);
	}
	// no posts found, show message and link to news main page
	if(foundposts === false) {
		ce('div', {className: "bigmessage"}, "#content", "No posts matched your criteria, <a href='/#!/news/'>Click here</a>");	
	}
}

/*
	// generates the list of comments in a post
	@comments - array of comments
	@postid - id of the article/post to fetch comments for
	@parent - parent element to add comments to
*/	
function generateNewsComments(comments, postid, parent) {
	// reverse order of comments
	if(comments) {
		comments = comments.reverse();
	}
	// container forms and divs
	var commentlist = ce('div', {className: 'commentlist', id: 'cl'+postid});
	var commentformdiv = ce('div', {className: 'comment-form'}, commentlist);
	var respond = ce('div', {id: 'respond'}, commentformdiv);
	var commentform = ce('form', {className: 'cform',action: "/#!/news/", method: "post", id: "cform"+postid}, respond);
	// author input
	var commentformauthor = ce('p', {className: 'comment-form-author'}, commentform);
	ce('label', {for: 'author'}, commentformauthor, "Name");
	ce('span', {className: 'required'}, commentformauthor, "*");
	commentformauthor.innerHTML += '<input id="author" name="author" type="text" value="" size="30" aria-required="true">';
	// email input
	var commentformemail = ce('p', {className: 'comment-form-email'}, commentform);
	ce('label', {for: 'email'}, commentformemail, "Email");
	ce('span', {className: 'required'}, commentformemail, "*");
	commentformemail.innerHTML += '<input id="email" name="email" type="text" value="" size="30" aria-required="true">';
	// url input
	var commentformurl = ce('p', {className: 'comment-form-url'}, commentform);
	ce('label', {for: 'url'}, commentformurl, "Website ");
	commentformurl.innerHTML += '<input id="url" name="url" type="text" value="" size="30" >';
	// comment input
	var commentformcomment = ce('p', {className: 'comment-form-comment'}, commentform);
	commentformcomment.innerHTML += '<textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea>';
	ce('p', {className: "form-submit"}, commentform, 
		'<input name="submit" type="submit" id="submit" value="Post Comment"><span id="cperror'+postid+'" class="commentposterror"></span>');
	commentform.innerHTML += '<input name="postid" type="hidden" value="'+postid+'">'
	// show comments
	for(var l in comments) {
		if(comments[l].approved == 1) {
			comments[l].author = "...";
			comments[l].comment = "[Comment pending approval...]";
				
		}
		var comment = ce('div', {className: "comment"}, commentlist);
		var commentmeta = ce('div', {className: "comment-meta"}, comment);
		ce('div', {className: "comment-author"}, commentmeta, comments[l].author);
		ce('div', {className: "comment-date"}, commentmeta, formatDate(comments[l].datestamp, 'datestamp'));	
		ce('p', {}, ce('div', {className: "comment-content"}, comment), comments[l].comment)
		
	}
	$(parent).css("opacity", 0).append(commentlist).animate({opacity: 1}, 500);
}

/*------------------------------------------------------------------------------------------
NEWS - UTILITY
------------------------------------------------------------------------------------------*/
/*
	// post comment
	@data - use to retain values from the loop and pass them to the server
*/
function postComment(data) {
	$.post(domain+"/0", {hashbang: 'news/postcomment', data: data}, function(res, status, xhr) {
		if(status == "success") {
			// process response
			if(res.status == "error") {
				// show first error	
				$('#cperror' + res.postid).css("color", "#C00").html(res.messages[0]);
			} else {
				// show success
				$('#cperror' + res.postid).css("color", "#070").html(res.messages[0]);
				$("#cl" + res.postid).html('')
				generateNewsComments(res.comments[0].comments, res.postid, "#cl" + res.postid);
				// update comment count
				$("#cf"+res.postid+" div").html(countJson(res.comments[0].comments, "Comment"));
				
				// setup comment forms
				$('.cform').submit(function(e) {
				  e.preventDefault();
				  postComment(formtoJson(e.currentTarget.id));
				  return false;
				});
			}
			
		} else {
			// on post error
			return;		
		}
	});	
}

/*
	// read more, slides an article left or right as a means of scrolling
	@postid - the id of the article/post
	@direction - "left" or "right"	
*/
function readMore(postid, direction) {
	var post = $('#ac'+postid);
	if(direction == "right") {			
		post.animate({
			scrollLeft: (post.scrollLeft() + 720)
			}, 400, 'swing')
	} else if(direction == "left") {
		post.animate({
			scrollLeft: (post.scrollLeft() - 720)
			}, 400, 'swing')
	}
}
		
/*	
	// show and hide the comment surface over an article
	@action - can be "hide" or "" to show the surface
	@id - the id of the article/post which the surface corresponds to
*/
function showSurface(action, id) {
	$('#acs'+id).css('display', 'none');
	// hide article or else embedded flash will show through
	$('#ac'+id).css('display', 'none');
	if(action != "hide") {
		$('#acs'+id).css('display', 'block');
	} else {
		// show article
		$('#ac'+id).css('display', 'block');	
	}
}	