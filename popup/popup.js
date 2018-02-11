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
        storage.get("nstate", function(i){ $(".switch-box-input").prop("checked", i.nstate); });
        return true;
    });

    $(".switch-box-input").click(function(){ $(this).is(':checked') ? storage.set({ nstate: true }) : storage.set({ nstate: false }); });
});
