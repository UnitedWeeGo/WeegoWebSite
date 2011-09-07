try {
    var jqueryLoaded=jQuery;
    jqueryLoaded=true;
} catch(err) {
    var jqueryLoaded=false;
}
var head= document.getElementsByTagName('head')[0];
if (!jqueryLoaded) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
    head.appendChild(script);
}

window.onload = function () {
//	alert(navigator.userAgent);
    jQuery(document).ready( function($) {
    	nextScreen = 1;
    	numScreens = $('#screenShots').find('.screen').length;
    	screenInterval = setInterval(showNextScreen, 6000);
    	
    	nextQuote = 1;
    	numQuotes = $('#quotes').find('.quote').length;
    	quoteInterval = setInterval(showNextQuote, 6000);
    	
    	var quoteTop = ($('#quotes').height() - $('#quote0').height()) / 2;
    	$('#quote0').css('marginTop',quoteTop);
    	$('#quote0').css('opacity',1);
    });
    
    var img0 = new Image();
    img0.src = "../assets/images/global/button_download_pressed.png";
}

var screenInterval;
var nextScreen;
var numScreens;

function showNextScreen() {
	var prevScreen = nextScreen - 1;
	if (prevScreen < 0) prevScreen = numScreens-1;
	$('#screen'+nextScreen).css('left',207);
	$('#screen'+prevScreen).animate({left:-207},300);
    $('#screen'+nextScreen).animate({left:0},300);
    nextScreen++;
    if (nextScreen >= numScreens) nextScreen = 0;
}

var quoteInterval;
var nextQuote;
var numQuotes;

function showNextQuote() {
	var prevQuote = nextQuote - 1;
	if (prevQuote < 0) prevQuote = numQuotes-1;
	$('#quote'+prevQuote).animate({opacity:0},300);
    $('#quote'+nextQuote).animate({opacity:1},300);
    var quoteTop = ($('#quotes').height() - $('#quote'+nextQuote).height()) / 2;
    $('#quote'+nextQuote).css('marginTop',quoteTop);
    nextQuote++;
    if (nextQuote >= numQuotes) nextQuote = 0;
}

function goToByScroll(id){
	$('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}
