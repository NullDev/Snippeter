"use strict";
var storage = chrome.storage.local;

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

$(document).ready(function(){
    storage.get("js",   function(i){ $("#panel_js"  ).find(".CodeMirror-line").find("span").text(i.js   ? i.js   : ""); });
    storage.get("css",  function(i){ $("#panel_css" ).find(".CodeMirror-line").find("span").text(i.css  ? i.css  : ""); });
    storage.get("html", function(i){ $("#panel_html").find(".CodeMirror-line").find("span").text(i.html ? i.html : ""); });

    storage.set({ js: null, css: null, html: null });
});
