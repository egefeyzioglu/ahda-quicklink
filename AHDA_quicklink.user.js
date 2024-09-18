// ==UserScript==
// @author      the AHDAs
// @name        AHDA_quicklink_newer_one
// @namespace   ahda-grease
// @downloadURL https://raw.githubusercontent.com/egefeyzioglu/ahda-quicklink/master/AHDA_quicklink.user.js
// @updateURL   https://raw.githubusercontent.com/egefeyzioglu/ahda-quicklink/master/AHDA_quicklink.user.js
// @include     https://www.auth.utoronto.ca/account/
// @include     https://www.auth.utoronto.ca/account/index.php
// @include     https://www.auth.utoronto.ca/account/account.php*
// @include     https://www.auth.utoronto.ca/utid/
// @include     https://www.auth.utoronto.ca/utid/index.php*
// @include     https://www.auth.utoronto.ca/utid/input.php*
// @include     https://www.auth.utoronto.ca/utid/view.php*
// @include     https://www.auth.utoronto.ca/utid/search.php*
// @include     https://www.utorid.utoronto.ca/cgi-bin/utorid/madmin.pl*
// @include     https://www.utorid.utoronto.ca/cgi-bin/utorid/verify.pl*
// @include     https://recover.utorid.utoronto.ca/default.aspx*
// @include     https://admin-832cdf07.duosecurity.com/*
// @include     https://www.utorid.utoronto.ca/cgi-bin/utorid/acctrecoveryadmin.pl*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @version     0.5.18
// @connect     admin-832cdf07.duosecurity.com
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_openInTab
// ==/UserScript==

//////////////////////////////// CONTRIBUTING ////////////////////////////////
// Normally, Tampermonkey scripts are kept online so your browser can       //
// automatically download them when a new version is released. That was how //
// this script worked as well, however, the AHDA who uploaded this script   //
// to GitHub has since deleted the repository.                              //
//                                                                          //
// Now, I'm uploading it to GitHub again so the auto-update can work as     //
// intended.                                                                //
//                                                                          //
// To contribute, please go to github.com/egefeyzioglu/ahda-quicklink and   //
// send a pull request with your edits. I promise to keep accepting pull    //
// requests and keep the repo up as long as I'm around computers.           //
// Cheers,                                                                  //
// Ege                                                                      //
//////////////////////////////////////////////////////////////////////////////

function checkLogin(){
    GM_xmlhttpRequest({url:'https://admin-832cdf07.duosecurity.com/admin/global/search?query=asd', onload: function(){
        if(this.status == 401){
            setInterval(checkLogin, 500);
        }else{
            window.loginTab.close();
        }
    }});
}

// get stored UTORid if it exists
var admin_utorid = GM_getValue("admin_utorid", "");

// if stored UTORid is an empty string then prompt user
if (!admin_utorid) {
	admin_utorid = prompt("Please enter your UTORid");

	// store new UTORid
	GM_setValue("admin_utorid", admin_utorid);
}

