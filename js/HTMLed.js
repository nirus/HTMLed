

/* 			HTMLed.js  ver 0.1
 * library written by Niranjan Kumar
 * this library requires Jquery to be loaded first
 * If you are using jquery mobile framework this script should be loaded before jquery mobile
 * Refer the demo source for the usage in the <head> section of your HTML pages
 * Your ".properties" file should be in JSON format.
 * Your ".properties" file name should be exactly the browser returned language. 
 * goto http://jsfiddle.net/nirus/9FVTf/ to get the file name you want to set based on your browser eg: en-US.properties for english US language
 * contact me for any quieries : nirus@live.in
*/

    
$(document).ready(function(){   
	
	var xmlhttp;
	//Your render settings should be mentioned here
	var lang = {
			autoDetect: false,	//This tells the browser to detect the language preference and load ".properties" file automatically
			langPref: "fr",		// if you set "autoDetect:false" you should mention the name of the ".properties" file you want to load 
			langBundle:"bundle",//folder name that contains all ".properties" files
	};
	
	
	if(lang.autoDetect)
		{
			lang.langPref = lang.langBundle.toString()+'/'+(window.navigator.language|| navigator.language ||navigator.userLanguage).toString()+'.properties';
			//$('html').attr('lang',(window.navigator.language|| navigator.language ||navigator.userLanguage).toString());
			document.getElementsByTagName('html')[0].setAttribute('lang',(window.navigator.language|| navigator.language ||navigator.userLanguage).toString());
			console.log(lang.langPref);
		}
	else
		{
			//$('html').attr('lang',lang.langPref.toString());
			document.getElementsByTagName('html')[0].setAttribute('lang',lang.langPref.toString());
			lang.langPref = lang.langBundle.toString()+'/'+lang.langPref+'.properties';
			console.log(lang.langPref);
		}
	
	//The ".properties" file is read as a json file

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

xmlhttp.open("GET",lang.langPref,false);
xmlhttp.send();
xmlhttp.onreadystatechange = function()
  {
  	//console.log(xmlhttp.readyState,xmlhttp.status);
  if (xmlhttp.readyState!=4)
    {
    	if(xmlhttp.status!=200)
    	alert('unable to load the Language Bundle');
    }
  else{
    	
    	var data = xmlhttp.responseText;
    	/*
    	var regex = new RegExp('\\b'+key.toString()+'\\b','g');
    	document.body.innerHTML = document.body.innerHTML.replace(regex, 'hi');
    	*/
    	console.log(data);
    	
    }
  };
 });