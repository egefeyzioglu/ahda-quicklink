// ==UserScript==
// @author      the AHDAs
// @name        AHDA_quicklink_newer_one
// @namespace   ahda-grease
// @downloadURL https://raw.githubusercontent.com/egefeyzioglu/ahda-quicklink/master/AHDA_quicklink.user.js
// @updateURL   https://raw.githubusercontent.com/egefeyzioglu/ahda-quicklink/master/AHDA_quicklink.user.js
// @include     https://www.auth.utoronto.ca/utid/
// @include     https://www.auth.utoronto.ca/utid/index.php*
// @include     https://www.auth.utoronto.ca/utid/input.php*
// @include     https://www.auth.utoronto.ca/utid/view.php*
// @include     https://www.auth.utoronto.ca/utid/search.php*
// @include     https://rt.ic.utoronto.ca/Ticket/Create.html*
// @include     https://rt.ic.utoronto.ca/Helpers/GetCustomerInfo.html*
// @include     https://rt.ic.utoronto.ca/Helpers/ManageCustomers.html*
// @include     https://www.utorid.utoronto.ca/cgi-bin/utorid/madmin.pl*
// @include     https://www.utorid.utoronto.ca/cgi-bin/utorid/verify.pl*
// @include     https://recover.utorid.utoronto.ca/default.aspx*
// @include     https://admin-832cdf07.duosecurity.com/*
// @include     https://www.utorid.utoronto.ca/cgi-bin/utorid/acctrecoveryadmin.pl*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @version     0.5.5
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
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



// get stored UTORid if it exists
var admin_utorid = GM_getValue("admin_utorid", "");

// if stored UTORid is an empty string then prompt user
if (!admin_utorid ){
	admin_utorid = prompt("Please enter your UTORid");

	// store new UTORid
	GM_setValue ("admin_utorid", admin_utorid);
}

/* begin copy from ICValidAndPopUps.js (https://rt.ic.utoronto.ca/NoAuth/js/squished-d0dae54a98ee33ea63ff0c90fed4cca9.js) */

var CF = new Array();

function InitCFnames( ticketid ){

	CF["Apptid"]            = "Object-RT::Ticket-"+ticketid+"-CustomField-1-Value";
	CF["ConnectionType"]    = "Object-RT::Ticket-"+ticketid+"-CustomField-2-Values";
	CF["FirstLastName"]     = "Object-RT::Ticket-"+ticketid+"-CustomField-3-Value";
	CF["KindofCaller"]      = "Object-RT::Ticket-"+ticketid+"-CustomField-4-Values";
	CF["LibraryNumber"]     = "Object-RT::Ticket-"+ticketid+"-CustomField-5-Value";
	CF["NotifyBy"]          = "Object-RT::Ticket-"+ticketid+"-CustomField-6-Values";
	CF["OperatingSystem"]   = "Object-RT::Ticket-"+ticketid+"-CustomField-7-Values";
	CF["PhoneNumber"]       = "Object-RT::Ticket-"+ticketid+"-CustomField-8-Value";
	CF["ProblemSummary"]    = "Object-RT::Ticket-"+ticketid+"-CustomField-9-Values";
	CF["Source"]            = "Object-RT::Ticket-"+ticketid+"-CustomField-10-Values";
	CF["TicketPriority"]    = "Object-RT::Ticket-"+ticketid+"-CustomField-11-Values";
	CF["UTORid"]            = "Object-RT::Ticket-"+ticketid+"-CustomField-12-Value";
	CF["FacultyDivision"]   = "Object-RT::Ticket-"+ticketid+"-CustomField-13-Values";
	CF["Location"]          = "Object-RT::Ticket-"+ticketid+"-CustomField-29-Value";
	CF["ArtId"]             = "Object-RT::Ticket-"+ticketid+"-CustomField-16-Value";
	CF["PublishStatus"]     = "Object-RT::Ticket-"+ticketid+"-CustomField-17-Values";
	CF["Keywords"]          = "Object-RT::Ticket-"+ticketid+"-CustomField-20-Values";
	CF["RefToTicket"]       = "Object-RT::Ticket-"+ticketid+"-CustomField-21-Value";
	CF["Tags"]              = "Object-RT::Ticket-"+ticketid+"-CustomField-22-Values";
	CF["ArtCategory"]       = "Object-RT::Ticket-"+ticketid+"-CustomField-23-Values";
	CF["TechApproved"]      = "Object-RT::Ticket-"+ticketid+"-CustomField-25-Values";
	CF["EditorApproved"]    = "Object-RT::Ticket-"+ticketid+"-CustomField-26-Values";
	CF["FinalApproval"]     = "Object-RT::Ticket-"+ticketid+"-CustomField-27-Values";
	CF["RevArticleId"]      = "Object-RT::Ticket-"+ticketid+"-CustomField-28-Value";

}

