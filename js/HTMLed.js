

/*          HTMLed.js  ver 0.2
 * library written by Niranjan Kumar
 * this library requires Jquery to be loaded first
 * If you are using jquery mobile framework this script should be loaded before jquery mobile
 * Refer the demo source for the usage in the <head> section of your HTML pages
 * Your ".properties" file should be in JSON format.
 * Your ".properties" file name should be exactly the browser returned language. 
 * goto http://jsfiddle.net/nirus/9FVTf/ to get the file name you want to set based on your browser eg: en-US.properties for english US language
 * contact me for any quieries : nirus@live.in
*/
            
$(document).ready(  
    window.HTMLed = function(global){   
        if(typeof(global) == "function"){           
            var global = this.global = window.global;
         }
        if((global != undefined) && (global != null)){
                                     
                var lang = global.options;
                    //Your render settings should be mentioned here
                    if(lang.autoDetect)
                        {
                        
                        lang.langPref = lang.langBundle.toString()+'/'+(window.navigator.language|| navigator.language ||navigator.userLanguage).toString()+'.properties';
                        $('html').attr('lang',(window.navigator.language|| navigator.language ||navigator.userLanguage).toString());
                        console.log(lang.langPref);
                        }
                    else
                        {
                        $('html').attr('lang',lang.langPref.toString());
                        lang.langPref = lang.langBundle.toString()+'/'+lang.langPref+'.properties';
                        console.log(lang.langPref);
                        }
            if((global.externalPage == undefined) || (global.externalPage == null)) {    
                    //The ".properties" file is read as a json file
                $.ajax({
                        url:lang.langPref,
                        dataType:'JSON',
                        'global': false,
                        'async': false,
                        success: function(data){
                        
                        $.each(data, function(key, val) {
                            
                            var regex = new RegExp('\\b'+key.toString()+'\\b','g');
                            $('body').html( $('body').html().replace(regex,val.toString()));    //replaces the strings in the html file
                            
                            });
                      }
                });
            }else{                
                $.ajax({
                        url:global.externalPage,
                        dataType:'html',
                        'global': false,
                        'async': false,
                        success: function(html){
                            //var html = this.html;
                            
                                 $.ajax({
                                        url:lang.langPref,
                                        dataType:'JSON',
                                        'global': false,
                                        'async': false,
                                        success: function(data){                                        
                                            $.each(data, function(key, val) {                                            
                                                var regex = new RegExp('\\b'+key.toString()+'\\b','g');
                                                html = html.replace(regex,val.toString());                                               
                                              });
                                            global.callBack(html);
                                        }
                                   });                                                                         
                         }
                });
                
            }       
     }else{
            console.Error("Define global variable");
           }
   }
).trigger('refresh');  //update the page after the change