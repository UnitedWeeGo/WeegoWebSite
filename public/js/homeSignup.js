var fnames = new Array();var ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';

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
    // if (script.readyState && script.onload!==null){
    //         script.onreadystatechange= function () {
    //               if (this.readyState == 'complete') mce_preload_check();
    //         }    
    //     }
}
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://downloads.mailchimp.com/js/jquery.form-n-validate.js';
head.appendChild(script);
var err_style = '';
try{
    err_style = mc_custom_error_style;
} catch(e){
    err_style = 'display: none;';
}
var head= document.getElementsByTagName('head')[0];
var style= document.createElement('style');
style.type= 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = '.mce_inline_error {' + err_style + '}';
} else {
  style.appendChild(document.createTextNode('.mce_inline_error {' + err_style + '}'));
}
head.appendChild(style);

window.onload = function () {
    jQuery(document).ready( function($) {
		$('#mc-embedded-subscribe-form').submit( function () {return formIsValid;});
		$('.inputField').focusin(fieldDidFocus);
		$('.inputField').focusout(fieldDidBlur);
		if (isiOs()) {
			$('.inputField').keyup(fieldDidChange);
		} else {
			$('.inputField').keydown(fieldDidChange);
		}
    });
}

function isiOs(){
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1) ||
		(navigator.platform.indexOf("iPad") != -1)
    );
}

function fieldDidFocus(eventObj) {
	eventObj.stopPropagation();
	eventObj.preventDefault();
	if (!$(this).hasClass('activeField')) {
		$(this).addClass('activeField');
		$(this).val('');
	}
}

function fieldDidBlur(eventObj) {
	if ($(this).val() == "") {
		$(this).removeClass('activeField');
		var defaultValue = '';
		switch ($(this).attr('id')) {
			case 'mce-EMAIL' :
					defaultValue = "Enter your email address...";
					break;
			default :
					defaultValue = "DEFAULT";
					break;
		}
		$(this).val(defaultValue);
	}
	checkActiveFields();
}

function fieldDidChange(eventObj) {
	checkActiveFields();
}

var formIsValid = false;

function checkActiveFields() {
	var isValid = true;
	$('.inputField').each(function () {
		if (!$(this).hasClass('activeField')) isValid = false;
	});
	var validator = $("#mc-embedded-subscribe-form").validate({
		rules: {
			EMAIL: {
				required: true,
				email: true
			}
		}
	});
	isValid = validator.form();
	if (isValid) {
		$('.submitButton').addClass('activeButton');
	} else {
		$('.submitButton').removeClass('activeButton');
	}
	formIsValid = isValid;
}