/* end copy from ICValidAndPopUps.js */

function updateTicketFields(field1, value1, field2, value2, field3, value3, field4, value4, field5, value5, field6, value6, field7, value7, field8, value8, field9, value9, field10, value10, field11, value11, value12, ticketid, PrevTicket1a, PrevTicket1b, PrevTicket2a, PrevTicket2b, PrevTicket3a, PrevTicket3b, PrevTicket4a, PrevTicket4b) {

	InitCFnames("");

	// Set the First + Last Name
	document.getElementsByName(CF[field1])[0].value = value1;

	// Set the UTORid
	document.getElementsByName(CF[field2])[0].value = value2;

	// Set the Library Number
	document.getElementsByName(CF[field3])[0].value = value3;

	// Set the Phone Number
	document.getElementsByName(CF[field4])[0].value = value4;

	// Only if there is a value.  Otherwise keep what is there.
	if (value5 !== "") {
		document.getElementsByName('Requestors')[0].value = value5;
	}

	// Set the Kind of Caller
	document.getElementsByName(CF[field6])[0].value = value6;

	// Set the Faculty and Division
	document.getElementsByName(CF[field7])[0].value = value7;

	// Set the Operating System
	document.getElementsByName(CF[field9])[0].value = value9;

	// Set the Connection Type
	document.getElementsByName(CF[field11])[0].value = value11;

	// Search for previous 4 tickets only when creating a ticket

	var PrevTicket1;
	var PrevTicket2;
	var PrevTicket3;
	var PrevTicket4;

	if (PrevTicket1a) {

		var checkStatus = /\(new\)|\(stalled\)|\(open\)/;
		PrevTicket1b = (PrevTicket1b.match(checkStatus)) ? PrevTicket1b.fontcolor("red") : PrevTicket1b.fontcolor("black");
		PrevTicket1 = PrevTicket1b.link(PrevTicket1a);
		PrevTicket2b = (PrevTicket2b.match(checkStatus)) ? PrevTicket2b.fontcolor("red") : PrevTicket2b.fontcolor("black");
		PrevTicket2 = PrevTicket2b.link(PrevTicket2a);
		PrevTicket3b = (PrevTicket3b.match(checkStatus)) ? PrevTicket3b.fontcolor("red") : PrevTicket3b.fontcolor("black");
		PrevTicket3 = PrevTicket3b.link(PrevTicket3a);
		PrevTicket4b = (PrevTicket4b.match(checkStatus)) ? PrevTicket4b.fontcolor("red") : PrevTicket4b.fontcolor("black");
		PrevTicket4 = PrevTicket4b.link(PrevTicket4a);

	} else {

		PrevTicket1 = "No Tickets Found";
		PrevTicket2 = "";
		PrevTicket3 = "";
		PrevTicket4 = "";

	}
	// Set the Previous tickets table
	document.getElementById('PrevTicket01').innerHTML = PrevTicket1;
	document.getElementById('PrevTicket02').innerHTML = PrevTicket2;
	document.getElementById('PrevTicket03').innerHTML = PrevTicket3;
	document.getElementById('PrevTicket04').innerHTML = PrevTicket4;

}