if (/view.php/.test(window.location.href)) {

	$(function () {

		var utorid = $('td div table tr:contains("UTORid(s)") td').text();
		if (utorid.substr(0, utorid.indexOf(" "))) {
			utorid = utorid.substr(0, utorid.indexOf(" "));
		}

		$('div.buttons:first-of-type')[0].innerHTML += ('<a class="button custom" id="management" target="_blank" href="https://www.utorid.utoronto.ca/cgi-bin/utorid/madmin.pl">management</a>');
		$('div.buttons:first-of-type')[0].innerHTML += ('<a class="button custom" id="verify" target="_blank" href="https://www.utorid.utoronto.ca/cgi-bin/utorid/verify.pl">verify</a>');
		$('div.buttons:first-of-type')[0].innerHTML += ('<a class="button custom" id="sspr" target="_blank" href="https://www.utorid.utoronto.ca/cgi-bin/utorid/acctrecoveryadmin.pl">sspr</a>');
		$("th:contains('UTORMFA Status')").parent().next().children('td').children()[0].innerHTML += '<br/><br/><a class="button green" id="duoadmin" target="_blank" href="https://admin-832cdf07.duosecurity.com/">Go to Duo Admin</a>';

		$('#management').click(function () {

			GM_deleteValue('utorid');
			GM_deleteValue('libnum');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());

		});

		$('#verify').click(function () {
			GM_deleteValue('utorid');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());
		});

		$('#sspr').click(function () {

			GM_deleteValue('utorid');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());

		});

		$('#duoadmin').click(function () {
			GM_deleteValue('utorid');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());
		});

	});


} else if(/auth.utoronto.ca\/account\/account.php/.test(window.location.href)){
    $(function(){
        $("th:contains('UTORMFA')").next()[0].innerHTML+='<a class="button-positive small" id="duoadmin" href=#>Go to Duo Admin</a><br/><br/><span class="utormfa-status-wrapper"></span>';
        $("th:contains('Password')").next()[0].innerHTML+='<br/><br/><a class="button-blue small" id="verify" target="_blank" href="https://www.utorid.utoronto.ca/cgi-bin/utorid/verify.pl">Verify</a>';

        let clientUtorid = $('span.top-panel.head')[0].innerHTML;

        $('#duoadmin').click(function() {
            $(".utormfa-status-wrapper")[0].innerHTML = "<span class='utormfa-status'>Loading...</span>";
            GM_xmlhttpRequest({url:'https://admin-832cdf07.duosecurity.com/admin/global/search?query=' + clientUtorid, onload: function(){
                if(this.status == 401){
                    // Admin user not signed in (or doesn't have access)
                    // First, check if we're already waiting for a login
                    if(window.duoadminIntervalId != undefined) return;
                    // Otherwise, ask the user to log in
                    window.loginTab = GM_openInTab("https://admin-832cdf07.duosecurity.com/login", {'active': true, 'setParent': true});
                    $('span.utormfa-status').html("Please log on using the newly opened tab and return here");
                    checkLogin();
                    return;
                }
                let resp = $.parseJSON(this.responseText)["response"];
                if(resp['users'].length == 0){
                    $('span.utormfa-status').html("Could not find user, please look up manually: <a href='https://admin-832cdf07.duosecurity.com' target='_blank'>link</a>");
                    return;
                }else if(resp['users'].length > 1){
		    let users = resp['users'];
		    let found = false;
		    for(user in users){
		        if(user.username == clientUtorid){
                            GM_openInTab("https://admin-832cdf07.duosecurity.com/users/" + resp['users'][0]['key'], {'active': true});
			    found = true;
			    break;
			}
		    }
		    if(!found) $('span.utormfa-status').html("Found multiple users, please look up manually: <a href='https://admin-832cdf07.duosecurity.com' target='_blank'>link</a>");
                    return;
                }
                GM_openInTab("https://admin-832cdf07.duosecurity.com/users/" + resp['users'][0]['key'], {'active': true});
                $('span.utormfa-status').remove();
            }});
            return;
		});

        $('#verify').click(function() {
			GM_deleteValue('utorid');

			GM_setValue('utorid', clientUtorid);
			GM_setValue('utorid_time', Date.now());
		});

		
    })
}else if (/auth.utoronto.ca/.test(window.location.href)) {
    // If we're not at /view.php but we're at auth.utoronto.ca, this is the home page for UTORauth
    // This will also capture the new page (/account) but that's fine
    $(function() {
        // Drop the A at the beginning to make the barcode input field work with the barcode scanners
        $('input[name=barcode]')[0].oninput = (e)=>{if(e.target.value == "A") e.target.value = "";};
    });
}else if (/madmin.pl/.test(window.location.href)) {

	$(function () {

		$("#adminname").val(admin_utorid);
		$("#adminpassword").focus();
		//$("#ducheck").prop("checked", true);
		//$("#exchducheck").prop("checked", true);
		$("#activitylog").prop("checked", true);

		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now() - GM_getValue('utorid_time');

		if (utorid_elapsed < 10000) {
			$("#acctname").val(utorid);
		}

	});

} else if (/verify.pl/.test(window.location.href)) {

	$(function () {
		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now() - GM_getValue('utorid_time');
		if (utorid_elapsed < 10000) {
			$("#acctname").val(utorid);

			//Set password to empty value to overide browser autofill
			$("#password").val("").focus();
		} else {
			// Clear contents of UTORid/password boxes to not accidentally submit admin creds
			$("#acctname").val("");
			$("#password").val("");
		}

	});

} else if (/recover.utorid.utoronto.ca/.test(window.location.href)) {

	$(function () {

		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now() - GM_getValue('utorid_time');
		if (utorid_elapsed < 10000) {
			alert(utorid);
			$("#ctl00_ContentPlaceholderMain_DomainUserName").val(utorid);
			$("#ctl00_ContentPlaceholderMain_LogOnButton").click();
		}

	});
} else if (/acctrecoveryadmin.pl/.test(window.location.href)) {

	$(function () {

		$("#adminname").val(admin_utorid);
		$("#adminpassword").focus();
		$("#activitylog").prop("checked", true);

		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now() - GM_getValue('utorid_time');

		if (utorid_elapsed < 10000) {
			$("#acctname").val(utorid);
		}

	});
} else if (/admin-832cdf07.duosecurity.com\/$/.test(window.location.href)) {

	$(function () {
		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now() - GM_getValue('utorid_time');
		if (utorid_elapsed < 10000) {
			$('input[type=search]')[0].value = utorid;
			$('input[type=search]').focus();
			$('input[type=search]')[0].dispatchEvent(new Event('input', {
				'bubbles': true,
				'cancelable': true
			}));
		}
	});

}
