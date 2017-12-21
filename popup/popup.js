"use strict";
var storage = chrome.storage.local;

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var noop = () => {};

chrome.extension.sendMessage({}, function(response) { noop(); });

$(document).ready(function(){
    chrome.runtime.sendMessage({ type: "init"}, function(res){ 
        storage.get("count", function(i){ 
            $("#count").text((i.count ? i.count : "0"));
            $("#plural").text((i.count == 1 ? "" : "s")); 
        });
        return true;
    });
});
