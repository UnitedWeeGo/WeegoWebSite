var pair_token = '';
var fb_token = '';

window.onload = function () {
	centerForm();

	pair_token = document.location.search.substr(1,document.location.search.length);
	
	window.fbAsyncInit = function() {
		FB.init({ appId: '221300981231092', 
			status: true, 
			cookie: true,
			xfbml: true,
			oauth: true});
	
		function updateButton(response) {
			var button = document.getElementById('fb-auth');
			var userInfo = document.getElementById('user-info');
	      	var weegoAuth = document.getElementById('weego-auth');
			
			if (response.authResponse) {
				//user is already logged in and connected
		      	fb_token = response.authResponse.accessToken;
				FB.api('/me', function(response) {
	      			userInfo.innerHTML = '<span class="fbIcon"></span><img class="fbAvatar" src="https://graph.facebook.com/' + response.id + '/picture"><span class="spacer"></span>' + response.name +'. Is this you?';
	      			weegoAuth.innerHTML = '<a class="fb_yes_no"><span class="fb_button_text">Yes</span></a>';
					button.innerHTML = '<a class="fb_yes_no last"><span class="fb_button_text">No</span></a>';
				});
				button.onclick = function() {
					FB.logout(function(response) {
						userInfo.innerHTML="";
						weegoAuth.innerHTML = "";
					});
				};
				weegoAuth.onclick = function() {
					onFBLogin();
				};
			} else {
				//user is not connected to your app or logged out
				button.innerHTML = '<a class="fb_button fb_button_xlarge"><span class="fb_button_text">Signup with Facebook</span></a>';
				userInfo.innerHTML="";
				userInfo.style.display = 'none';
				weegoAuth.innerHTML = "";
				button.onclick = function() {
					button.innerHTML = '<a class="fb_button fb_button_xlarge"><span class="fb_button_text">Signing up...........</span></a>';
					FB.login(function(response) {
						if (response.authResponse) {
							fb_token = response.authResponse.accessToken;
							onFBLogin();
// 							FB.api('/me', function(response) {
// 								fb_token = response.authResponse.accessToken;
// 								alert(fb_token);
// 							});	   
						} else {
							button.innerHTML = '<a class="fb_button fb_button_xlarge"><span class="fb_button_text">Signup with Facebook</span></a>';
						}
					}, {scope:'email,offline_access,publish_checkins,user_checkins,friends_checkins,user_birthday'});  	
				}
			}
		}

		// run once with current status and whenever the status changes
		FB.getLoginStatus(updateButton);
		FB.Event.subscribe('auth.statusChange', updateButton);	
	};
	(function() {
  		var e = document.createElement('script'); e.async = true;
  		e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
		document.getElementById('fb-root').appendChild(e);
	}());
}

window.onresize = centerForm;

function centerForm() {
	var mainTop = 0;
	var main = document.getElementById("main");
	if (document.documentElement.clientWidth >= 480) {
		var signUpForm = document.getElementById("signUpForm");
		var logo = document.getElementById("logo");
		var formHeight = Math.max(signUpForm.offsetHeight, logo.offsetHeight);
		var footer = document.getElementById("footer");
		var footerHeight = footer.offsetHeight;
// 		if (document.documentElement.clientWidth < 820) {
// 			formHeight = signUpForm.offsetHeight + logo.offsetHeight + 50;
// 			mainTop = (document.documentElement.clientHeight - footerHeight - formHeight) / 2;
// 			if (mainTop < 0) mainTop = 0;
// 		} else {		
			mainTop = (document.documentElement.clientHeight - footerHeight - formHeight) / 2;
			if (mainTop < 56) mainTop = 56;
//		}
	}
	main.style.top = mainTop + "px";
}

function checkFBLogin () {
	FB.getLoginStatus(function(response) {
		if (response.authResponse) {
			alert("logged in and connected user, someone you know");
			fb_token = response.session.access_token;
		} else {
			alert("no user session available, someone you dont know");
		}
	});
}

function onFBLogin () {
//	checkFBLogin();
	if (fb_token.length > 0 && pair_token.length > 0) {
		sendPairingData(domain + "/pair.php", "fb_token="+ fb_token +"&pair_token="+ pair_token);
	}
}

function sendPairingData(url, params) {
	document.getElementById('fbSignup').style.display = "none";
	document.getElementById('working').style.display = "block";
	document.getElementById('working').innerHTML = '<h2>Please Wait...</h2>';

	var http = new XMLHttpRequest();
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			var obj = eval('(' + http.responseText + ')');
			if (obj.status == "SUCCESS") {
				document.getElementById("signUpForm").style.display = "none";
				document.getElementById('working').style.display = "none";
				document.getElementById("thanks").style.display = "block";
			} else {
				document.getElementById("signUpForm").style.display = "block";
				document.getElementById('fbSignup').style.display = "block";
				document.getElementById('working').style.display = "none";
				document.getElementById("thanks").style.display = "none";
			}
		}
	}
	http.send(params);
}