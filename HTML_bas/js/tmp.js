$( document ).ready(function() {
	"use strict";
	
	function hideTabs() {
	$( "#tab-connect, #tab-config, #tabs-excel" ).hide();
	}
	
	hideTabs();
	$( "#tab-connect" ).show();
	
	$( ".step_indicator" ).click(function(event) {
	  hideTabs();
  
  
  
	if (event.target.id==="step_connect") {
		  $( "#tab-connect" ).show();
		  }
			  
	if (event.target.id==="step_config") {
		  $( "#tab-config").show();
		  $( "#tabs-excel").show();
		  }
	  
	});
	
	
	
	
});