if (/view.php/.test(window.location.href)) {

	$(function() {

		var utorid = $('td div table tr:contains("UTORid(s)") td').text();
		if(utorid.substr(0, utorid.indexOf(" "))) {
			utorid = utorid.substr(0, utorid.indexOf(" "));
		}

		//$('div.buttons:first-of-type').prepend('<a class="button custom" id="create_ticket" target="_blank" href="https://rt.ic.utoronto.ca/Ticket/Create.html?Queue=1">create ticket</a>');
		$('div.buttons:first-of-type')[0].innerHTML+=('<a class="button custom" id="management" target="_blank" href="https://www.utorid.utoronto.ca/cgi-bin/utorid/madmin.pl">management</a>');
		$('div.buttons:first-of-type')[0].innerHTML+=('<a class="button custom" id="verify" target="_blank" href="https://www.utorid.utoronto.ca/cgi-bin/utorid/verify.pl">verify</a>');
		$('div.buttons:first-of-type')[0].innerHTML+=('<a class="button custom" id="sspr" target="_blank" href="https://www.utorid.utoronto.ca/cgi-bin/utorid/acctrecoveryadmin.pl">sspr</a>');
		//$('div.buttons:first-of-type').append('<a class="button custom" id="noc" target="_blank" href="https://isops.noc.utoronto.ca/cgi-bin/security/get_mac_block_history?macaddr='+utorid+'&Submit=Submit">noc</a>');
        $("th:contains('UTORMFA Status')").parent().next().children('td').children()[0].innherHTML+='aaaaa';
        $("th:contains('UTORMFA Status')").parent().next().children('td').children()[0].innerHTML+='<br/><br/><a class="button green" id="duoadmin" target="_blank" href="https://admin-832cdf07.duosecurity.com/">Go to Duo Admin</a>';

		$('#create_ticket').click(function() {

			GM_deleteValue('utorid');
			GM_deleteValue('libnum');
			GM_deleteValue('cn');
			GM_deleteValue('utorid_time');

			GM_setValue('utorid', utorid);
			GM_setValue('libnum', $('td div table tr:contains("Barcode") td b').text());
			GM_setValue('cn', $('td div table tr:contains("cn") td').text());
			GM_setValue('utorid_time', Date.now());

		});

		$('#management').click(function() {

			GM_deleteValue('utorid');
			GM_deleteValue('libnum');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());

		});

		$('#verify').click(function() {
			GM_deleteValue('utorid');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());
		});

        $('#sspr').click(function() {

			GM_deleteValue('utorid');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());

        });

		$('#noc').click(function() {
			GM_deleteValue('utorid');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());
		});


		$('#duoadmin').click(function() {
			GM_deleteValue('utorid');

			GM_setValue('utorid', utorid);
			GM_setValue('utorid_time', Date.now());
		});

	});


} else if (/auth.utoronto.ca/.test(window.location.href)) {
    // If we're not at /view.php but we're at auth.utoronto.ca, this is the home page for UTORauth
    $(function() {
        // Drop the A at the beginning to make the barcode input field work with the barcode scanners
        $('input[name=barcode]').oninput = (e)=>{if(e.target.value == "A") e.target.value = "";};
    });
}else if (/madmin.pl/.test(window.location.href)) {

	$(function(){

		$("#adminname").val(admin_utorid);
		$("#adminpassword").focus();
		//$("#ducheck").prop("checked", true);
		//$("#exchducheck").prop("checked", true);
		$("#activitylog").prop("checked", true);

		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now()-GM_getValue('utorid_time');

		if (utorid_elapsed < 10000) {
			$("#acctname").val(utorid);
		}

	});

} else if (/Create.html/.test(window.location.href)) {

	$(function() {

		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now()-GM_getValue('utorid_time');

		if (utorid_elapsed < 10000) {

			// populate fields from RT customer db
			$("#Ticket-Create-basics").prepend('<div style="display:none" id="quickbox"></div>');
			$("#quickbox").load('/Helpers/GetCustomerInfo.html?UTORid='+utorid+'&SearchField=UTORid&Ticketid=new #Get-Customer-Info table tbody tr:nth-child(2) td a', function() {

				if($("#quickbox a").length != 1) {
					return false;
				}

				var userlink = $('#quickbox').html();
				var stra = /update.*\n.*\)/m.exec(userlink);
				stra = stra.toString();
				stra = stra.replace(/(\r\n|\n|\r)/gm,"");

				var pop_str = stra.replace('updateParentFields', 'updateTicketFields');

				eval(pop_str);

			});

		}

		// set ticket status to resolved by default
		$("select[name='Status']").val("resolved");

		// set location to E-mail if none set
		if($("select[name='Object-RT::Ticket--CustomField-10-Values']").val() === "") {
			$("select[name='Object-RT::Ticket--CustomField-10-Values']").val("E-mail");
		}

        // set notify by to E-mail if none set
		if($("select[name='Object-RT::Ticket--CustomField-6-Values']").val() === "Phone") {
			$("select[name='Object-RT::Ticket--CustomField-6-Values']").val("E-mail");
		}

		// escalate button (Status to new, Owner to Nobody)
		$(".owner").after("<tr class='escalate'><td class='label'>&nbsp;</td><td class='value'><input id='escalate' type='button' value='Escalate'></td></tr>");
		$("#escalate").click(function() {
			$("select[name='Status']").val("new");
			$("#Owner").val("Nobody");
		});

	});

} else if (/GetCustomerInfo.html/.test(window.location.href)) {

	$(function() {
		if($('#Get-Customer-Info table tbody tr').length == 2) {
			a = $('#Get-Customer-Info table tbody tr:nth-child(2) td a').prop("onmouseover");
			a();
		}
	});

} else if (/ManageCustomers.html/.test(window.location.href)) {

	$(function(){

		$("#Object-RT\\:\\:Ticket--CustomField-12-Value").val(GM_getValue('utorid'));
		$("#Object-RT\\:\\:Ticket--CustomField-5-Value").val(GM_getValue('libnum'));
		$("#Object-RT\\:\\:Ticket--CustomField-3-Value").val(GM_getValue('cn'));
		$("#Object-RT\\:\\:Ticket--CustomField-8-Value").val('9-999-999-9999');
		$("#Object-RT\\:\\:Ticket--CustomField-6-Values").val('');

	});

} else if (/verify.pl/.test(window.location.href)) {

	$(function() {
		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now() - GM_getValue('utorid_time');
		if (utorid_elapsed < 10000) {
			$("#acctname").val(utorid);

			//Set password to empty value to overide browser autofill
			$("#password").val("").focus();
		}

	});

} else if (/recover.utorid.utoronto.ca/.test(window.location.href)) {

	$(function() {

		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now() - GM_getValue('utorid_time');
		if (utorid_elapsed < 10000) {
			alert(utorid);
			$("#ctl00_ContentPlaceholderMain_DomainUserName").val(utorid);
			$("#ctl00_ContentPlaceholderMain_LogOnButton").click();
		}

	});
}else if (/acctrecoveryadmin.pl/.test(window.location.href)) {

	$(function(){

		$("#adminname").val(admin_utorid);
		$("#adminpassword").focus();
		//$("#ducheck").prop("checked", true);
		//$("#exchducheck").prop("checked", true);
		$("#activitylog").prop("checked", true);

		var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now()-GM_getValue('utorid_time');

		if (utorid_elapsed < 10000) {
			$("#acctname").val(utorid);
		}

	});
} else if (/admin-832cdf07.duosecurity.com\/$/.test(window.location.href)) {

	$(function(){
        var utorid = GM_getValue('utorid');
		var utorid_elapsed = Date.now()-GM_getValue('utorid_time');
		if (utorid_elapsed < 10000) {
            $('input[type=search]')[0].value=utorid;
            $('input[type=search]').focus();
            $('input[type=search]')[0].dispatchEvent(new Event('input', {
                'bubbles': true,
                'cancelable': true
            }));
        }
	});

}
