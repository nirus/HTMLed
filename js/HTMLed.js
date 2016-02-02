/*          HTMLed.js  ver 1.0
 * library written by Niranjan Kumar - A.K.A - N!Ru$
 * this library requires Jquery to be loaded first
 * If you are using jquery mobile framework this script should be loaded before jquery mobile
 * Refer the demo source for the usage in the <head> section of your HTML pages
 * Your ".properties" file should be in JSON format.
 * Your ".properties" file name should be exactly the browser returned language. 
 * goto http://jsfiddle.net/nirus/9FVTf/ to get the file name you want to set based on your browser eg: en-US.properties for english US language
 * contact me for any queries : nirus@live.in
 */

 $(document).ready(function() {
    "use strict";
    /*
        Class level emultion for global configuration
        stored in closure for future access
    */
    var options  = function(opt){
        var _opt = opt, self = this;

        //Setter
        self.get = function(){
            return _opt;
        }

        //Getter
        self.set = function($key, $value){            
            if(typeof $key == "string"){
                _opt[$key.toString()] = $value;    
            }else{ //Just copies the required options
                for(var key in _opt){
                    if($key[key]){
                        _opt[key] = $key[key];
                    }
                }
            }

            return self;
        }
    }, $global;

    /*
       Simple Ajax call used as common utility
     */
    var $ajaxCommon = function(url, $doc, cb, success) {
        $.ajax({
            url: url,
            dataType: 'JSON',
            'global': false,
            'async': false,
            success: success || function(data) {
                $.each(data, function(key, val) {
                    var regex = new RegExp('\\b' + key.toString() + '\\b', 'g');
                    $doc = $doc.replace(regex, val.toString()); //replaces the strings in the html file
                });

                cb($doc);
            },
            error:function(e){
                console.log('error while parsing the JSON file:'+e.statusText);
            }
        });
    };

    //This is the Main API that doeas all the work
    var htmled = function(global) {
        var path;

        //Check if the global option is defined
        if ((global == undefined) && (global == null)) {
            console.error("Define configuration");
            return;
        }

        //Your render settings should be mentioned here    
        if (global.autoDetect) {
            global.langPref = global.langBundle.toString() + '/' + (window.navigator.language || navigator.language || navigator.userLanguage).toString() + '.properties';
            $('html').attr('lang', (window.navigator.language || navigator.language || navigator.userLanguage).toString());
            console.log(global.langPref);
        } else if(!global.externalPage) {
            $('html').attr('lang',  global.langPref.toString());            
            path = global.langBundle.toString() + '/' + global.langPref + '.properties';
            console.log(path);

            //The ".properties" file is read as a json file
            $ajaxCommon(path, $('body').html(), function($doc) {
                $('body').html($doc);                
            })            
        }else{
            if(global.options){
                path = global.options.langBundle || $global.get().langBundle + '/' + global.options.langPref;
            }else{
                path = $global.get().langBundle + '/' + $global.get().langPref;
            }
            path += '.properties';
            $.ajax({
                url: global.externalPage,
                dataType: 'html',
                'global': false,
                'async': false,
                success: function($html) {
                    $ajaxCommon(path, $html, function($doc) {
                        global.callBack($doc);
                    });
                }
            });
        }
    };
    
    //Dynamic reloading
    htmled.rePage = function(opt){        
        localStorage.setItem('HTMLed', JSON.stringify($global.set(opt).get()));
        window.location.reload();        
    };

    //Restores the current page back to original if changed.
    htmled.restore = window.location.reload.bind(window.location);

    var config = $("head").find("[data-config]").attr("data-config"); //Get the configuration
    //Entrypoint of the script
    $ajaxCommon(config, null, null, function(data) {  
        /* 
            Creates and saves the config data inside a closure
            Localstorage is used to store the config when reloading the page
            using window.location.reload() API - Used for persistant data
        */
       
        $global = new options(JSON.parse(localStorage.getItem("HTMLed")) || data);
        //Clear the Localstorage once restoring the config
        localStorage.removeItem("HTMLed");
        htmled($global.get());
    });

    //Exposing the API
    $.HTMLed = htmled;

}).trigger("refresh");