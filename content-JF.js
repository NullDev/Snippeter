"use strict";
var storage = chrome.storage.local;

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

$(document).ready(function(){
    storage.get("js",   function(i){ if (i.js)   $("#panel_js"  ).find(".CodeMirror-line").find("span").text(i.js);   });
    storage.get("css",  function(i){ if (i.css)  $("#panel_css" ).find(".CodeMirror-line").find("span").text(i.css);  });
    storage.get("html", function(i){ if (i.html) $("#panel_html").find(".CodeMirror-line").find("span").text(i.html); });

    storage.set({ js: null, css: null, html: null });
});
